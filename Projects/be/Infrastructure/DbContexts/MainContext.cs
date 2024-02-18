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

    public virtual DbSet<Account> Account { get; set; }
    public virtual DbSet<AccountRole> AccountRole { get; set; }

    public virtual DbSet<Category> Category { get; set; }

    public virtual DbSet<Comment> Comment { get; set; }

    public virtual DbSet<ExternalAuthentication> ExternalAuthentication { get; set; }

    public virtual DbSet<ExternalLoginProvider> ExternalLoginProvider { get; set; }

    public virtual DbSet<Hashtag> Hashtag { get; set; }

    public virtual DbSet<LikedComment> LikedComment { get; set; }

    public virtual DbSet<LikedPost> LikedPost { get; set; }

    public virtual DbSet<Post> Post { get; set; }

    public virtual DbSet<Role> Role { get; set; }

    public virtual DbSet<PostsLikesComments> PostsLikesComments { get; set; }
    public virtual DbSet<PostsLikesCommentsFilteredByCategory> PostsLikesCommentsFilteredByCategory { get; set; }
    public virtual DbSet<PostLikesHasLiked> PostLikesHasLiked { get; set; }
    public virtual DbSet<CommentsLikesHasLiked> CommentsLikesHasLiked { get; set; }
    public virtual DbSet<PostLikes> PostLikes { get; set; }
    public virtual DbSet<CommentsLikes> CommentsLikes { get; set; }
    public virtual DbSet<PostSummary> PostSummary { get; set; }
    public virtual DbSet<PostWithMetadata> PostWithMetadata { get; set; }
    public virtual DbSet<StaticLikePostLikes> StaticLikePostLikes { get; set; }
    public virtual DbSet<StaticLikePostLikesHasLiked> StaticLikePostLikesHasLiked { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=ConnectionStrings:MainContext");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
