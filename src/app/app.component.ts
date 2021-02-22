import { Component } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from './services/auth.service';

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    constructor(
        private authService: AuthService,
        private router: RouterExtensions
    ) { }

    ngOnInit() {
        this.authService.getCurrentUser().subscribe(
            response => {
                if (response.data) {
                    this.router.navigate(['/', 'orders'], { clearHistory: true });
                } else {
                    this.router.navigate(['/', 'login'], { clearHistory: true });
                }
            },
            _ => {
                this.router.navigate(['/', 'login'], { clearHistory: true });
            }
        );
    }
}
