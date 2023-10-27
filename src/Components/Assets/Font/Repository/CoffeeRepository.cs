using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cafe.API.IRepository;
using Cafe.Data;
using Cafe.Data.Models;
using Microsoft.EntityFrameworkCore;
#nullable disable
namespace Cafe.API.Repository
{
    public class CoffeeRepository : ICoffeeRepository
    {
        private readonly EspressoEcstasyContext _context;

        public CoffeeRepository(EspressoEcstasyContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Coffee>> GetCoffeesAsync()
        {
            return await _context.Coffees.ToListAsync();
        }

        public async Task<Coffee> GetCoffeeAsync(int id)
        {
            return await _context.Coffees.FindAsync(id);
        }

        public async Task UpdateCoffeeAsync(int id, Coffee coffee)
        {
            if (id != coffee.Coffeeid)
            {
                throw new ArgumentException("Invalid coffee ID");
            }

            _context.Entry(coffee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task CreateCoffeeAsync(Coffee coffee)
        {
            _context.Coffees.Add(coffee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCoffeeAsync(int id)
        {
            var coffee = await _context.Coffees.FindAsync(id) ?? throw new ArgumentException("Coffee not found");
            _context.Coffees.Remove(coffee);
            await _context.SaveChangesAsync();
        }
    }
}
