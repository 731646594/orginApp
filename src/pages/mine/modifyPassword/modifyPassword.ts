import { Component } from '@angular/core';
import {AlertController, App, NavController} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";
import {LoginPage} from "../login/login";

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
              public alertCtrl:AlertController,public app:App) {
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
    if(!(/^(\w+|[!@#$%^&*]+){6,12}$/.test(this.newPsw))){
      let alert=this.alertCtrl.create({
        title:"密码只能输入6到12位的数字、字母或特殊字符！"
      });
      alert.present();
      return;
    }
    if(this.newPsw != this.confirmPsw){
      let alert=this.alertCtrl.create({
        title:"确认密码与新密码不一致！"
      });
      alert.present();
      return;
    }
    this.httpService.postData(this.httpService.getUrl()+"appLoginController/modifyPassword.do",
      {password:this.oldPsw,passwordNew:this.newPsw},(data)=>{
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
        this.storageService.remove("loginDepartName");
        this.storageService.remove("loginDepartCode");
        this.storageService.remove("loginUserName");
        this.storageService.remove("loginUserCode");
        this.app.getRootNav().setRoot(LoginPage);
      }
    },true)
  }
}
