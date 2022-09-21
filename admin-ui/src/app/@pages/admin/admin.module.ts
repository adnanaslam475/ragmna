import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from 'src/app/@core/core.module';
import { PurposeComponent } from './purpose/purpose.component';
import { ConditionComponent } from './condition/condition.component';
import { LandPricingComponent } from './land-pricing/land-pricing.component';
import { BuildingPricingComponent } from './building-pricing/building-pricing.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    PurposeComponent,
    ConditionComponent,
    LandPricingComponent,
    BuildingPricingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    TranslateModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
