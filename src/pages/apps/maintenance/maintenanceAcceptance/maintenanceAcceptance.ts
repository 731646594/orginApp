import {Component} from '@angular/core';
import {
  ActionSheetController, AlertController, App, Events, ModalController, NavController,
  NavParams
} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";
import {DatePipe} from "@angular/common";
import {File} from "@ionic-native/file";
import {ConfigProvider} from "../../../../services/config";
import {MaintenanceAlertPage} from "../maintenanceAlert/maintenanceAlert";
let that;
@Component({
  selector: 'page-maintenanceAcceptance',
  templateUrl: 'maintenanceAcceptance.html'
})
export class MaintenanceAcceptancePage {
  shape = "brief";
  isFocus = false;
  pageData;
  invoice = [];
  detail = {scoring:"", isRisk:"", firstUpkeep:"", degree:"", appraisalsRemark:"",};
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService, public datePipe?: DatePipe, public actionSheetCtrl?: ActionSheetController,
              public file?: File, public modalCtrl?: ModalController) {
    that = this;
    this.invoice = this.navParams.get("data");
    this.httpService.postData2(this.httpService.getUrl2() + "lhd/app/devMaintenanceController.do?getByMaintenanceNumberDetail", {maintenanceNumberDetail:this.invoice["maintenanceNumberDetail"]}, (data)=>{
      let temp = data.obj;
      this.detail["maintenanceFactory"] = temp.maintenanceFactory;
      this.invoice = Object.assign(this.invoice,temp);
    },true)

    this.pageData = {
      segmentName:["单据信息",""],
      pageItem:[
        [
          {itemName:"保养单号", itemType:"label",itemValue:"maintenanceNumberDetail",nec:0},
          {itemName:"保养状态", itemType:"label",itemValue:"checkDateName",nec:0},
          {itemName:"申请单位", itemType:"label",itemValue:"lrrdwmc",nec:0},
          {itemName:"设备名称", itemType:"label",itemValue:"assetsName",nec:0},
          {itemName:"保养金额", itemType:"label",itemValue:"maintenanceAmount",nec:0},
          {itemName:"保养位置", itemType:"label",itemValue:"maintenancePosition",nec:0},
          {itemName:"设备使用状态", itemType:"label",itemValue:"deviceUseStatus",nec:0},
          {itemName:"设备技术状态", itemType:"label",itemValue:"deviceTechStatus",nec:0},
          {itemName:"保养记录", itemType:"textarea-readonly",itemValue:"maintenanceRemark",nec:0},
        ],
        [
          {itemType:"card",
            card:{
              cardParent:[
                {itemName:"厂商名称", itemType:"label",itemValue:"maintenanceFactory",nec:0},
                {itemName:"维修时限评分", itemType:"input",inputType:"number",itemValue:"scoring",nec:1},
                {itemName:"作业风险", itemType:"select", itemValue:"isRisk",nec:1,itemValueName:"isRisk",optionValueString:"optionValue",optionNameString:"optionName",
                  option:[
                    {optionName:"有",optionValue:"有"},
                    {optionName:"无",optionValue:"无"},
                  ],
                },
                {itemName:"首次修复", itemType:"select", itemValue:"firstUpkeep",nec:1,itemValueName:"firstUpkeep",optionValueString:"optionValue",optionNameString:"optionName",
                  option:[
                    {optionName:"是",optionValue:"是"},
                    {optionName:"否",optionValue:"否"},
                  ],
                },
                {itemName:"整体服务", itemType:"select", itemValue:"degree",nec:1,itemValueName:"degree",optionValueString:"optionValue",optionNameString:"optionName",
                  option:[
                    {optionName:"五星好评",optionValue:"五星好评"},
                    {optionName:"好评",optionValue:"好评"},
                    {optionName:"一般",optionValue:"一般"},
                    {optionName:"差评",optionValue:"差评"},
                  ],
                },
                {itemName:"评价说明", itemType:"textarea",itemValue:"appraisalsRemark",nec:1}
              ],
            }
          }
        ],
      ],
    }
    if (this.invoice["zrdwType"] == "01"){
      this.pageData.segmentName =["单据信息","厂商评价"];
      this.pageData.pageItem[0] = [
        {itemName:"保养单号", itemType:"label",itemValue:"maintenanceNumberDetail",nec:0},
        {itemName:"保养状态", itemType:"label",itemValue:"checkDateName",nec:0},
        {itemName:"申请单位", itemType:"label",itemValue:"lrrdwmc",nec:0},
        {itemName:"设备名称", itemType:"label",itemValue:"assetsName",nec:0},
        {itemName:"保养金额", itemType:"label",itemValue:"maintenanceAmount",nec:0},
        {itemName:"保养位置", itemType:"label",itemValue:"maintenancePosition",nec:0},
        {itemName:"设备使用状态", itemType:"label",itemValue:"deviceUseStatus",nec:0},
        {itemName:"设备技术状态", itemType:"label",itemValue:"deviceTechStatus",nec:0},
        {itemName:"责任单位", itemType:"label",itemValue:"zrdwTypeName",nec:0},
        {itemName:"设备名称", itemType:"label",itemValue:"assetsName",nec:0},
        {itemName:"所属单位", itemType:"label",itemValue:"departName",nec:0},
        {itemName:"派单时间", itemType:"label",itemValue:"sendTime",nec:0},
        {itemName:"开始时间", itemType:"label",itemValue:"beginTime",nec:0},
        {itemName:"结束时间", itemType:"label",itemValue:"finishTime",nec:0},
        {itemName:"提交时间", itemType:"label",itemValue:"remindDate",nec:0},
        {itemName:"保养记录", itemType:"textarea-readonly",itemValue:"maintenanceRemark",nec:0},
      ]
    }
  }
  ionViewDidLoad() {

  }
  getInputValue(value,key){
    this.showFooter();
    this.detail[key] = value;
  }
  getSelectValue(value,key){
    this.detail[key] = value["selectedValue"];
  }
  hideFooter() {
    this.isFocus = true;
  }
  showFooter() {
    this.isFocus = false;
  }
  passForm(){
    let body = {maintenanceNumberDetail:this.invoice["maintenanceNumberDetail"]};
    if (this.invoice["zrdwType"] == "01"){
      for (let i in this.detail){
        if (!this.detail[i]){
          let alertCtrl = this.alertCtrl.create({
            title:"请填写厂商评价的必填项"
          });
          alertCtrl.present();
          return false;
        }
        if(parseInt(this.detail["scoring"])>100||parseInt(this.detail["scoring"])<0){
          let alertCtrl = this.alertCtrl.create({
            title:"维修时限评分需在0到100之间"
          });
          alertCtrl.present();
          return false;
        }
      }
      body["dataobj"]=JSON.stringify(this.detail);
      body["zrdwType"] = this.invoice["zrdwType"]
    }
    this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/devMaintenanceController.do?acceptanceYes",body,(data)=>{
      let alertCtrl = this.alertCtrl.create({
        title:"通过成功！"
      });
      alertCtrl.present();
      this.app.getRootNav().pop();
    },true)
  }
  rejectForm(){
    let alertCtrl = this.alertCtrl.create({
      title:"驳回",
      cssClass:"alertMiddle",
      inputs:[
        {
          name:"reason",
          placeholder:"请输入驳回原因",
        }
      ],
      buttons:[
        {
          text:"取消"
        },
        {
          text:"确定",
          handler:(e)=>{
            if (!e.reason){
              let alertCtrl1 = this.alertCtrl.create({
                title:"驳回原因不能为空！"
              });
              alertCtrl1.present();
              return false;
            }else {
              let body = {maintenanceNumberDetail:this.invoice["maintenanceNumberDetail"],checkRemark:e.reason};
              this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/devMaintenanceController.do?acceptanceOverruled",{dataobj:JSON.stringify(body)},data=>{
                console.log(data)
                let alertCtrl = this.alertCtrl.create({
                  title:"驳回成功！"
                });
                alertCtrl.present();
                this.app.getRootNav().pop();
              },true)
            }
          }
        }
      ]
    })
    alertCtrl.present();
  }
  showMaintenanceStandard(){
    this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/devMaintenanceController.do?getMaintenanceStandard",{checkCode:this.invoice["checkCode"]},(data)=>{
      let maintenanceStandardData = data.obj;
      let modal = this.modalCtrl.create(MaintenanceAlertPage,{data:maintenanceStandardData},{
      });
      modal.present();
      modal.onDidDismiss(data=>{
        if(data&&data.selectedData){
          console.log(data.selectedData)
        }
      })
    },true)
  }
}
