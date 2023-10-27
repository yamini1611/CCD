using Cafe.Data.Models;

namespace Cafe.API.IRepository
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetRolesAsync();
        Task<Role> GetRoleAsync(int id);
        Task CreateRoleAsync(Role role);
        Task UpdateRoleAsync(int id, Role role);
        Task DeleteRoleAsync(int id);
        bool RoleExists(int id);
    }
}

