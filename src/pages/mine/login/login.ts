import { Component } from '@angular/core';
import {AlertController, App, NavController} from 'ionic-angular';
import {HttpService} from "../../../services/httpService";
import {StorageService} from "../../../services/storageService";

import {ServerSettingPage} from "../serverSetting/serverSetting";
import {TabsPage} from "../../tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username;
  password;
  isLogin=false;
  depart;
  departList=[];
  constructor(public navCtrl: NavController,public httpService:HttpService,public alertCtrl:AlertController,
              public storageService:StorageService,public app:App) {
    this.loadData();
  }
  loadData(){
    if (this.storageService.read("loginUserName")){
      this.isLogin=true;
    }
    if (this.storageService.read("loginDepartList")) {
      this.departList = this.storageService.read("loginDepartList");
      this.depart = this.departList[0];
    }
  }
  login(){
    if (!this.username){
      let alert=this.alertCtrl.create({
        title:"用户名不能为空！"
      });
      alert.present();
      return;
    }
    if (!this.password){
      let alert=this.alertCtrl.create({
        title:"密码不能为空！"
      });
      alert.present();
      return;
    }
    this.httpService.post(this.httpService.getUrl()+"appLoginController.do?login",
      {usercode:this.username,password:this.password}).subscribe((data)=>{
      if (data.success=="false"){
        let alert=this.alertCtrl.create({
          title:data.msg
        });
        alert.present();
        return;
      }else {
        this.isLogin=true;
        let loginInfo = {};
        loginInfo = data.data;
        this.departList = loginInfo[1].depart;
        this.storageService.write("loginUserName",loginInfo[0].user.username);
        this.storageService.write("loginUserCode",loginInfo[0].user.usercode);
        this.storageService.write("loginDepartList",this.departList);
        this.depart = this.departList[0];
      }
    },err=>{
      alert(err)
    })
  }
  entry(){
    this.storageService.write("loginDepartName",this.depart.departname);
    this.storageService.write("loginDepartCode",this.depart.departcode);
    this.app.getRootNav().push(TabsPage);
  }
  serviceSetting(){
    this.app.getRootNav().push(ServerSettingPage);
  }
}
