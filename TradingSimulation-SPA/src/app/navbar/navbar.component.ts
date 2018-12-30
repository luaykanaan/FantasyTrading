import { User } from './../_models/user';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  loggedInUser: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.checkIsLoggedInStatus();
  }

  checkIsLoggedInStatus() {
    this.authService.isLoggedIn$.subscribe(value => this.isLoggedIn = value);
    this.authService.loggedInUserBasicInfo$.subscribe(value => {
      this.loggedInUser = value;
    });
  }

  logout() {
    this.authService.logout();
  }

}
