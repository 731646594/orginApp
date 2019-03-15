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
  checkedIndex = null;
  isAgree=1;
  isReasonModel=0;
  censorshipReason;
  isHave = 0;
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
    this.postUrl = "discardController.do?queryApproveInvoice";
    let loading = this.loadingCtrl.create({
      content:"正在加载"
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
  censorshipDetailPage(invoice){
    this.app.getRootNav().push(ScrapApprovalDetailPage,{nvoice:invoice});
  }
}
