import { Injectable } from '@angular/core';
import { ToastDuration, Toasty } from '@triniwiz/nativescript-toasty';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showMessage(message: string) {
    this.showToast(message, ToastDuration.SHORT);
  }

  showError(message: string) {
    this.showToast(message, ToastDuration.LONG, '#93080f');
  }

  private showToast(text: string, duration: ToastDuration, backgroundColor?: string) {
    const toast = new Toasty({ text, duration, backgroundColor });
    toast.show();
  }
}
