import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Transactions } from '../transactions/transactions';
import { QRCode } from '../QRCode/qr';
import { Decision } from '../decision/decision';
import { QRTransition } from '../QRtransition/transition';
import { Photo } from '../photo/photo';
import { QRScan } from '../qrscan/qrscan';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  hideMenu = true;

  euros = "1234";
  cents = "45";

  user = 'malcolm';
  apiUrl = 'http://10.209.38.84:1200';
  balanceUrl = this.apiUrl + '/balance?user=';

  constructor(public navCtrl: NavController, public http:HttpClient) {
    interface Balance {
      amount:    string;
      effectiveBalance:     string;
      availableToSpend: string;
      pendingTransactions:    string;
      clearedBalance:     string;
      currency: string;
    }
    
    var json = this.getBalance()
    json.then( x => {
      let balance: Balance = <Balance>x;
      var amount = (balance.amount).toString();
      this.euros = amount.split('.')[0]
      this.cents = amount.split('.')[1]
    } ) 
  }

  toggleMenu() {
    this.hideMenu = !this.hideMenu;
  }

  getBalance() {
    return new Promise(resolve => {
      this.http.get(this.balanceUrl + this.user).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  loadTransaction() {
    this.navCtrl.push(Transactions);
  }

  loadDecision() {
    this.navCtrl.push(Decision);}

  

  loadBalance() {
    this.navCtrl.push(QRTransition);
  }
}
