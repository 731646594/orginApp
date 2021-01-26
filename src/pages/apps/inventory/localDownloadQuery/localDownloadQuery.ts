import { Component } from '@angular/core';
import { App, NavController} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {LocalDownloadQueryListPage} from "../localDownloadQueryList/localDownloadQueryList";
import {HttpService} from "../../../../services/httpService";

@Component({
  selector: 'page-localDownloadQuery',
  templateUrl: 'localDownloadQuery.html'
})
export class LocalDownloadQueryPage {
  planList;
  userCode;
  pageName = '本地下载查询';
  constructor(public navCtrl: NavController,public storageService:StorageService,
              public app:App,public httpService:HttpService) {
    if (this.httpService.getUrl() == 'http://swapp.0731ctny.com:/plamassets/mobile/'){
      this.pageName = '盘点台账'
    }
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    this.userCode = this.storageService.read("loginUserCode");
    this.planList = [];
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.planList[0] = JSON.parse(res.rows.item(0).stringData);
        this.planList[0]["departRange"] = "";
        for (let i = 0;i<this.planList[0].departments.length;i++){
          this.planList[0].departRange += this.planList[0].departments[i].departName+"，"
        }
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
  }
  planListLocalPage(){
    this.app.getRootNav().push(LocalDownloadQueryListPage)
  }
}
