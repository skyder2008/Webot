import { Routes } from '@angular/router';
import { ConfigHomeComponent } from './components/config-home/config-home.component';

export const WEBOT_CONFIG_ROUTERS: Routes = [
  {
    path: '/',
    redirectTo: '/config-home',
    pathMatch: 'full',
  },
  {
    path: 'config-home',
    component: ConfigHomeComponent,
  },
];
