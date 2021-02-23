import { Component, OnInit } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { finalize } from 'rxjs/internal/operators';
import { AuthService } from '../services/auth.service';
import { DEFAULT_ERROR_TEXT } from '../shared/constants';

@Component({
  selector: 'Orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  error: string = null;
  orderId: number;
  isLoading: boolean = false;
  private lastOrderIdKey = 'last-order';

  constructor(
    private authService: AuthService,
    private router: RouterExtensions
  ) { }

  ngOnInit(): void {
    const lastOrderId = ApplicationSettings.getNumber(this.lastOrderIdKey, null);
    if (lastOrderId) {
      this.orderId = lastOrderId;
    }
  }

  submit(): void {
    const orderId = Number(this.orderId);
    ApplicationSettings.setNumber(this.lastOrderIdKey, orderId);

    this.router.navigate(['/', 'orders', orderId], { clearHistory: false });
  }

  logout(): void {
    this.error = null;
    this.isLoading = true;
    this.authService.logout()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        _ => {
          this.router.navigate(['/', 'login'], { clearHistory: true });
        },
        error => {
          this.error = (error.error && error.error.message) || JSON.stringify(error.error || error) || DEFAULT_ERROR_TEXT;
        }
      );
  }
}
