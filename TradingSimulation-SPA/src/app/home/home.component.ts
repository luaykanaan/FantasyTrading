import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    let userId: string;
    this.authService.loggedInUserBasicInfo$.subscribe(u => {
      userId = u.id;
      this.userService.getUser(userId).subscribe(
        response => {
          this.toastr.success('Successfully fetched user data');
        },
        error => {
          this.toastr.error('There was an error fetching user data');
        }
      );
    });
  }

}
