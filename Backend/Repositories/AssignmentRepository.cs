using TechnicalSkill.Models;
using TechnicalSkill.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace TechnicalSkill.Repositories;

public class AssignmentRepository : IAssignmentRepository
{
    private readonly TechnicalSkillContext _context;

    public AssignmentRepository(TechnicalSkillContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Assignment>> GetAllAsync()
    {
        return await _context.Assignments
            .Include(a => a.MultipleChoiceOptions)
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var assignment = await _context.Assignments
            .FirstOrDefaultAsync(a => a.Id == id);
        
        if (assignment != null)
        {
            _context.Assignments.Remove(assignment);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<Assignment> CreateAsync(Assignment assignment)
    {
        if (assignment == null)
            throw new ArgumentNullException(nameof(assignment));

        if (string.IsNullOrWhiteSpace(assignment.Title))
            throw new ArgumentException("Title is required", nameof(assignment.Title));

        if (assignment.Points <= 0)
            throw new ArgumentException("Points must be greater than 0", nameof(assignment.Points));

        assignment.CreatedAt = DateTime.UtcNow;
        assignment.UpdatedAt = DateTime.UtcNow;

        await _context.Assignments.AddAsync(assignment);
        await _context.SaveChangesAsync();

        return assignment;
    }
}
