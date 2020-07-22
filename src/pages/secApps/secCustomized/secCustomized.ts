import { Component } from '@angular/core';
import {AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";
@Component({
  selector: 'page-secCustomized',
  templateUrl: 'secCustomized.html'
})
export class SecCustomizedPage {
  appData = [
    {src:'assets/homePageImgs/zzpd@2x.png',text:'正在盘点'},
    {src:'assets/homePageImgs/wpjh@2x.png',text:'未盘计划'},
    {src:'assets/homePageImgs/dbsp@2x.png',text:'调拨审批'},
    {src:'assets/homePageImgs/dcqr@2x.png',text:'调出确认'},
    // {src:'assets/homePageImgs/drqr@2x.png',text:'调入确认'},
    // {src:'assets/homePageImgs/zzpd@2x.png',text:'报废审批'}
  ];
  allAppData = [];
  data = [];
  disAppData = [];
  disAllAppData = [];
  constructor(public app:App,public navCtrl: NavController,public storageService:StorageService, public httpService:HttpService,public navParams:NavParams,public alertCtrl:AlertController,public events:Events) {
    this.data = [
      {src:'assets/homePageImgs/zzpd@2x.png',text:'正在盘点'},
      {src:'assets/homePageImgs/wpjh@2x.png',text:'未盘计划'},
      {src:'assets/homePageImgs/dbsp@2x.png',text:'调拨审批'},
      {src:'assets/homePageImgs/dcqr@2x.png',text:'调出确认'},
      {src:'assets/homePageImgs/drqr@2x.png',text:'调入确认'},
      {src:'assets/homePageImgs/zzpd@2x.png',text:'报废审批'}
    ];
    this.appData = this.storageService.read('appData')||[];
    let temp = [];
    temp = temp.concat(JSON.parse(JSON.stringify(this.data)));
    for (let j = this.appData.length - 1;j >= 0; j--){
      for (let i = temp.length - 1;i >= 0; i--){
        if (temp[i].text == this.appData[j].text){
          temp.splice(i,1)
        }
      }
    }
    this.allAppData = temp;
    this.disAppData = this.formatApp(JSON.parse(JSON.stringify(this.appData)));
    this.disAllAppData = this.formatApp(JSON.parse(JSON.stringify(this.allAppData)));
  }
  ionViewDidEnter(){
  }
  formatApp(appData){
    let disAppData = [];
    if (appData.length%3 == 1){
      appData.push({src:'',text:''});
      appData.push({src:'',text:''});
    }else if(appData.length%3 == 2){
      appData.push({src:'',text:''});
    }
    let temp = [];
    for (let i in appData){
      temp.push(appData[i]);
      if (parseInt(i)%3 == 2){
        disAppData.push(temp);
        temp = [];
      }
    }
    return disAppData;
  }

  willGoPage(pageIndex){

  }
  deleteApp(i,i2){
    let j = i*3 + i2;
    this.allAppData.push(this.appData[j]);
    this.appData.splice(j,1);
    this.disAppData = this.formatApp(JSON.parse(JSON.stringify(this.appData)));
    this.disAllAppData = this.formatApp(JSON.parse(JSON.stringify(this.allAppData)));
  }
  addApp(i,i2){
    let j = i*3 + i2;
    this.appData.push(this.allAppData[j]);
    this.allAppData.splice(j,1);
    this.disAppData = this.formatApp(JSON.parse(JSON.stringify(this.appData)));
    this.disAllAppData = this.formatApp(JSON.parse(JSON.stringify(this.allAppData)));
  }
  saveData(){
    this.storageService.write('appData',this.appData);
    this.events.publish('setApp');
    this.app.getRootNav().pop()
  }
}
