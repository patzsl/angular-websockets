import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${environment.api}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${environment.api}/login`, data);
  }

  user() {
    return this.http.get(`${environment.api}/user`);
  }
}
