export class WechatAuthInfo {
    skey: string;
    wxsid: string;
    wxuin: string;
    passTicket: string;
    dataTicket: string;
}

export class WechatInitInfo extends WechatAuthInfo {
    deviceId: string;
}

export class SyncKeyItem {
    Key: number;
    Val: number;
}

export class SyncKey {
    Count: number;
    List: Array<SyncKeyItem>;
    toString1(): string {
        if (this.List == null) {
            return null;
        }
        let keyString = '';
        this.List.forEach(item => {
            keyString += `${item.Key}_${item.Val}|`
        });

        return keyString.length > 0 ? keyString.substr(0, keyString.length - 1) : keyString;
    }
}

export class WechatUser {
    UserName: string;
    NickName: string;
}

export class WechatInitResponse {
    SyncKey: SyncKey;
    User: WechatUser;
}

export class WechatSyncMsg {
    MsgId: string;
    FromUserName: string;
    ToUserName: string;
    MsgType: number;
    Content: string;
}

export class WebWXSyncResponse {
    SyncKey: SyncKey;
    AddMsgList: Array<WechatSyncMsg>;
}

export class SyncCheckInfo extends WechatInitInfo {
    syncKey: string;
    syncUrl: string;
    dataTicket: string;
}

export class WebWXSyncInfo extends WechatInitInfo {
    SyncKey: SyncKey;
}

export class WebWXStatusNotifyInfo extends WechatInitInfo {
    userName: string;
}

export class WechatMsg {
    MsgId: string;
    FromUserName: string;
    ToUserName: string;
    Type: number;
    Content: string;
}

export class WebWXMsgSendDto extends WechatInitInfo {
    msg: WechatMsg;
}


