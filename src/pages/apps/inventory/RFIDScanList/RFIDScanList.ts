import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {PageUtil, StorageService} from "../../../../services/storageService";
import {BarcodeScanner,} from "@ionic-native/barcode-scanner";
import {File} from "@ionic-native/file";
import {ScanCodePage} from "../scanCode/scanCode";
import {InventoryEntryPage} from "../inventoryEntry/inventoryEntry";

@Component({
  selector: 'page-RFIDScanList',
  templateUrl: 'RFIDScanList.html'
})
export class RFIDScanListPage{
  data=[];
  filterData=[];
  cardItem;
  userCode;
  type = "";
  constructor(public navCtrl?:NavController,public storageService?:StorageService,public navParams?:NavParams,
              public events?:Events, public file?:File, public actionSheetCtrl?:ActionSheetController,
              public app?:App,public alertCtrl?:AlertController,public barcodeScanner?:BarcodeScanner) {
    PageUtil.pages["RFIDScanList"]=this;
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
  ionViewDidEnter(){
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
    }else if(this.type=="new"){
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
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
          this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res3=>{
            if (res3.rows.length>0){
              data3 = JSON.parse(res3.rows.item(0).stringData);
            }
            this.data = [];
            this.data = this.data.concat(data1).concat(data2).concat(data3);
            this.getData();
          });
        });
      });
    }else{
      let existData;
      let newData;
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
        if (res.rows.length>0){
          existData = JSON.parse(res.rows.item(0).stringData);
        }
        this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
          if (res.rows.length>0){
            newData = JSON.parse(res.rows.item(0).stringData);
          }
          this.data = this.navParams.get("data");
          for (let x in this.data){
            for (let i in existData){
              if (existData[i].barCode&&existData[i].barCode==x){
                delete this.data[x];
                delete PageUtil.pages["RFIDScan"].scanList[x];
              }
            }
            for (let i in newData){
              if (newData[i].barCode&&newData[i].barCode==x){
                delete this.data[x];
                delete PageUtil.pages["RFIDScan"].scanList[x];
              }
            }
          }

          this.getData();
        });
      });
    }
  }
  getMore(infiniteScroll){
    this.getData();
    infiniteScroll.complete();
  }
  getData(){
    let item = this.data;
    this.filterData = [];
    for (let i in item){
      if(item[i]){
        if(!item[i].checkResult||item[i].checkResult==''){
          item[i].checkResultName = "未盘"
        }else if(item[i].checkResult=='1'){
          item[i].checkResultName = "已盘"
        }else{
          item[i].checkResultName = "盘盈"
        }
        this.filterData.push(item[i]);
      }
    }
  }
  getSelectIndex(index){
    if(this.filterData[index].checkResultName=="未盘"||this.filterData[index].checkResultName=="已盘"){
      this.app.getRootNav().push(ScanCodePage,{barCode:this.filterData[index].barCode})
    }
    else if(this.filterData[index].checkResultName=="盘盈"){
      this.app.getRootNav().push(InventoryEntryPage,{barCode:this.filterData[index].barCode})
    }
  }
  getDeleteIndex(index){

  }
  deleteItem(){
    let filterData = [];
    for(let i=0;i<this.filterData.length;i++){
      if(this.filterData[i].checkedIcon){
        let key = this.filterData[i].barCode;
        delete PageUtil.pages["RFIDScan"].scanList[key];
      }else {
        filterData.push(this.filterData[i])
      }
    }
    this.filterData = filterData;
  }
}
