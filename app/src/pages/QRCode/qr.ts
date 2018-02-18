import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'qrcode.html'
})
export class QRCode {

  imgUrl = "";
  sortCode = 0;
  accountNumber = 0;
  name = 0;
  apiUrl = 'http://localhost:1200'
  accountUrl = this.apiUrl + '/accounts';
  constructor(public navCtrl: NavController, public http:HttpClient) {
      var json = this.getAccount();
      json.then( x => {
        delete x["_links"]
        this.imgUrl = "https://api.qrserver.com/v1/create-qr-code/";
        this.imgUrl += "?data=" + JSON.stringify(x);
      } ) 
  }

  getAccount() {
    return new Promise(resolve => {
        this.http.get(this.accountUrl).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }
}


