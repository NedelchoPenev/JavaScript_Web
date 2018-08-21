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
}
