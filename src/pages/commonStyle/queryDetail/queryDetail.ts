import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";

@Component({
  selector: 'page-queryDetail',
  templateUrl: 'queryDetail.html'
})
export class QueryDetailPage {
  pageName;
  pageData;
  data={};
  searchDatas;
  departCode;
  invoice;
  postUrl;
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public storageService?:StorageService,public loadingCtrl?:LoadingController,
              public httpService?:HttpService) {
    this.departCode = this.storageService.read("loginDepartCode");
    this.invoice = this.navParams.get("invoice");
  }
  ionViewDidEnter(){
    let loading = this.loadingCtrl.create({
      content:"正在加载",
      duration:5000
    });
    loading.present();
    this.httpService.post(this.httpService.getUrl()+this.postUrl,{departCode:this.departCode,phoneInvoiceNumber:this.invoice.invoiceNumber,invoiceNumber:this.invoice.invoiceNumber}).subscribe(data=>{
      if (data.success == "true"){
        this.searchDatas = data.data;
      }else {
        alert(data.msg);
      }
      loading.dismiss();
    });
    console.log(this.pageData)
  }
}
