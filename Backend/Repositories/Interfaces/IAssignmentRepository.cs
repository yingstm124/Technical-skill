using TechnicalSkill.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace TechnicalSkill.Repositories.Interfaces;

public interface IAssignmentRepository
{
    Task<IEnumerable<Assignment>> GetAllAsync();
    Task DeleteAsync(int id);
    Task<Assignment> CreateAsync(Assignment assignment);
}
