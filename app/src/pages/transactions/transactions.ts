import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'transactions.html'
})


export class Transactions {

  hideMenu = true;

  static remaining_amount:Number = 0.00;
  transactions = {
    today : []
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
      
    var transactionsReady = this.getTransactions();
    transactionsReady.then(function(trans: TransactionsSummary) {

    console.log(typeof trans.today[0].balance);
    console.log(this.remaining_amount);
    this.remaining_amount = 5 //trans.today[0].balance as Number;
    this.transactions = trans as TransactionsSummary;
    if(trans.today.length > 0)
      this.show_today = true;
    if(trans.yesterday.length > 0)
      this.show_yesterday = true;
    if(trans.before.length > 0){
      this.show_before = true;
    }
    })

  }


  getTransactions() {
    return new Promise(resolve => {
      this.http.get('http://localhost:1200/transactions?user='+this.user).subscribe(data => {
        console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }




}
