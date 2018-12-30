using System;

namespace TradingSimulation.API.Models
{
    public class Trade
    {
        public int Id { get; set; }

        public DateTime Created { get; set; }

        public string Direction { get; set; }

        public string Resource { get; set; }
                
        public double Quantity { get; set; }

        public double Rate { get; set; }

        public double TradeTotal { get; set; }

        public string UserId { get; set; } // forign key

        public User User { get; set; } // navigation property

    }

    public class ResourceType
    {
        public static string Coins { get { return "Coins";} }
        public static string Wood { get { return "Wood";} }
        public static string Gems { get { return "Gems";} }
        public static string Elixir { get { return "Elixir";} }
        
    }

    public class TradeDirection
    {
        public static string Buy { get { return "Buy";} }
        public static string Sell { get { return "Sell";} }
    }
}