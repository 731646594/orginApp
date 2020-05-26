import { Component } from '@angular/core';
import {
  AlertController, App, Events, LoadingController, NavController, NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
@Component({
  selector: 'page-dayReportEntryDetailAlert',
  templateUrl: 'dayReportEntryDetailAlert.html'
})
export class DayReportEntryDetailAlertPage{
  data;
  filterData;
  item;
  checkedData = [];
  nowIndex = -1;
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
    this.checkedItemRadio(i)
  }
  checkedItemRadio(index){
    if (this.filterData[index]["checkedIcon"]){
      this.filterData[index]["checkedIcon"] = false;
      for (let i in this.checkedData){
        if (this.checkedData[i].text == this.filterData[index].text){
          delete this.checkedData[i]
        }
      }
    }else {
      this.filterData[index]["checkedIcon"] = true;
      this.checkedData.push(this.filterData[index]);
    }
    this.nowIndex = index;
  }
  returnSelect(){
    if (this.checkedData.length==0){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择在班人员"
      });
      alertCtrl.present();
      return false
    }
    let modelData = {selectedData:this.checkedData};
    this.viewCtrl.dismiss(modelData);
  }
}
