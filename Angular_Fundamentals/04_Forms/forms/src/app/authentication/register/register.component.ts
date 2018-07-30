import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterModel } from '../models/RegisterModel';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel
  error: any

  constructor(private authService: AuthenticationService, private router : Router) { 
    this.model = new RegisterModel('','','','','')
  }

  ngOnInit() {
  }

  registUser(input){
    this.authService.registration(input).subscribe(data => {
      this.router.navigate(['login'])
    },
    err => {
      this.error = err['error']
    })
  }
}
