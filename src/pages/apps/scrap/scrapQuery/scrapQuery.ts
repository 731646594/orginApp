import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ScrapQueryDetailPage} from "../scrapQueryDetail/scrapQueryDetail";

@Component({
  selector: 'page-scrapQuery',
  templateUrl: 'scrapQuery.html'
})
export class ScrapQueryPage {
  planStatus="";
  planDetailList;
  invoice=[];
  loginUserCode;
  loginDepartCode;
  newDate;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,public app:App,
              public loadingCtrl:LoadingController,public alertCtrl:AlertController) {
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
    this.newDate = this.invoice["invoiceYM"];
  }
  searchForm(){
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration: 10000
    });
    loading.present();
    let url;
    url = "discardController.do?getInvoice";
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
    this.app.getRootNav().push(ScrapQueryDetailPage,{invoice:invoice})
  }

}
