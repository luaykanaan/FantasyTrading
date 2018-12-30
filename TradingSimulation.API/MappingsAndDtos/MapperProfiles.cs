
using AutoMapper;
using TradingSimulation.API.Models;
using TradingSimulation.API.MappingsAndDtos;

namespace TradingSimulation.API.MappingsAndDtos
{
    public class MapperProfiles : Profile
    {

        public MapperProfiles()
        {
            CreateMap<DtoIncomingUserRegister, User>();

            CreateMap<User, DtoOutgoingUserGet>();

            CreateMap<DtoIncomingTrade, Trade>();
    
        }
        
    }
}