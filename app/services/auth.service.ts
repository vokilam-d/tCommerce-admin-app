import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  getUser() {
    return this.http.get(`https://klondike.com.ua/api/v1/admin/user`);
  }

  login() {
    return this.http.post(`https://klondike.com.ua/api/v1/admin/user/login`, { login: 'd', password: 'Pasword5492' });
  }
}
