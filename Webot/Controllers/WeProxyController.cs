using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Webot.Common;

namespace Webot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeProxyController : ControllerBase
    {
        [HttpGet]
        [Route("uuid")]
        public string GetUuid()
        {
            var paramsDic = new Dictionary<string, string>();
            paramsDic.Add("appid", "wx782c26e4c19acffb");
            paramsDic.Add("redirect_uri", "https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage");
            paramsDic.Add("fun", "new");
            paramsDic.Add("lang", "zh_CN");
            paramsDic.Add("_", (new DateTimeOffset(DateTime.UtcNow)).ToUnixTimeSeconds().ToString());
            var response = HttpUtil.Get("https://login.wx.qq.com/jslogin", timeOutSeconds: 30, paramDic: paramsDic);

            var pattern = "(?<=uuid = \").+(?=\";)";


            return Regex.Match(response,pattern).Value;
        }
    }
}