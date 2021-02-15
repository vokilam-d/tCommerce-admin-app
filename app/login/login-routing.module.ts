import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LoginComponent } from '~/login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class LoginRoutingModule {}
