import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';
import { finalize } from 'rxjs/internal/operators';
import { DEFAULT_ERROR_TEXT } from '../shared/constants';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = null;
  login: string = '';
  password: string = '';
  isLoading: boolean = false;

  private lastSuccessfulLoginKey = 'last-login';

  constructor(
    private authService: AuthService,
    private router: RouterExtensions
  ) { }

  ngOnInit(): void {
    const lastSuccessfulLogin = ApplicationSettings.getString(this.lastSuccessfulLoginKey, null);
    if (lastSuccessfulLogin) {
      this.login = lastSuccessfulLogin;
    }
  }

  signIn() {
    this.error = null;
    this.isLoading = true;
    this.authService.login(this.login, this.password)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        response => {
          this.authService.user = response.data;
          ApplicationSettings.setString(this.lastSuccessfulLoginKey, this.login);

          this.router.navigate(['/', 'orders'], { clearHistory: true });
        },
        error => {
          this.error = (error.error && error.error.message) || JSON.stringify(error.error || error) || DEFAULT_ERROR_TEXT;
        }
      );
  }
}
