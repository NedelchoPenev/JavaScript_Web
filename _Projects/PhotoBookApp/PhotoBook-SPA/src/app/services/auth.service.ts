import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:5000/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(baseUrl + 'login', model).pipe(
      map(res => {
        const user = res;
        if (user) {
          localStorage.setItem('token', user['token']);
        }
      }
    ));
  }

  register(model: any) {
    return this.http.post(baseUrl + 'register', model);
  }
}
