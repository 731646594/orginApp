import { Component } from '@angular/core';
import {AlertController, App, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";
import * as $ from "jquery";
import {DatePipe} from "@angular/common";
import {SimpleSummaryAlertPage} from "../simpleSummaryAlert/simpleSummaryAlert";

@Component({
  selector: 'page-gasInputStatusQuery',
  templateUrl: 'gasInputStatusQuery.html'
})
export class GasInputStatusQueryPage {
  dateValue;
  maxDate;
  titleData = [
    {itemName:'所属分公司',itemValue:'parentName'},
    {itemName:'统计状态',itemValue:'typeName'},
    {itemName:'所属部门名称',itemValue:'departName'},
    {itemName:'所属部门编码',itemValue:'departCode'},
    {itemName:'录入时间',itemValue:'statisticsTime'}
  ];
  bodyData = [];
  pageName = '';
  url;
  body;
  departText = '请选择部门';
  departData;
  orderType = '0';
  stateData = [
    {stateName: '全部',stateCode:'0'},
    {stateName: '已完成',stateCode:'5'},
    {stateName: '未完成',stateCode:'-5'}
  ];
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public app:App,public datePipe:DatePipe,public navParams:NavParams,
              public modalCtrl:ModalController,public loadingCtrl:LoadingController) {
    this.pageName = this.navParams.data.pageName;
    let date = new Date();
    this.dateValue = this.datePipe.transform(date,"yyyy-MM-dd");
    this.maxDate = this.datePipe.transform(date,"yyyy-MM-dd");
    this.departData = {text:this.storageService.read('loginDepartName'),id:this.storageService.read('loginDepartCode')}
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
    this.url = 'lhd/xzgasstationapp/xzGasStationPlateEasyAppController.do?datagridStationInfo';
    this.body = {time:this.dateValue,selectDepartCode:this.departData.id,orderType:this.orderType};
    let loadingCtrl = this.loadingCtrl.create({
      content:"请等待...",
      dismissOnPageChange:true
    });
    loadingCtrl.present();
    this.httpService.postData2(this.httpService.getUrl4() + this.url, this.body, (data)=> {
      this.bodyData = [];
      this.bodyData = data.obj.rows;
      for (let item of this.bodyData){
        if (item.type == 5){
          item['typeName'] = '已完成'
        }else {
          item['typeName'] = '未完成'
        }
      }
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
    this.httpService.postData2(this.httpService.getUrl4() + 'lhd/xzgasstationapp/xzGasStationPlateEasyAppController.do?selectDepart', {departCode:this.storageService.read("loginDepartCode")}, (data)=> {
      console.log(data);
      let content = {
        item:{
          parent:[
            {itemValue:"text"},
          ],
        }
      };
      let data1 = [{text:this.storageService.read('loginDepartName'),id:this.storageService.read('loginDepartCode'),children:[]}];
      if (data.obj.length > 1){
        data1 = data1.concat(data.obj);
      }else {
        data1 = data.obj;
      }
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
