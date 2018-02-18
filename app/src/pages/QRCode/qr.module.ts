import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { QRCode } from './qr';

@NgModule({
  declarations: [
    QRCode,
  ],
  imports: [
    IonicPageModule.forChild(QRCode),
  ],
  entryComponents: [
    QRCode,
  ]
})
export class QRCodeModule {}