import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_HOST } from '../shared/constants';
import { ResponseDto } from '../shared/dtos/response.dto';
import { OrderDto } from '../shared/dtos/order.dto';
import { UploadService } from './upload/upload.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private uploadService: UploadService,
    private authService: AuthService
  ) { }

  fetchOrders(): Observable<ResponseDto<OrderDto[]>> {
    return this.http.get<ResponseDto<OrderDto[]>>(`${API_HOST}/api/v1/admin/orders`, { params: { limit: '60' } });
  }

  fetchOrder(orderId: number): Observable<ResponseDto<OrderDto>> {
    return this.http.get<ResponseDto<OrderDto>>(`${API_HOST}/api/v1/admin/orders/${orderId}`);
  }

  async uploadOrderPhoto(orderId: number, imageSource: any): Promise<ResponseDto<OrderDto>> {
    const url = `${API_HOST}/api/v1/admin/order-media/${orderId}?login=${this.authService.user.login}`;
    return this.uploadService.upload(url, imageSource, orderId);
  }
}
