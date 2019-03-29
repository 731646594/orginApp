import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";

@Component({
  selector: 'page-scrapQueryDetail',
  templateUrl: 'scrapQueryDetail.html'
})
export class ScrapQueryDetailPage {
  invoice;
  postUrl;
  detailList;
  departCode;
  displayIndex;
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
    this.postUrl = "discardController.do?getDetail";
    let loading = this.loadingCtrl.create({
      content:"正在加载",
      duration:10000
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
  displayContent(index){
    let content = document.getElementsByClassName("disContent");
    if ((<HTMLElement>content[index]).style.display=="block"){
      (<HTMLElement>content[index]).style.display="none";
    }else {
      if(this.displayIndex>=0){
        (<HTMLElement>content[this.displayIndex]).style.display="none";
      }
      (<HTMLElement>content[index]).style.display="block";
      this.displayIndex = index;
    }
  }
}
