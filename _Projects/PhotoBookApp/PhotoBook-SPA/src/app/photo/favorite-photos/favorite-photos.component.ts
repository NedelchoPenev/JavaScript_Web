import { Component, OnInit } from '@angular/core';
import { Photo } from '../../models/photo';
import { PhotoService } from '../../services/photo.service';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-favorite-photos',
  templateUrl: './favorite-photos.component.html',
  styleUrls: ['./favorite-photos.component.css']
})
export class FavoritePhotosComponent implements OnInit {
  photos: Photo[];

  constructor(
    private photoService: PhotoService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    this.photoService.getFavoritePhotos(this.authService.decodedToken.nameid).subscribe((data: Photo[]) => {
      this.photos = data;
    }, err => {
      this.alertify.error(err);
    });
  }
}
