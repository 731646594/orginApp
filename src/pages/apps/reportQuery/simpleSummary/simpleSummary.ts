import { Component } from '@angular/core';
import {AlertController, App, NavController} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";
import * as $ from "jquery";
import {DatePipe} from "@angular/common";
import {ConfigProvider} from "../../../../services/config";

@Component({
  selector: 'page-simpleSummary',
  templateUrl: 'simpleSummary.html'
})
export class SimpleSummaryPage {
  dateValue;
  titleData = [
    {itemName:'项目名称',itemValue:'projectsName'},
    {itemName:'计量单位',itemValue:'unit'},
    {itemName:'目标值',itemValue:'targetValue'},
    {itemName:'差异',itemValue:'difference'},
    {itemName:'发生数',itemValue:'amount'}
  ];
  bodyData = [];
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public app:App,public datePipe:DatePipe) {
    let date = new Date();
    this.dateValue = this.datePipe.transform(date,"yyyy-MM-dd");
    this.getData();
  }
  ionViewDidEnter(){
    // let width = this.titleData.length * 60
    // $('#grid1').width(width);
    // $('#grid2').width(width);
    $('#tbodyDiv').on('scroll', function () {
      $("#theadDiv").scrollLeft($('#tbodyDiv').scrollLeft());
    });
    $('#theadDiv').height($('#theadB').height())
  }
  getData(){
    this.httpService.postData(this.httpService.getUrl4() + 'lhd/xzgasstation/xzGasStationPlateEasyController.do?dayEasyStationManagementDay', {targetDate:this.dateValue}, (data)=> {
      this.bodyData = data.obj.rows;
    },true)
  }
  returnDate() {
    this.getData();
  }
}
