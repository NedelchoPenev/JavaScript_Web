import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-photopgrapher-card',
  templateUrl: './photopgrapher-card.component.html',
  styleUrls: ['./photopgrapher-card.component.css']
})
export class PhotopgrapherCardComponent implements OnInit {
  @Input() user: User;
  @Input() isFavoriteCom;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  sendLike(id) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have liked: ' + this.user.userName);
    }, err => {
      this.alertify.error(err);
    });
  }
}
