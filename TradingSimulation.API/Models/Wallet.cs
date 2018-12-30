namespace TradingSimulation.API.Models
{
    public class Wallet
    {
        public int Id { get; set; }

        public string Resource { get; set; }

        public double Quantity { get; set; }

        public string UserId { get; set; } // forign key

        public User User { get; set; } // navigation property
        
    }
}