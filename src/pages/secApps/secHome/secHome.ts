import { Component,Renderer } from '@angular/core';
import {AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";
import {SecCustomizedPage} from "../secCustomized/secCustomized";
import * as $ from "jquery";
@Component({
  selector: 'page-secHome',
  templateUrl: 'secHome.html'
})
export class SecHomePage {
  appData = [];
  disAppData = [];
  showTitle = 'affair';
  affairData = [{text:'11111',state:'0'},{text:'22222',state:'0'},{text:'33333',state:'0'},{text:'11111',state:'0'},{text:'22222',state:'0'},{text:'33333',state:'0'}];
  noticeData = [{text:'aaaaa',state:'0'},{text:'bbbbb',state:'0'},{text:'ccccc',state:'0'},{text:'aaaaa',state:'0'},{text:'bbbbb',state:'0'},{text:'ccccc',state:'0'}];
  constructor(public app:App,public navCtrl: NavController,public storageService:StorageService, public httpService:HttpService,public navParams:NavParams,public alertCtrl:AlertController,public events:Events,
              public render:Renderer) {
    this.appData = this.storageService.read('appData')||[];
    this.disAppData = this.formatApp(JSON.parse(JSON.stringify(this.appData)));
    this.events.subscribe('setApp',()=>{
      this.appData = this.storageService.read('appData');
      this.disAppData = this.formatApp(JSON.parse(JSON.stringify(this.appData)));
      setTimeout(()=>{this.switchHeight()},100);
    })
  }
  ionViewDidEnter(){
    this.switchHeight();
  }
  switchHeight(){
    let height = $('.splitBar').height() + $('.appsButtonBigBox').height() + $('.applicationToolbar').innerHeight();
    let bodyHeight = $('.pageCon').height();
    $('.switchScroll').height(bodyHeight - height);
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
  goToCus(){
    this.app.getRootNav().push(SecCustomizedPage)
  }
  willGoPage(pageIndex){

  }
}
