import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_HOST } from '../shared/constants';
import { ResponseDto } from '../shared/dtos/response.dto';
import { OrderDto } from '../shared/dtos/order.dto';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  fetchOrder(orderId: number): Observable<ResponseDto<OrderDto>> {
    return this.http.get<ResponseDto<OrderDto>>(`${API_HOST}/api/v1/admin/orders/${orderId}`);
  }

  // uploadOrderPhoto(orderId: number, file: any): Observable<ResponseDto<OrderDto>> {
  async uploadOrderPhoto(orderId: number, file: any) {
    file.getImageAsync(async (image, error) => {
      const payload = new FormData();
      console.log({ image, imageName: image.name })
      payload.append('file', image, image.name);

      fetch(`${API_HOST}/api/v1/admin/orders/${orderId}/media`, {
        method: 'POST',
        body: payload
      }).then((r) => r.json())

        .then((response) => {
          console.log({ response });
        }).catch((e) => {
        console.log({ e });
      });
    });
  }
}
