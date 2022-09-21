import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from 'src/app/@core/utils/router.utils';
import { BuildingPricingComponent } from './building-pricing/building-pricing.component';
import { ConditionComponent } from './condition/condition.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandPricingComponent } from './land-pricing/land-pricing.component';
import { PurposeComponent } from './purpose/purpose.component';

const routes: Routes = [
  {
    path: ROUTER_UTILS.config.admin.root,
    component: DashboardComponent,
  },
  {
    path: ROUTER_UTILS.config.admin.purpose,
    component: PurposeComponent,
  },
  {
    path: ROUTER_UTILS.config.admin.building,
    component: BuildingPricingComponent,
  },
  {
    path: ROUTER_UTILS.config.admin.condition,
    component: ConditionComponent,
  },
  {
    path: ROUTER_UTILS.config.admin.land,
    component: LandPricingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
