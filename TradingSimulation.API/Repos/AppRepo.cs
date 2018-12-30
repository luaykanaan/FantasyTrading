using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TradingSimulation.API.Context;
using TradingSimulation.API.Models;

namespace TradingSimulation.API.Repos
{
    public class AppRepo : IAppRepo
    {

        private readonly DataContext _context;

        public AppRepo(DataContext context)
        {
            _context = context;
        }

        public async Task<User> GetUser(string userId)
        {
            return await _context.Users.Include(t => t.Trades).Include(w => w.Wallets).FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}