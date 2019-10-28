import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebotConfigComponent } from './webot-config.component';

const routes: Routes = [
    {
        path: '',
        component: WebotConfigComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebotConfigRoutingModule { }
