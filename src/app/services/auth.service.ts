import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_HOST } from '../shared/constants';
import { ResponseDto } from '../shared/dtos/response.dto';
import { UserDto } from '../shared/dtos/user.dto';
import { LoginDto } from '../shared/dtos/login.dto';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserDto;

  constructor(
    private http: HttpClient
  ) { }

  getCurrentUser(): Observable<ResponseDto<UserDto>> {
    return this.http.get<ResponseDto<UserDto>>(`${API_HOST}/api/v1/admin/user`)
      .pipe(tap(response => this.user = response.data));
  }

  login(login: string, password: string): Observable<ResponseDto<UserDto>> {
    const dto: LoginDto = {
      login,
      password
    };

    return this.http.post<ResponseDto<UserDto>>(`${API_HOST}/api/v1/admin/user/login`, dto)
      .pipe(tap(response => this.user = response.data));
  }

  logout() {
    return this.http.post(`${API_HOST}/api/v1/admin/user/logout`, {})
      .pipe(tap(_ => this.user = null));
  }
}
