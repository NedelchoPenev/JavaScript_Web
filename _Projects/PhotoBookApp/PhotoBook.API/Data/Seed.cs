using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using PhotoBook.API.Models;

namespace PhotoBook.API.Data
{
    public class Seed
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;
        public Seed(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
        }

        public void SeedUsers()
        {
            if (!this.userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                var roles = new List<Role>
                {
                    new Role{Name = "Member"},
                    new Role{Name = "Moderator"},
                    new Role{Name = "Admin"}
                };

                foreach (var role in roles)
                {
                    this.roleManager.CreateAsync(role).Wait();
                }

                foreach (var user in users)
                {
                    this.userManager.CreateAsync(user, "password").Wait();
                    this.userManager.AddToRoleAsync(user, "Member").Wait();
                }

                var adminUser = new User
                {
                    UserName = "Admin"
                };

                IdentityResult result = this.userManager.CreateAsync(adminUser, "password").Result;
                if (result.Succeeded)
                {
                    var admin = this.userManager.FindByNameAsync("Admin").Result;
                    this.userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"}).Wait();
                }
            }
        }
    }
}