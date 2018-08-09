import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(baseUrl + 'users');
  }

  getUserById(id) {
    return this.http.get<User>(baseUrl + 'users/' + id);
  }

  updateUser(id, user: User) {
    return this.http.put<User>(baseUrl + 'users/' + id, user);
  }
}
