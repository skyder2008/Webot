import { Component, OnInit } from '@angular/core';
import { WechatAuthInfo, WechatUser, SyncKey, WechatMsg } from '../../models/we-proxy.model';
import { ActivatedRoute } from '@angular/router';
import { WeProxyService } from '../../services/we-proxy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-webot',
  templateUrl: './webot.component.html',
  styleUrls: ['./webot.component.css']
})
export class WebotComponent implements OnInit {

  public showMessage: string;
  private syncUrl: string;

  // private deviceId: string;
  private wechatAuthInfo: WechatAuthInfo;
  private user: WechatUser;
  private syncKey: SyncKey;

  constructor(private activeInfo: ActivatedRoute,
              private weproxyService: WeProxyService) {
      this.syncKey = new SyncKey();
  }

  ngOnInit() {
      this.activeInfo.queryParams.subscribe(params => {
          const redirectUrl = params.redicrectUrl;
          this.syncUrl = this.getSyncUrl(redirectUrl);

          this.getAuthInfo(redirectUrl).subscribe(authInfo => {
              this.wechatAuthInfo = authInfo;
              this.initWechat().subscribe(initInfo => {
                  this.user = initInfo.User;
                  this.syncKey.Count = initInfo.SyncKey.Count;
                  this.syncKey.List = initInfo.SyncKey.List;
                  this.webwxSync().subscribe(syncResp => {
                      this.syncKey.Count = syncResp.SyncKey.Count;
                      this.syncKey.List = syncResp.SyncKey.List;
                      this.syncCheck();
                  });
                  this.showMessage = `微信用户[${this.user.NickName}]已登陆`;
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
          deviceId: this.getDeviceId(),
          dataTicket: null,
      });
  }

  syncCheck() {
      this.weproxyService.syncCheck({
          skey: this.wechatAuthInfo.skey,
          wxsid: this.wechatAuthInfo.wxsid,
          wxuin: this.wechatAuthInfo.wxuin,
          syncKey: this.syncKey.toString1(),
          deviceId: this.getDeviceId(),
          syncUrl: this.syncUrl,
          dataTicket: this.wechatAuthInfo.dataTicket,
          passTicket: this.wechatAuthInfo.passTicket,
      }).subscribe(resp => {
          eval(resp);
          const syncCheck = window['synccheck'];
          if (syncCheck['retcode'] === '0') {
              const selector = syncCheck['selector'];
              if (selector === '0') {
                  this.syncCheck();
              } else if (selector === '2') {
                  this.webwxSync().subscribe(syncResp => {
                      this.syncKey.Count = syncResp.SyncKey.Count;
                      this.syncKey.List = syncResp.SyncKey.List;
                      if (syncResp.AddMsgList.length > 0) {
                          syncResp.AddMsgList.forEach(msg => {
                              if (msg.MsgType === 1) {
                                  this.webwxSendMsg({
                                      ToUserName: msg.FromUserName,
                                      FromUserName: this.user.UserName,
                                      MsgId: (new Date()).getTime().toString(),
                                      Type: 1,
                                      Content: `你发送的信息是：${msg.Content}`,
                                  }).subscribe();
                              }
                          });
                      }
                      this.syncCheck();
                  });
              }
          }
          // this.syncResult = resp;

      });
  }

  webwxSync() {
      return this.weproxyService.webwxSync({
          wxuin: this.wechatAuthInfo.wxuin,
          wxsid: this.wechatAuthInfo.wxsid,
          skey: this.wechatAuthInfo.skey,
          deviceId: this.getDeviceId(),
          SyncKey: this.syncKey,
          passTicket: this.wechatAuthInfo.passTicket,
          dataTicket: this.wechatAuthInfo.dataTicket,
      });
  }

  webwxStatusNotify() {
      return this.weproxyService.webwxStatusNotify({
          wxuin: this.wechatAuthInfo.wxuin,
          wxsid: this.wechatAuthInfo.wxsid,
          skey: this.wechatAuthInfo.skey,
          deviceId: this.getDeviceId(),
          passTicket: this.wechatAuthInfo.passTicket,
          userName: this.user.UserName,
          dataTicket: this.wechatAuthInfo.dataTicket,
      });
  }

  webwxSendMsg(msg: WechatMsg) {
      return this.weproxyService.webwxSendMsg({
          wxuin: this.wechatAuthInfo.wxuin,
          wxsid: this.wechatAuthInfo.wxsid,
          skey: this.wechatAuthInfo.skey,
          deviceId: this.getDeviceId(),
          passTicket: this.wechatAuthInfo.passTicket,
          dataTicket: this.wechatAuthInfo.dataTicket,
          msg: msg,
      })
  }

  getSyncUrl(redirectUrl: string) {
      let syncUrl = null;
      if (redirectUrl.indexOf('wx2.qq.com') > -1) {
          syncUrl = 'https://webpush2.weixin.qq.com';
      } else if (redirectUrl.indexOf('wx.qq.com') > -1) {
          syncUrl = 'https://webpush.wx.qq.com';
      } else if (redirectUrl.indexOf('web1.wechat.com') > -1) {
          syncUrl = 'https://webpush1.wechat.com';
      } else if (redirectUrl.indexOf('web2.wechat.com') > -1) {
          syncUrl = 'https://webpush2.wechat.com';
      } else if (redirectUrl.indexOf('web.wechat.com') > -1) {
          syncUrl = 'https://webpush.wechat.com';
      } else if (redirectUrl.indexOf('web1.wechatapp.com') > -1) {
          syncUrl = 'https://webpush1.wechatapp.com';
      } else if (redirectUrl.indexOf('web.wechatapp.com') > -1) {
          syncUrl = 'https://webpush.wechatapp.com';
      }
      return syncUrl;
  }

  getDeviceId(): string {
      return 'e' + ('' + Math.random().toFixed(15)).substring(2, 17);
  }

}
