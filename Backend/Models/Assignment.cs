using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TechnicalSkill.Models;

public class Assignment
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Title { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    public ICollection<MultipleChoiceOption>? MultipleChoiceOptions { get; set; }

    [Required]
    public int Points { get; set; } = 1;

    [StringLength(500)]
    public string? CorrectAnswer { get; set; } // For non-multiple choice assignments
}
