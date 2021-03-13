import { Injectable } from '@angular/core';
import { Application } from '@nativescript/core';
import { TNSHttpFormDataParam } from 'nativescript-http-formdata';
import { TNSHttpFormDataIos } from './http-form-data-ios';
import { TNSHttpFormDataAndroid } from './http-form-data-android';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private formDataIos = new TNSHttpFormDataIos();
  private formDataAndroid = new TNSHttpFormDataAndroid();

  constructor() {
  }

  upload(url: string, image: any, filename: string | number): Promise<any> {

    if (Application.ios) {
      return this.uploadIos(url, image, filename);
    } else {
      return this.uploadAndroid(url, image, filename);
    }
  }

  private uploadIos(url: string, image: any, filename: string | number) {
    let params = [];
    //@ts-ignore
    const imageData = UIImageJPEGRepresentation(image, 80);
    params.push(this.buildParam(imageData, filename));

    return this.formDataIos.post(url, params);
  }

  private uploadAndroid(url: string, image: any, filename: string | number) {
    let params = [];

    //can be one of these overloads https://square.github.io/okhttp/3.x/okhttp/okhttp3/RequestBody.html
    //@ts-ignore
    let bitmapImage: android.graphics.Bitmap = image;
    //@ts-ignore
    let stream = new java.io.ByteArrayOutputStream();
    //@ts-ignore
    bitmapImage.compress(android.graphics.Bitmap.CompressFormat.JPEG, 80, stream);
    let byteArray = stream.toByteArray();
    bitmapImage.recycle();

    params.push(this.buildParam(byteArray, filename));

    return this.formDataAndroid.post(url, params);
  }

  private buildParam(imageData: any, filename: string | number): TNSHttpFormDataParam {
    return {
      data: imageData,
      contentType: 'image/jpeg',
      parameterName: 'file',
      fileName: `${filename}.jpeg`
    };
  }

}
