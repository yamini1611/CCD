using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Cafe.Data.Models;
using Cafe.API.IRepository;
#nullable disable
namespace Cafe.API.Repository
{

    public class CartRepository : ICartRepository
    {
        private readonly EspressoEcstasyContext _context;

        public CartRepository(EspressoEcstasyContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cart>> GetCartsAsync()
        {
            return await _context.Carts.ToListAsync();
        }

        public async Task<Cart> GetCartAsync(int id)
        {
            return await _context.Carts.FindAsync(id);
        }

        public async Task UpdateCartAsync(int id, Cart cart)
        {
            var existingCart = await _context.Carts.FirstOrDefaultAsync(c => c.Cid == id) ?? throw new ArgumentException("Cart not found");
            existingCart.Quantity = cart.Quantity;
            existingCart.Price = cart.Price;

            await _context.SaveChangesAsync();
        }

        public async Task CreateCartAsync(Cart cart)
        {
            if (_context.Carts == null)
                throw new Exception("Entity set 'EspressoEcstasyContext.Carts' is null.");

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCartAsync(int userid)
        {
            var cartItems = await _context.Carts
               .Where(cart => cart.Userid == userid)
               .ToListAsync();

            if (cartItems != null && cartItems.Any())
            {
                _context.Carts.RemoveRange(cartItems);
                await _context.SaveChangesAsync();
            }
        }

       
    }
}