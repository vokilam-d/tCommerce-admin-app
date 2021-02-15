import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AppComponent } from '~/app.component';

const routes: Routes = [
    { path: "", component: AppComponent },
    { path: "home", loadChildren: () => import("./home/home.module").then(m => m.HomeModule) },
    { path: "login", loadChildren: () => import("./login/login.module").then(m => m.LoginModule) },
    { path: "order-photo", loadChildren: () => import("./order-photo/order-photo.module").then(m => m.OrderPhotoModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
