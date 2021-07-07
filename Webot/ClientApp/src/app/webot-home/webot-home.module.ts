import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebotHomeRoutingModule } from './webot-home-routing.module';
import { WebotHomeComponent } from './webot-home.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [WebotHomeComponent],
  imports: [
    WebotHomeRoutingModule,
    RouterModule,
    NgZorroAntdModule,
  ]
})
export class WebotHomeModule { }
