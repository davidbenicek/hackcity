import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../photo/photo';
import { QRScan } from '../qrscan/qrscan';

@Component({
  templateUrl: 'decision.html'
})


export class Decision {

  constructor(public navCtrl: NavController) {
  }
  loadPhotoUpload() {
    this.navCtrl.push(Photo);
  }

  loadQRScanner() {
    this.navCtrl.push(QRScan);
  }
}
