import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo.component';
import { PhotoRoutingModule } from './photo-routing.module';

@NgModule({
  imports: [
    PhotoRoutingModule,
    CommonModule
  ],
  declarations: [
    PhotoComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class PhotoModule {}
