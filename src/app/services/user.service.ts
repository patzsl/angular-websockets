import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  all(searchTerm = '') {
    return this.http.get(`${environment.api}/users?name=${searchTerm}`);
  }
}
