import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {QueryDetailPage} from "../../../commonStyle/queryDetail/queryDetail";

@Component({
  selector: 'page-queryDetail',
  templateUrl: '../../../commonStyle/queryDetail/queryDetail.html'
})
export class ScrapQueryDetailPage extends QueryDetailPage{
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public storageService?:StorageService,public loadingCtrl?:LoadingController,
              public httpService?:HttpService){
    super(navCtrl,navParams,storageService);
    this.postUrl = "discardController.do?getDetail";
    this.data = {
      pageName:"报废查询详情",
      pageData: {
        pageItem:[
          { card:{
              cardParent:[
                {itemName:"资产编码", itemType:"label",itemValue:"assetsCode"},
                {itemName:"资产名称", itemType:"label",itemValue:"assetsName"},
                {itemName:"所属单位", itemType:"label",itemValue:"departName"},
              ],
              cardChild:[
                {itemName:"资产编码", itemType:"label",itemValue:"assetsCode"},
                {itemName:"资产名称", itemType:"label",itemValue:"assetsName"},
                {itemName:"所属单位", itemType:"label",itemValue:"departName"},
                {itemName:"报废类型", itemType:"label",itemValue:"discardTypeName"},
                {itemName:"报废原因", itemType:"label",itemValue:"discardReasonName"},
                {itemName:"停产日期", itemType:"label",itemValue:"stopDate"},
                {itemName:"申请单位", itemType:"label",itemValue:"departName"},
              ]
            }
          }
        ]
      }
    };
    this.pageName = this.data["pageName"];
    this.pageData = this.data["pageData"];
  }
}
