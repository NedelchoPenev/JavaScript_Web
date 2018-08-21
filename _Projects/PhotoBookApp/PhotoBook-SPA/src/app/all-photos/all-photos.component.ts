import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { AlertifyService } from '../services/alertify.service';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.css']
})
export class AllPhotosComponent implements OnInit {
  photos: Photo[];

  constructor(private photoService: PhotoService,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }

  loadPhotos() {
    this.photoService.getPhotos().subscribe((data: Photo[]) => {
      this.photos = data;
    });
  }
}
