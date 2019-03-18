using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace HealthCatalyst.Data.Models.SQLite
{
    public partial class HealthDataContext : DbContext
    {
        public HealthDataContext()
        {
        }

        public HealthDataContext(DbContextOptions<HealthDataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<PatientCommunication> PatientCommunication { get; set; }
        public virtual DbSet<PatientDescriptions> PatientDescriptions { get; set; }
        public virtual DbSet<PatientImages> PatientImages { get; set; }
        public virtual DbSet<PatientInfo> PatientInfo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("Data Source=bin\\Debug\\netcoreapp2.2\\Database\\HealthData.db;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.3-servicing-35854");

            modelBuilder.Entity<PatientCommunication>(entity =>
            {
                entity.HasIndex(e => e.PatientInfoId)
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("GUID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnType("NVARCHAR(200)");

                entity.Property(e => e.Country)
                    .IsRequired()
                    .HasColumnType("NVARCHAR(100)");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnType("NVARCHAR(150)");

                entity.Property(e => e.PatientInfoId)
                    .IsRequired()
                    .HasColumnName("PatientInfoID")
                    .HasColumnType("GUID");

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnType("NVARCHAR(20)");

                entity.Property(e => e.Zip)
                    .IsRequired()
                    .HasColumnType("NVARCHAR(15)");

                entity.HasOne(d => d.PatientInfo)
                    .WithOne(p => p.PatientCommunication)
                    .HasForeignKey<PatientCommunication>(d => d.PatientInfoId);
            });

            modelBuilder.Entity<PatientDescriptions>(entity =>
            {
                entity.HasIndex(e => e.PatientInfoId)
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("GUID")
                    .ValueGeneratedNever();

                entity.Property(e => e.PatientInfoId)
                    .HasColumnName("PatientInfoID")
                    .HasColumnType("GUID");

                entity.HasOne(d => d.PatientInfo)
                    .WithOne(p => p.PatientDescriptions)
                    .HasForeignKey<PatientDescriptions>(d => d.PatientInfoId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<PatientImages>(entity =>
            {
                entity.HasIndex(e => e.PatientInfoId)
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("GUID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Image).HasColumnType("IMAGE");

                entity.Property(e => e.PatientInfoId)
                    .IsRequired()
                    .HasColumnName("PatientInfoID")
                    .HasColumnType("GUID");

                entity.HasOne(d => d.PatientInfo)
                    .WithOne(p => p.PatientImages)
                    .HasForeignKey<PatientImages>(d => d.PatientInfoId);
            });

            modelBuilder.Entity<PatientInfo>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("GUID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Dob)
                    .IsRequired()
                    .HasColumnName("DOB")
                    .HasColumnType("DATE");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnType("NVARCHAR(100)");

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasColumnType("NVARCHAR(6)");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnType("NVARCHAR(100)");
            });
        }
    }
}
