import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeloginComponent } from './components/welogin/welogin.component';
import { WebotComponent } from './components/webot/webot.component';
import { WechatProxyComponent } from './wechat-proxy.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: WechatProxyComponent,
  // },
  // {
  //   path: 'welogin',
  //   component: WeloginComponent,
  // },
  // {
  //   path: 'webot',
  //   component: WebotComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WechatProxyRoutingModule { }
