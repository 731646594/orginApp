import { Component } from '@angular/core';
import { App, NavController} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {LocalDownloadQueryListDetailPage} from "../localDownloadQueryListDetail/localDownloadQueryListDetail";

@Component({
  selector: 'page-localDownloadQueryList',
  templateUrl: 'localDownloadQueryList.html'
})
export class LocalDownloadQueryListPage {
  planDetailList=[];
  planDetailListLength;
  userCode;
  constructor(public navCtrl: NavController,public storageService:StorageService,public app:App) {
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    this.userCode = this.storageService.read("loginUserCode");
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.planDetailList = JSON.parse(res.rows.item(0).stringData);
        this.planDetailListLength = JSON.parse(res.rows.item(0).stringData).length;
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
  }
  planListLocalDetailPage(planDetail){
    this.app.getRootNav().push(LocalDownloadQueryListDetailPage,{planDetail:planDetail})
  }
}
