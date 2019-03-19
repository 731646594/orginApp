import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {FileTransfer} from "@ionic-native/file-transfer";
import {File} from "@ionic-native/file";

@Component({
  selector: 'page-inventoryQueryDetail',
  templateUrl: 'inventoryQueryDetail.html'
})
export class InventoryQueryDetailPage {
  planDetail;
  constructor(public navCtrl: NavController,public storageService:StorageService, public file:File,
              public fileTransfer:FileTransfer,public navParams:NavParams) {
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
