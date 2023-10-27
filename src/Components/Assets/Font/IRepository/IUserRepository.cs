using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cafe.Data.Models;

namespace Cafe.API.IRepository
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserAsync(int id);
        Task UpdateUserAsync(int id, User user);
        Task CreateUserAsync(User user);
        Task DeleteUserAsync(User user);
    }
}