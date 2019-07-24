import { Component } from '@angular/core';
import {AlertController, App, NavController} from 'ionic-angular';
import {PageUtil, StorageService} from "../../services/storageService";
import {HttpService} from "../../services/httpService";
import {ScanCodePage} from "../apps/inventory/scanCode/scanCode";
import {ScrapApplicationPage} from "../apps/scrap/scrapApplication/scrapApplication";
import {ScrapApprovalPage} from "../apps/scrap/scrapApproval/scrapApproval";
import {InventoryQueryPage} from "../apps/inventory/inventoryQuery/inventoryQuery";
import {InventoryDataDownloadPage} from "../apps/inventory/inventoryDataDownload/inventoryDataDownload";
import {AllocateApplicationPage} from "../apps/allocate/allocateApplication/allocateApplication";
import {AllocateApprovalPage} from "../apps/allocate/allocateApproval/allocateApproval";
import {TransferConfirmationPage} from "../apps/allocate/transferConfirmation/transferConfirmation";
import {Network} from "@ionic-native/network";
let that;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userName;
  userCode;
  departName;
  departCode;
  inventoryNum=0;
  num1;
  num2;
  num3;
  num4;
  num5;
  constructor(public app:App,public navCtrl: NavController,public storageService:StorageService, public httpService:HttpService,public network:Network,public alertCtrl:AlertController) {

  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
    that = this;
    PageUtil.pages["home"]=this;
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.httpService.postData(this.httpService.getUrl()+"toDoController/tododetailcounts.do", {userCode:this.userCode,departCode:this.departCode},(data)=>{
      let todoList=[];
      if (data.success=="true"){
        for (let key in data.data[0]) {
          todoList.push([key,data.data[0][key]]);
        }
        this.num1 = todoList[2][1];
        this.num2 = todoList[4][1];
        this.num3 = todoList[0][1];
        this.num4 = todoList[3][1];
        this.num5 = todoList[1][1];
      }
    });
    setTimeout(this.readInventoryNum,500)
  }
  readInventoryNum(){
    let tableName = "willPlanDetail";
    that.storageService.getUserTable().executeSql(that.storageService.getSSS(tableName,that.userCode),[]).then(res =>{
      if (res.rows.length>0) {
        that.inventoryNum = JSON.parse(res.rows.item(0).stringData).length;
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
  }
  willGoPage(pageIndex){
    if(pageIndex == 1){
      if(this.network.type != 'none'){
        let alertCtrl = this.alertCtrl.create({
          title:"请切换到飞行模式！"
        });
        alertCtrl.present();
        return false;
      }
    }
    else {
      if(pageIndex !=4&&this.network.type == 'none'){
        let alertCtrl = this.alertCtrl.create({
          title:"请恢复网络链接！"
        });
        alertCtrl.present();
        return false;
      }
    }
    if (pageIndex==1){
      this.app.getRootNav().push(ScanCodePage)
    }
    else if(pageIndex == 2){
      this.app.getRootNav().push(AllocateApplicationPage)
    }
    else if(pageIndex == 3){
      this.app.getRootNav().push(ScrapApplicationPage)
    }
    else if(pageIndex == 4){
      this.app.getRootNav().push(InventoryQueryPage)
    }
    else if(pageIndex == 5){
      this.app.getRootNav().push(InventoryDataDownloadPage)
    }
    else if(pageIndex == 6){
      this.app.getRootNav().push(AllocateApprovalPage)
    }
    else if(pageIndex == 7){
      this.app.getRootNav().push(TransferConfirmationPage,{pageName:"调出确认",postUrl:"allotController/queryAllotOut.do",childPageName:"调出确认详情",childPostUrl:"allotController/allotOut.do"})
    }
    else if(pageIndex == 8){
      this.app.getRootNav().push(TransferConfirmationPage,{pageName:"调入确认",postUrl:"allotController/queryAllotIn.do",childPageName:"调入确认详情",childPostUrl:"allotController/allotIn.do"})
    }
    else if(pageIndex == 9){
      this.app.getRootNav().push(ScrapApprovalPage)
    }
  }
}
