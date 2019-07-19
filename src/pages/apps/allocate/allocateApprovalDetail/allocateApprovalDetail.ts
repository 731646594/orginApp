import { Component } from '@angular/core';
import {AlertController, App, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ApprovalPage} from "../../../commonStyle/approval/approval";

@Component({
  selector: 'page-approval',
  templateUrl: '../../../commonStyle/approval/approval.html'
})
export class AllocateApprovalDetailPage extends ApprovalPage{
  invoice;
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public storageService?:StorageService,public loadingCtrl?:LoadingController,
              public httpService?:HttpService,public alertCtrl?:AlertController,public app?:App,public events?: Events) {
    super(navCtrl,navParams,storageService,loadingCtrl,httpService,alertCtrl,app,events);
    this.invoice = this.navParams.get("invoice");
    // this.postUrl = "allotController.do?getByPhoneInvoiceNumber";
    this.postUrl = "allotController/getByInvoiceNumber.do";
    this.postParams = {departCode:this.departCode,phoneInvoiceNumber:this.invoice.invoiceNumber,invoiceNumber:this.invoice.invoiceNumber};
    // this.postDataUrl = "allotController.do?allotAudit";
    this.postDataUrl = "allotController/allotAudit.do";
    this.data = {
      pageName:"调拨审批详情",
      pageData: {
        pageItem:[
          { itemType:"card",card:{
              cardParent:[
                {itemName:"资产编码", itemType:"label",itemValue:"assetsCode"},
                {itemName:"资产名称", itemType:"label",itemValue:"assetsName"},
                {itemName:"所属单位", itemType:"label",itemValue:"departName"},
              ],
              cardChild:[
                {itemName:"资产编码", itemType:"label",itemValue:"assetsCode"},
                {itemName:"资产名称", itemType:"label",itemValue:"assetsName"},
                {itemName:"所属单位", itemType:"label",itemValue:"departName"},
                {itemName:"备注", itemType:"label",itemValue:"remark"},
                {itemName:"存放地点", itemType:"label",itemValue:"storePlace"},
                {itemName:"规格型号", itemType:"label",itemValue:"assetsStandard"},
                {itemName:"车牌井号", itemType:"label",itemValue:"licenceNumber"},
                {itemName:"制造厂家", itemType:"label",itemValue:"makeFactory"},
                {itemName:"所属单位编码", itemType:"label",itemValue:"departCode"},
                {itemName:"保管人", itemType:"label",itemValue:"userPerson"},
                {itemName:"编码", itemType:"label",itemValue:"barCode"},
                {itemName:"出厂编号", itemType:"label",itemValue:"productId"},
                {itemName:"原值", itemType:"label",itemValue:"originalValue"},
                {itemName:"净值", itemType:"label",itemValue:"nowValue"},
                {itemName:"累计折旧", itemType:"label",itemValue:"addDepreciate"},
                {itemName:"减值准备", itemType:"label",itemValue:"devalueValue"},
                {itemName:"使用状态编码", itemType:"label",itemValue:"usedState"},
                {itemName:"使用状态", itemType:"label",itemValue:"usedStateName"},
              ],
            }
          }
        ]
      }
    };
    this.pageName = this.data["pageName"];
    this.pageData = this.data["pageData"];
  }
  getpostDataParams(){
    this.postDataParams = {departCode:this.departCode,userCode:this.userCode,userName:this.userName,invoiceData:JSON.stringify(this.invoice),approveResult:this.isAgreeString,opinion:this.detailReason};
  }

  check(){
    return true;
  }
}
