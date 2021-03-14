import { Component, NgZone, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { finalize } from 'rxjs/internal/operators';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_ERROR_TEXT, DEFAULT_LANG, UPLOADED_HOST } from '../../shared/constants';
import { OrderDto } from '../../shared/dtos/order.dto';
import { OrderService } from '../../services/order.service';
import * as imagepicker from '@nativescript/imagepicker';
import * as camera from '@nativescript/camera';
import { ToastService } from '../../services/toast.service';
import { MediaDto } from '../../shared/dtos/media.dto';
import { Dialogs, ImageAsset } from '@nativescript/core';


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
    const cameraAction = 'Камера';
    const galleryAction = 'Галерея';

    Dialogs.action({
      message: "Выберите способ загрузки",
      cancelButtonText: "Отменить",
      actions: [cameraAction, galleryAction]
    }).then(result => {
      switch (result) {
        case cameraAction:
          this.uploadFromCamera();
          break;
        case galleryAction:
          this.uploadFromGallery();
          break;
      }
    });
  }

  getMediaUrl(media: MediaDto, original: boolean): string {
    return UPLOADED_HOST + (original ? media.variantsUrls.original : media.variantsUrls.small);
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

  private async uploadFromCamera() {
    try {
      await camera.requestPermissions();
    } catch (e) {
      this.toastService.showError(`Необходимо дать доступ к камере для загрузки фото`);
      return;
    }

    let imageAsset: ImageAsset;
    try {
      imageAsset = await camera.takePicture();
    } catch (e) {
      this.toastService.showError(`Не удалось сделать фото`);
      return;
    }

    this.uploadImageAsset(imageAsset);
  }

  private async uploadFromGallery() {
    const context = imagepicker.create({ mode: 'single' });
    try {
      await context.authorize();
    } catch (e) {
      this.toastService.showError(`Необходимо дать доступ к галерее для загрузки фото`);
      return;
    }

    const selection = await context.present();
    if (!selection[0]) { return; }

    this.uploadImageAsset(selection[0]);
  }

  private uploadImageAsset(imageAsset: ImageAsset) {
    imageAsset.getImageAsync(async (imageSource, err) => {
      if (err) {
        this.toastService.showError(err);
        return;
      }

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
  }

  openMediaModal(media: MediaDto) {
    const url = this.getMediaUrl(media, true);
    this.router.navigate(['/', 'photo'], { queryParams: { photoUrl: url }, clearHistory: false });
  }
}
