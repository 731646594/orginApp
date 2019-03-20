import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {TransferConfirmationDetailPage} from "../transferConfirmationDetail/transferConfirmationDetail";

@Component({
  selector: 'page-transferConfirmation',
  templateUrl: 'transferConfirmation.html'
})
export class TransferConfirmationPage {
  pageName;
  pageIndex;
  postUrl;
  censorshipList;
  checkedIndex = null;
  isHave = 0;
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
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.pageName = this.navParams.get("pageName");
    this.postUrl = this.navParams.get("postUrl");
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
      document.getElementsByClassName("censorshipIcon")[index].setAttribute("style","color: #0091d2;");
      this.censorshipList[index].checked = true;
      document.getElementsByClassName("censorshipIcon")[this.checkedIndex].setAttribute("style","color: #dedede;");
      this.censorshipList[this.checkedIndex].checked = false;
      this.checkedIndex = index;
    }else {
      document.getElementsByClassName("censorshipIcon")[index].setAttribute("style","color: #0091d2;");
      this.censorshipList[index].checked = true;
      this.checkedIndex = index;
    }
  }
  censorshipDetailPage(invoice){
    this.app.getRootNav().push(TransferConfirmationDetailPage,{pageName:this.navParams.get("childPageName"),postUrl:this.navParams.get("childPostUrl"),invoice:invoice});
  }
}
