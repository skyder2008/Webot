import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'wechat-proxy',
        pathMatch: 'full',
    },
    {
        path: 'wechat-proxy',
        loadChildren: () => import('./wechat-proxy/wechat-proxy.module').then(m => m.WechatProxyModule),
    },
    {
        path: 'webot-config',
        loadChildren: () => import('./webot-config/webot-config.module').then(m => m.WebotConfigModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule { }

