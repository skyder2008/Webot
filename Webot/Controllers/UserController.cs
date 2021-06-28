using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Webot.Data.Mongo.Documents;
using Webot.Service;

namespace Webot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService UserService;

        public UserController(IUserService userService)
        {
            UserService = userService;
        }

        [HttpGet]
        [Route("login")]
        [Authorize]
        public async Task<string> Login()
        {
            return await Task.FromResult<string>("Login");
        }

        [HttpPost]
        [Route("create")]
        public async Task<UserDoc> CreateUser(UserDoc user)
        {
            return await UserService.CreateUser(user);
        }
    }
}