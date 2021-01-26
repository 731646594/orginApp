import { Component } from '@angular/core';
import { App, NavController} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";

@Component({
  selector: 'page-localDownloadQueryList',
  templateUrl: 'localDownloadQueryList.html'
})
export class LocalDownloadQueryListPage {
  planDetailList=[];
  planDetailListLength;
  userCode;
  displayIndex;
  pageName = '本地下载列表';
  constructor(public navCtrl: NavController,public storageService:StorageService,
              public app:App,public httpServe:HttpService) {
    if (this.httpServe.getUrl() == 'http://swapp.0731ctny.com:/plamassets/mobile/'){
      this.pageName = '台账列表'
    }
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
  displayContent(index){
    let content = document.getElementsByClassName("disContent");
    if ((<HTMLElement>content[index]).style.display=="block"){
      (<HTMLElement>content[index]).style.display="none";
    }else {
      if(this.displayIndex>=0){
        (<HTMLElement>content[this.displayIndex]).style.display="none";
      }
      (<HTMLElement>content[index]).style.display="block";
      this.displayIndex = index;
    }
  }
}
