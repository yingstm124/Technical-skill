using TechnicalSkill.DTOs;
using TechnicalSkill.Models;

namespace TechnicalSkill.Services.Interfaces;

public interface IAssignmentService
{
    Task<IEnumerable<AssignmentResponseDTO>> GetAllAsync();
    Task DeleteAsync(int id);
    Task<AssignmentResponseDTO> CreateAsync(AssignmentCreateDTO assignment);
}
