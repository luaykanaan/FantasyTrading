using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using TradingSimulation.API.Models;

namespace TradingSimulation.API.MappingsAndDtos
{
    public class DtoOutgoingUserGet
    {
        public ICollection<DtoOutgoingTrade> Trades { get; set; }

        public ICollection<DtoOutgoingWallet> Wallets { get; set; }
    }
}