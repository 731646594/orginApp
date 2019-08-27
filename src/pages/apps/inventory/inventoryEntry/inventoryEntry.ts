import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {InventoryPage} from "../../../commonStyle/inventory/inventory";

@Component({
  selector: 'page-inventory',
  templateUrl: '../../../commonStyle/inventory/inventory.html'
})
export class InventoryEntryPage  extends InventoryPage{
  departments;
  constructor(public navCtrl?:NavController,public storageService?:StorageService,public navParams?:NavParams,public events?:Events,
              public camera?:Camera,public file?:File, public actionSheetCtrl?:ActionSheetController,
              public app?:App,public alertCtrl?:AlertController,public barcodeScanner?:BarcodeScanner) {
    super(navCtrl,storageService,navParams,events);
    this.invoice["barCode"] = this.navParams.get("barCode");
    this.data={
      pageName:"盘盈录入",
      pageData:{
        pageItem:[
          {itemName:"盘点单位", itemType:"select",nec:0, itemValue:"managerDepart",optionValueString:"departCode",optionNameString:"departName", option:this.departments,},
          {itemName:"资产条码", itemType:"input",inputType:"text",nec:0,itemValue:"barCode"},
          {itemName:"资产名称", itemType:"input",inputType:"text",nec:1,itemValue:"assetsName"},
          {itemName:"规格型号", itemType:"input",inputType:"text",nec:0,itemValue:"assetsStandard"},
          {itemName:"盘盈原因", itemType:"selectFilter",nec:1,dataName:"lossReasonData", itemValue:["lossReason","lossReasonName"],optionValueString:"complexcode",optionNameString:"complexname"},
          {itemName:"存放地点", itemType:"selectFilter",nec:1,dataName:"storePlaceData", itemValue:["storePlace","storePlaceName"],optionValueString:"complexcode",optionNameString:"complexname"},
          {itemName:"保管人", itemType:"input",inputType:"text",nec:1,itemValue:"userPerson"},
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
    this.pageName = this.data["pageName"];
    this.pageData = this.data["pageData"];
    this.invoice["usedState"]="010101";
    this.invoice["usedStateName"]="生产经营用-科研";
    this.invoice["technicalCondition"]="01";
    this.invoice["technicalConditionName"]="完好";
    // this.selectFilterData["departments"]=[];
    this.selectFilterData["storePlaceData"]=[];
    this.selectFilterData["lossReasonData"]=[];
    this.imgBox = "imgBox2";
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.departments = JSON.parse(res.rows.item(0).stringData)["departments"];
        this.pageData.pageItem[0].option = this.departments;
        if (this.departments){
          this.invoice["managerDepart"]=this.departments[0].departCode;
          this.invoice["managerDepartName"]=this.departments[0].departName;
        }
      }
    });
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("storePlaceData",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.selectFilterData["storePlaceData"] = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("lossReasonData",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.selectFilterData["lossReasonData"] = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_3:"+JSON.stringify(e)));

  }
  scan() {
    let options: BarcodeScannerOptions = {
      preferFrontCamera: false,//前置摄像头
      showFlipCameraButton: true,//翻转摄像头按钮
      showTorchButton: true,//闪关灯按钮
      prompt: '扫描中……',//提示文本
      // formats: 'QR_CODE',//格式
      orientation: 'portrait',//方向
      torchOn: false,//启动闪光灯
      resultDisplayDuration: 500,//显示扫描文本
      disableSuccessBeep: true // iOS and Android
    };
    this.barcodeScanner
      .scan(options)
      .then((data) => {
        this.invoice["barCode"] = data.text;
        if(!this.invoice["barCode"]){
          let alert = this.alertCtrl.create({
            title:"请输入或扫描资产条码！"
          });
          alert.present();
          return false;
        }
      })
      .catch((err) => {
        const alert = this.alertCtrl.create({
          title: 'Attention!',
          subTitle: err,
          buttons: ['Close']
        });
        alert.present();
      });
  }
  saveInfo(){
    let j = this.pageData.pageItem.filter((item) => {
      if(item.itemValue.constructor==Array){
        return (item.nec==1&&!this.invoice[item.itemValue[0]]&&this.invoice[item.itemValue[0]]!="0");
      }else {
        return (item.nec==1&&!this.invoice[item.itemValue]&&this.invoice[item.itemValue]!="0");
      }
    });
    if (j.length>0){
      let alertCtrl = this.alertCtrl.create({
        title:"请填写"+j[0].itemName
      });
      alertCtrl.present();
      return false;
    }
    let  regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
      regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

    if(regEn.test( this.invoice["remark"]) || regCn.test(this.invoice["remark"])) {
      let alertCtrl = this.alertCtrl.create({
        title:"备注不能包含特殊字符"
      });
      alertCtrl.present();
      return false;
    }
    if(this.uploadFile.length==0){
      let alertCtrl = this.alertCtrl.create({
        title:"请添加照片"
      });
      alertCtrl.present();
      return false;
    }
    this.invoice["uploadFile"] = [];
    this.invoice["uploadFile"] = this.invoice["uploadFile"].concat(this.uploadFile);
    this.invoice["checkResult"] = "3";
    let invoiceList = [];
    let isReplace = false;
    isReplace = false;
    invoiceList = [];
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        invoiceList = JSON.parse(res.rows.item(0).stringData);
        for (let i in invoiceList){
          if (invoiceList[i]["barCode"] == this.invoice["barCode"]){
            invoiceList[i] = this.invoice;
            isReplace = true;
          }
        }
        if (!isReplace){
          invoiceList.push(this.invoice)
        }
      }else {
        invoiceList[0]=this.invoice;
      }
      this.storageService.sqliteInsert("newPlanDetail",this.userCode,JSON.stringify(invoiceList));
      let alertCtrl = this.alertCtrl.create({
        title:"保存成功！"
      });
      alertCtrl.present();
      for(let key in this.invoice){
        if (key != "lossReason"&&key != "lossReasonName"&&key != "storePlace"&&key != "storePlaceName"){
          this.invoice[key] = "";
        }
      }
      this.invoice["managerDepart"]=this.departments[0].departCode;
      this.invoice["managerDepartName"]=this.departments[0].departName;
      this.invoice["usedState"]="010101";
      this.invoice["usedStateName"]="生产经营用-科研";
      this.invoice["technicalCondition"]="01";
      this.invoice["technicalConditionName"]="完好";
      this.getAndShowPics([]);
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
  }
}
