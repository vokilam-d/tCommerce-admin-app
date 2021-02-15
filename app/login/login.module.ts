import { NgModule } from '@angular/core';
import { LoginComponent } from '~/login/login.component';
import { LoginRoutingModule } from '~/login/login-routing.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    NativeScriptFormsModule,
    LoginRoutingModule,
    CommonModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {}
