import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";

@Component({
  selector: 'page-allocateApprovalDetail',
  templateUrl: 'allocateApprovalDetail.html'
})
export class AllocateApprovalDetailPage {
  invoice;
  postUrl;
  detailList;
  detail=[];
  departCode;
  userName;
  userCode;
  isAgree=1;
  isReasonModel=0;
  censorshipReason="";
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
    this.invoice = this.navParams.get("invoice");
    this.postUrl = "allotController.do?getByPhoneInvoiceNumber";
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
  getDetail(detail){
    this.detail = detail;
  }
  alertTextarea(){
    this.isReasonModel=1;
  }
  cancelReasonModel(){
    let alertCtrl = this.alertCtrl.create({
      title:"是否取消编辑原因？",
      buttons: [
        {
          text:'取消',
          handler:data=>{
            console.log("取消");
          }
        },
        {
          text:'确定',
          handler:data=>{
            this.isReasonModel=0;
          }

        }
      ]
    });
    alertCtrl.present();
  }
  clearReason(){
    let alertCtrl = this.alertCtrl.create({
      title:"是否取消清空编辑内容？",
      buttons: [
        {
          text:'取消',
          handler:data=>{
            console.log("取消");
          }
        },
        {
          text:'确定',
          handler:data=>{
            this.censorshipReason="";
          }

        }
      ]
    });
    alertCtrl.present();
  }
  saveReason(){
    this.isReasonModel=0;
  }
  postData(){
    let url;
    url = "allotController.do?allotAudit";
    if (!this.censorshipReason){
      this.censorshipReason = ""
    }
    let isAgree;
    if (this.isAgree==1){
      isAgree = "0";
    }else if (this.isAgree==0){
      isAgree = "1";
      if (!this.censorshipReason){
        let alert = this.alertCtrl.create({
          title:"请输入驳回原因！"
        });
        alert.present();
        return false;
      }
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:10000
    });
    loading.present();
    this.httpService.post(this.httpService.getUrl()+url,{departCode:this.departCode,userCode:this.userCode,userName:this.userName,invoiceData:JSON.stringify(this.invoice),approveResult:isAgree,opinion:this.censorshipReason}).subscribe(data=>{
      if (data.success == "true"){
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present()
      }else {
        alert(data.msg)
      }
      loading.dismiss();
    })
  }
}
