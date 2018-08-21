import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-detail-photographer',
  templateUrl: './detail-photographer.component.html',
  styleUrls: ['./detail-photographer.component.css']
})
export class DetailPhotographerComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private router: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService) {}

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.user = data['user'];
    });

    this.router.queryParams.subscribe(data => {
      const selectedTab = data['tab'];
      this.staticTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
    ];

    this.galleryImages = this.getPhotos();
  }

  getPhotos() {
    const imageUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }

    return imageUrls;
  }

  sendLike(id) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have liked: ' + this.user.userName);
    }, err => {
      this.alertify.error(err);
    });
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }
}
