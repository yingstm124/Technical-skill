using System.ComponentModel.DataAnnotations;

namespace TechnicalSkill.DTOs;

public class MultipleChoiceOptionDTO
{
    [Required]
    [StringLength(200)]
    public string Text { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
    public int Order { get; set; }
}

public class MultipleChoiceOptionResponseDTO
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
    public int Order { get; set; }
    public int AssignmentId { get; set; }
}
