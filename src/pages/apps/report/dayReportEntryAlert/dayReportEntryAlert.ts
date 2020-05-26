import { Component } from '@angular/core';
import {
  AlertController, App, Events, LoadingController, ModalController, NavController, NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {DatePipe} from "@angular/common";
import * as $ from "jquery";

@Component({
  selector: 'page-dayReportEntryAlert',
  templateUrl: 'dayReportEntryAlert.html'
})
export class DayReportEntryAlertPage{
  data;
  pageItem;

  displayFormat = "YYYY-MM-DD";
  minDate;
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
              public viewCtrl?:ViewController,
              public modalCtrl?:ModalController,
              public datePipe?:DatePipe) {
    this.data = {};
    let date = new Date();
    this.data["dateValue"] = this.datePipe.transform(date,"yyyy-MM-dd");
    this.minDate = this.datePipe.transform(date,"yyyy-MM-dd")
    this.pageItem = [
      {itemName:"统计名称", itemType:"input",itemValue:"name"},
      {itemName:"统计日期", itemType:"date",itemValue:"date"},
    ]
  }
  ionViewDidEnter(){
    let bpt = $("page-dayReportEntryAlert .backgroundBox").css("paddingTop");
    let bptNum = parseFloat(bpt.replace("px",""));
    let bpb = $("page-dayReportEntryAlert .backgroundBox").css("paddingBottom");
    let bpbNum = parseFloat(bpb.replace("px",""));
    let fmt = $("page-dayReportEntryAlert .formFooter").css("marginBottom");
    let fmtNum = parseFloat(fmt.replace("px",""));
    window.addEventListener('native.keyboardshow', (e) => {
      $("page-dayReportEntryAlert .backgroundBox").css("paddingTop",bptNum - (<any>e).keyboardHeight/2);
      $("page-dayReportEntryAlert .backgroundBox").css("paddingBottom",bpbNum - (<any>e).keyboardHeight/2);
      $("page-dayReportEntryAlert .formFooter").css("marginBottom",fmtNum - (<any>e).keyboardHeight/2);
    });

    window.addEventListener('native.keyboardhide', () => {
      $("page-dayReportEntryAlert .backgroundBox").css("paddingTop",bptNum);
      $("page-dayReportEntryAlert .backgroundBox").css("paddingBottom",bpbNum);
      $("page-dayReportEntryAlert .formFooter").css("marginBottom",fmtNum);

    });
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
  getInputValue(value, key) {
    this.showFooter();
    this.data[key] = value;
  }

  returnSelect(){
    if (!this.data.name){
      let alertCtrl2 = this.alertCtrl.create({
        title:"请填写统计名称"
      });
      alertCtrl2.present();
      return false
    }
    if (!this.data.date){
      let alertCtrl2 = this.alertCtrl.create({
        title:"请选择统计日期"
      });
      alertCtrl2.present();
      return false
    }
    let modelData = {name:this.data.name,date:this.data.date};
    this.viewCtrl.dismiss(modelData);
  }

}
