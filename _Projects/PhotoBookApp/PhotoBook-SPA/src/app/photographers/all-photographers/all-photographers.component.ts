import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../models/user';
import { Pagination, PaginationResult } from '../../models/pagination';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-all-photographers',
  templateUrl: './all-photographers.component.html',
  styleUrls: ['./all-photographers.component.css']
})
export class AllPhotographersComponent implements OnInit {
  users: User[];
  pagination: Pagination;

  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
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
