import { Component } from '@angular/core';
import {AlertController, App, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ApplicationPage} from "../../../commonStyle/application/application";

@Component({
  selector: 'page-application',
  templateUrl: '../../../commonStyle/application/application.html'
})
export class ScrapApplicationPage extends ApplicationPage{
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public alertCtrl?:AlertController,
              public storageService?:StorageService,public events?:Events,public app?:App,public loadingCtrl?:LoadingController,
              public httpService?:HttpService) {
    super(navCtrl,navParams,alertCtrl,storageService,events);
    let date = new Date();
    this.invoice["discardTypeCode"]="020201";
    this.invoice["inDepartcode"]="";
    this.invoice["allotAmount"]=0;
    this.invoice["originalValue"]="0.00";
    this.invoice["nowValue"]="0.00";
    this.invoice["addDepreciate"]="0.00";
    this.invoice["devalueValue"]="0.00";
    this.invoice["departCode"]=this.departCode;
    this.invoice["createuserid"]=this.userName;
    this.invoice["createdate"]=date.toLocaleDateString();
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
            {itemName:"报废类型", itemType:"select", itemValue:"discardTypeCode",optionValueString:"optionValue",optionNameString:"optionName",
              option:[
                {optionName:"有形（正常报废）",optionValue:"020201"},
                {optionName:"有形（非正常地区公司批复）",optionValue:"020202"},
                {optionName:"有形（非正常总部批复）",optionValue:"020203"},
              ],
            },
            {itemName:"数量", itemType:"input",inputType:"number",itemValue:"allotAmount"},
            {itemName:"原值", itemType:"input",inputType:"number",itemValue:"originalValue"},
            {itemName:"净值", itemType:"input",inputType:"number",itemValue:"nowValue"},
            {itemName:"累计折旧", itemType:"input",inputType:"number",itemValue:"addDepreciate"},
            {itemName:"减值准备", itemType:"input",inputType:"number",itemValue:"devalueValue"},
            {itemName:"申请单位",itemType:"select",itemValue:"departCode",optionValueString:"departcode",optionNameString:"departname",
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
                  {itemName:"报废类型", itemType:"select", itemValue:"discardReasonCode",optionValueString:"optionValue",optionNameString:"optionName",
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
    this.censorshipUrl="discardController.do?send";
    this.saveInfoTableName=["discardInvoice","discardDetail"];
    this.uploadDataUrl="discardController.do?add";
    this.uploadDataToEAMUrl="discardController.do?confirm";
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
}
