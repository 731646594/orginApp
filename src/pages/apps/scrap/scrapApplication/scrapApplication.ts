import { Component } from '@angular/core';
import {AlertController, App, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ApplicationPage} from "../../../commonStyle/application/application";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'page-application',
  templateUrl: '../../../commonStyle/application/application.html'
})
export class ScrapApplicationPage extends ApplicationPage{
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public alertCtrl?:AlertController,
              public storageService?:StorageService,public events?:Events,public app?:App,public loadingCtrl?:LoadingController,
              public httpService?:HttpService,public datePipe?:DatePipe) {
    super(navCtrl,navParams,alertCtrl,storageService,events);
    let date = new Date();
    this.invoice["invoiceType"]="020201";
    this.invoice["invoiceName"]="有形（正常报废）";
    this.invoice["inDepartcode"]="";
    this.invoice["detailAmountSum"]=0;
    this.invoice["originalValueSum"]="0.00";
    this.invoice["nowValueSum"]="0.00";
    this.invoice["addDepreciateValueSum"]="0.00";
    this.invoice["devalueValueSum"]="0.00";
    this.invoice["departCode"]=this.departCode;
    this.invoice["createuserid"]=this.userCode;
    this.invoice["departName"] = this.departName;
    let dateStr= this.datePipe.transform(date,"yyyy-MM-dd");
    this.invoice["createdate"]=dateStr;
    // alert(this.userCode +dateStr)
    this.selectFilterData["loginDepartList"]=[];
    if (this.storageService.read("loginDepartList")){
      this.selectFilterData["loginDepartList"] = this.storageService.read("loginDepartList");
    }
    this.data={
      pageName:"报废申请",
      pageData:{
        segmentName:["单据", "明细"],
        pageItem:[
          [
            {itemName:"报废类型", itemType:"select", itemValue:"invoiceType",itemValueName:"invoiceName",optionValueString:"optionValue",optionNameString:"optionName",
              option:[
                {optionName:"有形（正常报废）",optionValue:"020201"},
                {optionName:"有形（非正常地区公司批复）",optionValue:"020202"},
                {optionName:"有形（非正常总部批复）",optionValue:"020203"},
              ],
            },
            {itemName:"数量", itemType:"label",inputType:"number",itemValue:"detailAmountSum"},
            {itemName:"原值", itemType:"label",inputType:"number",itemValue:"originalValueSum"},
            {itemName:"净值", itemType:"label",inputType:"number",itemValue:"nowValueSum"},
            {itemName:"累计折旧", itemType:"label",inputType:"number",itemValue:"addDepreciateValueSum"},
            {itemName:"减值准备", itemType:"label",inputType:"number",itemValue:"devalueValueSum"},
            {itemName:"申请单位",itemType:"select",itemValue:"departCode",itemValueName:"departName",optionValueString:"departcode",optionNameString:"departname",
              option:this.selectFilterData["loginDepartList"]},
            {itemName:"申请人", itemType:"label",itemValue:"createuserid"},
            {itemName:"申请时间", itemType:"label",itemValue:"createdate"},
          ],
          [
            {itemType:"radioInput",
              radio:[
                {radioName:"资产条码",radioValue:"barCode"},
                {radioName:"资产编码",radioValue:"assetsCode"},
              ]
            },
            {itemType:"card-input",
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
                  {itemName:"停产日期", itemType:"date",itemValue:"stopDate"},
                  {itemName:"报废原因", itemType:"select", itemValue:"discardReasonCode",itemValueName:"discardReasonName",optionValueString:"optionValue",optionNameString:"optionName",
                    option:[
                      {optionName:"技术淘汰",optionValue:"01"},
                      {optionName:"毁损",optionValue:"02"},
                      {optionName:"管理不善",optionValue:"03"},
                      {optionName:"自然灾害",optionValue:"04"},
                      {optionName:"国家限制使用",optionValue:"05"},
                      {optionName:"事故",optionValue:"06"},
                      {optionName:"规划、改造拆除",optionValue:"07"},
                      {optionName:"工程",optionValue:"08"},
                      {optionName:"地质",optionValue:"09"},
                      {optionName:"安全、环保",optionValue:"11"},
                      {optionName:"其他",optionValue:"10"},
                    ],
                  },
                  {itemName:"详细报废原因", itemType:"textarea",itemValue:"discardMark"},
                ]
              }
            }
          ]
        ],
      }
    }
    this.pageName=this.data["pageName"];
    this.pageData=this.data["pageData"];
    // this.censorshipUrl="discardController.do?send";
    // this.censorshipUrl="discardController/send.do";
    this.censorshipUrl="discardController/submitreview.do";
    this.saveInfoTableName=["discardInvoice","discardDetail"];
    // this.uploadDataUrl="discardController.do?add";
    this.uploadDataUrl="discardController/add.do";
    // this.uploadDataToEAMUrl="discardController.do?confirm";
    this.uploadDataToEAMUrl="discardController/confirm.do";
    this.sqlInvoiceTableName="discardInvoice";
    this.sqlSearchDatasTableName="discardDetail";
  }
  confirmChecked(){
    for(let index in this.searchDatas){
      if(this.searchDatas[index]["checkedIcon"]){
        if (!this.searchDatas[index]["stopDate"]){
          let alertCtrl = this.alertCtrl.create({
            title:"请选择停产日期！"
          });
          alertCtrl.present();
          return false;
        }
        return true;
      }
    }
    let alertCtrl = this.alertCtrl.create({
      title:"请选择明细！"
    });
    alertCtrl.present();
    return false;
  }

  getCardSelectValue(index) {
    // this.searchDatas[index]["checkedIcon"] = !this.searchDatas[index]["checkedIcon"];
    this.invoice["detailAmountSum"] = this.invoice["detailAmountSum"] ? <any>this.invoice["detailAmountSum"] * 1 : 0;
    this.invoice["originalValueSum"] = this.invoice["originalValueSum"] ? <any>this.invoice["originalValueSum"] * 1 : 0;
    this.invoice["nowValueSum"] = this.invoice["nowValueSum"] ? <any>this.invoice["nowValueSum"] * 1 : 0;
    this.invoice["addDepreciateValueSum"] = this.invoice["addDepreciateValueSum"] ? <any>this.invoice["addDepreciateValueSum"] * 1 : 0;
    this.invoice["devalueValueSum"] = this.invoice["devalueValueSum"] ? <any>this.invoice["devalueValueSum"] * 1 : 0;

    if (this.searchDatas[index]["checkedIcon"]) {
      this.invoice["detailAmountSum"]++;
      this.invoice["originalValueSum"] += <any>this.searchDatas[index]["originalValue"] * 1;
      this.invoice["nowValueSum"] += <any>this.searchDatas[index]["nowValue"] * 1;
      this.invoice["addDepreciateValueSum"] += <any>this.searchDatas[index]["addDepreciate"] * 1;
      this.invoice["devalueValueSum"] += <any>this.searchDatas[index]["devalueValue"] * 1;
    } else {
      this.invoice["detailAmountSum"]--;
      this.invoice["originalValueSum"] -= <any>this.searchDatas[index]["originalValue"] * 1;
      this.invoice["nowValueSum"] -= <any>this.searchDatas[index]["nowValue"] * 1;
      this.invoice["addDepreciateValueSum"] -= <any>this.searchDatas[index]["addDepreciate"] * 1;
      this.invoice["devalueValueSum"] -= <any>this.searchDatas[index]["devalueValue"] * 1;
    }
    this.invoice["originalValueSum"] = this.invoice["originalValueSum"].toFixed(2)
    this.invoice["nowValueSum"] = this.invoice["nowValueSum"].toFixed(2)
    this.invoice["addDepreciateValueSum"] = this.invoice["addDepreciateValueSum"].toFixed(2)
    this.invoice["devalueValueSum"] = this.invoice["devalueValueSum"].toFixed(2)
  }

  /**
   * 设置类型
   */
  setSelectValue(){
    this.searchDatas.forEach(item=>{
          item["discardTypeCode"] = this.invoice["invoiceType"];
          item["discardTypeName"] = this.invoice["invoiceName"];
          item["discardReasonName"] = this.getDiscardReasonValue(item.discardReasonCode)
    });
  }

  /**
   * 获取原因名称
   * @param value
   */
  getDiscardReasonValue(value){
   let option=[
      {optionName:"技术淘汰",optionValue:"01"},
      {optionName:"毁损",optionValue:"02"},
      {optionName:"管理不善",optionValue:"03"},
      {optionName:"自然灾害",optionValue:"04"},
      {optionName:"国家限制使用",optionValue:"05"},
      {optionName:"事故",optionValue:"06"},
      {optionName:"规划、改造拆除",optionValue:"07"},
      {optionName:"工程",optionValue:"08"},
      {optionName:"地质",optionValue:"09"},
      {optionName:"安全、环保",optionValue:"11"},
      {optionName:"其他",optionValue:"10"}
    ];
    let name = "";
    option.forEach(item =>{
        if(item.optionValue == value){
            name = item.optionName;
            return name;
        }
    });
    return name;
  }

  checkDepart(): any {
    console.log(this.searchDatas)
    let isExist = false;
    for(let i=0;i<this.searchDatas.length;i++){
      let item =  this.searchDatas[i]
      if(!item["discardReasonCode"]){
        isExist = true;
        let alertCtrl = this.alertCtrl.create({
          title: "请选择报废原因！"
        });
        alertCtrl.present();
        return false;
      }
    }

    if(!isExist){
        return  true
    }
  }
}
