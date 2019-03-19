import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {PageUtil, StorageService} from "../../services/storageService";
import {HttpService} from "../../services/httpService";
import {ScanCodePage} from "../apps/inventory/scanCode/scanCode";
import {ScrapApplicationPage} from "../apps/scrap/scrapApplication/scrapApplication";
import {ScrapApprovalPage} from "../apps/scrap/scrapApproval/scrapApproval";
import {InventoryQueryPage} from "../apps/inventory/inventoryQuery/inventoryQuery";
import {InventoryDataDownloadPage} from "../apps/inventory/inventoryDataDownload/inventoryDataDownload";
import {AllocateApplicationPage} from "../apps/allocate/allocateApplication/allocateApplication";
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
  constructor(public app:App,public navCtrl: NavController,public storageService:StorageService, public httpService:HttpService,) {
    that = this;
  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
    PageUtil.pages["home"]=this;
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.httpService.post(this.httpService.getUrl()+"toDoController.do?tododetailcounts", {userCode:this.userCode,departCode:this.departCode}).subscribe((data)=>{
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
    },err=>{
      alert(err)
    });
    setTimeout(this.readInventoryNum,1000)
  }
  readInventoryNum(){
    let tableName = "planListWillPlanDetail";
    that.storageService.getUserTable().executeSql(that.storageService.getSSS(tableName,that.userCode),[]).then(res =>{
      if (res.rows.length>0) {
        that.inventoryNum = res.rows.length;
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
  }
  willGoPage(pageIndex){
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
    else if(pageIndex == 9){
      this.app.getRootNav().push(ScrapApprovalPage)
    }
  }
}
