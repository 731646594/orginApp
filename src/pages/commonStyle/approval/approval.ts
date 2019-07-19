import { Component } from '@angular/core';
import {AlertController, App, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../services/httpService";
import {StorageService} from "../../../services/storageService";

@Component({
  selector: 'page-approval',
  templateUrl: 'approval.html'
})
export class ApprovalPage {
  isReasonModel;
  detailReason;
  isAgree=1;
  isAgreeString="0";
  userCode;
  userName;
  departCode;
  pageName;
  pageData;
  data={};
  postDataUrl="";
  postApprovalUrl ="";
  postDataParams;
  nextPage;
  postUrl;
  postParams;
  searchDatas=[];
  checkedIndex;
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public storageService?:StorageService,public loadingCtrl?:LoadingController,
              public httpService?:HttpService,public alertCtrl?:AlertController,public app?:App,public events?: Events) {
    this.userCode = this.storageService.read("loginUserCode");
    this.userName = this.storageService.read("loginUserName");
    this.departCode = this.storageService.read("loginDepartCode");
  }
  ionViewDidLoad(){
    let loading = this.loadingCtrl.create({
      content:"正在加载",
      duration:5000
    });
    loading.present();
    console.log(this.httpService.getUrl()+this.postUrl)
    this.httpService.postData(this.httpService.getUrl()+this.postUrl,this.postParams,data=>{
      if (data.success == "true"){
        this.searchDatas = data.data;
      }else {
        alert(data.msg);
      }
      loading.dismiss();
    })
  }


  getCardValue(index){
    this.app.getRootNav().push(this.nextPage,{invoice:this.searchDatas[index]});
  }
  getCardSelectValue(index){
    if ((this.checkedIndex||this.checkedIndex==0)&&this.checkedIndex!=index){
      this.searchDatas[index].checkedIcon = true;
      this.searchDatas[this.checkedIndex].checkedIcon = false;
      this.checkedIndex = index;
    }else {
      this.searchDatas[index].checkedIcon = true;
      this.checkedIndex = index;
    }
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
  getpostDataParams(){

  }

  check():any{
    if(this.checkedIndex!=0&&!this.checkedIndex){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择单据！"
      });
      alertCtrl.present();
      return false;
    }else{
      return true;
    }
  }
  postData(){
    if(!this.check()){
      return false;
    }
    if (!this.detailReason){
      this.detailReason = ""
    }
    if (this.isAgree==1){
      this.isAgreeString = "0";
    }else if (this.isAgree==0){
      this.isAgreeString = "1";
      if (!this.detailReason){
        let alertCtrl = this.alertCtrl.create({
          title:"请输入驳回原因！"
        });
        alertCtrl.present();
        return false;
      }
    };
    this.getpostDataParams();
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:5000
    });
    loading.present();
    // this.httpService.post(this.httpService.getUrl()+this.postDataUrl,this.postDataParams).subscribe(data=>{
    //   if (data.success == "true"){
    //     let alertCtrl = this.alertCtrl.create({
    //       title:data.msg
    //     });
    //     alertCtrl.present()
    //     this.events.publish("ApprovalPage:refresh");
    //   }else {
    //     alert(data.msg)
    //   }
    //   loading.dismiss()
    // })

    this.httpService.postData(this.httpService.getUrl()+this.postDataUrl,this.postDataParams,data=>{
      if (data.success == "true"){
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present()
        this.events.publish("ApprovalPage:refresh");
      }
      loading.dismiss()
    })
  }
}
