using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Cafe.Data.Models;
#nullable disable
namespace Cafe.API.IRepository
{
    public class EatableRepository : IEatableRepository
    {
        private readonly EspressoEcstasyContext _context;

        public EatableRepository(EspressoEcstasyContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Eatable>> GetEatablesAsync()
        {
            return await _context.Eatables.ToListAsync();
        }

        public async Task<Eatable> GetEatableAsync(int id)
        {
            return await _context.Eatables.FindAsync(id);
        }

        public async Task UpdateEatableAsync(int id, Eatable eatable)
        {
            if (id != eatable.Eid)
            {
                throw new ArgumentException("Invalid ID");
            }

            _context.Entry(eatable).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task CreateEatableAsync(Eatable eatable)
        {
            _context.Eatables.Add(eatable);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEatableAsync(int id)
        {
            var eatable = await _context.Eatables.FindAsync(id) ?? throw new ArgumentException("Eatable not found");
            _context.Eatables.Remove(eatable);
            await _context.SaveChangesAsync();
        }
    }
}