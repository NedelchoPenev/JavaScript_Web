import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/LoginModel';
import { RegisterModel } from '../models/RegisterModel';

const appKey = "kid_HJm2GQqGQ" // APP KEY HERE;
const appSecret = "29e549099c1b4d67a994149af14e8e24" // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentAuthtoken: any;

  constructor(private http: HttpClient) { }
  
  get authtoken() {
    return this.currentAuthtoken;
  }
  
  set authtoken(value : string) {
    this.currentAuthtoken = value;
  }

  checkIfLoggedIn(){
    return this.currentAuthtoken === localStorage.getItem('authtoken')
  }

  login(loginModel: LoginModel) {
    return this.http.post(loginUrl, JSON.stringify(loginModel), {
      headers: this.createAuthHeaders('Basic')
    })
  }

  registration(registerModel: RegisterModel) {
    return this.http.post(registerUrl, JSON.stringify(registerModel), {
      headers: this.createAuthHeaders('Basic')
    })
  }

  logout() {
    return this.http.post(logoutUrl,
      {},
      {
        headers: this.createAuthHeaders('Kinvey')
      })
  }

  private createAuthHeaders(type: string) {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      })
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
  }
}
