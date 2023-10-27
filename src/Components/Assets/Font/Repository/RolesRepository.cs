using Cafe.API.IRepository;
using Cafe.Data.Models;
using Microsoft.EntityFrameworkCore;
#nullable disable
namespace Cafe.API.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly EspressoEcstasyContext _context;

        public RoleRepository(EspressoEcstasyContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<Role> GetRoleAsync(int id)
        {
            return await _context.Roles.FindAsync(id);
        }

        public async Task CreateRoleAsync(Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRoleAsync(int id, Role role)
        {
            if (id != role.Roleid)
            {
                throw new ArgumentException("Invalid ID");
            }

            _context.Entry(role).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRoleAsync(int id)
        {
            var role = await _context.Roles.FindAsync(id) ?? throw new ArgumentException("Role not found");
            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
        }

        public bool RoleExists(int id)
        {
            return _context.Roles.Any(e => e.Roleid == id);
        }
    }

}
