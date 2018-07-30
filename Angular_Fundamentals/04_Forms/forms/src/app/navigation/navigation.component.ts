import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/service/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private authService: AuthenticationService) { }

  ngOnInit() { }

  logout(){
    this.authService.logout().subscribe(data => {
      localStorage.clear()
      this.authService.authtoken = ''
    })
  }
}
