import { Component, OnInit } from '@angular/core';
import { AuthService } from '~/services/auth.service';
import { getString, setString } from 'tns-core-modules/application-settings';
import { DEFAULT_ERROR_TEXT } from '~/constants';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'Login',
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = null;
  login: string = '';
  password: string = '';

  private lastSuccessfulLoginKey = 'last-login';

  constructor(
    private authService: AuthService,
    private router: RouterExtensions
  ) { }

  ngOnInit(): void {
    const lastSuccessfulLogin = getString(this.lastSuccessfulLoginKey, null);
    if (lastSuccessfulLogin) {
      this.login = lastSuccessfulLogin;
    }
  }

  signIn() {
    this.error = null;
    this.authService.login(this.login, this.password).subscribe(
      response => {
        this.authService.user = response.data;
        setString(this.lastSuccessfulLoginKey, this.login);

        this.router.navigate(['/', 'order-photo'], { clearHistory: true });
      },
      error => {
        this.error = (error.error && error.error.message) || JSON.stringify(error.error || error) || DEFAULT_ERROR_TEXT;
      }
    );
  }
}
