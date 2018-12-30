using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace TradingSimulation.API.Models
{
    public class User : IdentityUser
    {
        public DateTime CreatedOn { get; set; }

        public DateTime LastActive { get; set; }

        public ICollection<IdentityRole> Roles { get; set; }

        public ICollection<Trade> Trades { get; set; }

        public ICollection<Wallet> Wallets { get; set; }
        
    }
}