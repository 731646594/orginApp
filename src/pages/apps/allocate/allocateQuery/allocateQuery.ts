import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {AllocateQueryDetailPage} from "../allocateQueryDetail/allocateQueryDetail";

@Component({
  selector: 'page-allocateQuery',
  templateUrl: 'allocateQuery.html'
})
export class AllocateQueryPage {
  loginUserCode;
  loginDepartCode;
  planStatus="";
  planDetailList;
  invoice=[];
  nowDate;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public app:App,public loadingCtrl:LoadingController) {
    this.loadData();
  }
  ionViewDidEnter(){

  }
  loadData(){
    this.loginUserCode = this.storageService.read("loginUserCode");
    this.loginDepartCode = this.storageService.read("loginDepartCode");
    this.planStatus="invoice";
    this.invoice["invoiceStatus"]="0";
    let date = new Date();
    this.invoice["invoiceYM"]=new Date(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1)).toISOString();
    this.nowDate = this.invoice["invoiceYM"]
  }
  searchForm(){
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration: 10000
    });
    loading.present();
    let url;
    url = "allotController.do?getAllotInvoices";
    if (!this.invoice["invoiceNumber"]){
      this.invoice["invoiceNumber"]="";
    }
    this.httpService.post(this.httpService.getUrl()+url,{departCode:this.loginDepartCode,userCode:this.loginUserCode,invoiceNumber:this.invoice["invoiceNumber"],invoiceStatus:this.invoice["invoiceStatus"],invoiceYM:this.invoice["invoiceYM"]}).subscribe(data=>{
      if (data.success=="true"){
        let alert = this.alertCtrl.create({
          title:"查询成功！"
        });
        alert.present();
        this.planDetailList=data.data;
      }else {
        alert(data.msg)
      }
      loading.dismiss();
    })
  }
  invoiceDetail(invoice){
    this.app.getRootNav().push(AllocateQueryDetailPage,{invoice:invoice})
  }

}
