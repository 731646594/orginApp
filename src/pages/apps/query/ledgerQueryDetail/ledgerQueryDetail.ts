import { Component } from '@angular/core';
import { App, NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-ledgerQueryDetail',
  templateUrl: 'ledgerQueryDetail.html'
})
export class LedgerQueryDetailPage {
  detail=[];
  constructor(public navCtrl: NavController, public app:App,public navParams:NavParams) {
    this.loadData();
  }
  loadData(){
    this.detail = this.navParams.get("detail");
  }
}
