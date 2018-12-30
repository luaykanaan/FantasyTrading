import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { Trade } from '../_models/trade';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiUrl =  environment.apiUrl + 'users/';
  private loggedInUserWalletsAndTradesInfoSubject: BehaviorSubject<User>;
  public loggedInUserWalletsAndTradesInfo$: Observable<User>;

  constructor(private http: HttpClient) {
    this.loggedInUserWalletsAndTradesInfoSubject = new BehaviorSubject<User>({trades: [], wallets: []});
    this.loggedInUserWalletsAndTradesInfo$ = this.loggedInUserWalletsAndTradesInfoSubject.asObservable();
   }

  getUser(userId: string) {
    return this.http.get(this._apiUrl + userId).pipe(
      map( (response: any) => {
        if (response) {
          this.setLoggedInUserWalletsAndTradesInfo(response);
        }
      })
    );
  }

  setLoggedInUserWalletsAndTradesInfo(data: any) {
    const user: User = { wallets: data.wallets, trades: data.trades };
    this.loggedInUserWalletsAndTradesInfoSubject.next(user);
  }

  executeTrade(userId: string, model: Trade) {
    return this.http.post(this._apiUrl + userId + '/trade', model).pipe(
      map( (response: User) => {
        if (response) {
          this.setLoggedInUserWalletsAndTradesInfo(response);
        }
      })
    );
  }

}
