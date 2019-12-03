import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {PageUtil,StorageService} from "../../../../services/storageService";
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
  page = 0;
  filterData=[];
  cardItem;
  userCode;
  type = "";
  constructor(public navCtrl?:NavController,public storageService?:StorageService,public navParams?:NavParams,
              public events?:Events, public file?:File, public actionSheetCtrl?:ActionSheetController,
              public app?:App,public alertCtrl?:AlertController,public barcodeScanner?:BarcodeScanner) {
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
          this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
            if (res.rows.length>0){
              data2 = JSON.parse(res.rows.item(0).stringData);
              this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
                if (res.rows.length>0){
                  data3 = JSON.parse(res.rows.item(0).stringData);
                }
                this.data = [];
                this.data = this.data.concat(data1).concat(data2).concat(data3);
                this.getData();
              });
            }
          });
        }
      });
    }else{
      this.data = []
      PageUtil.pages["RFIDScan"].ionViewDidEnter();
      PageUtil.pages["RFIDScan"].beginScan();
      this.data = PageUtil.pages["RFIDScan"].scanPlan;
      this.getData();
    }
  }
  getMore(infiniteScroll){
    this.getData();
    infiniteScroll.complete();
  }
  getData(){
    let item = this.data;
    let i = this.page*10;
    for (i;i<(this.page*10+10);i++){
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
      else {
        this.page=-1
      }
    }
    if (this.page!=-1){
      this.page++;
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
    for(let i=0;i<this.filterData.length;i++){
      if(this.filterData[i].checkedIcon){
        this.filterData.splice(i,1);
        PageUtil.pages["RFIDScan"].scanPlan.splice(i,1);
        PageUtil.pages["RFIDScan"].numList["scan"]--;
      }
    }
  }
}
