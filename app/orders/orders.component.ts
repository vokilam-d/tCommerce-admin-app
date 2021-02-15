import { Component, OnInit } from '@angular/core';
import { getNumber, setNumber } from 'tns-core-modules/application-settings';
import { AuthService } from '~/services/auth.service';
import { RouterExtensions } from '@nativescript/angular';
import { DEFAULT_ERROR_TEXT } from '~/constants';
import { finalize } from 'rxjs/internal/operators';

@Component({
  selector: 'OrderPhoto',
  moduleId: module.id,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  error: string = null;
  orderNumber: number;
  isLoading: boolean = false;
  private lastOrderNumberKey = 'last-order';

  constructor(
    private authService: AuthService,
    private router: RouterExtensions
  ) { }

  ngOnInit(): void {
    const lastOrderNumber = getNumber(this.lastOrderNumberKey, null);
    if (lastOrderNumber) {
      this.orderNumber = lastOrderNumber;
    }
  }

  submit(): void {
    const orderNumber = Number(this.orderNumber);
    setNumber(this.lastOrderNumberKey, orderNumber);

    this.router.navigate(['/', 'orders', orderNumber, 'upload']);
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
