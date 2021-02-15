import { NgModule } from '@angular/core';
import { OrdersRoutingModule } from '~/orders/orders-routing.module';
import { OrdersComponent } from '~/orders/orders.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { UploadPhotoComponent } from '~/orders/upload/upload-photo.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    OrdersRoutingModule
  ],
  declarations: [
    OrdersComponent,
    UploadPhotoComponent
  ]
})
export class OrdersModule {}
