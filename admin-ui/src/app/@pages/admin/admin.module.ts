import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
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
import { AreaRegionComponent } from './area-region/area-region.component';
import { AreaCityComponent } from './area-city/area-city.component';
import { AreaDistrictComponent } from './area-district/area-district.component';
import { AreaCountryComponent } from './area-country/area-country.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { MsgonscreenComponent } from './msgonscreen/msgonscreen.component';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { LoaderComponent } from './loader/loader.component';
import { ZPaginationComponent } from './z-pagination/z-pagination.component';
import { ConfigPgComponent } from './config-pg/config-pg.component';
import { ConfigSmtpComponent } from './config-smtp/config-smtp.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PurposeComponent,
    ConditionComponent,
    LandPricingComponent,
    BuildingPricingComponent,
    AreaRegionComponent,
    AreaCityComponent,
    AreaDistrictComponent,
    AreaCountryComponent,
    EmailTemplateComponent,
    MsgonscreenComponent,
    QuoteListComponent,
    LoaderComponent,
    ZPaginationComponent,
    ConfigPgComponent,
    ConfigSmtpComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    TranslateModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule, 
    AngularEditorModule
  ]
})
export class AdminModule { }
