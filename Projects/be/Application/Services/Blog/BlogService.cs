using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.Repositories.Blog;
using Microsoft.Extensions.Logging;
using Ganss.Xss;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Infrastructure.Models;
using Application.Services.Account;
using Amazon.S3.Transfer;
using Amazon.S3;
using Amazon.S3.Model;

namespace Application.Services.Blog;

public class BlogService : IBlogService
{
    private readonly ILogger<BlogService> _logger;
    private readonly IBlogRepository _blogRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAccountService _accountService;
    private readonly AmazonS3Client _s3Client;
    static private readonly string _DefaultBucketName = "jeheecheon";
    static private readonly int _PostsPerPage = 6;
    public BlogService(
        ILogger<BlogService> logger,
        IBlogRepository blogRepository,
        IHttpContextAccessor httpContextAccessor,
        IAccountService accountService,
        AmazonS3Client s3Client
    )
    {
        _logger = logger;
        _blogRepository = blogRepository;
        _httpContextAccessor = httpContextAccessor;
        _accountService = accountService;
        _s3Client = s3Client;
    }

    public IEnumerable<Category>? GetAllCategories()
    {
        return _blogRepository.GetAllCategories();
    }

    public string SanitizeContent(string dirty)
    {
        var sanitizer = new HtmlSanitizer();
        return sanitizer.Sanitize(dirty);
    }

    public async Task<bool> UploadEmptyPost()
    {
        return await _blogRepository.CreateEmptyPostAsync();
    }

    public async Task<bool> UploadPostAsync(PostUploadRequestDto post)
    {
        post.title = SanitizeContent(post.title);
        post.content = SanitizeContent(post.content);
        return await _blogRepository.CreatePostAsync(post);
    }

    public async Task<bool> UpdatePostAsync(PostWithMetadata post, bool setEditedAt, bool setEditedAtAsNull, bool setUploadedAt)
    {
        bool succeeded = await _blogRepository.UpdatePostAsync(post);
        if (setEditedAt)
            succeeded = await _blogRepository.UpdateEditedAtAsync(post);
        else if (setEditedAtAsNull)
            succeeded = await _blogRepository.SetEditedAtAsNullAsync(post);

        if (setUploadedAt)
            succeeded = await _blogRepository.UpdateUploadedAtAsync(post);

        return succeeded;
    }

    public IEnumerable<PostsLikesComments>? GetRecentPosts(int page)
    {
        int offset = (page - 1) * _PostsPerPage;

        return _blogRepository.GetRecentPosts(offset, _PostsPerPage);
    }

    public IEnumerable<PostsLikesCommentsFilteredByCategory>? GetCategoryPosts(int page, string category)
    {
        int offset = (page - 1) * _PostsPerPage;

        return _blogRepository.GetCategoryPosts(offset, _PostsPerPage, category);
    }

