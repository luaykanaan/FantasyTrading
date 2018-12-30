using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TradingSimulation.API.Models;

namespace TradingSimulation.API.Context
{
    public class DataContext : IdentityDbContext<User>
    {
        // properties
        public DbSet<Trade> Trades { get; set; }

        public DbSet<Wallet> Wallets { get; set; }
        
        //constructor
        public DataContext(DbContextOptions<DataContext> options) : base (options)
        {
        }

        // overrides
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // call base
            base.OnModelCreating(builder);

            // do your thing
            
        }
        
    }
}