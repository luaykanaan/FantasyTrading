import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() displayRegister = new EventEmitter<boolean>();
  model: any = {};

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(
      response => {
        this.toastr.success('You have logged in successfully');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastr.error('Wrong Username/Email or Password', 'Failed to login');
        } else {
          this.toastr.error(error.message, 'Failed to login');
        }
      }
    );
  }

  toggleRegister() {
    this.displayRegister.emit(true);
  }

}
