using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Cafe.Data.Models;
using Cafe.API.IRepository;
using Microsoft.AspNetCore.Mvc;
#nullable disable
namespace Cafe.API.Repository
{

    public class UserRepository : IUserRepository
    {
        private readonly EspressoEcstasyContext _context;

        public UserRepository(EspressoEcstasyContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task UpdateUserAsync(int id, User user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Userid == id) ?? throw new InvalidOperationException("User not found");
            existingUser.Email = user.Email;
            existingUser.Password = user.Password;
            existingUser.Phone = user.Phone;
            existingUser.Uname = user.Uname;
            _context.Entry(existingUser).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }



        public async Task CreateUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

    }

}
