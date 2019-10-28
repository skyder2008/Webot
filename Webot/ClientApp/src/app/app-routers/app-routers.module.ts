import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'wechat-proxy',
        loadChildren: () => import('../wechat-proxy/wechat-proxy.module').then(m => m.WechatProxyModule),
      },
      {
        path: 'webot-config',
        loadChildren: () => import('../webot-config/webot-config.module').then(m => m.WebotConfigModule),
      }
    ],
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutersModule { }
