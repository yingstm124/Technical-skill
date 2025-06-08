using System.ComponentModel.DataAnnotations;

namespace TechnicalSkill.DTOs;

public class AssignmentCreateDTO
{
    [Required]
    [StringLength(100)]
    public string Title { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    public int Points { get; set; } = 1;

    [StringLength(500)]
    public string? CorrectAnswer { get; set; }

    public IEnumerable<MultipleChoiceOptionDTO>? MultipleChoiceOptions { get; set; }
}

public class AssignmentUpdateDTO
{
    [Required]
    [StringLength(100)]
    public string Title { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    public int Points { get; set; }

    [StringLength(500)]
    public string? CorrectAnswer { get; set; }

    public IEnumerable<MultipleChoiceOptionDTO>? MultipleChoiceOptions { get; set; }
}

public class AssignmentResponseDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public int Points { get; set; }
    public string? CorrectAnswer { get; set; }
    public IEnumerable<MultipleChoiceOptionResponseDTO>? MultipleChoiceOptions { get; set; }
}
