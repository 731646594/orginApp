import { Component } from '@angular/core';
import {AlertController, App, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ScrapApprovalDetailPage} from "../scrapApprovalDetail/scrapApprovalDetail";
import {ApprovalPage} from "../../../commonStyle/approval/approval";

@Component({
  selector: 'page-approval',
  templateUrl: '../../../commonStyle/approval/approval.html'
})
export class ScrapApprovalPage extends ApprovalPage{
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public storageService?:StorageService,public loadingCtrl?:LoadingController,
              public httpService?:HttpService,public alertCtrl?:AlertController,public app?:App,public events?: Events) {
    super(navCtrl,navParams,storageService,loadingCtrl,httpService,alertCtrl,app,events);
    // this.postUrl = "discardController.do?queryApproveInvoice";
    this.postUrl = "discardController/queryApproveInvoice.do";
    this.postParams = {departCode:this.departCode,userCode:this.userCode};
    // this.postDataUrl="discardController.do?approve";
    this.postDataUrl="discardController/approve.do";
    this.nextPage=ScrapApprovalDetailPage;
    this.data = {
      pageName:"报废审批",
      pageData: {
        pageItem:[
          { itemType:"card-select",card:{
              cardParent:[
                {itemName:"单据号", itemType:"label",itemValue:"invoiceNumber"},
                {itemName:"申请人", itemType:"label",itemValue:"operateUser"},
                {itemName:"单据类型", itemType:"label",itemValue:"invoiceName"},
                {itemName:"明细数量", itemType:"label",itemValue:"allotAmount"},
                {itemName:"申请单位", itemType:"label",itemValue:"departName"},
              ],
            }
          }
        ]
      }
    };
    this.pageName = this.data["pageName"];
    this.pageData = this.data["pageData"];

    this.events.subscribe("ApprovalPage:refresh",(data)=>{
      super.ionViewDidLoad()
    })
  }
  getpostDataParams(){
    this.postDataParams = {departCode:this.departCode,userCode:this.userCode,invoiceNumber:this.searchDatas[this.checkedIndex]["invoiceNumber"],approveResult:this.isAgreeString,opinion:this.detailReason}
  }

  ionViewWillUnload() {
    this.events.unsubscribe('ApprovalPage:refresh');
  }

}
