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

    public virtual DbSet<Account> Accounts { get; set; }
    public virtual DbSet<AccountRole> AccountRoles { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<ExternalAuthentication> ExternalAuthentications { get; set; }

    public virtual DbSet<ExternalLoginProvider> ExternalLoginProviders { get; set; }

    public virtual DbSet<Hashtag> Hashtags { get; set; }

    public virtual DbSet<LikedComment> LikedComments { get; set; }

    public virtual DbSet<LikedPost> LikedPosts { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<GetPostsLikesComments> GetPostsLikesComments { get; set; }
    public virtual DbSet<GetPostsLikesCommentsFilteredByCategory> GetPostsLikesCommentsFilteredByCategory { get; set; }
    public virtual DbSet<GetPostLikesHasLiked> GetPostLikesHasLiked { get; set; }
    public virtual DbSet<GetCommentsLikesHasLiked> GetCommentsLikesHasLiked { get; set; }
    public virtual DbSet<GetPostLikes> GetPostLikes { get; set; }
    public virtual DbSet<GetCommentsLikes> GetCommentsLikes { get; set; }
    public virtual DbSet<PostsList> PostsList { get; set; }
    public virtual DbSet<PostWithMetadata> PostWithMetadata { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=ConnectionStrings:MainContext");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
