using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cafe.Data.Models;

namespace Cafe.API.IRepository
{
    public interface IEatableRepository
    {
        Task<IEnumerable<Eatable>> GetEatablesAsync();
        Task<Eatable> GetEatableAsync(int id);
        Task UpdateEatableAsync(int id, Eatable eatable);
        Task CreateEatableAsync(Eatable eatable);
        Task DeleteEatableAsync(int id);
    }
}