import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { HomeComponent } from './home/home.component';
import { PropertyCalComponent } from './property-cal/property-cal.component';
import { CoreModule } from 'src/app/@core/core.module';


@NgModule({
  declarations: [
    HomeComponent,
    PropertyCalComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    CustomerRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
