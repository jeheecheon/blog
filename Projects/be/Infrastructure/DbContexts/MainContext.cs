using System;
using System.Collections.Generic;
using Infrastructur.Models;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DbContexts;

public partial class MainContext : DbContext
{
    public MainContext()
    {
    }

    public MainContext(DbContextOptions<MainContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> accounts { get; set; }
    public virtual DbSet<AccountRole> account_roles { get; set; }

    public virtual DbSet<Category> categories { get; set; }

    public virtual DbSet<Comment> comments { get; set; }

    public virtual DbSet<ExternalAuthentication> external_authentications { get; set; }

    public virtual DbSet<ExternalLoginProvider> external_login_providers { get; set; }

    public virtual DbSet<Hashtag> hashtags { get; set; }

    public virtual DbSet<LikedComment> liked_comments { get; set; }

    public virtual DbSet<LikedPost> liked_posts { get; set; }

    public virtual DbSet<Post> posts { get; set; }

    public virtual DbSet<Role> roles { get; set; }

    public virtual DbSet<GetPostsLikesComments> get_posts_likes_comments { get; set; }
    public virtual DbSet<GetPostsLikesCommentsFilteredByCategory> get_posts_likes_comments_filtered_by_category { get; set; }
    public virtual DbSet<GetPostLikesHasLiked> get_post_likes_has_liked { get; set; }
    public virtual DbSet<GetCommentsLikesHasLiked> get_comments_likes_has_liked { get; set; }
    public virtual DbSet<GetPostLikes> get_post_likes { get; set; }
    public virtual DbSet<GetCommentsLikes> get_comments_likes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=ConnectionStrings:MainContext");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
