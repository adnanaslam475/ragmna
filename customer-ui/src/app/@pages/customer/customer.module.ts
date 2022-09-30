import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { HomeComponent } from './home/home.component';
import { PropertyCalComponent } from './property-cal/property-cal.component';
import { CoreModule } from 'src/app/@core/core.module';
import { PayProcessComponent } from './pay-process/pay-process.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';

@NgModule({
  declarations: [
    HomeComponent,
    PropertyCalComponent,
    PayProcessComponent,
    LoginComponent,
    SignupComponent,
    LoaderComponent,
    MyQuotesComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    CustomerRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class CustomerModule { }
