import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from 'src/app/@core/utils/router.utils';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { PayProcessComponent } from './pay-process/pay-process.component';
import { PropertyCalComponent } from './property-cal/property-cal.component';

const routes: Routes = [
  {
    path: ROUTER_UTILS.config.base.home,
    component: HomeComponent,
  },
  {
    path: ROUTER_UTILS.config.customer.homecal,
    component: PropertyCalComponent,
  },
  {
    path: ROUTER_UTILS.config.customer.paystatus,
    component: PayProcessComponent,
  },
  {
    path: ROUTER_UTILS.config.auth.signIn,
    component: LoginComponent,
  },
  {
    path: ROUTER_UTILS.config.auth.signUp,
    component: LoginComponent,
  },
  {
    path: ROUTER_UTILS.config.customer.myquote,
    component: MyQuotesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
