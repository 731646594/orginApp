import { Component } from '@angular/core';
import {AlertController, App, ModalController, NavController} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";
import {DatePipe} from "@angular/common";
import {DayReportEntryDetailPage} from "../dayReportEntryDetail/dayReportEntryDetail";
import * as $ from "jquery";
import {DayReportEntryAlertPage} from "../dayReportEntryAlert/dayReportEntryAlert";

@Component({
  selector: 'page-dayReportEntry',
  templateUrl: 'dayReportEntry.html'
})
export class DayReportEntryPage {
  itemName = '日报日期';
  dateValue;
  dataList =[
    {
      "id": 10000018990002,
      "managementName": "flynn01",
      "managementCode": "XZ20200522101147551TJ",
      "departCode": "13710",
      "departName": "中国石油天然气股份有限公司福建销售分公司",
      "statisticsTime": "2020-05-20",
      "type": "2",
      "createUser": "系统管理员",
      "updateTime": null,
      "updateUser": null
    },
    {
      "id": 10000018950002,
      "managementName": "t",
      "managementCode": "XZ20200521210456229TJ",
      "departCode": "13710",
      "departName": "中国石油天然气股份有限公司福建销售分公司",
      "statisticsTime": "2020-05-21",
      "type": "2",
      "createUser": "系统管理员",
      "updateTime": null,
      "updateUser": null
    },
    {
      "id": 10000018930002,
      "managementName": "1111",
      "managementCode": "XZ20200521201216091TJ",
      "departCode": "13710",
      "departName": "中国石油天然气股份有限公司福建销售分公司",
      "statisticsTime": "2020-05-21",
      "type": "2",
      "createUser": "系统管理员",
      "updateTime": null,
      "updateUser": null
    }
  ];
  itemList=[
    {itemName:"统计名称",itemValue:"managementName"},
    {itemName:"所属部门名称",itemValue:"departName"},
    {itemName:"统计时间",itemValue:"statisticsTime"},
    {itemName:"统计状态",itemValue:"typeName"},
    {itemName:"录入人",itemValue:"createUser"},
    {itemName:"补录时间",itemValue:"updateTime"},
    {itemName:"补录人",itemValue:"updateUser"}
  ];
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public app:App,public datePipe:DatePipe,public modalCtrl:ModalController) {
    let date = new Date();
    this.dateValue = this.datePipe.transform(date,"yyyy-MM-dd");
  }
  ionViewDidEnter(){
    for (let i in this.dataList){
      if (this.dataList[i].type == "2"){
        this.dataList[i]["typeName"] = "未补录"
      }else {
        this.dataList[i]["typeName"] = "补录完成"
      }
    }
  }
  returnDate() {
    console.log(this.dateValue)
  }
  goToDetail(i){
    this.app.getRootNav().push(DayReportEntryDetailPage,{data:this.dataList[i]})
  }
  addForm(){
    let modal = this.modalCtrl.create(DayReportEntryAlertPage,{});
    modal.present();
    modal.onDidDismiss(data=>{
      if(data){
        console.log(data)

      }
    })
  }
}
