import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean;
  isDisplayRegister: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.doInitialChecks();
  }

  async doInitialChecks() {
    await this.authService.checkLoginStatus();
    this.authService.isLoggedIn$.subscribe(value => {
      this.isLoggedIn = value;
    });
    this.isDisplayRegister = false;
  }

  onDisplayRegister(shouldDisplay: boolean) {
    this.isDisplayRegister = shouldDisplay;
  }
}
