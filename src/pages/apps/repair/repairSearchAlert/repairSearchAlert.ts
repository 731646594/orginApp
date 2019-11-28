import { Component } from '@angular/core';
import {
  AlertController, App, Events, LoadingController, ModalController, NavController, NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ConfigProvider} from "../../../../services/config";
import {RepairSearchFilterAlertPage} from "../repairSearchFilterAlert/repairSearchFilterAlert";

@Component({
  selector: 'page-repairSearchAlert',
  templateUrl: 'repairSearchAlert.html'
})
export class RepairSearchAlertPage{
  data;
  filterData;
  item;
  checkedData = null;
  searchValue = "";
  searchCon = [];
  searchSelect = "";
  displayIndex;
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
              public viewCtrl?:ViewController,
              public modalCtrl?:ModalController) {
    this.data = {};
    this.searchCon = [];
    this.searchSelect = "";
    this.url = "";
    this.filterData = JSON.parse(JSON.stringify(this.data));
    this.data["wxdh"] = "";
    this.data["djzt"] = "";
    this.data["departName"] = "";
    this.data["departCode"] = "";
    this.data["complexname"] = "";
    this.data["complexcode"] = "";
    this.data["sscs"] = "";
    this.pageItem = [
      {itemName:"维修单号", itemType:"input",itemValue:"wxdh"},
      {itemName:"单据状态", itemType:"select", itemValue:"djzt",itemValueName:"djztName",optionValueString:"value",optionNameString:"name",
        option:ConfigProvider.djzt,
      },
      {itemName:"申请单位", itemType:"filter",itemValue:"departName",itemValueName:"departCode"},
      {itemName:"维修方式", itemType:"filter",itemValue:"complexname",itemValueName:"complexcode"},
      {itemName:"所属城市", itemType:"input",itemValue:"sscs"},
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

  getSelectValue(value, key,name) {
    this.data[key] = value["selectedValue"];
    this.data[name] = value["selectedName"]
  }
  returnSelect(){
    this.httpService.postData(this.httpService.getUrl2()+"lhd/app/devRepairQueryAppContoller.do?prepairOrderDetail",{
      prepairOrderNum:this.data["wxdh"],
      orderStatus:this.data["djzt"],
      applyComCode:this.data["departCode"],
      prepairMethod:this.data["complexname"],
      cityName:this.data["sscs"],
      page:1,rows:20
    },(data)=>{
      console.log(data);
      this.checkedData = data.obj.rows;
      for (let i in this.checkedData){
        this.checkedData[i]["djztName"] = ConfigProvider.djztName(this.checkedData[i]["djzt"])
      }
      let modelData = {selectedData:this.checkedData};
      this.viewCtrl.dismiss(modelData);
    },true)
  }
  showDictionaries(value,name){
    let url = "";
    let body = {};
    let content = {};
    if (value == "departName"){
      url = "lhd/app/devRepairQueryAppContoller.do?departDetail";
      content = { searchCon:[
          {value : "ognizationName", text : '名称'},
          {value : "ognizationCode", text : '编码'},
        ],
        searchSelect:"ognizationName",
        item:{
          parent:[
            {itemName:"名称",itemValue:"departName"},
            {itemName:"编码",itemValue:"departCode"},
          ],
        },
        url:url
      }
    }else if (value == "complexname"){
      url = "lhd/app/devRepairQueryAppContoller.do?prepairMethodDetail";
      content = { searchCon:[
          {value : "complexName", text : '名称'},
          {value : "complexCode", text : '编码'},
        ],
        searchSelect:"complexName",
        item:{
          parent:[
            {itemName:"名称",itemValue:"complexname"},
            {itemName:"编码",itemValue:"complexcode"},
          ],
        },
        url:url
      }
    }
    this.httpService.postData(this.httpService.getUrl2() + url, body, (data)=> {
      let data1 = data.obj.rows;
      let body = {data:data1,content:content}
      this.createDictionariesPage(RepairSearchFilterAlertPage,body,name,value)
    },true);
  }
  createDictionariesPage(pageUrl,body,name,value){
    let modal = this.modalCtrl.create(pageUrl,body,{
    });
    modal.present();
    modal.onDidDismiss(data=>{
      if(data&&data.selectedData){
        console.log(data.selectedData)
        this.data[name] = data.selectedData[name];
        this.data[value] = data.selectedData[value];
      }
    })
  }
}
