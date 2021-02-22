import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { finalize } from 'rxjs/internal/operators';
import { ActivatedRoute } from '@angular/router';
import { API_HOST, DEFAULT_ERROR_TEXT } from '../../shared/constants';
import { OrderDto } from '../../shared/dtos/order.dto';
import { OrderService } from '../../services/order.service';
import * as imagepicker from '@nativescript/imagepicker';
import { ImageSource } from '@nativescript/core';
import { UploadService } from '../../services/upload/upload.service';


@Component({
  selector: 'Order',
  moduleId: module.id,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  error: string = null;
  isLoading: boolean = false;
  orderId: number;
  order: OrderDto;

  constructor(
    private router: RouterExtensions,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    console.log('init')
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchOrder();
  }

  async upload(): Promise<void> {
      let context = imagepicker.create({ mode: 'single' });
      await context.authorize();
      const selection = await context.present();
      selection[0].getImageAsync(async imageSource => {
          const response = await this.uploadService.upload(`${API_HOST}/api/v1/admin/orders/10001/media`, imageSource);
      console.log('resp');
          console.log(response);
      console.log(Object.keys(response.data || response));

      })

    // camera.requestPermissions()
    //   .then(() => camera.takePicture())
    //   camera.takePicture()
    //   .then(photo => {
    //     console.log(photo);
    //     this.orderService.uploadOrderPhoto(this.orderId, photo).subscribe(console.log, console.log);
    //   });
  }

  private fetchOrder() {
    this.isLoading = true;
    this.error = null;
    this.orderService.fetchOrder(this.orderId)
      .pipe(finalize(() => {
        console.log('final');
        this.isLoading = false
      }))
      .subscribe(
        response => {
          console.log(response);
          this.order = response.data;
        },
        error => {
          console.log(error);
          this.error = (error.error && error.error.message) || JSON.stringify(error.error || error) || DEFAULT_ERROR_TEXT
        }
      );
  }
}
