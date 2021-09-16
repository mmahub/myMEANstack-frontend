import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from "ngx-toastr";



@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],

  // need to export new component here Everytime, whenever you add a new Component in this Module
  exports: [
    SignupComponent,
    ReactiveFormsModule,
    LoginComponent
  ]
})
export class UserModule { }
