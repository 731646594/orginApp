import { Component } from '@angular/core';
import {QueryPage} from "../../../commonStyle/query/query";
import {StorageService} from "../../../../services/storageService";
import {AlertController, App, NavController, NavParams} from "ionic-angular";
import {HttpService} from "../../../../services/httpService";
import {ScrapQueryDetailPage} from "../scrapQueryDetail/scrapQueryDetail";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'page-query',
  templateUrl: '../../../commonStyle/query/query.html'
})
export class ScrapQueryPage extends QueryPage{
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public storageService?:StorageService,public app?:App,
              public httpService?:HttpService,public alertCtrl?:AlertController,public datePipe?:DatePipe) {
    super(navCtrl,navParams,storageService,app,httpService,alertCtrl,datePipe);
    this.data = {
      pageName:"报废查询",
      pageData:{
        pageItem:[
          {itemName:"单据编号", itemType:"input",inputType:"text",itemValue:"invoiceNumber"},
          {itemName:"审批进度", itemType:"select", itemValue:"invoiceStatus",optionValueString:"optionValue",optionNameString:"optionName",
            option:[
              {optionName:"全部",optionValue:"0"},
              {optionName:"新建",optionValue:"1"},
              {optionName:"驳回",optionValue:"2"},
              {optionName:"待审批",optionValue:"3"},
              {optionName:"审批中",optionValue:"4"},
              {optionName:"审批完成",optionValue:"5"},
            ],
          },
          {itemName:"查询月份", itemType:"date",itemValue:"invoiceYM"},
          {itemType:"card",
            card:{
              cardParent:[
                {itemName:"单据编号", itemType:"label",itemValue:"invoiceNumber"},
                {itemName:"单据状态", itemType:"label",itemValue:"invoiceStatus"},
                {itemName:"制单单位", itemType:"label",itemValue:"departName"},
                {itemName:"制单日期", itemType:"label",itemValue:"invoiceDate"},
                {itemName:"制单人", itemType:"label",itemValue:"operateUser"},
                {itemName:"原值合计", itemType:"label",itemValue:"originalValueSum"},
                {itemName:"数量", itemType:"label",itemValue:"detailAmountSum"},
                {itemName:"净值合计", itemType:"label",itemValue:"nowValueSum"},
                {itemName:"累计折旧合计", itemType:"label",itemValue:"addDepreciateValueSum"},
                {itemName:"减值准备合计", itemType:"label",itemValue:"devalueValueSum"},
              ],
            }
          }
        ]
      }
    };
    this.pageName = this.data["pageName"];
    this.pageData = this.data["pageData"];
    // this.searchFormUrl = "discardController.do?getInvoice";
    this.searchFormUrl = "discardController/getInvoice.do";
    this.nextPage = ScrapQueryDetailPage;
  }
}
