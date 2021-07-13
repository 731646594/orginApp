import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {PageUtil, StorageService} from "../../../../services/storageService";
import {BarcodeScanner,} from "@ionic-native/barcode-scanner";
import {File} from "@ionic-native/file";
import {ScanCodePage} from "../scanCode/scanCode";

@Component({
  selector: 'page-RFIDSpecScanList',
  templateUrl: 'RFIDSpecScanList.html'
})
export class RFIDSpecScanListPage{
  data=[];
  filterData=[];
  cardItem;
  userCode;
  type = "";
  page = 1;
  constructor(public navCtrl?:NavController,public storageService?:StorageService,public navParams?:NavParams,
              public events?:Events, public file?:File, public actionSheetCtrl?:ActionSheetController,
              public app?:App,public alertCtrl?:AlertController,public barcodeScanner?:BarcodeScanner) {
    PageUtil.pages["RFIDSpecScanList"]=this;
    this.type = this.navParams.get("type");
    this.cardItem={
      cardParent:[
        {itemName:"资产条码", itemType:"label",itemValue:"barCode"},
        {itemName:"资产名称", itemType:"label",itemValue:"assetsName"},
        {itemName:"规格型号", itemType:"label",itemValue:"assetsStandard"},
        {itemName:"资产状态", itemType:"label",itemValue:"checkResultName"},
      ]
    }
  }
  ionViewDidLoad(){
    this.userCode = this.storageService.read("loginUserCode");
    if(this.type=="will"){
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("willPlanDetail",this.userCode),[]).then(res=>{
        if (res.rows.length>0){
          this.data = JSON.parse(res.rows.item(0).stringData);
          this.getData();
        }
      });
    }else if(this.type=="exist"){
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
        if (res.rows.length>0){
          this.data = JSON.parse(res.rows.item(0).stringData);
          this.getData();
        }
      });
    }else if(this.type=="all"){
      let data1 = [];
      let data2 = [];
      let data3 = [];
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("willPlanDetail",this.userCode),[]).then(res=>{
        if (res.rows.length>0){
          data1 = JSON.parse(res.rows.item(0).stringData);
        }
        this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res2=>{
          if (res2.rows.length>0){
            data2 = JSON.parse(res2.rows.item(0).stringData);
          }
          this.data = [];
          this.data = this.data.concat(data1).concat(data2);
          this.getData();
        });
      });
    }else{
      let existData;
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
        if (res.rows.length>0){
          existData = JSON.parse(res.rows.item(0).stringData);
        }
          this.data = this.navParams.get("data");
          for (let x in this.data){
            for (let i in existData){
              if (existData[i].barCode&&existData[i].barCode==x){
                delete this.data[x];
                delete PageUtil.pages["RFIDSpecScan"].scanList[x];
              }
            }
          }
          this.getData();
      });
    }
  }
  getMore(infiniteScroll){
    this.getData(infiniteScroll);
    infiniteScroll.complete();
  }
  getData(infiniteScroll?:any){
    let item = this.data;
    let isFirst = true;
    let isScanList = false;
    for (let i in item){
      if (isFirst){
        if (i != '0'){
          isScanList = true;
        }
      }
      isFirst = false;
    }
    if (isScanList) {
      this.filterData = [];
      for (let i in item) {
        if (item[i]) {
          if (!item[i].checkResult || item[i].checkResult == '') {
            item[i].checkResultName = "未盘"
          } else if (item[i].checkResult == '1') {
            item[i].checkResultName = "已盘"
          }
          this.filterData.push(item[i]);
        }
      }
    }else {
      if (this.page == 1){
        this.filterData = [];
      }
      for (let i = (this.page - 1) * 10;i < this.page * 10;i++){
        if(item[i]){
          if(!item[i].checkResult||item[i].checkResult==''){
            item[i].checkResultName = "未盘"
          }else if(item[i].checkResult=='1'){
            item[i].checkResultName = "已盘"
          }
          this.filterData.push(item[i]);
        }else {
          if (infiniteScroll){
            infiniteScroll.complete();
          }
        }
      }
      this.page++;
    }
  }
  getSelectIndex(index){
    if(this.filterData[index].checkResultName=="未盘"||this.filterData[index].checkResultName=="已盘"){
      this.app.getRootNav().push(ScanCodePage,{barCode:this.filterData[index].barCode})
    }
  }
  getDeleteIndex(index){

  }
  deleteItem(){
    let filterData = [];
    for(let i=0;i<this.filterData.length;i++){
      if(this.filterData[i].checkedIcon){
        let key = this.filterData[i].barCode;
        delete PageUtil.pages["RFIDSpecScan"].scanList[key];
      }else {
        filterData.push(this.filterData[i])
      }
    }
    this.filterData = filterData;
  }
}
