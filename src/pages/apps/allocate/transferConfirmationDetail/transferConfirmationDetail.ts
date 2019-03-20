import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";

@Component({
  selector: 'page-transferConfirmationDetail',
  templateUrl: 'transferConfirmationDetail.html'
})
export class TransferConfirmationDetailPage {
  pageName;
  invoice;
  postUrl;
  detailList;
  detail=[];
  isOnfocus=false;
  userName;
  userCode;
  departCode;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public app:App,public alertCtrl:AlertController,public navParams:NavParams,public loadingCtrl:LoadingController) {
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.pageName = this.navParams.get("pageName");
    this.invoice = this.navParams.get("invoice");
    this.postUrl = this.navParams.get("postUrl");
    let url = "allotController.do?getByPhoneInvoiceNumber";
    let loading = this.loadingCtrl.create({
      content:"正在加载",
      duration:10000
    });
    loading.present();
    this.httpService.post(this.httpService.getUrl()+url,{departCode:this.departCode,phoneInvoiceNumber:this.invoice.invoiceNumber,invoiceNumber:this.invoice.invoiceNumber}).subscribe(data=>{
      if (data.success == "true"){
        this.detailList = data.data;
      }else {
        alert(data.msg);
      }
      loading.dismiss();
    })
  }
  inputOnfocus(){
    this.isOnfocus=true;
  }
  inputOnblur(){
    this.isOnfocus=false;
  }
  checkedItem(index){
    if (this.detailList[index].checked){
      document.getElementsByClassName("detailIcon")[index].setAttribute("style","color: #dedede;");
      this.detailList[index].checked = false;
      this.detail = [];
    }else {
      document.getElementsByClassName("detailIcon")[index].setAttribute("style","color: #0091d2;");
      this.detailList[index].checked = true;
      this.detail = this.detailList[index];
    }
  }
  uploadData(){
    this.httpService.post(this.httpService.getUrl()+this.postUrl,{departCode:this.departCode,userCode:this.userCode,userName:this.userName,phoneInvoiceNumber:this.invoice.invoiceNumber,eamAllotDetal:this.detail,invoiceDatas:this.invoice}).subscribe(data=>{
      if (data.success=="true"){
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present()
      }else {
        alert(data.msg)
      }
    })
  }
}
