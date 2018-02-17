import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  euros = 0;
  cents = 0;

  user = 'malcolm';
  apiUrl = 'http://localhost:1200';
  balanceUrl = this.apiUrl + 'balance?user=';

  constructor(public navCtrl: NavController, public http:HttpClient) {
    var json = this.getBalance()
  }

  getBalance() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+ this.user).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
