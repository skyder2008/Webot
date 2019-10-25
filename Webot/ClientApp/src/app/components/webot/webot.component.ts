import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SyncKey, WechatAuthInfo, WebWXSyncResponse, WechatUser } from '../../models/we-proxy.model';
import { WeProxyService } from '../../services/we-proxy.service';

@Component({
    selector: 'app-webot',
    templateUrl: './webot.component.html',
    styleUrls: ['./webot.component.css']
})
export class WebotComponent implements OnInit {
    syncResult: string;
    private syncUrl: string;

    private deviceId: string;
    private wechatAuthInfo: WechatAuthInfo;
    private user: WechatUser;
    private syncKey: SyncKey;

    constructor(private activeInfo: ActivatedRoute,
        private weproxyService: WeProxyService) {
        this.deviceId = 'e' + Math.floor(Math.random() * 1000000000000000 + 1);
        this.syncKey = new SyncKey();
    }

    ngOnInit() {
        this.activeInfo.queryParams.subscribe(params => {
            let redirectUrl = params.redicrectUrl;
            this.syncUrl = this.getSyncUrl(redirectUrl);

            this.getAuthInfo(redirectUrl).subscribe(authInfo => {
                this.wechatAuthInfo = authInfo;
                this.initWechat().subscribe(initInfo => {
                    this.user = initInfo.User;
                    this.syncKey.Count = initInfo.SyncKey.Count;
                    this.syncKey.List = initInfo.SyncKey.List;
                    debugger
                    this.webwxStatusNotify().subscribe(notifyResp => {
                        this.webwxSync().subscribe(syncResp => {
                            this.syncKey.Count = syncResp.SyncKey.Count;
                            this.syncKey.List = syncResp.SyncKey.List;
                            this.syncCheck();
                        });
                    });
                });
            });
        });
    }

    getAuthInfo(redirectUrl: string): Observable<WechatAuthInfo> {
        return this.weproxyService.getAuthInfo(redirectUrl);
    }

    initWechat() {
        return this.weproxyService.initWechat({
            skey: this.wechatAuthInfo.skey,
            wxsid: this.wechatAuthInfo.wxsid,
            wxuin: this.wechatAuthInfo.wxuin,
            passTicket: this.wechatAuthInfo.passTicket,
            deviceId: this.deviceId,
        });
    }

    syncCheck() {
        this.weproxyService.syncCheck({
            skey: this.wechatAuthInfo.skey,
            wxsid: this.wechatAuthInfo.wxsid,
            wxuin: this.wechatAuthInfo.wxuin,
            syncKey: this.syncKey.toString1(),
            deviceId: this.deviceId,
            syncUrl: this.syncUrl,
        }).subscribe(resp => {
            this.syncResult = resp;
            this.syncCheck();
        });
    }

    webwxSync() {
        return this.weproxyService.webwxSync({
            wxuin: this.wechatAuthInfo.wxuin,
            wxsid: this.wechatAuthInfo.wxsid,
            skey: this.wechatAuthInfo.skey,
            deviceId: this.deviceId,
            SyncKey: this.syncKey,
            passTicket: this.wechatAuthInfo.passTicket,
        });
    }

    webwxStatusNotify() {
        return this.weproxyService.webwxStatusNotify({
            wxuin: this.wechatAuthInfo.wxuin,
            wxsid: this.wechatAuthInfo.wxsid,
            skey: this.wechatAuthInfo.skey,
            deviceId: this.deviceId,
            passTicket: this.wechatAuthInfo.passTicket,
            userName: this.user.UserName,
        });
    }

    getSyncUrl(redirectUrl: string) {
        let syncUrl = null;
        if (redirectUrl.indexOf("wx2.qq.com") > -1) {
            syncUrl = "https://webpush2.weixin.qq.com";
        }else if (redirectUrl.indexOf("wx.qq.com") > -1) {
            syncUrl = "https://webpush.wx.qq.com";
        }else if (redirectUrl.indexOf("web1.wechat.com") > -1) {
            syncUrl = "https://webpush1.wechat.com";
        }else if (redirectUrl.indexOf("web2.wechat.com") > -1) {
            syncUrl = "https://webpush2.wechat.com";
        }else if (redirectUrl.indexOf("web.wechat.com") > -1) {
            syncUrl = "https://webpush.wechat.com";
        }else if (redirectUrl.indexOf("web1.wechatapp.com") > -1) {
            syncUrl = "https://webpush1.wechatapp.com";
        }else if (redirectUrl.indexOf("web.wechatapp.com") > -1) {
            syncUrl = "https://webpush.wechatapp.com";
        }
        return syncUrl;
    }
}
