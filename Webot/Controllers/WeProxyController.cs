using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Webot.Services;

namespace Webot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeProxyController : ControllerBase
    {
        private WeloginService weloginService;

        public WeProxyController()
        {
            weloginService = new WeloginService();
        }

        [HttpGet]
        [Route("uuid")]
        public async Task<string> GetUuid()
        {
            return await weloginService.GetUUid();
        }

        [HttpGet]
        [Route("login-check")]
        public async Task<string> LoginCheck(string uuid)
        {
            return await weloginService.LoginCheck(uuid);
        }

        [HttpGet]
        [Route("auth-info")]
        public async Task<string> GetAuthInfo(string redirectUrl)
        {
            return await weloginService.GetAuthInfo(redirectUrl);
        }
    }
}