using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using TradingSimulation.API.Models;

namespace TradingSimulation.API.Context
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public Seed(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            this._roleManager = roleManager;
            this._userManager = userManager;
        }

        public void SeedData()
        {
            if (!_userManager.Users.Any())
            {
                // seed roles first
                var roles = new List<IdentityRole>
                {
                    new IdentityRole{Name = "Member"},
                    new IdentityRole{Name = "Support"},
                    new IdentityRole{Name = "Admin"},
                    new IdentityRole{Name = "VIP"},
                };

                foreach (var role in roles)
                {
                    _roleManager.CreateAsync(role).Wait();
                }

                // seed important users
                var vipUser =  new User { UserName = "VIP", Email = "vip@email.com" };
                var result = _userManager.CreateAsync(vipUser, "Pa55w0rd!").Result; //do it like this because we can't add await
                if (result.Succeeded)
                {
                    var vip = _userManager.FindByNameAsync("VIP").Result;
                    _userManager.AddToRoleAsync(vip, "VIP").Wait();
                }

                var adminUser =  new User { UserName = "Admin", Email = "admin@email.com" };
                var result2 = _userManager.CreateAsync(adminUser, "Pa55w0rd!").Result; //do it like this because we can't add await
                if (result2.Succeeded)
                {
                    var admin = _userManager.FindByNameAsync("Admin").Result;
                    _userManager.AddToRoleAsync(admin, "Admin").Wait();
                }
            }
        }

    }
}