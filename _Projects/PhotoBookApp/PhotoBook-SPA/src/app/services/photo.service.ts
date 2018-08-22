import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  getPhotos() {
    return this.http.get(baseUrl + 'photos');
  }

  getFavoritePhotos(userId) {
    return this.http.get(baseUrl + 'photos/favorite/' + userId);
  }

  sendLike(userId, photoId) {
    return this.http.post(baseUrl + 'photos/' + userId + '/like/' + photoId, {});
  }
}
