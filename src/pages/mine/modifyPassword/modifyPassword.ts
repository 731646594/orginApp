import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";

@Component({
  selector: 'page-modifyPassword',
  templateUrl: 'modifyPassword.html'
})
export class ModifyPasswordPage {
  userCode;
  oldPsw;
  newPsw;
  confirmPsw;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController) {
    this.loadData();
  }
  loadData(){
    this.userCode = this.storageService.read("loginUserCode")
  }
  resetPsw(){
    if (!this.oldPsw){
      let alert=this.alertCtrl.create({
        title:"原密码不能为空！"
      });
      alert.present();
      return;
    }
    if (!this.newPsw){
      let alert=this.alertCtrl.create({
        title:"新密码不能为空！"
      });
      alert.present();
      return;
    }
    if (!this.confirmPsw){
      let alert=this.alertCtrl.create({
        title:"确认密码不能为空！"
      });
      alert.present();
      return;
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:10000
    });
    loading.present();
    this.httpService.post(this.httpService.getUrl()+"appLoginController.do?modifyPassword",
      {userid:this.userCode,password:this.oldPsw,passwordAgain:this.confirmPsw,passwordNew:this.newPsw}).subscribe((data)=>{
      loading.dismiss();
      if (data.success=="false"){
        let alert=this.alertCtrl.create({
          title:data.msg
        });
        alert.present();
        return;
      }else {
        let alert=this.alertCtrl.create({
          title:data.msg
        });
        alert.present();
        this.navCtrl.pop();
      }
    },err=>{
      alert(err)
    })
  }
}
