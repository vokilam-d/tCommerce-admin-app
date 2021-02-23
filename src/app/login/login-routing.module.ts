import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { NativeScriptRouterModule } from '@nativescript/angular';

const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class LoginRoutingModule {}
