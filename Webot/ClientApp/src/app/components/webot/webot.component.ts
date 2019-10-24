import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeProxyService } from '../../services/we-proxy.service';
import { Observable } from 'rxjs';
import { debug } from 'util';

@Component({
    selector: 'app-webot',
    templateUrl: './webot.component.html',
    styleUrls: ['./webot.component.css']
})
export class WebotComponent implements OnInit {
    syncResult: string;
    private skey: string;
    private wxsid: string;
    private wxuin: string;
    private passTicket: string;
    private deviceId: string;
    private syncKey: string;
    private syncUrl: string;

    constructor(private activeInfo: ActivatedRoute,
        private weproxyService: WeProxyService) {
    }

    ngOnInit() {
        this.deviceId = 'e' + Math.floor(Math.random() * 1000000000000000 + 1);
        this.activeInfo.queryParams.subscribe(params => {
            let redirectUrl = params.redicrectUrl;
            this.syncUrl = this.getSyncUrl(redirectUrl);

            this.getAuthInfo(redirectUrl).subscribe(resp => {
                this.skey = resp['skey'];
                this.wxsid = resp['wxsid'];
                this.wxuin = resp['wxuin'];
                this.passTicket = resp['passTicket'];
                this.initWechat().subscribe(resp => {
                    this.syncKey = '';
                    let syncKeyArray: Array<any> = resp['SyncKey']['List'] as Array<any>;
                    syncKeyArray.forEach(x => {
                        this.syncKey += `${x['Key']}_${x['Val']}|`;
                    });
                    this.syncKey = this.syncKey.substr(0, this.syncKey.length - 1);
                    this.syncCheck();
                });
            });
        });
    }

    getAuthInfo(redirectUrl: string): Observable<string> {
        return this.weproxyService.getAuthInfo(redirectUrl);
    }

    initWechat() {
        return this.weproxyService.initWechat({
            skey: this.skey,
            wxsid: this.wxsid,
            wxuin: this.wxuin,
            passTicket: this.passTicket,
            deviceId: this.deviceId,
        });
    }

    syncCheck() {
        this.weproxyService.syncCheck({
            skey: this.skey,
            wxsid: this.wxsid,
            wxuin: this.wxuin,
            syncKey: this.syncKey,
            deviceId: this.deviceId,
            syncUrl: this.syncUrl,
        }).subscribe(resp => {
            debugger
            this.syncResult = resp;
            this.syncCheck();
        });
    }

    getSyncUrl(redirectUrl: string) {
        let syncUrl = null;
        if (redirectUrl.indexOf("wx2.qq.com") > -1) {
            syncUrl = "https://webpush2.weixin.qq.com";
        }else if (redirectUrl.indexOf("wx.qq.com") > -1) {
            syncUrl = "https://webpush.weixin.qq.com";
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
