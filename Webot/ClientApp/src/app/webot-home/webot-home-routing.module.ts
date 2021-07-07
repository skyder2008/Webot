import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebotHomeComponent } from './webot-home.component';

const routes: Routes = [
  {
    path: "",
    component: WebotHomeComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class WebotHomeRoutingModule { }
