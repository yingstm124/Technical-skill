using Microsoft.AspNetCore.Mvc;
using TechnicalSkill.DTOs;
using TechnicalSkill.Models;
using TechnicalSkill.Services.Interfaces;

namespace TechnicalSkill.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssignmentsController : ControllerBase
{
    private readonly IAssignmentService _service;

    public AssignmentsController(IAssignmentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Assignment>>> GetAssignments()
    {
        var assignments = await _service.GetAllAsync();
        return Ok(assignments);
    }

    [HttpPost]
    public async Task<ActionResult<AssignmentResponseDTO>> CreateAssignment(AssignmentCreateDTO assignmentDTO)
    {
        var createdAssignment = await _service.CreateAsync(assignmentDTO);
        return createdAssignment;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAssignment(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }

}
