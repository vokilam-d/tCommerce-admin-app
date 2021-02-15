import { NgModule } from '@angular/core';
import { OrderPhotoRoutingModule } from '~/order-photo/order-photo-routing.module';
import { OrderPhotoComponent } from '~/order-photo/order-photo.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    OrderPhotoRoutingModule
  ],
  declarations: [
    OrderPhotoComponent
  ]
})
export class OrderPhotoModule {}