    public PostLikesHasLiked? GetPost(Guid post_id)
    {
        if (string.IsNullOrWhiteSpace(post_id.ToString()))
            return null;
        string? guidString = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Sid)?.Value;
        if (string.IsNullOrWhiteSpace(guidString))
        {
            PostLikes? post = _blogRepository.GetPost(post_id);
            if (post is null)
                return null;
            return new PostLikesHasLiked(post);
        }
        else
        {
            Guid account_id = Guid.Parse(guidString);
            return _blogRepository.GetPostWithHasLiked(post_id, account_id);
        }
    }

    public async Task<bool> UploadCommentAsync(Guid post_id, CommentUploadRequestDto commentToUpload)
    {
        if (string.IsNullOrWhiteSpace(post_id.ToString()))
            return false;
        if (string.IsNullOrWhiteSpace(commentToUpload.content))
            return false;

        string? guidString = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Sid)?.Value;
        if (string.IsNullOrWhiteSpace(guidString))
            return false;
        Guid account_id = Guid.Parse(guidString);

        string clean = SanitizeContent(commentToUpload.content);

        int affectedRowsCnt = await _blogRepository.CreateCommentAsync(account_id, post_id, clean, commentToUpload.parent_comment_id);

        return affectedRowsCnt > 0;
    }

    public IEnumerable<CommentsLikesHasLiked>? GetComments(Guid post_id)
    {
        if (string.IsNullOrWhiteSpace(post_id.ToString()))
            return null;
        string? guidString = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Sid)?.Value;
        IEnumerable<CommentsLikesHasLiked>? comments;

        if (string.IsNullOrWhiteSpace(guidString))
        {
            var commentsWithoutHasLiked = _blogRepository.GetComments(post_id);
            if (commentsWithoutHasLiked is null)
                return null;

            comments = commentsWithoutHasLiked
                .Select((comment) => new CommentsLikesHasLiked(comment));
        }
        else
        {
            Guid account_id = Guid.Parse(guidString);
            comments = _blogRepository.GetCommentsWithHasLiked(post_id, account_id);
            if (comments is null)
                return null;
        }

        foreach (var comment in comments)
            if (comment.IsDeleted)
                comment.Content = "[Deleted comment...]";

        return comments;
    }

    public async Task<bool> SetPostHasLikedAsync(Guid post_id, bool has_liked)
    {
        if (string.IsNullOrWhiteSpace(post_id.ToString()))
            return false;
        string? guidString = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Sid)?.Value;
        if (string.IsNullOrWhiteSpace(guidString))
            return false;
        Guid account_id = Guid.Parse(guidString);

        if (has_liked)
            return await _blogRepository.CreateLikedPostAsync(post_id, account_id);
        else
            return await _blogRepository.DeleteLikedPostAsync(post_id, account_id);
    }

    public async Task<bool> SetCommentHasLikedAsync(Guid comment_id, bool has_liked)
    {
        if (string.IsNullOrWhiteSpace(comment_id.ToString()))
            return false;
        string? guidString = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Sid)?.Value;
        if (string.IsNullOrWhiteSpace(guidString))
            return false;
        Guid account_id = Guid.Parse(guidString);

        if (has_liked)
            return await _blogRepository.CreateLikedCommentAsync(comment_id, account_id);
        else
            return await _blogRepository.DeleteLikedCommentAsync(comment_id, account_id);
    }

    public async Task<string?> UploadFileToS3Async(IFormFile file, string key)
    {
        if (file != null && file.Length > 0)
        {
            var response = await _s3Client.ListBucketsAsync();
            if (response.Buckets.Any(bucket => bucket.BucketName == _DefaultBucketName))
            {
                using (var memoryStream = new MemoryStream())
                {
                    try
                    {
                        await file.CopyToAsync(memoryStream);

                        var transferUtility = new TransferUtility(_s3Client);
                        await transferUtility.UploadAsync(memoryStream, _DefaultBucketName, key);

                        var location = (await _s3Client.GetBucketLocationAsync(new GetBucketLocationRequest
                        {
                            BucketName = _DefaultBucketName
                        }))
                            .Location;

                        return $"https://jeheecheon.s3.{location}.amazonaws.com/{key}";
                    }
                    catch (Exception e)
                    {
                        _logger.LogError($"{e.Source}: {e.Message}");
                    }
                }
            }
        }

        return string.Empty;
    }

    public async Task<string?> UploadImageToS3Async(IFormFile image, string post_id)
    {
        var fileName = Guid.NewGuid().ToString();
        var key = $"blog/posts/{post_id}/images/{fileName}";

        return await UploadFileToS3Async(image, key);
    }

    public IEnumerable<PostSummary>? GetPostLists()
    {
        if (_accountService.FilterAdmin())
            return _blogRepository.GetPostLists();
        else
            return null;
    }

    public PostWithMetadata? GetPostWithMetadata(Guid post_id)
    {
        return _blogRepository.GetPostWithMetadata(post_id);
    }

    public async Task<bool> DeletePostAsync(Guid post_id)
    {
        return await _blogRepository.DeletePostAsync(post_id);
    }

    public StaticLikePostLikesHasLiked? GetStaticLikePost(Guid post_id)
    {
        if (string.IsNullOrWhiteSpace(post_id.ToString()))
            return null;
        string? guidString = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Sid)?.Value;

        StaticLikePostLikesHasLiked post;
        if (string.IsNullOrWhiteSpace(guidString))
        {
            var temp = _blogRepository.GetStaticLikePost(post_id);
            if (temp is null)
                return null;
            post = new StaticLikePostLikesHasLiked(temp);
        }
        else
        {
            Guid account_id = Guid.Parse(guidString);
            var temp = _blogRepository.GetStaticLikePostWithHasLiked(post_id, account_id);
            if (temp is null)
                return null;
            post = temp;
        }
        if (post.Title == "About Me" || post.Title == "Privacy Policy" 
        || post.Title == "우아한테크코스 7기 프론트엔드 증빙 자료")
            return post;
        else
            return null;
    }

    public async Task<List<string>?> GetMusicListFromS3Async()
    {
        var listRequest = new ListObjectsV2Request
        {
            BucketName = _DefaultBucketName,
            Prefix = $"blog/music"
        };

        List<string> musicList = new();
        try
        {
            var location = (await _s3Client.GetBucketLocationAsync(new GetBucketLocationRequest
            {
                BucketName = _DefaultBucketName
            }))
                .Location;
            do
            {
                ListObjectsV2Response response = await _s3Client.ListObjectsV2Async(listRequest);
                foreach (S3Object entry in response.S3Objects)
                {
                    musicList.Add($"https://jeheecheon.s3.{location}.amazonaws.com/{entry.Key}");
                }

                listRequest.ContinuationToken = response.NextContinuationToken;
            } while (listRequest.ContinuationToken != null);
        }
        catch (Exception e)
        {
            _logger.LogError($"{e.Source}: {e.Message}");
            return null;
        }

        musicList.RemoveAt(0);
        return musicList;
    }

    public int GetPageNum(string? category)
    {
        int postCnt;
        if (string.IsNullOrWhiteSpace(category))
            postCnt = _blogRepository.GetPostCnt();
        else
            postCnt = _blogRepository.GetPostCntByCategory(category);

        return (int)Math.Ceiling((double)postCnt / _PostsPerPage);
    }
}
