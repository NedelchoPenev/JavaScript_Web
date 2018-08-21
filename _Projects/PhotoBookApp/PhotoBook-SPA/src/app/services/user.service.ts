import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { PaginationResult } from '../models/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../models/message';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page?, itemsPerPage?, likesParam?) {
    const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (likesParam === 'Likees') {
      params = params.append('likees', 'true');
    }

    return this.http.get<User[]>(baseUrl + 'users', {observe: 'response', params})
      .pipe(
        map(response => {
          paginationResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginationResult;
        })
    );
  }

  getUserById(id) {
    return this.http.get<User>(baseUrl + 'users/' + id);
  }

  updateUser(id, user: User) {
    return this.http.put<User>(baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId, photoId) {
    return this.http.post(
      baseUrl + 'users/' + userId + '/photos/' + photoId + '/setMain',
      {}
    );
  }

  deletePhoto(userId, photoId) {
    return this.http.delete(baseUrl + 'users/' + userId + '/photos/' + photoId);
  }

  sendLike(id, recipientId) {
    return this.http.post(baseUrl + 'users/' + id + '/like/' + recipientId, {});
  }

  getMessages(id, page?, itemsPerPage?, messageContainer?) {
    const paginationResult: PaginationResult<Message[]> = new PaginationResult();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Message[]>(baseUrl + 'users/' + id + '/messages', {observe: 'response', params})
      .pipe(
        map(res => {
          paginationResult.result = res.body;
          if (res.headers.get('Pagination') !== null) {
            paginationResult.pagination = JSON.parse(res.headers.get('Pagination'));
          }

          return paginationResult;
        })
      );
  }

  getMessageThread(senderId, recipientId) {
    return this.http.get<Message[]>(baseUrl + 'users/' + senderId + '/messages/thread/' + recipientId);
  }

  sendMessage(id, message) {
    return this.http.post(baseUrl + 'users/' + id + '/messages', message);
  }

  deleteMessage(id, userId) {
    return this.http.post(baseUrl + 'users/' + userId + '/messages/' + id, {});
  }
}
