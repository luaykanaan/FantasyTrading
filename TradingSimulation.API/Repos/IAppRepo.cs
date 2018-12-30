using System.Threading.Tasks;
using TradingSimulation.API.Models;

namespace TradingSimulation.API.Repos
{
    public interface IAppRepo
    {
        Task<bool> SaveAll();

         Task<User> GetUser(string userId);
    }
}