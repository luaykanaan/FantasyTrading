import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() displayRegister = new EventEmitter<boolean>();
  model: any = {};

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(
      response => {
        this.toastr.success('You have registered successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 400) {
          error.error.forEach(element => {
            this.toastr.error(element.description, 'Failed to register');
          });
        } else {
          this.toastr.error(error.message, 'Failed to register');
        }
      }
    );
  }

  toggleRegister() {
    this.displayRegister.emit(false);
  }

}
