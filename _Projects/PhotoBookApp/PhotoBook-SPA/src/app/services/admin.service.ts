import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getUsersWithRoles() {
    return this.http.get(baseUrl + 'admin/userWithRoles');
  }

  updateUserRoles(user: User, roles: {}) {
    return this.http.post(baseUrl + 'admin/editRoles/' + user.userName, roles);
  }
}
