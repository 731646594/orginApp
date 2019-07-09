import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {AllocateApprovalDetailPage} from "../allocateApprovalDetail/allocateApprovalDetail";
import {ApprovalPage} from "../../../commonStyle/approval/approval";

@Component({
  selector: 'page-approval',
  templateUrl: '../../../commonStyle/approval/approval.html'
})
export class AllocateApprovalPage extends ApprovalPage{
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public storageService?:StorageService,public loadingCtrl?:LoadingController,
              public httpService?:HttpService,public alertCtrl?:AlertController,public app?:App) {
    super(navCtrl,navParams,storageService);
    this.postUrl = "allotController.do?queryApproveInvoice";
    this.postParams = {departCode:this.departCode,userCode:this.userCode};
    this.postDataUrl = "allotController.do?allotAudit";
    this.nextPage=AllocateApprovalDetailPage;
    this.data = {
      pageName:"调拨审批",
      pageData: {
        pageItem:[
          { itemType:"card-select",card:{
              cardParent:[
                {itemName:"单据号", itemType:"label",itemValue:"invoiceNumber"},
                {itemName:"申请人", itemType:"label",itemValue:"operateUser"},
                {itemName:"调出单位", itemType:"label",itemValue:"outDepartname"},
                {itemName:"调入单位", itemType:"label",itemValue:"inDepartname"},
                {itemName:"明细数量", itemType:"label",itemValue:"detailAmountSum"},
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
    this.postDataParams = {departCode:this.departCode,userCode:this.userCode,userName:this.userName,invoiceData:JSON.stringify(this.searchDatas[this.checkedIndex]),approveResult:this.isAgreeString,opinion:this.detailReason};
  }
}
