import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/webot-home',
  },
  {
    path: 'webot-home',
    loadChildren: () => import('./webot-home/webot-home.module').then(m => m.WebotHomeModule),
  },
  {
    path: 'webot-account',
    loadChildren: () => import('./webot-account/webot-account.module').then(m => m.WebotAccountModule),
  },
  // {
  //   path: 'webot-config',
  //   loadChildren: () => import('./webot-config/webot-config.module').then(m => m.WebotConfigModule),
  // },
  // {
  //   path: 'webot-account',
  //   loadChildren: () => import('./webot-account/webot-account.module').then(m => m.WebotAccountModule),
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
