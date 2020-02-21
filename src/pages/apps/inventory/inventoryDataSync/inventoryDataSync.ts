import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {InventoryDataSyncDetailPage} from "../inventoryDataSyncDetail/inventoryDataSyncDetail";
import {ConfigProvider} from "../../../../services/config";

@Component({
  selector: 'page-inventoryDataSync',
  templateUrl: 'inventoryDataSync.html'
})
export class InventoryDataSyncPage {
  planList=[];
  userCode;
  departCode;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public navParams:NavParams,public app:App,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {
    // this.loadData();
  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.httpService.postData(this.httpService.getUrl()+"cellPhoneControllerOffline/phonecheckplandownloadNew.do",{userCode:this.userCode,departCode:this.departCode},data=>{
      this.planList = data.data;
      for (let i in this.planList){
        this.planList[i]["statusName"] = ConfigProvider.syncStatusName(this.planList[i].status)
      }
    },true);

  }
  syncData(i){
    let alertCtrl = this.alertCtrl.create({
      title:"同步中请等待，请通过刷新或重新进入页面获取同步状态"
    });
    alertCtrl.present();
    this.planList[i].status = 2;
    this.planList[i]["statusName"] = ConfigProvider.syncStatusName(this.planList[i].status);
    this.planList[i]["completeCount"] = 0;
    this.planList[i]["incompleteCount"] = 0;
    this.planList[i]["notSyncCount"] = 0;
    this.planList[i]["partialFailuresCount"] = 0;
    this.httpService.postData(this.httpService.getUrl()+"cellPhoneControllerOffline/phonesynccheckplandetail.do",{userCode:this.userCode,departCode:this.departCode,planNumber:this.planList[i].planNumber},data=>{

    },false,err=>{

    });
  }
  detailPage(i){
    if (this.planList[i].status == 1||this.planList[i].status == 5){
      this.syncData(i)
    }else if (this.planList[i].status == 4){
      this.app.getRootNav().push(InventoryDataSyncDetailPage,{plan:this.planList[i]})
    }else if (this.planList[i].status == 2){
      let alertCtrl = this.alertCtrl.create({
        title:"正在同步中..."
      });
      alertCtrl.present();
    }else if (this.planList[i].status == 3){
      let alertCtrl = this.alertCtrl.create({
        title:"数据同步已完成！"
      });
      alertCtrl.present();
    }
  }
}
