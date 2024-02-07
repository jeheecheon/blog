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

    public virtual DbSet<account> accounts { get; set; }

    public virtual DbSet<category> categories { get; set; }

    public virtual DbSet<comment> comments { get; set; }

    public virtual DbSet<comments_for_post> comments_for_posts { get; set; }

    public virtual DbSet<external_authentication> external_authentications { get; set; }

    public virtual DbSet<external_login_provider> external_login_providers { get; set; }

    public virtual DbSet<hashtag> hashtags { get; set; }

    public virtual DbSet<liked_comment> liked_comments { get; set; }

    public virtual DbSet<liked_post> liked_posts { get; set; }

    public virtual DbSet<post> posts { get; set; }

    public virtual DbSet<role> roles { get; set; }

    public virtual DbSet<get_posts_likes_comments> get_posts_likes_comments { get; set; }
    public virtual DbSet<get_posts_likes_comments_filted_by_category> get_posts_likes_comments_filted_by_category { get; set; }
    public virtual DbSet<get_post_likes_has_liked> get_post_likes_has_liked { get; set; }
    public virtual DbSet<get_comments_likes_has_liked> get_comments_likes_has_liked { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=ConnectionStrings:MainContext");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<account>(entity =>
        {
            entity.HasKey(e => e.id).HasName("account_pkey");

            entity.ToTable("account");

            entity.HasIndex(e => e.normalized_email, "account_normalized_email_key").IsUnique();

            entity.Property(e => e.id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.avatar).HasMaxLength(256);
            entity.Property(e => e.created_at).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.email).HasMaxLength(254);
            entity.Property(e => e.normalized_email).HasMaxLength(254);

            entity.HasMany(d => d.roles).WithMany(p => p.accounts)
                .UsingEntity<Dictionary<string, object>>(
                    "account_role",
                    r => r.HasOne<role>().WithMany()
                        .HasForeignKey("role_id")
                        .HasConstraintName("account_role_role_id_fkey"),
                    l => l.HasOne<account>().WithMany()
                        .HasForeignKey("account_id")
                        .HasConstraintName("account_role_account_id_fkey"),
                    j =>
                    {
                        j.HasKey("account_id", "role_id").HasName("account_role_pkey");
                        j.ToTable("account_role");
                    });
        });

        modelBuilder.Entity<category>(entity =>
        {
            entity.HasKey(e => e.id).HasName("category_pkey");

            entity.ToTable("category");

            entity.Property(e => e.id).HasMaxLength(30);
            entity.Property(e => e.parent_category_id).HasMaxLength(30);

            entity.HasOne(d => d.parent_category).WithMany(p => p.Inverseparent_category)
                .HasForeignKey(d => d.parent_category_id)
                .HasConstraintName("category_parent_category_id_fkey");
        });

        modelBuilder.Entity<comment>(entity =>
        {
            entity.HasKey(e => e.id).HasName("comment_pkey");

            entity.ToTable("comment");

            entity.Property(e => e.id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.is_deleted).HasDefaultValue(false);
            entity.Property(e => e.uploaded_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.account).WithMany(p => p.comments)
                .HasForeignKey(d => d.account_id)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("comment_account_id_fkey");

            entity.HasOne(d => d.parent_comment).WithMany(p => p.Inverseparent_comment)
                .HasForeignKey(d => d.parent_comment_id)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("comment_parent_comment_id_fkey");

            entity.HasOne(d => d.post).WithMany(p => p.comments)
                .HasForeignKey(d => d.post_id)
                .HasConstraintName("comment_post_id_fkey");
        });

        modelBuilder.Entity<comments_for_post>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("comments_for_post");

            entity.Property(e => e.email).HasMaxLength(254);
        });

        modelBuilder.Entity<external_authentication>(entity =>
        {
            entity.HasKey(e => new { e.provider_id, e.account_id_from_provider }).HasName("external_authentication_pkey");

            entity.ToTable("external_authentication");

            entity.HasIndex(e => e.account_id_from_provider, "external_authentication_account_id_from_provider_key").IsUnique();

            entity.Property(e => e.account_id_from_provider).HasMaxLength(256);

            entity.HasOne(d => d.account).WithMany(p => p.external_authentications)
                .HasForeignKey(d => d.account_id)
                .HasConstraintName("external_authentication_account_id_fkey");

            entity.HasOne(d => d.provider).WithMany(p => p.external_authentications)
                .HasForeignKey(d => d.provider_id)
                .HasConstraintName("external_authentication_provider_id_fkey");
        });

        modelBuilder.Entity<external_login_provider>(entity =>
        {
            entity.HasKey(e => e.id).HasName("external_login_provider_pkey");

            entity.ToTable("external_login_provider");

            entity.HasIndex(e => e.name, "external_login_provider_name_key").IsUnique();

            entity.Property(e => e.name).HasMaxLength(40);
        });

        modelBuilder.Entity<hashtag>(entity =>
        {
            entity.HasKey(e => e.id).HasName("hashtag_pkey");

            entity.ToTable("hashtag");

            entity.HasIndex(e => e.name, "hashtag_name_key").IsUnique();

            entity.Property(e => e.name).HasMaxLength(40);
        });

        modelBuilder.Entity<liked_comment>(entity =>
        {
            entity.HasKey(e => new { e.comment_id, e.account_id }).HasName("liked_comment_pkey");

            entity.ToTable("liked_comment");

            entity.Property(e => e.created_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.account).WithMany(p => p.liked_comments)
                .HasForeignKey(d => d.account_id)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("liked_comment_account_id_fkey");

            entity.HasOne(d => d.comment).WithMany(p => p.liked_comments)
                .HasForeignKey(d => d.comment_id)
                .HasConstraintName("liked_comment_comment_id_fkey");
        });

        modelBuilder.Entity<liked_post>(entity =>
        {
            entity.HasKey(e => new { e.post_id, e.account_id }).HasName("liked_post_pkey");

            entity.ToTable("liked_post");

            entity.Property(e => e.created_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.account).WithMany(p => p.liked_posts)
                .HasForeignKey(d => d.account_id)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("liked_post_account_id_fkey");

            entity.HasOne(d => d.post).WithMany(p => p.liked_posts)
                .HasForeignKey(d => d.post_id)
                .HasConstraintName("liked_post_post_id_fkey");
        });

        modelBuilder.Entity<post>(entity =>
        {
            entity.HasKey(e => e.id).HasName("post_pkey");

            entity.ToTable("post");

            entity.Property(e => e.id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.category_id).HasMaxLength(30);
            entity.Property(e => e.cover).HasMaxLength(256);
            entity.Property(e => e.title).HasMaxLength(50);
            entity.Property(e => e.uploaded_at).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.category).WithMany(p => p.posts)
                .HasForeignKey(d => d.category_id)
                .HasConstraintName("post_category_id_fkey");

            entity.HasMany(d => d.hashtags).WithMany(p => p.posts)
                .UsingEntity<Dictionary<string, object>>(
                    "post_hashtag",
                    r => r.HasOne<hashtag>().WithMany()
                        .HasForeignKey("hashtag_id")
                        .HasConstraintName("post_hashtag_hashtag_id_fkey"),
                    l => l.HasOne<post>().WithMany()
                        .HasForeignKey("post_id")
                        .HasConstraintName("post_hashtag_post_id_fkey"),
                    j =>
                    {
                        j.HasKey("post_id", "hashtag_id").HasName("post_hashtag_pkey");
                        j.ToTable("post_hashtag");
                    });
        });

        modelBuilder.Entity<role>(entity =>
        {
            entity.HasKey(e => e.id).HasName("role_pkey");

            entity.ToTable("role");

            entity.HasIndex(e => e.name, "role_name_key").IsUnique();

            entity.Property(e => e.name).HasMaxLength(30);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
