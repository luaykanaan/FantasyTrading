import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _jwtHelper = new JwtHelperService();
  private _apiUrl =  environment.apiUrl + 'auth/';
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;
  private loggedInUserBasicInfoSubject: BehaviorSubject<User>;
  public loggedInUserBasicInfo$: Observable<User>;
  private undecodedTokenSubject: BehaviorSubject<User>;
  public undecodedToken$: Observable<User>;

  constructor(private http: HttpClient) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
    this.loggedInUserBasicInfoSubject = new BehaviorSubject<User>({});
    this.loggedInUserBasicInfo$ = this.loggedInUserBasicInfoSubject.asObservable();
    this.undecodedTokenSubject = new BehaviorSubject<User>({});
    this.undecodedToken$ = this.undecodedTokenSubject.asObservable();
  }

  async checkLoginStatus() {
    this.isLoggedInSubject.next(false);
    const token = localStorage.getItem('currentToken');
    if (token) {
      if (!this._jwtHelper.isTokenExpired(token)) {
        this.isLoggedInSubject.next(true);
        this.setLoggedInUserBasicInfo(token);
      } else {
        localStorage.removeItem('currentToken');
      }
    }
    return;
  }

  login(model: any) {
    return this.http.post(this._apiUrl + 'login', model).pipe(
      map( (response: any) => {
        if (response) {
          localStorage.setItem('currentToken', response.token);
          this.isLoggedInSubject.next(true);
          this.setLoggedInUserBasicInfo(response.token);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this._apiUrl + 'register', model).pipe(
      map( (response: any) => {
        if (response) {
          localStorage.setItem('currentToken', response.token);
          this.isLoggedInSubject.next(true);
          this.setLoggedInUserBasicInfo(response.token);
        }
      })
    );
  }

  setLoggedInUserBasicInfo(token: any) {
    this.undecodedTokenSubject.next(token);
    const dt = this._jwtHelper.decodeToken(token);
    const user: User = { id: dt.nameid, userName: dt.unique_name, role: dt.role, email: dt.email };
    this.loggedInUserBasicInfoSubject.next(user);
  }

  logout() {
      localStorage.removeItem('currentToken');
      this.isLoggedInSubject.next(false);
      this.loggedInUserBasicInfoSubject.next(null);
      this.undecodedTokenSubject.next(null);

  }

}
