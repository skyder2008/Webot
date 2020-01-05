import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WechatProxyRoutingModule } from './wechat-proxy-routing.module';
import { WechatProxyComponent } from './wechat-proxy.component';
import { WeloginComponent } from './components/welogin/welogin.component';
import { WebotComponent } from './components/webot/webot.component';


@NgModule({
  declarations: [WechatProxyComponent, WeloginComponent, WebotComponent],
  imports: [
    CommonModule,
    WechatProxyRoutingModule
  ],
})
export class WechatProxyModule { }
