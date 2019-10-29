import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/wechat-proxy',
  },
  {
    path: 'wechat-proxy',
    loadChildren: () => import('./wechat-proxy/wechat-proxy.module').then(m => m.WechatProxyModule),
  },
  {
    path: 'webot-config',
    loadChildren: () => import('./webot-config/webot-config.module').then(m => m.WebotConfigModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
