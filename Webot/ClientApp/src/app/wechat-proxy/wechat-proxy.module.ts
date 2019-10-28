import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WebotComponent } from './components/webot/webot.component';
import { WeloginComponent } from './components/welogin/welogin.component';
import { WechatProxyRoutingModule } from './wechat-proxy-routing.module';
import { WechatProxyComponent } from './wechat-proxy.component';

@NgModule({
    declarations: [
        WebotComponent,
        WeloginComponent,
        WechatProxyComponent,
    ],
    imports: [
        CommonModule,
        WechatProxyRoutingModule,
    ],
})
export class WechatProxyModule { }
