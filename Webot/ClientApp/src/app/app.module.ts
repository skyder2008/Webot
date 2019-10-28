import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { WechatProxyModule } from './wechat-proxy/wechat-proxy.module';
import { ShareModule } from './share/share.module';
import { WebotConfigModule } from './webot-config/webot-config.module';
// import { AppRoutersModule } from './app-routers/app-routers.module';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        // WechatProxyModule,
        RouterModule.forRoot([
          // {
          //   path: '/',
          //   component: AppComponent,
          // },
          {
            path: 'wechat-proxy',
            loadChildren: () => import('./wechat-proxy/wechat-proxy.module').then(m => m.WechatProxyModule),
          }
        ]),
        ShareModule,
        WebotConfigModule,
        // AppRoutersModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
