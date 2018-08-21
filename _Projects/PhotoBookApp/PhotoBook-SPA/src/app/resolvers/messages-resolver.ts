import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Message } from '../models/message';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  pageNumber = 1;
  pageSize = 6;
  messageContainer = 'Unread';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService.getMessages(this.authService.decodedToken.nameid,
        this.pageNumber, this.pageSize, this.messageContainer).pipe(
        catchError(err => {
            this.alertify.error(err);
            this.router.navigate(['home']);
            return of(null);
        })
    );
  }
}
