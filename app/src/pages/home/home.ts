import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  hideMenu = false;

  euros = 1234;
  cents = 45;

  user = 'malcolm';
  apiUrl = 'http://localhost:1200';
  balanceUrl = this.apiUrl + '/balance?user=';

  constructor(public navCtrl: NavController, public http:HttpClient) {
    var json = this.getBalance()
    json.then( x => {
      //console.log(x.amount);
      //var amount = (x.amount).toString();
      //this.euros = amount.split('.')[0]
      //this.cents = amount.split('.')[1]
    } ) 
  }

  toogleMenu() {
    console.log("Toggle " + this.hideMenu);
    this.hideMenu = !this.hideMenu;
  }

  getBalance() {
    return new Promise(resolve => {
      this.http.get('http://localhost:1200/balance').subscribe(data => {
        //console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }



}
