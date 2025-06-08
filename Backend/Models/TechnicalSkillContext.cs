using Microsoft.EntityFrameworkCore;
using TechnicalSkill.Models;

namespace TechnicalSkill.Models;

public class TechnicalSkillContext : DbContext
{
    public TechnicalSkillContext(DbContextOptions<TechnicalSkillContext> options) : base(options) { }

    public DbSet<Assignment> Assignments { get; set; }
    public DbSet<MultipleChoiceOption> MultipleChoiceOptions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Assignment entity
        modelBuilder.Entity<Assignment>()
            .Property(a => a.Title)
            .IsRequired()
            .HasMaxLength(100);

        modelBuilder.Entity<Assignment>()
            .Property(a => a.Description)
            .HasMaxLength(500);

        modelBuilder.Entity<Assignment>()
            .Property(a => a.Points)
            .IsRequired()
            .HasDefaultValue(1);

        modelBuilder.Entity<Assignment>()
            .Property(a => a.CorrectAnswer)
            .HasMaxLength(500);

        modelBuilder.Entity<Assignment>()
            .Property(a => a.CreatedAt)
            .HasDefaultValueSql("GETUTCDATE()");

        modelBuilder.Entity<Assignment>()
            .Property(a => a.UpdatedAt)
            .HasDefaultValueSql("GETUTCDATE()");

        // Configure MultipleChoiceOption entity
        modelBuilder.Entity<MultipleChoiceOption>()
            .HasOne(o => o.Assignment)
            .WithMany(a => a.MultipleChoiceOptions)
            .HasForeignKey(o => o.AssignmentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<MultipleChoiceOption>()
            .Property(o => o.Text)
            .IsRequired()
            .HasMaxLength(200);

        modelBuilder.Entity<MultipleChoiceOption>()
            .HasIndex(o => new { o.AssignmentId, o.Order })
            .IsUnique();

        modelBuilder.Entity<MultipleChoiceOption>()
            .HasCheckConstraint("CK_MultipleChoiceOption_Order", "[Order] > 0");
    }
}
