using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Webot.Common;

namespace Webot.Services
{
    public class WeloginService
    {
        public async Task<string> GetUUid()
        {
            var paramsDic = new Dictionary<string, string>();
            paramsDic.Add("appid", "wx782c26e4c19acffb");
            paramsDic.Add("redirect_uri", "https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage");
            paramsDic.Add("fun", "new");
            paramsDic.Add("lang", "zh_CN");
            paramsDic.Add("_", TimeUtil.GetCurrentTimeStamp().ToString());
            var response = await HttpUtil.GetAsync("https://login.wx.qq.com/jslogin", paramDic: paramsDic, timeOutSeconds: 30);

            var pattern = "(?<=uuid = \").+(?=\";)";
            return Regex.Match(response, pattern).Value;
        }

        public async Task<string> LoginCheck(string uuid)
        {
            var paramsDic = new Dictionary<string, string>();
            paramsDic.Add("loginicon", "true");
            paramsDic.Add("uuid", uuid);
            paramsDic.Add("tip", "0");
            paramsDic.Add("r", (~TimeUtil.GetCurrentTimeStamp()).ToString());
            paramsDic.Add("_", TimeUtil.GetCurrentTimeStamp().ToString());

            var response = await HttpUtil.GetAsync("https://login.wx.qq.com/cgi-bin/mmwebwx-bin/login", paramDic: paramsDic, timeOutSeconds: 30);
            return response;
        }

        public async Task<string> GetAuthInfo(string redirectUrl)
        {
            var response = await HttpUtil.GetAsync(redirectUrl, timeOutSeconds: 30);
            return response;
        }
    }
}
