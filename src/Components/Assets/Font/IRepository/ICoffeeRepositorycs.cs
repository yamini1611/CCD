using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cafe.Data.Models;

namespace Cafe.API.IRepository
{
    public interface ICoffeeRepository
    {
        Task<IEnumerable<Coffee>> GetCoffeesAsync();
        Task<Coffee> GetCoffeeAsync(int id);
        Task UpdateCoffeeAsync(int id, Coffee coffee);
        Task CreateCoffeeAsync(Coffee coffee);
        Task DeleteCoffeeAsync(int id);
    }
}
