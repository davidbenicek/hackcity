import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { QRCode } from '../QRCode/qr';

@Component({
  templateUrl: 'transition.html'
})
export class QRTransition {
    euros = 1234;
    cents = 45;
    amt = "";
    money;
  constructor(public navCtrl: NavController, public http:HttpClient) {

  }
    updateMoney(){
        var json = this.getBal();
        let upper_this = this;
        json.then( x => {
        var amount = (x.amount).toString();
        upper_this.euros = amount.split('.')[0];
        upper_this.cents = amount.split('.')[1];
        upper_this.amt = upper_this.euros  + "." + upper_this.cents;
        
        } ) 
        console.log(upper_this.money);
  }

  getBal() {
    return new Promise(resolve => {
      this.http.get('http://localhost:1200/balance').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  
  push() {
    this.navCtrl.push(QRCode, {
        amount: this.money
    });
  }
}


