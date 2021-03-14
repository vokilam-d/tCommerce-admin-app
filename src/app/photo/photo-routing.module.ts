import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo.component';
import { NativeScriptRouterModule } from '@nativescript/angular';

const routes: Routes = [
  { path: '', component: PhotoComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class PhotoRoutingModule {}
