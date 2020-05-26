import { Component } from '@angular/core';
import {
  AlertController, App, Events, LoadingController, NavController, NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
@Component({
  selector: 'page-dayReportSupplementAlert',
  templateUrl: 'dayReportSupplementAlert.html'
})
export class DayReportSupplementAlertPage{
  data;
  filterData;
  item;
  checkedData = null;
  upperButton = false;
  nowIndex = -1;
  parentIndex = -1;
  constructor(
    public storageService?: StorageService,
    public events?: Events,
    public alertCtrl?: AlertController,
    public app?: App,
    public toastCtrl?: ToastController,
    public loadingCtrl?: LoadingController,
    public httpService?: HttpService,
    public navCtrl?: NavController,
    public navParams?: NavParams,
    public viewCtrl?:ViewController) {
    if (this.navParams.get("data").length>0){
      this.data = this.navParams.get("data");
      this.filterData = JSON.parse(JSON.stringify(this.data));
    }
    this.item = this.navParams.get("content").item;
  }
  ionViewDidEnter(){

  }
  back(){
    let modelData: string = '-1';
    this.viewCtrl.dismiss(modelData);
  }
  showFooter(){
    this.events.publish("showFooter");
  }
  hideFooter(){
    this.events.publish("hideFooter")
  }
  showChildren(i){
    if (this.filterData[i].children.length>0){
      this.parentIndex++;
      if (this.filterData[this.nowIndex]&&this.filterData[this.nowIndex].checkedIcon){
        this.filterData[this.nowIndex].checkedIcon = false;
      }
      this["parentData"+this.parentIndex] = this.filterData;
      this.filterData = JSON.parse(JSON.stringify(this.filterData[i].children));
      this.upperButton = true;
      this.checkedData = null;
    }else {
      this.checkedItemRadio(i)
    }
  }
  checkedItemRadio(index){
    for (let i in this.filterData){
      this.filterData[i]["checkedIcon"] = false;
    }
    this.filterData[index]["checkedIcon"] = true;
    this.checkedData = this.filterData[index];
    this.nowIndex = index;
    this.upperButton = true;
    if (this.parentIndex==-1){
      this.upperButton = false;
    }
  }
  goTosj(){
    this.filterData = this["parentData"+this.parentIndex];
    this.upperButton = true;
    this.parentIndex--;
    if (this.parentIndex==-1){
      this.upperButton = false;
    }
    this.checkedData = null;
  }
  returnSelect(){
    if (!this.checkedData){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择目标部门"
      });
      alertCtrl.present();
      return false
    }
    if (this.checkedData.marktail==0){
      let alertCtrl = this.alertCtrl.create({
        title:"非明细及单位，无需维护信息！"
      });
      alertCtrl.present();
      return false
    }
    let modelData = {selectedData:this.checkedData};
    this.viewCtrl.dismiss(modelData);
  }
}
