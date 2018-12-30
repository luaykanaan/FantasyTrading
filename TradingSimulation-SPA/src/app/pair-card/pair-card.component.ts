import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material';
import { UserService } from '../_services/user.service';
import { Wallet } from '../_models/wallet';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Trade } from './../_models/trade';


@Component({
  selector: 'app-pair-card',
  templateUrl: './pair-card.component.html',
  styleUrls: ['./pair-card.component.css']
})
export class PairCardComponent implements OnInit {

  @Input() tradeTarget: string;
  @ViewChild(MatRipple) ripple: MatRipple;
  ratio: number;
  minRatio: number;
  maxRatio: number;
  minDelay = 5000;
  maxDelay = 30000;
  tradeSeries: Array<SeriesObject>[];
  coinsQuantity: number;
  resourceQuantity: number;

  // # graph sources
  tradeStream: TradeStreamObject[] = [ { name: 'Price', series: [] } ];

  constructor(private userService: UserService, private authService: AuthService, private toastr: ToastrService) {
  }

  ngOnInit() {
    if (this.tradeTarget === 'Wood') {
      this.ratio = 4;
      this.minRatio = 2;
      this.maxRatio = 6;
    }
    if (this.tradeTarget === 'Gems') {
      this.ratio = 8;
      this.minRatio = 6;
      this.maxRatio = 10;
    }
    if (this.tradeTarget === 'Elixir') {
      this.ratio = 12;
      this.minRatio = 10;
      this.maxRatio = 14;
    }
    for (let index = 1; index < 11; index++) {
      this.tradeStream[0].series.push({name: 'pt' + index, value: this.generateRatio()});
    }
    this.setQuantities();
    this.automateRatio();
  }

  generateDelay(): number {
    return Math.floor(Math.random() * (this.maxDelay - this.minDelay + 1000) + this.minDelay);
  }

  generateRatio(): number {
    return Math.floor(Math.random() * (this.maxRatio - this.minRatio + 1) + this.minRatio);
  }

  automateRatio() {
    this.ratio = this.generateRatio();
    this.tradeStream[0].series.splice(0, 1);
    this.tradeStream[0].series.push({name: 'pt' + Math.floor(Math.random() * 10000).toString(), value: this.ratio});
    this.tradeStream = [...this.tradeStream];
    this.ripple.launch({centered: true, color: 'rgba(103, 58, 183, 0.3)'});
    const delay = this.generateDelay();
    setTimeout(this.automateRatio.bind(this), delay);
  }

  setQuantities() {
    this.userService.loggedInUserWalletsAndTradesInfo$.subscribe(
      response => {
        const wallets: Wallet[] = response.wallets;
        if (wallets.length > 0) {
          this.coinsQuantity = wallets[0].quantity;
          if (this.tradeTarget === 'Wood') {
            this.resourceQuantity = wallets[1].quantity;
          }
          if (this.tradeTarget === 'Gems') {
            this.resourceQuantity = wallets[2].quantity;
          }
          if (this.tradeTarget === 'Elixir') {
            this.resourceQuantity = wallets[3].quantity;
          }
        }
      }
    );
  }

  executeTrade(tradeDirection: string) {
    const model: Trade = {
      direction: tradeDirection,
      resource: this.tradeTarget,
      rate: this.ratio,
      quantity: 1
    };
    let userId: string;
    this.authService.loggedInUserBasicInfo$.subscribe(u => {
      userId = u.id;
      this.userService.executeTrade(userId, model).subscribe(
        response => {
          this.toastr.success('Successfully executed trade');
        },
        error => {
          this.toastr.error('There was an error executing the trade');
        }
      );
    });
  }

}

export interface SeriesObject {
  name: string;
  value: number;
}

export interface TradeStreamObject {
  name: string;
  series: SeriesObject[];
}

