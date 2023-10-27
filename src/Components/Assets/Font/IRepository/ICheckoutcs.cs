using System.Collections.Generic;
using System.Threading.Tasks;
using Cafe.Data.Models;

namespace Cafe.API.IRepository
{
    public interface ICheckoutRepository
    {
        Task<IEnumerable<Checkout>> GetCheckoutsAsync();
        Task<Checkout> GetCheckoutAsync(int id);
        Task UpdateCheckoutAsync(int id, Checkout checkout);
        Task CreateCheckoutAsync(Checkout checkout);
        Task DeleteCheckoutAsync(int id);
    }
}
