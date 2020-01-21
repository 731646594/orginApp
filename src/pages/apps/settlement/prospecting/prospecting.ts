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
  reviewType;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public navParams:NavParams) {
    this.pageName = this.navParams.get("pageName").replace("审批","详情");
    if (this.pageName == "勘探部项目款详情"){
      this.reviewType = "勘探部项目款结算签认单据审批"
    }else if (this.pageName == "工程竣工决算款详情"){
      this.reviewType = "工程竣工决算款结算签认单据审批"
    }else if (this.pageName == "进度款详情"){
      this.reviewType = "工程进度款结算签认单据审批"
    }else if (this.pageName == "一厂/三厂进度款详情"){
      this.reviewType = "一厂/三厂进度款结算签认单审批"
    }else if (this.pageName == "储气库投资表详情"){
      this.reviewType = "储气库签认单投资单据审批"
    }
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
    this.pageData.pageItem[0][0].card = this.navParams.get("detailItem");
    this.sumItem = this.navParams.get("detailSumItem");
    if (this.invoice.attachTypeName=="无附件明细"){
      this.pageData.segmentName = ["单据明细","", "审批历史记录"];
    }else if(this.invoice.attachTypeName=="老井作业结算明细表"){
      this.pageData.pageItem[1][0].card = {
        cardParent: [
          {itemName: "井号", itemType: "label", itemValue: "wellNo"},
          {itemName: "施工内容", itemType: "label", itemValue: "buildContent"},
        ],
        cardChild: [
          {itemName: "施工日期", itemType: "label", itemValue: "buildDate"},
          {itemName: "结算价格（元）", itemType: "label", itemValue: "settleMoney"},
          {itemName: "备注", itemType: "label", itemValue: "remark"},
        ]
      };
      this.sumItem2 = [
        {itemName: "结算价格（元）", itemType: "label", itemValue: "settleMoney"},
      ]
    }else if(this.invoice.attachTypeName=="老井压裂结算明细表"){
      this.pageData.pageItem[1][0].card = {
        cardParent: [
          {itemName: "井号", itemType: "label", itemValue: "wellNo"},
          {itemName: "项目", itemType: "label", itemValue: "projectName"},
        ],
        cardChild: [
          {itemName: "施工日期", itemType: "label", itemValue: "buildDate"},
          {itemName: "液量m3", itemType: "label", itemValue: "fluidMeasure"},
          {itemName: "压裂井深（米）", itemType: "label", itemValue: "wellDeep"},
          {itemName: "施工费（元）", itemType: "label", itemValue: "buildMoney"},
          {itemName: "备注", itemType: "label", itemValue: "remark"},
        ]
      };
      this.sumItem2 = [
        {itemName: "施工费（元）", itemType: "label", itemValue: "buildMoney"},
      ]
    }else if(this.invoice.attachTypeName=="新井进度款结算明细表"){
      this.pageData.pageItem[1][0].card = {
        cardParent: [
          {itemName: "建设单位", itemType: "label", itemValue: "buildDepart"},
          {itemName: "井号", itemType: "label", itemValue: "wellNo"},
        ],
        cardChild: [
          {itemName: "层数", itemType: "label", itemValue: "floors"},
          {itemName: "试油工程", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0施工费", itemType: "label", itemValue: "buildCostOil"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0材料费", itemType: "label", itemValue: "materialCostOil"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0小计", itemType: "label", itemValue: "sumOil"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0附加费用", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0气举费", itemType: "label", itemValue: "gasCost"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0其他费用", itemType: "label", itemValue: "otherCost"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0试油费用", itemType: "label", itemValue: "testCost"},
          {itemName: "压裂工程", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0施工费", itemType: "label", itemValue: "buildCostFracture"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0材料费", itemType: "label", itemValue: "materialCostFracture"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0压裂费用", itemType: "label", itemValue: "fractureCost"},
          {itemName: "射孔工程", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0射孔费用", itemType: "label", itemValue: "perforationCost"},
          {itemName: "总费用", itemType: "label", itemValue: "totalCost"},
          {itemName: "进度款比例", itemType: "label", itemValue: "progressScale"},
          {itemName: "进度款", itemType: "label", itemValue: "progressMoney"},
          {itemName: "已付进度款", itemType: "label", itemValue: "payMoney"},
          {itemName: "本次进度款", itemType: "label", itemValue: "currMoney"},
          {itemName: "备注", itemType: "label", itemValue: "remark"},
        ]
      };
      this.sumItem2 = [
        {itemName: "试油工程施工费", itemType: "label", itemValue: "buildCostOil"},
        {itemName: "试油工程材料费", itemType: "label", itemValue: "materialCostOil"},
        {itemName: "试油工程小计", itemType: "label", itemValue: "sumOil"},
        {itemName: "试油工程附加费用", itemType: "label", itemValue: "makeFactory"},
        {itemName: "试油工程附加费用气举费", itemType: "label", itemValue: "gasCost"},
        {itemName: "试油工程附加费用其他费用", itemType: "label", itemValue: "otherCost"},
        {itemName: "试油工程试油费用", itemType: "label", itemValue: "testCost"},
        {itemName: "压裂工程施工费", itemType: "label", itemValue: "buildCostFracture"},
        {itemName: "压裂工程材料费", itemType: "label", itemValue: "materialCostFracture"},
        {itemName: "压裂工程压裂费用", itemType: "label", itemValue: "fractureCost"},
        {itemName: "射孔工程射孔费用", itemType: "label", itemValue: "perforationCost"},
        {itemName: "总费用", itemType: "label", itemValue: "totalCost"},
        {itemName: "进度款", itemType: "label", itemValue: "progressMoney"},
        {itemName: "已付进度款", itemType: "label", itemValue: "payMoney"},
        {itemName: "本次进度款", itemType: "label", itemValue: "currMoney"},
      ]
    }else if(this.invoice.attachTypeName==" 审查明细表"){
      this.pageData.pageItem[1][0].card = {
        cardParent: [
          {itemName: "建设单位", itemType: "label", itemValue: "buildDepart"},
          {itemName: "井号", itemType: "label", itemValue: "wellNo"},
        ],
        cardChild: [
          {itemName: "层数", itemType: "label", itemValue: "floors"},
          {itemName: "下浮后结算金额（元）", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0试油工程", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0施工费", itemType: "label", itemValue: "buildCostOil"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0材料费", itemType: "label", itemValue: "materialCostOil"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0试油费用", itemType: "label", itemValue: "testCost"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0压裂工程", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0施工费", itemType: "label", itemValue: "buildCostFracture"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0材料费", itemType: "label", itemValue: "materialCostFracture"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0压裂费用", itemType: "label", itemValue: "fractureCost"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0射孔工程", itemType: "label", itemValue: "makeFactory"},
          {itemName: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0射孔费用", itemType: "label", itemValue: "perforationCost"},
          {itemName: "审定金额合计", itemType: "label", itemValue: "authorizeAmount"},
          {itemName: "已付进度款合计", itemType: "label", itemValue: "payMoney"},
          {itemName: "应付金额合计", itemType: "label", itemValue: "payableMoney"},
          {itemName: "备注", itemType: "label", itemValue: "remark"},
        ]
      };
      this.sumItem2 = []
    }
    this.detailUrl = this.navParams.get("detailUrl");
    this.enclosureUrl = this.navParams.get("enclosureUrl");
    this.historyUrl = this.navParams.get("historyUrl");
    this.httpService.postData2(this.httpService.getUrl3() + this.detailUrl, {invoiceId:this.invoice.invoiceNo}, (data)=> {
      this.briefData = data.obj.rows;
      for (let i in this.briefData){
        for (let j in this.briefData[i]){
          if (j == "addTaxScaleSettled"||j == "addTaxScaleCurrSettle"){
            this.briefData[i][j] = this.briefData[i][j]*100 + "%"
          }
        }
      }
      if (data.obj.footer)
      this.sumData = data.obj.footer[0];
      this.httpService.postData2(this.httpService.getUrl3() + this.enclosureUrl, {invoiceId:this.invoice.invoiceNo}, (data2)=> {
        this.detailedData = data2.obj.rows;
        if (data2.obj.footer)
        this.sumData2 = data2.obj.footer[0];
        this.httpService.postData2(this.httpService.getUrl3() + this.historyUrl+"&billNumber="+this.invoice.invoiceNo+"&reviewType="+this.reviewType, {}, (data3)=> {
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
