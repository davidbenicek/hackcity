import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'transactions.html'
})


export class Transactions {

  hideMenu = true;

  remaining_amount:Number;
  transactions = {
    today: [Object],
    yesterday: [Object],
    before: [Object]
  };
  show_today = false;
  show_yesterday = false;
  show_before = false;

  user = 'malcolm';

  constructor(public navCtrl: NavController, public http:HttpClient) {
    type Transaction = { id: String,
      currency?: String,
      amount?: Number,
      direction?: String,
      created?: String,
      narrative?: String,
      source?: String,
      balance?: Number 
    };
      
    type TransactionsSummary = {
      today?: [Transaction],
      yesterday?: [Transaction],
      before?: [Transaction]
    }
    var higher_this:any = this;
    var transactionsReady = this.getTransactions();
    transactionsReady.then(function(trans: TransactionsSummary) {
      higher_this.remaining_amount = trans.today[0].balance as Number;
      higher_this.transactions = trans as any;
      if(trans.today.length > 0)
        higher_this.show_today = true;
      if(trans.yesterday.length > 0)
        higher_this.show_yesterday = true;
      if(trans.before.length > 0){
        higher_this.show_before = true;
      }
    })
  }
  
  ngOnInit () {
    
  }


  getTransactions() {
    return new Promise(resolve => {
      this.http.get('http://10.209.38.84:1200/transactions?user='+this.user).subscribe(data => {
        console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }




}
