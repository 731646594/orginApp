import { Component } from '@angular/core';
import { App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {InventoryDataDownloadDetailPage} from "../inventoryDataDownloadDetail/inventoryDataDownloadDetail";

@Component({
  selector: 'page-inventoryDataDownload',
  templateUrl: 'inventoryDataDownload.html'
})
export class InventoryDataDownloadPage {
  planList;
  userCode;
  departCode;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public loadingCtrl:LoadingController,public navParams:NavParams,public app:App) {
    // this.loadData();
  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
    let loading = this.loadingCtrl.create({
      content:"正在加载",
      duration:5000
    });
    loading.present();
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.httpService.post(this.httpService.getUrl()+"cellPhoneController/phonecheckplandownload.do",{userCode:this.userCode,departCode:this.departCode}).subscribe(data=>{
      if (data.success == "true"){
        this.planList=data.data;
      }else {
        alert(data.msg)
      }
      loading.dismiss();
    });

  }
  detailPage(plan){
    this.app.getRootNav().push(InventoryDataDownloadDetailPage,{plan:plan})
  }
}
