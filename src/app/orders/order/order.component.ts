import { Component, NgZone, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { finalize } from 'rxjs/internal/operators';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_ERROR_TEXT, DEFAULT_LANG, UPLOADED_HOST } from '../../shared/constants';
import { OrderDto } from '../../shared/dtos/order.dto';
import { OrderService } from '../../services/order.service';
import * as imagepicker from '@nativescript/imagepicker';
import { ToastService } from '../../services/toast.service';
import { MediaDto } from '../../shared/dtos/media.dto';


@Component({
  selector: 'Order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  isLoading: boolean = false;
  isUploading: boolean = false;
  orderId: number;
  order: OrderDto;
  lang = DEFAULT_LANG;

  constructor(
    private router: RouterExtensions,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toastService: ToastService,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchOrder();
  }

  async upload(): Promise<void> {
    const context = imagepicker.create({ mode: 'single' });
    await context.authorize();
    const selection = await context.present();
    selection[0].getImageAsync(async imageSource => {
      this.zone.run(() => this.isUploading = true);

      try {
        const response = await this.orderService.uploadOrderPhoto(this.orderId, imageSource);
        this.zone.run(() => this.order.medias = response.data.medias);
        this.toastService.showMessage('Фото успешно загружено');
      } catch (error) {
        const errMessage = error.message || error.error?.message || error.error || error || DEFAULT_ERROR_TEXT;
        this.toastService.showError(errMessage);
      }

      this.zone.run(() => this.isUploading = false);
    });

    // camera.requestPermissions()
    //   .then(() => camera.takePicture())
    //   camera.takePicture()
    //   .then(photo => {
    //     console.log(photo);
    //     this.orderService.uploadOrderPhoto(this.orderId, photo).subscribe(console.log, console.log);
    //   });
  }

  getMediaUrl(media: MediaDto): string {
    return UPLOADED_HOST + media.variantsUrls.original;
  }

  getItemUrl(url: string): string {
    return UPLOADED_HOST + url;
  }

  private fetchOrder() {
    this.isLoading = true;
    this.orderService.fetchOrder(this.orderId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        response => {
          this.order = response.data;
        },
        error => {
          const errMessage = error.message || error.error?.message || error.error || error || DEFAULT_ERROR_TEXT;
          this.toastService.showError(errMessage);
        }
      );
  }
}
