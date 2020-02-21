import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {PageUtil, StorageService} from "../../../../services/storageService";
import {FileTransfer,FileTransferObject} from "@ionic-native/file-transfer";
import {File} from "@ionic-native/file";

@Component({
  selector: 'page-inventoryDataSyncDetail',
  templateUrl: 'inventoryDataSyncDetail.html'
})
export class InventoryDataSyncDetailPage {
  userCode;
  departCode;
  plan;
  planDate;
  departments=[];
  isDownloaded;
  isOnfocus=false;
  displayArray = [];
  searchValue;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController,public file:File,
              public fileTransfer:FileTransfer,public navParams:NavParams,public app:App) {
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.plan = this.navParams.get("plan");
    this.planDate = JSON.parse(JSON.stringify(this.plan));
    this.httpService.postData(this.httpService.getUrl()+"cellPhoneControllerOffline/getSyncFailDeparts.do",{planNumber:this.planDate.planNumber,departCode:this.departCode},data=>{
      this.departments = data.data;
    },true);
  }
  syncData(){
    let item=[];
    for (let i in this.departments){
      if(this.departments[i].checked){
        item.push(this.departments[i].departCode);
      }
    }
    if(!item.length){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择单位！",
      });
      alertCtrl.present();
      return false;
    }
    let departsString = "";
    for (let i = 0;i < item.length;i++){
      departsString += item[i]
      if (i != item.length-1){
        departsString += ",";
      }
    }
    this.httpService.postData(this.httpService.getUrl()+"cellPhoneControllerOffline/phonesynccheckplandetail.do",{userCode:this.userCode,departCode:this.departCode,planNumber:this.planDate.planNumber,departCodes:departsString},data=>{

    },false,err=>{

    });
    let alertCtrl = this.alertCtrl.create({
      title:"同步中请等待，请通过刷新或重新进入页面获取同步状态"
    });
    alertCtrl.present();
    this.app.getRootNav().pop();
  }
  checkedOne(index){
    if(this.departments[index].checked){
      this.departments[index].checked = false;
    }else {
      this.departments[index].checked = true;
    }
  }
  checkAll(){
    for (let i in this.departments){
      this.departments[i].checked = true;
    }
  }
  checkInverse(){
    for (let i in this.departments){
      if(this.departments[i].checked){
        this.departments[i].checked = false;
      }else {
        this.departments[i].checked = true;
      }
    }
  }
  searchDepart(){
    if (this.searchValue){
      for (let i in this.departments){
        this.displayArray[i] = true;
        if (this.departments[i].departName.indexOf(this.searchValue)>-1){
          this.displayArray[i] = false;
        }
      }
    }else {
      for (let i in this.departments){
        this.displayArray[i] = false;
      }
    }
  }
  inputOnfocus(){
    this.isOnfocus=true;
  }
  inputOnblur(){
    this.isOnfocus=false;
  }
}
