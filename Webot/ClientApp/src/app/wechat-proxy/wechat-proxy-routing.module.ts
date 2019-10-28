import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebotComponent } from './components/webot/webot.component';
import { WeloginComponent } from './components/welogin/welogin.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'welogin',
        pathMatch: 'full',
    },
    {
        path: 'welogin',
        component: WeloginComponent,
    },
    {
        path: 'webot',
        component: WebotComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class WechatProxyRoutingModule { }
