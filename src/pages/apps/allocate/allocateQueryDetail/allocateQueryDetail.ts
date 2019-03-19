import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";

@Component({
  selector: 'page-allocateQueryDetail',
  templateUrl: 'allocateQueryDetail.html'
})
export class AllocateQueryDetailPage {
  invoice;
  postUrl;
  detailList;
  detail=[];
  departCode;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public app:App,public alertCtrl:AlertController,public navParams:NavParams,public loadingCtrl:LoadingController) {
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    this.departCode = this.storageService.read("loginDepartCode");
    this.invoice = this.navParams.get("invoice");
    this.postUrl = "allotController.do?getByPhoneInvoiceNumber";
    let loading = this.loadingCtrl.create({
      content:"正在加载"
    });
    loading.present();
    this.httpService.post(this.httpService.getUrl()+this.postUrl,{departCode:this.departCode,phoneInvoiceNumber:this.invoice.invoiceNumber,invoiceNumber:this.invoice.invoiceNumber}).subscribe(data=>{
      if (data.success == "true"){
        this.detailList = data.data;
      }else {
        alert(data.msg);
      }
      loading.dismiss();
    })
  }
  getDetail(detail){
    this.detail = detail;
  }
}
