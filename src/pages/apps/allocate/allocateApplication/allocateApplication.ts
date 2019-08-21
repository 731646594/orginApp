import { Component } from '@angular/core';
import {AlertController, App, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ApplicationPage} from "../../../commonStyle/application/application";

@Component({
  selector: 'page-application',
  templateUrl: '../../../commonStyle/application/application.html'
})
export class AllocateApplicationPage extends ApplicationPage{
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public alertCtrl?:AlertController,
              public storageService?:StorageService,public events?:Events,public app?:App,public loadingCtrl?:LoadingController,
              public httpService?:HttpService){
    super(navCtrl,navParams,alertCtrl,storageService,events);
    let date = new Date();
    this.invoice["invoiceType"]="1401";
    this.invoice["invoiceName"]="有形";
    this.invoice["inDepartcode"]="";
    this.invoice["allotAmount"]=0;
    this.invoice["originalValueSum"]="0.00";
    this.invoice["nowValueSum"]="0.00";
    this.invoice["addDepreciateValueSum"]="0.00";
    this.invoice["createUserName"]=this.userName;
    this.invoice["createTime"]=date.toLocaleDateString();
    this.invoice["departCode"]=this.departCode;
    this.invoice["departName"]=this.departName;
    this.originInvoice = this.invoice;
    this.selectFilterData["in"]=[];
    this.selectFilterData["out"]=[];

    this.data={
      pageName:"调拨申请",
      pageData:{
        segmentName:["单据", "明细"],
        pageItem:[
          [
            {itemName:"单据类型", itemType:"select", itemValue:"invoiceType",itemValueName:"invoiceName",optionValueString:"optionValue",optionNameString:"optionName",
              option:[
                {optionName:"有形",optionValue:"1401"},
                {optionName:"无形",optionValue:"1402"},
                {optionName:"长(待)摊费用",optionValue:"1403"},
                {optionName:"整体",optionValue:"1404"},
              ],
            },
            {itemName:"调出单位",itemType:"selectFilter",optionValueString:"departcode",optionNameString:"departname",dataName:"out",itemValue:["outDepartcode","outDepartname"]},
            {itemName:"调入单位",itemType:"selectFilter",optionValueString:"departcode",optionNameString:"departname",dataName:"in",itemValue:["inDepartcode","inDepartname"]},
            {itemName:"调拨原因", itemType:"input",inputType:"text",itemValue:"allotReason"},
            {itemName:"备注", itemType:"input",inputType:"text",itemValue:"remark"},
            {itemName:"数量", itemType:"label",inputType:"number",itemValue:"allotAmount"},
            {itemName:"原值", itemType:"label",inputType:"number",itemValue:"originalValueSum"},
            {itemName:"净值", itemType:"label",inputType:"number",itemValue:"nowValueSum"},
            {itemName:"累计折旧", itemType:"label",inputType:"number",itemValue:"addDepreciateValueSum"},
            {itemName:"制单人", itemType:"label",itemValue:"createUserName"},
            {itemName:"制单时间", itemType:"label",itemValue:"createTime"},
            {itemName:"申请单位", itemType:"label",itemValue:"departName"},

          ],
          [
            {itemType:"radioInput",
              radio:[
                {radioName:"资产条码",radioValue:"barCode"},
                {radioName:"资产编码",radioValue:"assetsCode"},
              ]
            },
            {itemType:"card",
              card:{
                cardParent:[
                  {itemName:"资产编码", itemType:"label",itemValue:"assetsCode"},
                  {itemName:"资产名称", itemType:"label",itemValue:"assetsName"},
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
                ]
              }
            }
          ]
        ],
      }
    };
    this.pageName=this.data["pageName"];
    this.pageData=this.data["pageData"];
    // this.censorshipUrl="allotController.do?sendAllot";//原始
    // this.censorshipUrl="allotController/sendAllot.do";
    this.censorshipUrl="allotController/submitreview.do";//将单据发送到eam并送审
    this.saveInfoTableName=["allotInvoice","allotDetail"];
    // this.uploadDataUrl="allotController.do?add";
    this.uploadDataUrl="mobileallotController/add.do";
    // this.uploadDataToEAMUrl="allotController.do?confirm";
    this.uploadDataToEAMUrl="allotController/confirm.do";
    this.sqlInvoiceTableName="allotInvoice";
    this.sqlSearchDatasTableName="allotDetail";
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("departListData",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        // this.allData = JSON.parse(res.rows.item(0).stringData);
        this.allData["in"] = JSON.parse(res.rows.item(0).stringData);
        for(let i in this.allData["in"]){
          if(this.allData["in"][i]["departcode"].lastIndexOf(this.departCode)>-1){
            this.selectFilterData["out"].push(this.allData["in"][i]);
          }
        }

        // this.selectFilterData["in"] = JSON.parse(res.rows.item(0).stringData);
        for(let i in this.allData["in"]){
          if(this.allData["in"][i]["marktail"] == "1"){
            this.selectFilterData["in"].push(this.allData["in"][i]);
          }
        }
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));;
  }


  checkDepart(): any {
    if(!this.invoice["inDepartcode"]){
      let alertCtrl = this.alertCtrl.create({
        title: "请选择调入单位！"
      });
      alertCtrl.present();
      return false;
    }

    if(!this.invoice["outDepartcode"]){
      let alertCtrl = this.alertCtrl.create({
        title: "请选择调出单位！"
      });
      alertCtrl.present();
      return false;
    }

    if(!this.invoice["allotReason"]){
      let alertCtrl = this.alertCtrl.create({
        title: "请选择调拨原因！"
      });
      alertCtrl.present();
      return false;
    }
    return true;
  }
}
