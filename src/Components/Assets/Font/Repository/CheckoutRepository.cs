using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Cafe.Data.Models;
using Cafe.API.IRepository;
#nullable disable
namespace Cafe.API.Repository
{
    public class CheckoutRepository : ICheckoutRepository
    {
        private readonly EspressoEcstasyContext _context;

        public CheckoutRepository(EspressoEcstasyContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Checkout>> GetCheckoutsAsync()
        {
            return await _context.Checkouts.ToListAsync();
        }

        public async Task<Checkout> GetCheckoutAsync(int id)
        {
            return await _context.Checkouts.FindAsync(id);
        }

        public async Task UpdateCheckoutAsync(int id, Checkout checkout)
        {
            var existingCheckout = await _context.Checkouts.FirstOrDefaultAsync(c => c.Chid == id) ?? throw new ArgumentException("Checkout not found");
            await _context.SaveChangesAsync();
        }

        public async Task CreateCheckoutAsync(Checkout checkout)
        {
            if (_context.Checkouts == null)
                throw new Exception("Entity set 'EspressoEcstasyContext.Checkouts' is null.");

            _context.Checkouts.Add(checkout);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCheckoutAsync(int id)
        {
            var checkout = await _context.Checkouts.FindAsync(id) ?? throw new ArgumentException("Checkout not found");
            _context.Checkouts.Remove(checkout);
            await _context.SaveChangesAsync();
        }
    }
}