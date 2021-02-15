import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { OrderPhotoComponent } from '~/order-photo/order-photo.component';

const routes: Routes = [
  { path: "", component: OrderPhotoComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class OrderPhotoRoutingModule {}
