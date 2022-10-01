import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from 'src/app/@core/utils/router.utils';
import { AreaCityComponent } from './area-city/area-city.component';
import { AreaCountryComponent } from './area-country/area-country.component';
import { AreaDistrictComponent } from './area-district/area-district.component';
import { AreaRegionComponent } from './area-region/area-region.component';
import { BuildingPricingComponent } from './building-pricing/building-pricing.component';
import { ConditionComponent } from './condition/condition.component';
import { ConfigPgComponent } from './config-pg/config-pg.component';
import { ConfigSmtpComponent } from './config-smtp/config-smtp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { LandPricingComponent } from './land-pricing/land-pricing.component';
import { MsgonscreenComponent } from './msgonscreen/msgonscreen.component';
import { PurposeComponent } from './purpose/purpose.component';
import { QuoteListComponent } from './quote-list/quote-list.component';

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
  {
    path: ROUTER_UTILS.config.admin.region,
    component: AreaRegionComponent,
  },
  {
    path: ROUTER_UTILS.config.admin.city,
    component: AreaCityComponent,
  },
  {
    path: ROUTER_UTILS.config.admin.district,
    component: AreaDistrictComponent,
  },
  {
    path: ROUTER_UTILS.config.admin.country,
    component: AreaCountryComponent,
  },
  {
    path: ROUTER_UTILS.config.admin.emaitemplate,
    component: EmailTemplateComponent,
  },
  {
    path: ROUTER_UTILS.config.admin.msgonscreen,
    component: MsgonscreenComponent,
  },
  {
    path: ROUTER_UTILS.config.admin.quotelist,
    component: QuoteListComponent,
  },
  {
    path: ROUTER_UTILS.config.admin.pgconfig,
    component: ConfigPgComponent,
  },
  {
    path: ROUTER_UTILS.config.admin.smtpconfig,
    component: ConfigSmtpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
