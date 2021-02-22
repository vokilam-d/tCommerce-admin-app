import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { NativeScriptFormsModule } from '@nativescript/angular';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    NativeScriptFormsModule,
    LoginRoutingModule,
    CommonModule
  ],
  declarations: [
    LoginComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class LoginModule {}
