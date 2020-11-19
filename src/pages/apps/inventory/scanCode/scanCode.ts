import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {BarcodeScanner,} from "@ionic-native/barcode-scanner";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {InventoryPage} from "../../../commonStyle/inventory/inventory";
import {InventoryEntryPage} from "../inventoryEntry/inventoryEntry";
import {HttpService} from "../../../../services/httpService";

@Component({
  selector: 'page-inventory',
  templateUrl: '../../../commonStyle/inventory/inventory.html'
})
export class ScanCodePage extends InventoryPage{
  constructor(public navCtrl?:NavController,public storageService?:StorageService,public navParams?:NavParams,public events?:Events,
              public camera?:Camera,public file?:File, public actionSheetCtrl?:ActionSheetController,
              public app?:App,public alertCtrl?:AlertController,public barcodeScanner?:BarcodeScanner,public httpService?:HttpService) {
    super(navCtrl,storageService,navParams,events);
    this.data={
      pageName:"快速扫码",
      pageData:{
        pageItem:[
          {itemName:"资产条码", itemType:"input",inputType:"text",nec:0,searchButton:true,itemValue:"barCode"},
          {itemName:"盘点单位", itemType:"label",nec:0,itemValue:"managerDepartName"},
          {itemName:"资产编码", itemType:"label",nec:0,itemValue:"assetsCode"},
          {itemName:"使用状态", itemType:"select",nec:1, itemValue:"usedState",optionValueString:"optionValue",optionNameString:"optionName",
            option:[
              {optionName:"生产经营用-科研",optionValue:"010101"},
              {optionName:"生产经营用-其他",optionValue:"010102"},
              {optionName:"非生产经营用",optionValue:"0102"},
              {optionName:"季节性经营停用",optionValue:"0201"},
              {optionName:"其他原因停用",optionValue:"0202"},
              {optionName:"经营场所备用",optionValue:"0203"},
              {optionName:"闲置",optionValue:"0204"},
              {optionName:"租出",optionValue:"03"},
              {optionName:"借出",optionValue:"04"},
            ],
          },
          {itemName:"资产名称", itemType:"label",nec:0,itemValue:"assetsName"},
          {itemName:"规格型号", itemType:"input",inputType:"text",nec:0,itemValue:"assetsStandard"},
          {itemName:"车牌井号", itemType:"input",inputType:"text",nec:0,itemValue:"licenceNumber"},
          {itemName:"存放地点", itemType:"selectFilter",nec:1,dataName:"storePlaceData", itemValue:["storePlace","storePlaceName"],optionValueString:"complexcode",optionNameString:"complexname"},
          {itemName:"保管人", itemType:"input",inputType:"text",nec:1,itemValue:"userPerson"},
          {itemName:"贴码状态", itemType:"select",nec:1, itemValue:"realcodeStatus",optionValueString:"optionValue",optionNameString:"optionName",
            option:[
              {optionName:"相符",optionValue:"0"},
              {optionName:"不符",optionValue:"1"},
            ],
          },
          {itemName:"技术状况", itemType:"select",nec:1, itemValue:"technicalCondition",optionValueString:"optionValue",optionNameString:"optionName",
            option:[
              {optionName:"完好",optionValue:"01"},
              {optionName:"带病运行",optionValue:"02"},
              {optionName:"在修",optionValue:"03"},
              {optionName:"待修",optionValue:"04"},
              {optionName:"待报废",optionValue:"05"},
              {optionName:"损毁",optionValue:"06"},
              {optionName:"待处置",optionValue:"07"},
              {optionName:"已处置",optionValue:"08"},
            ],
          },
          {itemName:"备注", itemType:"input",inputType:"text",nec:0,itemValue:"remark"},
        ]
      }
    };
    if(this.httpService.getUrl()=="http://210.12.193.123:9081/plamassets/mobile/"){
      this.data['pageData'].pageItem[0].itemType = 'label'
    }
    this.pageName = this.data["pageName"];
    this.pageData = this.data["pageData"];
    this.invoice["usedState"]="010101";
    this.invoice["usedStateName"]="生产经营用-科研";
    this.invoice["realcodeStatus"]="0";
    this.invoice["technicalCondition"]="01";
    this.invoice["technicalConditionName"]="完好";
    this.nextPage = InventoryEntryPage;
    this.selectFilterData["storePlaceData"]=[];
    this.imgBox = "imgBox";
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("storePlaceData",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.selectFilterData["storePlaceData"] = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
    if(this.navParams.get("barCode")){
      this.invoice["barCode"] = this.navParams.get("barCode");
      this.searchLocalPlanDetail()
    }
  }
}
