import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WechatInitResponse, WechatAuthInfo, SyncCheckInfo, WechatInitInfo, WebWXSyncInfo, WebWXSyncResponse, WebWXStatusNotifyInfo, WebWXMsgSendDto } from '../models/we-proxy.model';

@Injectable({
    providedIn: 'root'
})
export class WeProxyService {

    constructor(private http: HttpClient) { }

    getUUid(): Observable<string> {
        const url = '/api/weproxy/uuid';
        return this.http.get<string>(url, { responseType: 'text' as 'json'});
    }

    checkLogin(uuid: string): Observable<string> {
        const url = '/api/weproxy/login-check';
        const params = new HttpParams().set("uuid", uuid);
        return this.http.get<string>(url, { params, responseType: 'text' as 'json' })
    }

    getAuthInfo(redirectUrl: string): Observable<WechatAuthInfo> {
        const url = '/api/weproxy/auth-info';
        const params = new HttpParams().set("redirectUrl", redirectUrl);
        return this.http.get<WechatAuthInfo>(url, { params })
    }

    initWechat(initInfo: WechatInitInfo): Observable<WechatInitResponse> {
        const url = '/api/weproxy/init-wechat';
        return this.http.post<WechatInitResponse>(url, initInfo);
    }

    syncCheck(syncCheck: SyncCheckInfo): Observable<string> {
        const url = '/api/weproxy/sync-check';
        return this.http.post<string>(url, syncCheck, { responseType: 'text' as 'json' });
    }

    webwxSync(webwxSyncInfo: WebWXSyncInfo): Observable<WebWXSyncResponse> {
        const url = '/api/weproxy/webwx-sync';
        return this.http.post<WebWXSyncResponse>(url, webwxSyncInfo)
    }

    webwxStatusNotify(statusNotifyInfo: WebWXStatusNotifyInfo) {
        const url = '/api/weproxy/status-notify';
        return this.http.post<string>(url, statusNotifyInfo);
    }

    webwxSendMsg(msgSend: WebWXMsgSendDto) {
        const url = '/api/weproxy/webwx-sendmsg';
        return this.http.post<string>(url, msgSend);
    }
}
