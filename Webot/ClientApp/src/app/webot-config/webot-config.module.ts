import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigHomeComponent } from './components/config-home/config-home.component';
import { RouterModule } from '@angular/router';
import { WEBOT_CONFIG_ROUTERS } from './webot-config.routers';

@NgModule({
  declarations: [ConfigHomeComponent],
  imports: [
    CommonModule,
    // RouterModule.forChild(WEBOT_CONFIG_ROUTERS),
  ],
  exports: [RouterModule]
})
export class WebotConfigModule { }
