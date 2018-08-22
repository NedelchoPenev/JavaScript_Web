import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { AlertifyService } from '../../services/alertify.service';
import { Photo } from '../../models/photo';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.css']
})
export class AllPhotosComponent implements OnInit {
  photos: Photo[];

  constructor(
    private photoService: PhotoService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    this.photoService.getPhotos().subscribe((data: Photo[]) => {
      this.photos = data;
    }, err => {
      this.alertify.error(err);
    });
  }

  sendLike(photoId) {
    this.photoService
      .sendLike(this.authService.decodedToken.nameid, photoId)
      .subscribe(
        () => {
          this.alertify.success('You successfully liked this photo');
        },
        err => {
          this.alertify.error(err);
        }
      );
  }
}
