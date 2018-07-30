import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel } from '../models/LoginModel';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginModel
  error: any

  constructor(private authService: AuthenticationService, private router: Router) {
    this.model = new LoginModel('', '')
  }

  ngOnInit() {
  }

  login(input) {
    this.authService.login(input).subscribe(data => {
      this.authService.authtoken = data['_kmd']['authtoken']
      localStorage.setItem('authtoken', data['_kmd']['authtoken'])
      localStorage.setItem('username', data['username'])
      this.router.navigate(['home'])
    },
      err => {
        this.error = err['error']
      })
  }
}
