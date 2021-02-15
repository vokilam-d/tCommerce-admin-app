import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { OrdersComponent } from '~/orders/orders.component';
import { UploadPhotoComponent } from '~/orders/upload/upload-photo.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: ':id/upload', component: UploadPhotoComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class OrdersRoutingModule {}
