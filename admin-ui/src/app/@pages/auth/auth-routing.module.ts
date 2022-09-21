import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '../../@core/utils/router.utils';

import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';

const routes: Routes = [
  {
    path: ROUTER_UTILS.config.auth.signIn,
    component: SignInPage,
  },
  {
    path: ROUTER_UTILS.config.auth.signUp,
    component: SignUpPage,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
