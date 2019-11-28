import { Component } from '@angular/core';
import {
  AlertController, App, Events, LoadingController, NavController, NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ConfigProvider} from "../../../../services/config";

@Component({
  selector: 'page-maintenanceAlert',
  templateUrl: 'maintenanceAlert.html'
})
export class MaintenanceAlertPage{
  data;
  filterData;
  item;
  checkedData = null;
  searchValue = "";
  searchCon = [];
  searchSelect = "";
  displayIndex;
  checkBox = false;
  url;
  pageItem;
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
    this.data = this.navParams.get('data');
    this.data["checkClassName"] = ConfigProvider.checkClassName(this.data["checkClass"]);
    this.data["checkTypeName"] = ConfigProvider.checkTypeName(this.data["checkType"]);
    this.data["remindTypeName"] = ConfigProvider.remindTypeName(this.data["remindType"]);
    this.data["serviceClassName"] = ConfigProvider.serviceClassName(this.data["serviceClass"]);
    this.data["serviceTypeName"] = ConfigProvider.serviceTypeName(this.data["serviceType"]);
    if (this.navParams.get('checkBox')){
      this.checkBox = true;
      this.checkedData = "";
    }
    this.searchCon = [];
    this.searchSelect = "";
    this.url = "";
    this.pageItem = [
      {itemName:"保养标准编码",itemValue:"checkCode"},
      {itemName:"保养标准名称",itemValue:"checkName"},
      {itemName:"设备类别编码",itemValue:"assetsCode"},
      {itemName:"设备类别名称",itemValue:"asstesName"},
      {itemName:"保养类别",itemValue:"checkClassName"},
      {itemName:"保养依据",itemValue:"checkTypeName"},
      {itemName:"保养方式",itemValue:"serviceTypeName"},
      {itemName:"责任岗位",itemValue:"serviceClassName"},
      {itemName:"保养内容",itemValue:"serviceContent"},
      {itemName:"保养周期",itemValue:"checkTime"},
      {itemName:"保养完好标准",itemValue:"serviceEnding"},
      {itemName:"提醒时间间隔",itemValue:"remindTime"},
      {itemName:"提醒次数",itemValue:"remindNum"},
      {itemName:"提醒方式",itemValue:"remindTypeName"},
    ]

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

  getSelectValue(value, key) {
    this.data[key] = value["selectedValue"];
  }
  returnSelect(){
    let modelData = {selectedData:this.checkedData};
    if (this.checkBox){
      modelData = {selectedData:{userName:this.checkedData}};
    }
    this.viewCtrl.dismiss(modelData);
  }
}
