using System.Collections.Generic;
using System.Threading.Tasks;
using Cafe.Data.Models;

namespace Cafe.API.IRepository
{
    public interface IMilkShakeRepository
    {
        Task<IEnumerable<MilkShake>> GetMilkShakesAsync();
        Task<MilkShake> GetMilkShakeAsync(int id);
        Task UpdateMilkShakeAsync(int id, MilkShake milkShake);
        Task CreateMilkShakeAsync(MilkShake milkShake);
        Task DeleteMilkShakeAsync(int id);
    }
}
