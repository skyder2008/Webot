using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webot.Dtos
{
    public class QRLoginDto
    {
        public string Code { get; set; }
        public string Uuid { get; set; }
    }

    public class AuthInfoDto
    {
        public string Skey { get; set; }
        public string Wxsid { get; set; }
        public string Wxuin { get; set; }
        public string PassTicket { get; set; }
        public string DataTicket { get; set; }
    }

    public class WechatInitDto: AuthInfoDto
    {
        public string DeviceId { get; set; }
    }

    public class WebWXSyncDto : WechatInitDto
    {
        public SyncKeyDto SyncKey { get; set; }
    }

    public class SyncCheckDto
    {
        public string Skey { get; set; }
        public string Wxsid { get; set; }
        public string Wxuin { get; set; }
        public string SyncKey { get; set; }
        public string DeviceId { get; set; }
        public string SyncUrl { get; set; }
        public string DataTicket { get; set; }
    }

    public class SyncKeyItemDto
    {
        public int Key { get; set; }
        public int Val { get; set; }
    }

    public class SyncKeyDto
    {
        public int Count { get; set; }
        public List<SyncKeyItemDto> List { get; set; }
    }

    public class BaseRequestDto
    {
        public string Uin { get; set; }
        public string Sid { get; set; }
        public string Skey { get; set; }
        public string DeviceID { get; set; }
    }

    public class WebWXSyncRequestPayload
    {
        public BaseRequestDto BaseRequest { get; set; }
        public SyncKeyDto SyncKey { get; set; }
        public long rr { get; set; }
    }

    public class WebWXStatusNotifyDto : WechatInitDto
    {
        public string UserName { get; set; }
    }

    public class WebWXStatusNotifyRequestPayload
    {
        public BaseRequestDto BaseRequest { get; set; }
        public int Code { get; set; }
        public string FromUserName { get; set; }
        public string ToUserName { get; set; }
        public long ClientMsgId { get; set; }
    }

    public class WechatMsg
    {
        public string MsgId { get; set; }
        public string FromUserName { get; set; }
        public string ToUserName { get; set; }
        public string Content { get; set; }
        public int Type { get; set; }
    }

    public class WebWXSendMsgDto : WechatInitDto
    { 
        public WechatMsg Msg { get; set; }
    }

    public class WebWXMsgSendRequestPayload
    {
        public BaseRequestDto BaseRequest { get; set; }
        public WechatMsg Msg { get; set; }
        public int Scene { get; set; }
    }
}
