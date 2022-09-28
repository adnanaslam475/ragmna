import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from 'src/app/@core/utils/router.utils';
import { HomeComponent } from './home/home.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
