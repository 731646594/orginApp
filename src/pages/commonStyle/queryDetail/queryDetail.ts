import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";

@Component({
  selector: 'page-queryDetail',
  templateUrl: 'queryDetail.html'
})
export class QueryDetailPage {
  pageName;
  pageData;
  data = {};
  searchDatas;
  departCode;
  invoice;
  postUrl;

  constructor(public navCtrl?: NavController, public navParams?: NavParams, public storageService?: StorageService,
              public httpService?: HttpService) {
    this.departCode = this.storageService.read("loginDepartCode");
    this.invoice = this.navParams.get("invoice");
  }

  ionViewDidEnter() {
    // this.httpService.postData(this.httpService.getUrl()+this.postUrl,{departCode:this.departCode,phoneInvoiceNumber:this.invoice.invoiceNumber,invoiceNumber:this.invoice.invoiceNumber},data=>{
    //   if (data.success == "true"){
    //     this.searchDatas = data.data;
    //   }else {
    //     alert(data.msg);
    //   }
    //   loading.dismiss();
    // });

    this.httpService.postData(this.httpService.getUrl() + this.postUrl, {
      departCode: this.departCode,
      phoneInvoiceNumber: this.invoice.invoiceNumber,
      invoiceNumber: this.invoice.invoiceNumber
    },data => {
      if (data.success == "true") {
        this.searchDatas = data.data;
      } else {
        alert(data.msg);
      }
    },true)
  }
}
