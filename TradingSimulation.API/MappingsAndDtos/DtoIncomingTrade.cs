using System;

namespace TradingSimulation.API.MappingsAndDtos
{
    public class DtoIncomingTrade
    {
        public DateTime Created { get; set; }

        public string Direction { get; set; }

        public string Resource { get; set; }
                
        public double Quantity { get; set; }

        public double Rate { get; set; }

        public DtoIncomingTrade()
        {
            Created = DateTime.Now;

        }
    }
}