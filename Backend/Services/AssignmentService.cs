using AutoMapper;
using TechnicalSkill.Models;
using TechnicalSkill.Services.Interfaces;
using TechnicalSkill.Repositories.Interfaces;
using TechnicalSkill.DTOs;

namespace TechnicalSkill.Services;

public class AssignmentService : IAssignmentService
{
    private readonly IAssignmentRepository _repository;
    private readonly IMapper _mapper;

    public AssignmentService(IAssignmentRepository repository, IMapper mapper)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<IEnumerable<AssignmentResponseDTO>> GetAllAsync()
    {
        var assignments = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<AssignmentResponseDTO>>(assignments);
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }

    public async Task<AssignmentResponseDTO> CreateAsync(AssignmentCreateDTO assignmentDto)
    {
        if (assignmentDto == null)
            throw new ArgumentNullException(nameof(assignmentDto));

        var assignment = _mapper.Map<Assignment>(assignmentDto);
        
        if (assignmentDto.MultipleChoiceOptions != null && assignmentDto.MultipleChoiceOptions.Any())
        {
            assignment.MultipleChoiceOptions = _mapper.Map<ICollection<MultipleChoiceOption>>(assignmentDto.MultipleChoiceOptions);
        }
        
        assignment.CreatedAt = DateTime.UtcNow;
        assignment.UpdatedAt = DateTime.UtcNow;
        
        var createdAssignment = await _repository.CreateAsync(assignment);
        return _mapper.Map<AssignmentResponseDTO>(createdAssignment);
    }
}
