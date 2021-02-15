import { Component, OnInit } from '@angular/core';
import { AuthService } from '~/services/auth.service';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: RouterExtensions
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      response => {
        if (response.data) {
          this.router.navigate(['/', 'login'], { clearHistory: true });
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
