import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderComponent } from './order/order.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { OrdersComponent } from './orders.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    OrdersRoutingModule
  ],
  declarations: [
    OrdersComponent,
    OrderComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class OrdersModule {}
