import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebotRegisterComponent } from './webot-register/webot-register.component';
import { WebotAccountRoutingModule } from './webot-account-routing.module';
import { WebotLoginComponent } from './webot-login/webot-login.component';
import { WebotAccountComponent } from './webot-account.component';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule, NzFormModule, NzGridModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [WebotAccountComponent, WebotLoginComponent, WebotRegisterComponent],
  imports: [
    CommonModule,
    WebotAccountRoutingModule,
    RouterModule,
    NzFormModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    NzGridModule,
  ]
})
export class WebotAccountModule { }
