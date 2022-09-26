import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from 'src/app/@core/utils/router.utils';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: ROUTER_UTILS.config.customer.root,
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
