import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  colorTheme = 'theme-default';
  bsConfig: Partial<BsDatepickerConfig>;
  model: any = {};
  @Output()
  cancelRegister = new EventEmitter();
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: this.colorTheme
    };
  }

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('Registration successful');
      },
      error => {
        this.alertify.error(error);
      },
      () => {
        this.authService.login(this.model).subscribe(() => {
          this.router.navigate(['/photos/all']);
        });
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
