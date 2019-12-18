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
  detailItem;
  detailSumItem;
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService,public modalCtrl?:ModalController, public toastCtrl?:ToastController) {
    this.pageName = this.navParams.get("pageName");
    if (this.pageName == "勘探部项目款审批"){
      this.listUrl = "lhd/app/projectCompletionStatementAuditApp.do?queryInvoice";
      this.submitUrl = "lhd/app/projectCompletionStatementAuditApp.do?reviewPass";
      this.deleteUrl = "lhd/app/projectCompletionStatementAuditApp.do?reviewVeto";
      this.detailUrl = "lhd/app/projectCompletionStatementAuditApp.do?queryDetail";
      this.enclosureUrl = "lhd/app/newWellProgressDetailAppController.do?queryDetail";
      this.historyUrl = "lhd/app/reviewProcessApp.do?datagrid";
      this.detailItem = {
        cardParent: [
          {itemName: "项目合同名称", itemType: "label", itemValue: "contractName"},
          {itemName: "合同编号", itemType: "label", itemValue: "contractCode"},
        ],
        cardChild: [
          {itemName: "合同金额", itemType: "label", itemValue: "totalWorks"},
          {itemName: "单项工程名称", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "计量单位", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "累计工作量", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "工程形象进度比例", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "已结算金额", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0工程价款", itemType: "label", itemValue: "projectCostSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0增值税率", itemType: "label", itemValue: "addTaxSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0增值税款", itemType: "label", itemValue: "addTaxSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0价税合计", itemType: "label", itemValue: "sumCostSettled"},
          {itemName: "本次结算金额", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0工程价款", itemType: "label", itemValue: "projectCostCurrSettle"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0增值税率", itemType: "label", itemValue: "addTaxCurrSettle"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0增值税款", itemType: "label", itemValue: "addTaxSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0价税合计", itemType: "label", itemValue: "sumCostCurrSettle"},
          {itemName: "其中质量保证金", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "付款总比例", itemType: "label", itemValue: "authorizeAmount"},
        ]
      };
      this.detailSumItem = [
        {itemName: "合同金额", itemType: "label", itemValue: "totalWorks"},
        {itemName: "已结算金额工程价款", itemType: "label", itemValue: "projectCostSettled"},
        {itemName: "已结算金额增值税款", itemType: "label", itemValue: "addTaxSettled"},
        {itemName: "已结算金额价税合计", itemType: "label", itemValue: "sumCostSettled"},
        {itemName: "本次结算金额工程价款", itemType: "label", itemValue: "projectCostCurrSettle"},
        {itemName: "本次结算金额增值税款", itemType: "label", itemValue: "addTaxCurrSettle"},
        {itemName: "本次结算金额价税合计", itemType: "label", itemValue: "sumCostCurrSettle"},
        {itemName: "其中质量保证金", itemType: "label", itemValue: "authorizeAmount"},
      ]
    }else if (this.pageName == "工程竣工决算款审批"){
      this.listUrl = "lhd/app/projectCompletionStatementAuditApp.do?queryInvoice";
      this.submitUrl = "lhd/app/projectCompletionStatementAuditApp.do?reviewPass";
      this.deleteUrl = "lhd/app/projectCompletionStatementAuditApp.do?reviewVeto";
      this.detailUrl = "lhd/app/projectCompletionStatementAuditApp.do?queryDetail";
      this.enclosureUrl = "lhd/app/newWellProgressDetailAppController.do?queryDetail";
      this.historyUrl = "lhd/app/reviewProcessApp.do?datagrid";
      this.detailItem = {
        cardParent: [
          {itemName: "工程合同名称", itemType: "label", itemValue: "contractName"},
          {itemName: "合同编号", itemType: "label", itemValue: "contractCode"},
        ],
        cardChild: [
          {itemName: "工作量", itemType: "label", itemValue: "totalWorks"},
          {itemName: "审定金额（不含税）", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "已付金额", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0工程价款", itemType: "label", itemValue: "projectCostSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0增值税款", itemType: "label", itemValue: "addTaxSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0价税合计", itemType: "label", itemValue: "sumCostSettled"},
          {itemName: "增（减）金额", itemType: "label", itemValue: "increaseDecreaseAmount"},
          {itemName: "本次付款金额", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0工程价款", itemType: "label", itemValue: "projectCostCurrSettle"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0增值税款", itemType: "label", itemValue: "addTaxCurrSettle"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0价税合计", itemType: "label", itemValue: "sumCostCurrSettle"},
        ]
      };
      this.detailSumItem = [
        {itemName: "已付金额工程价款", itemType: "label", itemValue: "projectCostSettled"},
        {itemName: "已付金额增值税款", itemType: "label", itemValue: "addTaxSettled"},
        {itemName: "已付金额价税合计", itemType: "label", itemValue: "sumCostSettled"},
        {itemName: "本次付款金额工程价款", itemType: "label", itemValue: "projectCostCurrSettle"},
        {itemName: "本次付款金额增值税款", itemType: "label", itemValue: "addTaxCurrSettle"},
        {itemName: "本次付款金额价税合计", itemType: "label", itemValue: "sumCostCurrSettle"},
      ]
    }else if (this.pageName == "进度款审批"){
      this.listUrl = "lhd/app/projectCompletionStatementAuditApp.do?queryInvoice";
      this.submitUrl = "lhd/app/projectCompletionStatementAuditApp.do?reviewPass";
      this.deleteUrl = "lhd/app/projectCompletionStatementAuditApp.do?reviewVeto";
      this.detailUrl = "lhd/app/projectCompletionStatementAuditApp.do?queryDetail";
      this.enclosureUrl = "lhd/app/newWellProgressDetailAppController.do?queryDetail";
      this.historyUrl = "lhd/app/reviewProcessApp.do?datagrid";
      this.detailItem = {
        cardParent: [
          {itemName: "项目合同名称", itemType: "label", itemValue: "contractName"},
          {itemName: "合同编号", itemType: "label", itemValue: "contractCode"},
        ],
        cardChild: [
          {itemName: "合同金额", itemType: "label", itemValue: "totalWorks"},
          {itemName: "工程项目名称", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "计量单位", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "工作量", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0本月工作量", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0累计工作量", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "工程形象进度比例", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "已付金额", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0工程价款", itemType: "label", itemValue: "projectCostSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0增值税率", itemType: "label", itemValue: "addTaxSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0增值税款", itemType: "label", itemValue: "addTaxSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0价税合计", itemType: "label", itemValue: "sumCostSettled"},
          {itemName: "本次付款金额", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0工程价款", itemType: "label", itemValue: "projectCostCurrSettle"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0增值税率", itemType: "label", itemValue: "addTaxSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0增值税款", itemType: "label", itemValue: "addTaxCurrSettle"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0价税合计", itemType: "label", itemValue: "sumCostCurrSettle"},
          {itemName: "付款总比例", itemType: "label", itemValue: "authorizeAmount"},
        ]
      };
      this.detailSumItem = [
        {itemName: "已付金额工程价款", itemType: "label", itemValue: "projectCostSettled"},
        {itemName: "已付金额增值税款", itemType: "label", itemValue: "addTaxSettled"},
        {itemName: "已付金额价税合计", itemType: "label", itemValue: "sumCostSettled"},
        {itemName: "本次付款金额工程价款", itemType: "label", itemValue: "projectCostCurrSettle"},
        {itemName: "本次付款金额增值税款", itemType: "label", itemValue: "addTaxCurrSettle"},
        {itemName: "本次付款金额价税合计", itemType: "label", itemValue: "sumCostCurrSettle"},
      ]
    }else if (this.pageName == "一厂/三厂进度款审批"){
      this.listUrl = "lhd/app/projectCompletionStatementAuditApp.do?queryInvoice";
      this.submitUrl = "lhd/app/projectCompletionStatementAuditApp.do?reviewPass";
      this.deleteUrl = "lhd/app/projectCompletionStatementAuditApp.do?reviewVeto";
      this.detailUrl = "lhd/app/projectCompletionStatementAuditApp.do?queryDetail";
      this.enclosureUrl = "lhd/app/newWellProgressDetailAppController.do?queryDetail";
      this.historyUrl = "lhd/app/reviewProcessApp.do?datagrid";
      this.detailItem = {
        cardParent: [
          {itemName: "工程合同名称", itemType: "label", itemValue: "contractName"},
          {itemName: "合同编号", itemType: "label", itemValue: "contractCode"},
        ],
        cardChild: [
          {itemName: "井号", itemType: "label", itemValue: "totalWorks"},
          {itemName: "合同金额（不含税）", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "预付比例", itemType: "label", itemValue: "totalWorks"},
          {itemName: "本次付款金额", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0工程价款", itemType: "label", itemValue: "projectCostCurrSettle"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0增值税率", itemType: "label", itemValue: "addTaxSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0增值税款", itemType: "label", itemValue: "addTaxCurrSettle"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0价税合计", itemType: "label", itemValue: "sumCostCurrSettle"},
        ]
      };
      this.detailSumItem = [
        {itemName: "本次付款金额工程价款", itemType: "label", itemValue: "projectCostCurrSettle"},
        {itemName: "本次付款金额增值税款", itemType: "label", itemValue: "addTaxCurrSettle"},
        {itemName: "本次付款金额价税合计", itemType: "label", itemValue: "sumCostCurrSettle"},
      ]
    }else if (this.pageName == "储气库投资表审批"){
      this.listUrl = "lhd/app/projectCompletionStatementAuditApp.do?queryInvoice";
      this.submitUrl = "lhd/app/projectCompletionStatementAuditApp.do?reviewPass";
      this.deleteUrl = "lhd/app/projectCompletionStatementAuditApp.do?reviewVeto";
      this.detailUrl = "lhd/app/projectCompletionStatementAuditApp.do?queryDetail";
      this.enclosureUrl = "lhd/app/newWellProgressDetailAppController.do?queryDetail";
      this.historyUrl = "lhd/app/reviewProcessApp.do?datagrid";
      this.detailItem = {
        cardParent: [
          {itemName: "工程合同名称", itemType: "label", itemValue: "contractName"},
          {itemName: "合同编号", itemType: "label", itemValue: "contractCode"},
        ],
        cardChild: [
          {itemName: "合同价款", itemType: "label", itemValue: "totalWorks"},
          {itemName: "形象进度", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "本次应结算工程款", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "已结算工程款", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0合计", itemType: "label", itemValue: "projectCostSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0工程款", itemType: "label", itemValue: "addTaxSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0备料款", itemType: "label", itemValue: "sumCostSettled"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0其他", itemType: "label", itemValue: "sumCostSettled"},
          {itemName: "累计结算工程款", itemType: "label", itemValue: "increaseDecreaseAmount"},
          {itemName: "其中：质量保证金", itemType: "label", itemValue: "makeFactory"},
          {itemName: "备注", itemType: "label", itemValue: "increaseDecreaseAmount"},
        ]
      };
      this.detailSumItem = []
    }
    this.cardData = {
      cardParent:[
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
      ],
    };
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
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data,detailUrl:this.detailUrl,enclosureUrl:this.enclosureUrl,historyUrl:this.historyUrl,detailItem:this.detailItem,detailSumItem:this.detailSumItem})
    }else if (this.pageName == "工程竣工决算款审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data,detailUrl:this.detailUrl,enclosureUrl:this.enclosureUrl,historyUrl:this.historyUrl,detailItem:this.detailItem,detailSumItem:this.detailSumItem})
    }else if (this.pageName == "进度款审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data,detailUrl:this.detailUrl,enclosureUrl:this.enclosureUrl,historyUrl:this.historyUrl,detailItem:this.detailItem,detailSumItem:this.detailSumItem})
    }else if (this.pageName == "一厂/三厂进度款审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data,detailUrl:this.detailUrl,enclosureUrl:this.enclosureUrl,historyUrl:this.historyUrl,detailItem:this.detailItem,detailSumItem:this.detailSumItem})
    }else if (this.pageName == "储气库投资表审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data,detailUrl:this.detailUrl,enclosureUrl:this.enclosureUrl,historyUrl:this.historyUrl,detailItem:this.detailItem,detailSumItem:this.detailSumItem})
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
    this.httpService.postData2(this.httpService.getUrl3()+url,body,data=>{
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
