import { Component } from '@angular/core';
import {AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ApprovalPage} from "../../../commonStyle/approval/approval";

@Component({
  selector: 'page-scrapApprovalDetail',
  templateUrl: '../../../commonStyle/approval/approval.html'
})
export class ScrapApprovalDetailPage  extends ApprovalPage{
  invoice;
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public storageService?:StorageService,
              public httpService?:HttpService,public alertCtrl?:AlertController,public app?:App,public events?: Events) {
  super(navCtrl,navParams,storageService,httpService,alertCtrl,app,events);
    this.invoice = this.navParams.get("invoice");
    // this.postUrl = "discardController.do?getDetail";
    this.postUrl = "discardController/getDetail.do";
    this.postParams = {departCode:this.departCode,phoneInvoiceNumber:this.invoice.invoiceNumber,invoiceNumber:this.invoice.invoiceNumber};
    // this.postDataUrl = "discardController.do?approve";
    this.postDataUrl = "discardController/approve.do";
    this.data = {
      pageName:"报废审批详情",
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
                {itemName:"报废类型", itemType:"label",itemValue:"discardTypeName"},
                {itemName:"报废原因", itemType:"label",itemValue:"discardReasonName"},
                {itemName:"停产日期", itemType:"label",itemValue:"stopDate"},
                {itemName:"申请单位", itemType:"label",itemValue:"departName"},
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
    console.log(JSON.stringify(this.searchDatas))
    this.postDataParams = {departCode:this.departCode,userCode:this.userCode,invoiceNumber:this.invoice["invoiceNumber"],approveResult:this.isAgreeString,opinion:this.detailReason}
  }
  check(): any {
    return true;
  }
}
