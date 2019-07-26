import { Component } from '@angular/core';
import { App, NavController, NavParams} from 'ionic-angular';
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
              public navParams:NavParams,public app:App) {
    // this.loadData();
  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.httpService.postData(this.httpService.getUrl()+"cellPhoneControllerOffline/phonecheckplandownload.do",{userCode:this.userCode,departCode:this.departCode},data=>{
      if (data.success == "true"){
        this.planList=data.data;
        this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
          if (res.rows.length>0){
            for (let i=0;i<=this.planList.length;i++){
              let plan;
              plan = this.planList[i];
              try {
                if (JSON.parse(res.rows.item(0).stringData)["planNumber"]==plan["planNumber"]){
                  this.planList[i]["isDownLoad"]=true;
                }
              }catch {}
            }
          }
        }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
      }else {
        alert(data.msg)
      }
    },true);

  }
  detailPage(plan){
    this.app.getRootNav().push(InventoryDataDownloadDetailPage,{plan:plan})
  }
}
