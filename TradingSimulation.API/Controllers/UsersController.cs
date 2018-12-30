using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TradingSimulation.API.MappingsAndDtos;
using TradingSimulation.API.Models;
using TradingSimulation.API.Repos;

namespace TradingSimulation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAppRepo _repo;

        public UsersController(IMapper mapper, IAppRepo repo)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{userId}", Name = "GetUser")]
        [ProducesResponseType(typeof(DtoOutgoingUserGet), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> GetUser(string userId)
        {
            //the returned data must belong to the logged in user
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
            {
                return Unauthorized(); 
            }

            var user = await _repo.GetUser(userId);

            if (user == null)
            {
                return BadRequest("Cannot find user");
            }

            var userToreturn = _mapper.Map<DtoOutgoingUserGet>(user);
            return Ok(userToreturn);
        }

        [HttpPost("{userId}/trade")]
        [ProducesResponseType(typeof(DtoOutgoingUserGet), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> Trade(string userId, [FromBody]DtoIncomingTrade dto)
        {
            //the returned data must belong to the logged in user
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
            {
                return Unauthorized(); 
            }

            var userFromRepo = await _repo.GetUser(userId);

            if (userFromRepo == null)
            {
                return BadRequest("Cannot find user");
            }

            // todo:
            // todo: here I need to set some checks regarding amounts
            // todo: like are there enough coins for a buy
            // todo: or do we have enough of the resource we are trying to sell

            var tradeToInsert = _mapper.Map<Trade>(dto);
            // calculate trade total
            tradeToInsert.TradeTotal = tradeToInsert.Quantity * tradeToInsert.Rate;
            //add trade
            userFromRepo.Trades.Add(tradeToInsert);
            // also adjust wallet amounts
            // if trade is buy: reduce the coins and add the resource quantity
            if (dto.Direction == TradeDirection.Buy)
            {
                userFromRepo.Wallets.FirstOrDefault(w => w.Resource == "Coins").Quantity -= tradeToInsert.TradeTotal;
                userFromRepo.Wallets.FirstOrDefault(w => w.Resource == dto.Resource).Quantity += tradeToInsert.Quantity;
            }
            // if sell: reduce the resource quentity and add coins
                if (dto.Direction == TradeDirection.Sell)
            {
                userFromRepo.Wallets.FirstOrDefault(w => w.Resource == "Coins").Quantity += tradeToInsert.TradeTotal;
                userFromRepo.Wallets.FirstOrDefault(w => w.Resource == dto.Resource).Quantity -= tradeToInsert.Quantity;
            }
            
            // save and return
            if (await _repo.SaveAll())
            {
                var user = await _repo.GetUser(userId);
                var userToreturn = _mapper.Map<DtoOutgoingUserGet>(user);
                return Ok(userToreturn);
            }

            return BadRequest("Could not execute trade");

        }

    }
}