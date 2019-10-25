using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Webot.Dtos;
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
        public async Task<AuthInfoDto> GetAuthInfo(string redirectUrl)
        {
            return await weloginService.GetAuthInfo(redirectUrl);
        }

        [HttpPost]
        [Route("init-wechat")]
        public async Task<string> InitWechat(WechatInitDto initInfo)
        {
            return await weloginService.InitWechat(initInfo);
        }

        [HttpPost]
        [Route("sync-check")]
        public async Task<string> SyncCheck(SyncCheckDto syncCheck)
        {
            return await weloginService.SyncCheck(syncCheck);
        }

        [HttpPost]
        [Route("status-notify")]
        public async Task<string> WebWXStatusNotify(WebWXStatusNotifyDto statusNotifyInfo)
        {
            return await weloginService.WebWXStatusNotify(statusNotifyInfo);
        }

        [HttpPost]
        [Route("webwx-sync")]
        public async Task<string> WebWXSync(WebWXSyncDto wxSyncInfo)
        {
            return await weloginService.WebWXSync(wxSyncInfo);
        }
    }
}