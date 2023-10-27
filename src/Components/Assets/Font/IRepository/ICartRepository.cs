using System.Collections.Generic;
using System.Threading.Tasks;
using Cafe.Data.Models;

namespace Cafe.API.IRepository
{
    public interface ICartRepository
    {
        Task<IEnumerable<Cart>> GetCartsAsync();
        Task<Cart> GetCartAsync(int id);
        Task UpdateCartAsync(int id, Cart cart);
        Task CreateCartAsync(Cart cart);
        Task DeleteCartAsync(int userid);
    }
}
