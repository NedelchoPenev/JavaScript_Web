import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from '../../models/photo';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';

const baseUrl = environment.baseUrl;

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() photoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  mainPhoto: Photo;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.initUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initUploader() {
    this.uploader = new FileUploader({
      url:
        baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = res;

        this.photos.push(photo);
        if (photo.isMain) {
          this.photoChange.emit(photo.url);
        }
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(() => {
        this.mainPhoto = this.photos.filter(p => p.isMain === true)[0];
        this.mainPhoto.isMain = false;
        photo.isMain = true;
        this.photoChange.emit(photo.url);
      }, err => {
        this.alertify.error(err);
      });
  }

  deletePhoto(photoId) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService
        .deletePhoto(this.authService.decodedToken.nameid, photoId)
        .subscribe(() => {
          this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
          this.alertify.success('Photo has delete successfully');
        }, err => {
          this.alertify.error('Could not delete the photo');
        });
    });
  }
}
