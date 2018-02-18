import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Photo } from './photo';
@NgModule({
  declarations: [
    Photo,
  ],
  imports: [
    IonicPageModule.forChild(Photo),
  ],
  entryComponents: [
    Photo,
  ]
})
export class TransactionModule {}
