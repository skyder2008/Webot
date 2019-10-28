import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WebotConfigRoutingModule } from './webot-config-routing.module';
import { WebotConfigComponent } from './webot-config.component';

@NgModule({
    declarations: [WebotConfigComponent],
  imports: [
    CommonModule,
    WebotConfigRoutingModule
  ]
})
export class WebotConfigModule { }
