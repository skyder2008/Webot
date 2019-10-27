using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using Webot.Common;
using Webot.Dtos;

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
            var response = await HttpUtil.GetAsync("https://login.wx.qq.com/jslogin", paramDic: paramsDic);

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

            var response = await HttpUtil.GetAsync("https://login.wx.qq.com/cgi-bin/mmwebwx-bin/login", paramDic: paramsDic);
            return response;
        }

        public async Task<AuthInfoDto> GetAuthInfo(string redirectUrl)
        {
            var response = await HttpUtil.GetResponseAsync(redirectUrl+ "&fun=new&version=v2");
            var responseStr = await response.Content.ReadAsStringAsync();
            var authInfo = GetAuthInfoByStr(responseStr);
            var dataTicketCookie = response.Headers.GetValues("Set-Cookie").ElementAt(4);
            authInfo.DataTicket = Regex.Match(dataTicketCookie, "(?<=webwx_data_ticket=).+?(?=;)").Value;
            return authInfo;
        }

        public async Task<string> InitWechat(WechatInitDto initInfo)
        {
            var baseRequestStr = $"{{\"BaseRequest\":{{\"Uin\":\"{initInfo.Wxuin}\",\"Sid\":\"{initInfo.Wxsid}\",\"Skey\":\"{initInfo.Skey}\",\"DeviceID\":\"e{initInfo.DeviceId}\"}}}}";
            var paramsDic = new Dictionary<string, string>();
            paramsDic.Add("r", (~TimeUtil.GetCurrentTimeStamp()).ToString());
            paramsDic.Add("pass_ticket", initInfo.PassTicket);
            var response = await HttpUtil.PostAsync("https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxinit", paramDic: paramsDic, postContent: baseRequestStr);
            return response;
        }

        public async Task<string> WebWXSync(WebWXSyncDto wxSyncInfo)
        {
            var requestPayload = new WebWXSyncRequestPayload()
            {
                BaseRequest = new BaseRequestDto() 
                { 
                    Uin= wxSyncInfo.Wxuin,
                    Sid = wxSyncInfo.Wxsid,
                    Skey = wxSyncInfo.Skey,
                    DeviceID = wxSyncInfo.DeviceId,
                },
                SyncKey = wxSyncInfo.SyncKey,
                rr = ~TimeUtil.GetCurrentTimeStamp()
            };
            var requestPayloadStr = JsonConvert.SerializeObject(requestPayload);
            var paramsDic = new Dictionary<string, string>();
            paramsDic.Add("sid", wxSyncInfo.Wxsid);
            paramsDic.Add("skey", wxSyncInfo.Skey);
            paramsDic.Add("pass_ticket", wxSyncInfo.PassTicket);
            paramsDic.Add("lang", "zh_CN");
            var response = await HttpUtil.PostAsync("https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxsync", paramDic: paramsDic, postContent: requestPayloadStr);
            return response;
        }

        public async Task<string> SyncCheck(SyncCheckDto syncCheck)
        {
            var paramsDic = new Dictionary<string, string>();
            paramsDic.Add("r", TimeUtil.GetCurrentTimeStamp().ToString());
            paramsDic.Add("skey", syncCheck.Skey);
            paramsDic.Add("sid", syncCheck.Wxsid);
            paramsDic.Add("uin", syncCheck.Wxuin);
            paramsDic.Add("deviceid", syncCheck.DeviceId);
            paramsDic.Add("synckey", syncCheck.SyncKey);
            paramsDic.Add("_", TimeUtil.GetCurrentTimeStamp().ToString());
            var headers = new Dictionary<string, string>();
            headers.Add("Cookie", $"wxuin={syncCheck.Wxuin};webwx_data_ticket={syncCheck.DataTicket};");

            var response = await HttpUtil.GetAsync(syncCheck.SyncUrl + "/cgi-bin/mmwebwx-bin/synccheck", 
                paramDic: paramsDic, headers:headers);
            return response;
        }

        public async Task<string> WebWXStatusNotify(WebWXStatusNotifyDto statusNotifyInfo)
        {
            var requestPayload = new WebWXStatusNotifyRequestPayload()
            {
                BaseRequest = new BaseRequestDto()
                {
                    Uin = statusNotifyInfo.Wxuin,
                    Sid = statusNotifyInfo.Wxsid,
                    Skey = statusNotifyInfo.Skey,
                    DeviceID = statusNotifyInfo.DeviceId,
                },
                Code = 3,
                FromUserName = statusNotifyInfo.UserName,
                ToUserName = statusNotifyInfo.UserName,
                ClientMsgId = TimeUtil.GetCurrentTimeStamp(),
            };
            var requestPayloadStr = JsonConvert.SerializeObject(requestPayload);
            var paramsDic = new Dictionary<string, string>();
            paramsDic.Add("lang", "zh_CN");
            paramsDic.Add("pass_ticket", statusNotifyInfo.PassTicket);
            var response = await HttpUtil.PostAsync("https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxstatusnotify", paramDic: paramsDic, postContent: requestPayloadStr);
            return response;
        }

        public async Task<string> WebWXSendMsg(WebWXSendMsgDto msgSend)
        {
            var requestPayload = new WebWXMsgSendRequestPayload()
            {
                BaseRequest = new BaseRequestDto()
                {
                    Uin = msgSend.Wxuin,
                    Sid = msgSend.Wxsid,
                    Skey = msgSend.Skey,
                    DeviceID = msgSend.DeviceId,
                },
                Scene = 0,
                Msg = msgSend.Msg,
            };
            var requestPayloadStr = JsonConvert.SerializeObject(requestPayload);
            var paramsDic = new Dictionary<string, string>();
            paramsDic.Add("pass_ticket", msgSend.PassTicket);
            var headers = new Dictionary<string, string>();
            headers.Add("Cookie", $"wxuin={msgSend.Wxuin};webwx_data_ticket={msgSend.DataTicket};");
            var response = await HttpUtil.PostAsync("https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxsendmsg", paramDic: paramsDic, postContent: requestPayloadStr, headers: headers);
            return response;
        }

        private AuthInfoDto GetAuthInfoByStr(string authInfoStr)
        {
            var authInfo = new AuthInfoDto();
            var patternTempate = "(?<=\\<{0}\\>).+(?=\\</{0}\\>)";
            authInfo.Skey = Regex.Match(authInfoStr, string.Format(patternTempate, "skey")).Value;
            authInfo.Wxsid = Regex.Match(authInfoStr, string.Format(patternTempate, "wxsid")).Value;
            authInfo.Wxuin = Regex.Match(authInfoStr, string.Format(patternTempate, "wxuin")).Value;
            authInfo.PassTicket = Regex.Match(authInfoStr, string.Format(patternTempate, "pass_ticket")).Value;

            return authInfo;
        }
    }
}
