import { NgModule } from '@angular/core';
import { OrderPhotoRoutingModule } from '~/order-photo/order-photo-routing.module';
import { OrderPhotoComponent } from '~/order-photo/order-photo.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    OrderPhotoRoutingModule
  ],
  declarations: [
    OrderPhotoComponent
  ]
})
export class OrderPhotoModule {}
