import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Pagination, PaginationResult } from '../../models/pagination';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-favorite-photographers',
  templateUrl: './favorite-photographers.component.html',
  styleUrls: ['./favorite-photographers.component.css']
})
export class FavoritePhotographersComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;
  isAlreadyLiked = true;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likees';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.likesParam)
      .subscribe(
        (res: PaginationResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        err => {
          this.alertify.error(err);
        }
      );
    }
}
