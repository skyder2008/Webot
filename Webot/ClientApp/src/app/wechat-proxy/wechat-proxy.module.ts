import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeloginComponent } from './components/welogin/welogin.component';
import { WebotComponent } from './components/webot/webot.component';
import { WECHAT_PROXY_ROUTES } from './wechat-proxy.routes';

@NgModule({
  declarations: [WeloginComponent, WebotComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(WECHAT_PROXY_ROUTES),
  ],
  exports: [RouterModule]
})
export class WechatProxyModule { }
