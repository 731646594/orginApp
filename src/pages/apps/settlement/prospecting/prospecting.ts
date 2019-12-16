import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";
import {ConfigProvider} from "../../../../services/config";

@Component({
  selector: 'page-prospecting',
  templateUrl: 'prospecting.html'
})
export class ProspectingPage {
  pageName;
  shape = "brief";
  pageData;
  displayIndex;
  briefData = [];
  detailedData = [];
  moreData = [];
  sumItem = [];
  sumItem2 = [];
  sumData = {};
  sumData2 = {};
  invoice;
  detailUrl;
  enclosureUrl;
  historyUrl;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public navParams:NavParams) {
    this.pageName = this.navParams.get("pageName").replace("审批","详情");
    this.pageData = {
      segmentName: ["单据明细", "附件明细", "审批历史记录"],
      pageItem: [
        [
          {
            itemType: "card",
            card: {
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
            }
          }
        ],
        [
          {
            itemType: "card",
            card: {
              cardParent: [
                {itemName: "井号", itemType: "label", itemValue: "wellNo"},
                {itemName: "施工内容", itemType: "label", itemValue: "buildContent"},
              ],
              cardChild: [
                {itemName: "施工日期", itemType: "label", itemValue: "buildDate"},
                {itemName: "结算价格（元）", itemType: "label", itemValue: "settleMoney"},
                {itemName: "备注", itemType: "label", itemValue: "remark"},
              ]
            }
          }
        ],
        [
          {
            itemType: "card",
            card: {
              cardParent: [
                {itemName: "审批序号", itemType: "label", itemValue: "billNumber"},
                {itemName: "岗位名称", itemType: "label", itemValue: "dutyName"},
              ],
              cardChild: [
                {itemName: "岗位编号", itemType: "label", itemValue: "dutyId"},
                {itemName: "审批人员", itemType: "label", itemValue: "userId"},
                {itemName: "人员姓名", itemType: "label", itemValue: "userName"},
                {itemName: "审批日期", itemType: "label", itemValue: "reviewDate"},
                {itemName: "审批结果", itemType: "label", itemValue: "reviewResultName"},
                {itemName: "审批意见", itemType: "label", itemValue: "reviewOpition"},
              ]
            }
          }
        ]
      ],
    }
    this.sumItem = [
      {itemName: "已付金额工程价款", itemType: "label", itemValue: "projectCostSettled"},
      {itemName: "已付金额增值税款", itemType: "label", itemValue: "addTaxSettled"},
      {itemName: "已付金额价税合计", itemType: "label", itemValue: "sumCostSettled"},
      {itemName: "本次付款金额工程价款", itemType: "label", itemValue: "projectCostCurrSettle"},
      {itemName: "本次付款金额增值税款", itemType: "label", itemValue: "addTaxCurrSettle"},
      {itemName: "本次付款金额价税合计", itemType: "label", itemValue: "sumCostCurrSettle"},
    ]
    this.sumItem2 = [
      {itemName: "结算价格（元）", itemType: "label", itemValue: "settleMoney"},
    ]
    this.invoice = this.navParams.get("data");
    this.detailUrl = this.navParams.get("detailUrl");
    this.enclosureUrl = this.navParams.get("enclosureUrl");
    this.historyUrl = this.navParams.get("historyUrl");
    this.httpService.postData2(this.httpService.getUrl3() + this.detailUrl, {invoiceId:this.invoice.invoiceNo}, (data)=> {
      this.briefData = data.obj.rows;
      this.sumData = data.obj.footer[0];
      this.httpService.postData2(this.httpService.getUrl3() + this.enclosureUrl, {invoiceId:this.invoice.invoiceNo}, (data2)=> {
        this.detailedData = data2.obj.rows;
        this.sumData2 = data2.obj.footer[0];
        this.httpService.postData2(this.httpService.getUrl3() + this.historyUrl+"&billNumber="+this.invoice.invoiceNo+"&reviewType="+this.invoice.invoiceTypeName+"审批", {}, (data3)=> {
          this.moreData = data3.obj.rows;
          for (let i in this.moreData){
            this.moreData[i]["reviewResultName"] = ConfigProvider.resultName(this.moreData[i]["reviewResult"])
          }
        },false)
      },false)
    },true)
  }
  displayContent(index){
    let content = document.getElementsByClassName("disContent");
    if (content.length>0) {
      if ((<HTMLElement>content[index]).style.display == "block") {
        (<HTMLElement>content[index]).style.display = "none";
      } else {
        if (this.displayIndex >= 0) {
          (<HTMLElement>content[this.displayIndex]).style.display = "none";
        }
        (<HTMLElement>content[index]).style.display = "block";
        this.displayIndex = index;
      }
    }
  }
}
