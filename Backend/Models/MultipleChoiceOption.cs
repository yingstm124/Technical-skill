using System.ComponentModel.DataAnnotations;

namespace TechnicalSkill.Models;

public class MultipleChoiceOption
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Text { get; set; } = string.Empty;

    public bool IsCorrect { get; set; }

    [Required]
    public int AssignmentId { get; set; }
    public Assignment? Assignment { get; set; }

    public int Order { get; set; } // To maintain the order of options
}
