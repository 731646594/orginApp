import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ScrapApprovalDetailPage} from "../scrapApprovalDetail/scrapApprovalDetail";

@Component({
  selector: 'page-scrapApproval',
  templateUrl: 'scrapApproval.html'
})
export class ScrapApprovalPage {
  postUrl;
  censorshipList;
  isHave = 0;
  userName;
  userCode;
  departCode;
  isAgree=1;
  isReasonModel=0;
  detailReason="";
  checkedIndex = null;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public app:App,public alertCtrl:AlertController,public navParams:NavParams,public loadingCtrl:LoadingController) {
    // this.loadData();
  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.postUrl = "discardController.do?queryApproveInvoice";
    let loading = this.loadingCtrl.create({
      content:"正在加载",
      duration:10000
    });
    loading.present();
    this.httpService.post(this.httpService.getUrl()+this.postUrl,{departCode:this.departCode,userCode:this.userCode}).subscribe(data=>{
      if (data.success == "true"){
        this.censorshipList = data.data;
        if (this.censorshipList.length){
          this.isHave=1;
        }
      }else {
        alert(data.msg);
      }
      loading.dismiss();
    })
  }
  checkedItem(index){
    if ((this.checkedIndex||this.checkedIndex==0)&&this.checkedIndex!=index){
      document.getElementsByClassName("censorshipIcon")[index].setAttribute("style","color: #4389e8;");
      this.censorshipList[index].checked = true;
      document.getElementsByClassName("censorshipIcon")[this.checkedIndex].setAttribute("style","color: #dedede;");
      this.censorshipList[this.checkedIndex].checked = false;
      this.checkedIndex = index;
    }else {
      document.getElementsByClassName("censorshipIcon")[index].setAttribute("style","color: #4389e8;");
      this.censorshipList[index].checked = true;
      this.checkedIndex = index;
    }
  }
  censorshipDetailPage(invoice){
    this.app.getRootNav().push(ScrapApprovalDetailPage,{invoice:invoice});
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
            this.detailReason="";
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
    url = "discardController.do?approve";
    if(!this.checkedIndex){
      let alert = this.alertCtrl.create({
        title:"请选择单据！"
      });
      alert.present();
      return false;
    }
    if (!this.detailReason){
      this.detailReason = ""
    }
    let isAgree;
    if (this.isAgree==1){
      isAgree = "0";
    }else if (this.isAgree==0){
      isAgree = "1";
      if (!this.detailReason){
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
    this.httpService.post(this.httpService.getUrl()+url,{departCode:this.departCode,userCode:this.userCode,phoneInvoiceNumber:this.censorshipList[this.checkedIndex].invoiceNumber,approveResult:isAgree,opinion:this.detailReason}).subscribe(data=>{
      if (data.success == "true"){
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present()
      }else {
        alert(data.msg)
      }
      loading.dismiss()
    })
  }
}
