import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
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
  constructor(public navCtrl?:NavController,public storageService?:StorageService,public navParams?:NavParams,
              public events?:Events, public file?:File, public actionSheetCtrl?:ActionSheetController,
              public app?:App,public alertCtrl?:AlertController,public barcodeScanner?:BarcodeScanner) {
    if (this.navParams.get("data")){
      this.data = this.navParams.get("data");
      this.getData();
    }
    this.cardItem={
      cardParent:[
        {itemName:"资产条码", itemType:"label",itemValue:"barCode"},
        {itemName:"资产名称", itemType:"label",itemValue:"assetsName"},
        {itemName:"规格型号", itemType:"label",itemValue:"assetsStandard"},
        {itemName:"资产状态", itemType:"label",itemValue:"checkResultName"},
      ]
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
    alert(this.filterData[index].barCode)
  }
}
