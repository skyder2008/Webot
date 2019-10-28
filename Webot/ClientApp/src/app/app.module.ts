import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ShareModule } from './share/share.module';
import { WechatProxyModule } from './wechat-proxy/wechat-proxy.module';
import { WebotConfigModule } from './webot-config/webot-config.module';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        ShareModule,
        AppRoutingModule,
        WechatProxyModule,
        WebotConfigModule, 
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
