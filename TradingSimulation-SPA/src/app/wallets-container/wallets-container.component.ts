import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Wallet } from './../_models/wallet';
import { User } from '../_models/user';


@Component({
  selector: 'app-wallets-container',
  templateUrl: './wallets-container.component.html',
  styleUrls: ['./wallets-container.component.css']
})
export class WalletsContainerComponent implements OnInit {

  isFetchingUser = true;
  coinsWallet: Wallet;
  woodWallet: Wallet;
  gemsWallet: Wallet;
  elixirWallet: Wallet;

  constructor(private userService: UserService, private toastr: ToastrService) {
    this.isFetchingUser = true;
   }

  ngOnInit() {
    this.isFetchingUser = true;
    this.setAmounts();
  }

  setAmounts() {
    this.userService.loggedInUserWalletsAndTradesInfo$.subscribe(
      (response: User) => {
        const wallets = response.wallets;
        this.coinsWallet = wallets[0];
        this.woodWallet = wallets[1];
        this.gemsWallet = wallets[2];
        this.elixirWallet = wallets[3];
        this.isFetchingUser = false;
      }
    );
  }


}
