import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl + 'auth/';
const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  decodedToken: any;
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(baseUrl + 'login', model).pipe(
      map(res => {
        const user = res;
        if (user) {
          localStorage.setItem('token', user['token']);
          this.decodedToken = jwt.decodeToken(user['token']);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !jwt.isTokenExpired(token);
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach(role => {
      if (userRoles.includes(role)) {
        isMatch = true;
        return;
      }
    });

    return isMatch;
  }
}
