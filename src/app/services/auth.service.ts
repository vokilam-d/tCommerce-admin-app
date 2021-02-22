import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_HOST } from '../shared/constants';
import { ResponseDto } from '../shared/dtos/response.dto';
import { UserDto } from '../shared/dtos/user.dto';
import { LoginDto } from '../shared/dtos/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserDto;

  constructor(
    private http: HttpClient
  ) { }

  getCurrentUser(): Observable<ResponseDto<UserDto>> {
    return this.http.get<ResponseDto<UserDto>>(`${API_HOST}/api/v1/admin/user`);
  }

  login(login: string, password: string): Observable<ResponseDto<UserDto>> {
    const dto: LoginDto = {
      login,
      password
    };

    return this.http.post<ResponseDto<UserDto>>(`${API_HOST}/api/v1/admin/user/login`, dto);
  }

  logout() {
    return this.http.post(`${API_HOST}/api/v1/admin/user/logout`, {});
  }
}
