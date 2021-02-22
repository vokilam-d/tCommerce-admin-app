import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrderComponent } from './order/order.component';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: ':id', component: OrderComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class OrdersRoutingModule {}
