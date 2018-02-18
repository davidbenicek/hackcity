import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Finish } from '../finish/finish';

@Component({
  selector: 'page-home',
  templateUrl: 'qrscan.html'
})

export class QRScan {

  user = 'malcolm';
  apiUrl = 'http://10.209.38.84:1200';
  payUrl = this.apiUrl + '/pay?user=';

  constructor(public navCtrl: NavController, public http:HttpClient, public qrScanner: QRScanner) {

    this.qrscanner();
    
  }

  qrscanner() {
    
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          this.qrScanner.useCamera(0);

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.sendTransaction(text);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            window.document.querySelector('ion-app').classList.remove('transparent-body');
          });

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show()
          .then((data : QRScannerStatus)=> { 
          },err => {
          });

          window.document.querySelector('ion-app').classList.add('transparent-body');
          

          // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
          alert('denied');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          alert('else');
        }
      })
      .catch((e: any) => {
        alert('Error is' + e);
      });

  }


  sendTransaction(data) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var header = { "headers": {"Content-Type": "application/json"} };

    return new Promise((resolve, reject) => {
      this.http.post(this.payUrl + this.user, data, header)
      .toPromise()
      .then((response) =>
      {

      })
      .catch((error) =>
      {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        reject(error.json());
      });
  }); 
}


}
