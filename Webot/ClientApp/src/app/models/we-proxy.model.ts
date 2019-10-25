export class WechatAuthInfo {
    skey: string;
    wxsid: string;
    wxuin: string;
    passTicket: string;
}

export class WechatInitInfo extends WechatAuthInfo{
    deviceId: string;
}

export class SyncKeyItem {
    Key: number;
    Val: number;
}

export class SyncKey {
    Count: number;
    List: Array<SyncKeyItem>;
    toString1(): string{
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
}

export class WechatInitResponse {
    SyncKey: SyncKey;
    User: WechatUser;
}

export class WebWXSyncResponse {
    SyncKey: SyncKey;
}

export class SyncCheckInfo {
    skey: string;
    wxsid: string;
    wxuin: string;
    syncKey: string;
    deviceId: string;
    syncUrl: string;
}

export class WebWXSyncInfo extends WechatInitInfo
{
    SyncKey: SyncKey;
}

export class WebWXStatusNotifyInfo extends WechatInitInfo {
    userName: string;
}


