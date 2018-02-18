import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Transactions } from '../pages/transactions/transactions';
import { Decision } from '../pages/decision/decision';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { QRCode } from '../pages/QRCode/qr';
import { QRTransition } from '../pages/QRtransition/transition';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Transactions,
    QRCode,
    Decision,
    QRTransition
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Transactions,
    QRCode,
    Decision,
    QRTransition
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
