import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SignInPage, SignUpPage],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
