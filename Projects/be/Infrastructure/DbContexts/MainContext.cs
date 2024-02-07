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

    public virtual DbSet<_account> accounts { get; set; }
    public virtual DbSet<account_role> account_roles { get; set; }

    public virtual DbSet<_category> categories { get; set; }

    public virtual DbSet<_comment> comments { get; set; }

    public virtual DbSet<comments_for_post> comments_for_posts { get; set; }

    public virtual DbSet<external_authentication> external_authentications { get; set; }

    public virtual DbSet<external_login_provider> external_login_providers { get; set; }

    public virtual DbSet<_hashtag> hashtags { get; set; }

    public virtual DbSet<liked_comment> liked_comments { get; set; }

    public virtual DbSet<liked_post> liked_posts { get; set; }

    public virtual DbSet<_post> posts { get; set; }

    public virtual DbSet<_role> roles { get; set; }

    public virtual DbSet<get_posts_likes_comments> get_posts_likes_comments { get; set; }
    public virtual DbSet<get_posts_likes_comments_filted_by_category> get_posts_likes_comments_filted_by_category { get; set; }
    public virtual DbSet<get_post_likes_has_liked> get_post_likes_has_liked { get; set; }
    public virtual DbSet<get_comments_likes_has_liked> get_comments_likes_has_liked { get; set; }
    public virtual DbSet<get_post_likes> get_post_likes { get; set; }
    public virtual DbSet<get_comments_likes> get_comments_likes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=ConnectionStrings:MainContext");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
