import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { WechatProxyModule } from './wechat-proxy/wechat-proxy.module';
import { WebotConfigModule } from './webot-config/webot-config.module';
import { StateService } from './state/state.service';
import { WebotHomeModule } from './webot-home/webot-home.module';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        IconsProviderModule,
        NgZorroAntdModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        WebotHomeModule
    ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }, StateService],
    bootstrap: [AppComponent]
})
export class AppModule { }
