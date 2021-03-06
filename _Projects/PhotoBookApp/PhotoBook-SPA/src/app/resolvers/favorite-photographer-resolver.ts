import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable()
export class FavoritePhotographersResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 6;
  likesParam = 'Likees';
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, this.likesParam).pipe(
        catchError(err => {
            this.alertify.error(err);
            this.router.navigate(['home']);
            return of(null);
        })
    );
  }
}
