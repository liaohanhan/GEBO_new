using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FinalProject_GEBO.Models
{
    public partial class GEBOContext : DbContext
    {
        public GEBOContext()
        {
        }

        public GEBOContext(DbContextOptions<GEBOContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AnnualGoal> AnnualGoal { get; set; }
        public virtual DbSet<CategoryList> CategoryList { get; set; }
        public virtual DbSet<Diary> Diary { get; set; }
        public virtual DbSet<DiaryAnswer> DiaryAnswer { get; set; }
        public virtual DbSet<DiaryQuestion> DiaryQuestion { get; set; }
        public virtual DbSet<ItemList> ItemList { get; set; }
        public virtual DbSet<Member> Member { get; set; }
        public virtual DbSet<MonthPlan> MonthPlan { get; set; }
        public virtual DbSet<SavePlan> SavePlan { get; set; }
        public virtual DbSet<SaveReport> SaveReport { get; set; }
        public virtual DbSet<Schedule> Schedule { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=127.0.0.1;user id=user;password=user1234; persist security info=True; Initial Catalog=GEBO;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AnnualGoal>(entity =>
            {
                entity.Property(e => e.BeginDate).HasColumnType("date");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.Goal).HasMaxLength(30);

                entity.Property(e => e.MId).HasColumnName("M.Id");

                entity.Property(e => e.Rate).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Year).HasColumnType("date");

                entity.HasOne(d => d.M)
                    .WithMany(p => p.AnnualGoal)
                    .HasForeignKey(d => d.MId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AnnualGoal_Member");
            });

            modelBuilder.Entity<CategoryList>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(30);

                entity.Property(e => e.Title).HasMaxLength(10);
            });

            modelBuilder.Entity<Diary>(entity =>
            {
                entity.Property(e => e.Content).HasMaxLength(1000);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.MemberId).HasColumnName("MemberID");
            });

            modelBuilder.Entity<DiaryAnswer>(entity =>
            {
                entity.Property(e => e.Answer).HasMaxLength(500);

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.DiaryAnswer)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DiaryAnswer_Member");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.DiaryAnswer)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DiaryAnswer_DiaryQuestion");
            });

            modelBuilder.Entity<DiaryQuestion>(entity =>
            {
                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.MemberId).HasColumnName("MemberID");

                entity.Property(e => e.Question).HasMaxLength(50);
            });

            modelBuilder.Entity<ItemList>(entity =>
            {
                entity.Property(e => e.Item).HasMaxLength(20);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.ItemList)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ItemList_CategoryList");
            });

            modelBuilder.Entity<Member>(entity =>
            {
                entity.Property(e => e.Account)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Name).HasMaxLength(10);

                entity.Property(e => e.Password)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MonthPlan>(entity =>
            {
                entity.Property(e => e.AgId).HasColumnName("AG.Id");

                entity.Property(e => e.BeginDate).HasColumnType("date");

                entity.Property(e => e.Content).HasMaxLength(500);

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.MId).HasColumnName("M.Id");

                entity.Property(e => e.Title).HasMaxLength(30);
            });

            modelBuilder.Entity<SavePlan>(entity =>
            {
                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.SavePlan)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SavePlan_Member");
            });

            modelBuilder.Entity<SaveReport>(entity =>
            {
                entity.Property(e => e.Date).HasColumnType("date");
            });

            modelBuilder.Entity<Schedule>(entity =>
            {
                entity.Property(e => e.BeginDate).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.MpId).HasColumnName("MP.Id");

                entity.Property(e => e.Title).HasMaxLength(100);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.Schedule)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Schedule_Member");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
