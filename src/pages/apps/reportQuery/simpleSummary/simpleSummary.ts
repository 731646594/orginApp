import { Component } from '@angular/core';
import {AlertController, App, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";
import * as $ from "jquery";
import {DatePipe} from "@angular/common";
import {SimpleSummaryAlertPage} from "../simpleSummaryAlert/simpleSummaryAlert";

@Component({
  selector: 'page-simpleSummary',
  templateUrl: 'simpleSummary.html'
})
export class SimpleSummaryPage {
  dateValue;
  maxDate;
  titleData = [
    {itemName:'项目名称',itemValue:'projectsName'},
    {itemName:'计量单位',itemValue:'unit'},
    {itemName:'目标值',itemValue:'targetValue'},
    {itemName:'差异',itemValue:'difference'},
    {itemName:'发生数',itemValue:'amount'}
  ];
  bodyData = [];
  pageName = '';
  url;
  body;
  departText = '请选择部门';
  departData;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public app:App,public datePipe:DatePipe,public navParams:NavParams,
              public modalCtrl:ModalController,public loadingCtrl:LoadingController) {
    this.pageName = this.navParams.data.pageName;
    let date = new Date();
    if (this.pageName == '月简表'){
      this.dateValue = this.datePipe.transform(date,"yyyy-MM");
      this.maxDate = this.datePipe.transform(date,"yyyy-MM");
    }else if (this.pageName == '日简表'){
      this.dateValue = this.datePipe.transform(date,"yyyy-MM-dd");
      this.maxDate = this.datePipe.transform(date,"yyyy-MM-dd");
    }
    this.departData = {text:this.storageService.read('loginDepartName'),departCode:this.storageService.read('loginDepartCode')}
    this.departText = this.departData.text;
    this.getData();
  }
  ionViewDidEnter(){
    $('#tbodyDiv').on('scroll', function () {
      $("#theadDiv").scrollLeft($('#tbodyDiv').scrollLeft());
    });
    $('#theadDiv').height($('#theadT').height());
    let conH = $('.contentBox').height() - $('.formHeader').height() - $('.formFooter').height() - 10;
    $('.contentBox').height(Math.floor(conH));
  }
  getData(){
    if (this.pageName == '月简表'){
      this.url = 'lhd/xzgasstationapp/xzGasStationPlateEasyAppController.do?dayEasyStationManagementMonth';
      this.body = {month:this.dateValue,selectDepartCode:this.departData.departCode};
    }else if (this.pageName == '日简表'){
      this.url = 'lhd/xzgasstationapp/xzGasStationPlateEasyAppController.do?dayEasyStationManagementDay';
      this.body = {targetDate:this.dateValue,selectDepartCode:this.departData.departCode};
    }
    let loadingCtrl = this.loadingCtrl.create({
      content:"请等待...",
      dismissOnPageChange:true
    });
    loadingCtrl.present();
    this.httpService.postData2(this.httpService.getUrl4() + this.url, this.body, (data)=> {
      this.bodyData = [];
      this.bodyData = data.obj.rows;
      $('#contenter').css('visibility','hidden');
      if (this.bodyData.length > 0){
        setTimeout(()=>{
          $('#theadDiv').height($('#theadT').height());
          $('#contenter').css('visibility','visible');
          loadingCtrl.dismiss();
        },100);
      }else {
        loadingCtrl.dismiss();
      }
    },false,(err)=>{
      loadingCtrl.dismiss();
      let alertCtrl = this.alertCtrl.create({
        title: err
      });
      alertCtrl.present();
    })
  }
  showDepart(){
    let data;
    this.httpService.postData2(this.httpService.getUrl4() + 'lhd/xzgasstationapp/xzGasStationPlateEasyAppController.do?selectDepart', {departCode:this.storageService.read("loginDepartCode")}, (data)=> {
      console.log(data);
      let content = {
        item:{
          parent:[
            {itemValue:"text"},
          ],
        }
      };
      let data1 = [{text:this.storageService.read('loginDepartName'),departCode:this.storageService.read('loginDepartCode'),children:[]}];
      data1 = data1.concat(data.obj);
      let body = {data:data1,content:content};
      let modal = this.modalCtrl.create(SimpleSummaryAlertPage,body);
      modal.present();
      modal.onDidDismiss(data=>{
        if(data&&data.selectedData){
          this.departData = data.selectedData;
          this.departText = data.selectedData.text;
        }
      })
    },true)

  }
  searchData(){
    // if(!this.departData){
    //   let alertCtrl = this.alertCtrl.create({
    //     title: '请选择目标部门'
    //   });
    //   alertCtrl.present();
    //   return false;
    // }
    this.getData()
  }
}
