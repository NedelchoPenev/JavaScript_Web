import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../models/user';

@Component({
  selector: 'app-all-photographers',
  templateUrl: './all-photographers.component.html',
  styleUrls: ['./all-photographers.component.css']
})
export class AllPhotographersComponent implements OnInit {
  users: User[];

  constructor(
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.users = data['users'];
    });
  }
}
