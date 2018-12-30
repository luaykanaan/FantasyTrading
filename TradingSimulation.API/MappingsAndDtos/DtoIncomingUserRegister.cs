using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using TradingSimulation.API.Models;

namespace TradingSimulation.API.MappingsAndDtos
{
    public class DtoIncomingUserRegister
    {
        public string UserName { get; set; }
        
        public string Email { get; set; }
        
        public string Password { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime LastActive { get; set; }

        public ICollection<Wallet> Wallets { get; set; } = new Collection<Wallet>();

        public DtoIncomingUserRegister()
        {
            CreatedOn = DateTime.Now;
            LastActive = DateTime.Now;
            Wallets.Add( new Wallet {Resource="Coins", Quantity=100});
            Wallets.Add( new Wallet {Resource="Wood", Quantity=0});
            Wallets.Add( new Wallet {Resource="Gems", Quantity=0});
            Wallets.Add( new Wallet {Resource="Elixir", Quantity=0});
        }
    }
}