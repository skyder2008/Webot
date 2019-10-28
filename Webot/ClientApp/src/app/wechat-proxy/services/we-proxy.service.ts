import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as models from '../models/we-proxy.model';

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
      const params = new HttpParams().set('uuid', uuid);
      return this.http.get<string>(url, { params, responseType: 'text' as 'json' });
  }

  getAuthInfo(redirectUrl: string): Observable<models.WechatAuthInfo> {
      const url = '/api/weproxy/auth-info';
      const params = new HttpParams().set('redirectUrl', redirectUrl);
      return this.http.get<models.WechatAuthInfo>(url, { params })
  }

  initWechat(initInfo: models.WechatInitInfo): Observable<models.WechatInitResponse> {
      const url = '/api/weproxy/init-wechat';
      return this.http.post<models.WechatInitResponse>(url, initInfo);
  }

  syncCheck(syncCheck: models.SyncCheckInfo): Observable<string> {
      const url = '/api/weproxy/sync-check';
      return this.http.post<string>(url, syncCheck, { responseType: 'text' as 'json' });
  }

  webwxSync(webwxSyncInfo: models.WebWXSyncInfo): Observable<models.WebWXSyncResponse> {
      const url = '/api/weproxy/webwx-sync';
      return this.http.post<models.WebWXSyncResponse>(url, webwxSyncInfo);
  }

  webwxStatusNotify(statusNotifyInfo: models.WebWXStatusNotifyInfo) {
      const url = '/api/weproxy/status-notify';
      return this.http.post<string>(url, statusNotifyInfo);
  }

  webwxSendMsg(msgSend: models.WebWXMsgSendDto) {
      const url = '/api/weproxy/webwx-sendmsg';
      return this.http.post<string>(url, msgSend);
  }
}
