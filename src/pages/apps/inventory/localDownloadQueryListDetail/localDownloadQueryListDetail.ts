import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-localDownloadQueryListDetail',
  templateUrl: 'localDownloadQueryListDetail.html'
})
export class LocalDownloadQueryListDetailPage {
  planDetail;
  constructor(public navCtrl: NavController,public navParams:NavParams) {
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    this.planDetail = this.navParams.get("planDetail");
    for (let key in this.planDetail){
      if (!this.planDetail[key]){
        this.planDetail[key]="-";
      }
    }
  }
}
