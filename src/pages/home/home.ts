import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {PageUtil, StorageService} from "../../services/storageService";
import {HttpService} from "../../services/httpService";
import {ScanCodePage} from "../apps/inventory/scanCode/scanCode";
import {ScrapApplicationPage} from "../apps/scrap/scrapApplication/scrapApplication";
import {ScrapApprovalPage} from "../apps/scrap/scrapApproval/scrapApproval";
import {InventoryEnquiryPage} from "../apps/inventory/inventoryEnquiry/inventoryEnquiry";
import {InventoryDataDownloadPage} from "../apps/inventory/inventoryDataDownload/inventoryDataDownload";

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
  constructor(public app:App,public navCtrl: NavController,public storageService:StorageService, public httpService:HttpService,
              ) {

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
        let tableName = "planListWillPlanDetail";
        this.storageService.createUserTable(tableName);
        this.storageService.getUserTable().executeSql(this.storageService.getSSS(tableName,this.userCode),[]).then(res =>{
          if (res.rows.length>0) {
            this.inventoryNum = res.rows.length;
          }
        }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
        this.num1 = todoList[2][1];
        this.num2 = todoList[4][1];
        this.num3 = todoList[0][1];
        this.num4 = todoList[3][1];
        this.num5 = todoList[1][1];
      }
    },err=>{
      alert(err)
    });
  }
  willGoPage(pageIndex){
    if (pageIndex==1){
      this.app.getRootNav().push(ScanCodePage)
    }
    else if(pageIndex == 2){

    }
    else if(pageIndex == 3){
      this.app.getRootNav().push(ScrapApplicationPage)
    }
    else if(pageIndex == 4){
      this.app.getRootNav().push(InventoryEnquiryPage)
    }
    else if(pageIndex == 5){
      this.app.getRootNav().push(InventoryDataDownloadPage)
    }
    else if(pageIndex == 9){
      this.app.getRootNav().push(ScrapApprovalPage)
    }
  }
}
