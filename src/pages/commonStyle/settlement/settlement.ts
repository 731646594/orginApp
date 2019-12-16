import { Component } from '@angular/core';
import {AlertController, App, Events, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";
import * as $ from "jquery";
import {ConfigProvider} from "../../../services/config";
import {ProspectingPage} from "../../apps/settlement/prospecting/prospecting";

@Component({
  selector: 'page-settlement',
  templateUrl: 'settlement.html'
})
export class SettlementPage {
  cardData;
  itemData=[];
  pageName;
  isFocus = false;
  isNewSearch = true;
  page=1;
  pageSize=20;
  listUrl = "";
  submitUrl = "";
  deleteUrl = "";
  detailUrl = "";
  enclosureUrl = "";
  historyUrl = "";
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService,public modalCtrl?:ModalController, public toastCtrl?:ToastController) {
    this.pageName = this.navParams.get("pageName");
    if (this.pageName == "勘探部项目款审批"){
      this.listUrl = "lhd/app/devRepairController.do?datagrid";
      this.submitUrl = "";
      this.deleteUrl = "";
    }else if (this.pageName == "工程竣工决算款审批"){
      this.listUrl = "lhd/app/projectCompletionStatementAuditApp.do?queryInvoice";
      this.submitUrl = "lhd/app/projectCompletionStatementAuditApp.do?reviewPass";
      this.deleteUrl = "lhd/app/projectCompletionStatementAuditApp.do?reviewVeto";
      this.detailUrl = "lhd/app/projectCompletionStatementAuditApp.do?queryDetail";
      this.enclosureUrl = "lhd/app/newWellProgressDetailAppController.do?queryDetail";
      this.historyUrl = "lhd/app/reviewProcessApp.do?datagrid";
    }else if (this.pageName == "进度款审批"){
      this.listUrl = "lhd/app/devRepairController.do?datagridsp";
      this.submitUrl = "";
      this.deleteUrl = "";
    }else if (this.pageName == "一厂/三厂进度款审批"){
      this.listUrl = "lhd/app/devRepairController.do?datagridys";
      this.submitUrl = "";
      this.deleteUrl = "";
    }else if (this.pageName == "储气库投资表审批"){
      this.listUrl = "lhd/app/devRepairController.do?datagridyssp"
      this.submitUrl = "";
      this.deleteUrl = "";
    }
    this.cardData = {
      cardParent:[
        {itemName:"单据编号", itemType:"label",itemValue:"wxdh"},
        {itemName:"单据状态", itemType:"label",itemValue:"djzt"},
        {itemName:"申请人", itemType:"label",itemValue:"sqrmc"},
        {itemName:"申请时间", itemType:"label",itemValue:"sqsj"},
      ],
    };
    if (this.pageName == "勘探部项目款审批") {
      this.cardData.cardParent[2] = {itemName: "申请单位", itemType: "label", itemValue: "sqdwmc"}
    }
    if (this.pageName == "工程竣工决算款审批") {
      this.cardData.cardParent = [
        {itemName:"单据编号", itemType:"label",itemValue:"invoiceNo"},
        {itemName:"状态", itemType:"label",itemValue:"statusName"},
        {itemName:"单据名称", itemType:"label",itemValue:"invoiceName"},
        {itemName:"附件类型", itemType:"label",itemValue:"attachTypeName"},
        {itemName:"附件明细表头", itemType:"label",itemValue:"attachDetailTitle"},
        {itemName:"附件建设单位", itemType:"label",itemValue:"attachCsoeName"},
        {itemName:"明细数量", itemType:"label",itemValue:"numTotal"},
        // {itemName:"单据类型", itemType:"label",itemValue:"invoiceTypeName"},
        // {itemName:"制单单位", itemType:"label",itemValue:"departName"},
        // {itemName:"制单时间", itemType:"label",itemValue:"createDate"},
        // {itemName:"制单人", itemType:"label",itemValue:"operator"},
        // {itemName:"备注", itemType:"label",itemValue:"remark"},
      ]
    }
  }
  ionViewDidLoad(){
    this.itemData = [];
    this.page = 1;
    this.isNewSearch = true;
    this.httpService.postData2(this.httpService.getUrl3()+this.listUrl,{page:this.page,rows:this.pageSize},data=>{
      this.itemData = data.obj.rows;
      for (let i in this.itemData){
        this.itemData[i]["statusName"] = ConfigProvider.statusName(this.itemData[i]["status"])
      }
      console.log(this.itemData)
    },true);
  }
  showForm(Data){
    if(Data.attachTypeCode=='04'){
      this.enclosureUrl = "lhd/app/newWellProgressDetailAppController.do?queryDetail"
    }else if(Data.attachTypeCode=='02'){
      this.enclosureUrl = "lhd/app/oldWellWorkDetailAppController.do?queryDetail"
    }else if(Data.attachTypeCode=='03'){
      this.enclosureUrl = "lhd/app/oldWellFractureDetailAppController.do?queryDetail"
    }else if(Data.attachTypeCode=='05'){
      this.enclosureUrl = "lhd/app/examineDetailAppController.do?queryDetail"
    }
    if (this.pageName == "勘探部项目款审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data})
    }else if (this.pageName == "工程竣工决算款审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data,detailUrl:this.detailUrl,enclosureUrl:this.enclosureUrl,historyUrl:this.historyUrl})
    }else if (this.pageName == "进度款审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data})
    }else if (this.pageName == "一厂/三厂进度款审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data})
    }else if (this.pageName == "储气库投资表审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data})
    }
  }
  submitForm(detail){
    let alertCtrl = this.alertCtrl.create({
      title:"通过",
      cssClass:"alertMiddle",
      inputs:[
        {
          name:"reason",
          placeholder:"请输入通过意见",
        }
      ],
      buttons:[
        {
          text:"取消",
        },
        {
          text:"确定",
          handler:(e)=>{
            if (!e.reason){
              let alertCtrl1 = this.alertCtrl.create({
                title:"通过意见不能为空！"
              });
              alertCtrl1.present();
              return false;
            }else {
              this.httpService.postData2(this.httpService.getUrl3() + this.submitUrl, {invoiceNumbers:detail.invoiceNo,reviewOpinion:e.reason}, data => {
                console.log(data)
                let alertCtrl = this.alertCtrl.create({
                  title: "通过成功！"
                });
                alertCtrl.present();
                this.ionViewDidLoad()
              }, true)
            }
          }
        }
      ]
    })
    alertCtrl.present();
  }
  deleteForm(detail){
    let alertCtrl = this.alertCtrl.create({
      title:"驳回",
      cssClass:"alertMiddle",
      inputs:[
        {
          name:"reason",
          placeholder:"请输入驳回意见",
        }
      ],
      buttons:[
        {
          text:"取消",
        },
        {
          text:"确定",
          handler:(e)=>{
            if (!e.reason){
              let alertCtrl1 = this.alertCtrl.create({
                title:"驳回意见不能为空！"
              });
              alertCtrl1.present();
              return false;
            }else {
              this.httpService.postData2(this.httpService.getUrl3()+this.deleteUrl,{invoiceNumbers:detail.invoiceNo,reviewOpinion:e.reason},data=>{
                console.log(data)
                let alertCtrl = this.alertCtrl.create({
                  title:"驳回成功！"
                });
                alertCtrl.present();
                this.ionViewDidLoad()
              },true)
            }
          }
        }
      ]
    })
    alertCtrl.present();
  }
  getMore(infiniteScroll){
    this.page++;
    let url,body;
    url = this.listUrl;
    body = {page:this.page,rows:this.pageSize};
    this.httpService.postData2(this.httpService.getUrl2()+url,body,data=>{
      console.log(data)
      for (let i in data.obj.rows){
        this.itemData[i]["statusName"] = ConfigProvider.statusName(this.itemData[i]["status"])
        this.itemData.push(data.obj.rows[i])
      }
      if (!data.obj.rows[0]){
        this.isNewSearch = false;
        let toast = this.toastCtrl.create({
          message: "这已经是最后一页了",
          duration: 2000,
        });
        toast.present();
      }
      infiniteScroll.complete();
    })
  }
}
