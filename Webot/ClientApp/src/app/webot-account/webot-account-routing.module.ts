import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebotRegisterComponent } from './webot-register/webot-register.component';
import { WebotLoginComponent } from './webot-login/webot-login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: WebotLoginComponent,
  },
  {
    path: 'register',
    component: WebotRegisterComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class WebotAccountRoutingModule { }

