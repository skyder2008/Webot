import { Routes } from '@angular/router';
import { WeloginComponent } from './components/welogin/welogin.component';
import { WebotComponent } from './components/webot/webot.component';

export const WECHAT_PROXY_ROUTES: Routes = [
  {
    path: 'wechat-proxy',
    redirectTo: '/welogin',
    pathMatch: 'full',
  },
  {
    path: 'welogin',
    component: WeloginComponent,
  },
  {
    path: 'webot',
    component: WebotComponent,
  },
];
