import { Component } from '@angular/core';
import {QueryPage} from "../../../commonStyle/query/query";
import {AlertController, App, NavController, NavParams} from "ionic-angular";
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";
import {AllocateQueryDetailPage} from "../allocateQueryDetail/allocateQueryDetail";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'page-query',
  templateUrl: '../../../commonStyle/query/query.html'
})
export class AllocateQueryPage extends QueryPage{
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public storageService?:StorageService,public app?:App,
              public httpService?:HttpService,public alertCtrl?:AlertController,public datePipe?:DatePipe) {
    super(navCtrl,navParams,storageService,app,httpService,alertCtrl,datePipe);
    this.data = {
      pageName:"调拨查询",
      pageData:{
        pageItem:[
          {itemName:"单据编号", itemType:"input",inputType:"text",itemValue:"invoiceNumber"},
          {itemName:"审批进度", itemType:"select", itemValue:"invoiceStatus",optionValueString:"optionValue",optionNameString:"optionName",
            option:[
              {optionName:"全部",optionValue:"0"},
              {optionName:"新建",optionValue:"1"},
              {optionName:"被退回",optionValue:"2"},
              {optionName:"第一审批人未审",optionValue:"3"},
              {optionName:"审批中",optionValue:"4"},
              {optionName:"审批完成",optionValue:"5"},
              {optionName:"业务处理中",optionValue:"6"},
              {optionName:"业务处理完",optionValue:"7"},
              {optionName:"调出确认中",optionValue:"8"},
              {optionName:"调出确认完成",optionValue:"9"},
              {optionName:"调入确认中",optionValue:"10"},
              {optionName:"调入确认完成",optionValue:"11"},
            ],
          },
          {itemName:"查询月份", itemType:"date",itemValue:"invoiceYM"},
          {itemType:"card",
            card:{
              cardParent:[
                {itemName:"单位", itemType:"label",itemValue:"departName"},
                {itemName:"调入单位", itemType:"label",itemValue:"inDepartname"},
                {itemName:"调出单位", itemType:"label",itemValue:"outDepartname"},
                {itemName:"调拨原因", itemType:"label",itemValue:"allotReason"},
                {itemName:"申请人", itemType:"label",itemValue:"operateUser"},
                {itemName:"明细数量", itemType:"label",itemValue:"allotAmount"},
              ],

            }
          }
        ]
      }
    };
    this.pageName = this.data["pageName"];
    this.pageData = this.data["pageData"];
    this.searchFormUrl = "allotController/getAllotInvoices.do";
    this.nextPage = AllocateQueryDetailPage;
  }
}
