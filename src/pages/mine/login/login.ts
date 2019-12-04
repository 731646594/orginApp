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
    this.httpService.postData(this.httpService.getUrl()+"appLoginController/login.do",
      {usercode:this.username,password:this.password},(data)=>{
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
        this.storageService.write("loginPassWord",this.password);
        this.storageService.write("loginDepartList",this.departList);
        this.storageService.write("applyPageData",loginInfo[2].func.replace(/'/g, '"'));
        this.storageService.write("token",loginInfo[4].token);
        this.storageService.write("systemUrl",loginInfo[5].systemUrl);
        this.depart = this.departList[0];
      }
    },true)
  }
  entry(){
    this.downloadDictionaries();
    let pageData1 = JSON.parse(this.storageService.read("applyPageData"));
    if (pageData1.pageData.length!=1){
      this.httpService.postData(this.httpService.getUrl()+"devWeeklyCheckController/getCheckListCols.do",{departCode:this.depart.departcode},data=>{
        if (data.success=="true"){
          this.storageService.sqliteInsert("weeklyData",this.username,JSON.stringify(data.data));
          this.httpService.postData(this.httpService.getUrl()+"devHandOverController/getCheckListCols.do",{departCode:this.depart.departcode},data2=>{
            if (data2.success=="true"){
              this.storageService.sqliteInsert("handoverData",this.username,JSON.stringify(data2.data));
            }else {
              alert(data2.msg);
            }
          });
        }else {
          alert(data.msg);
        }
      },true);
    }
    this.storageService.write("loginDepartName",this.depart.shortname);
    this.storageService.write("loginDepartLongName",this.depart.departname);
    this.storageService.write("loginDepartCode",this.depart.departcode);
    this.app.getRootNav().push(TabsPage);
  }
  serviceSetting(){
    this.app.getRootNav().push(ServerSettingPage);
  }
  downloadDictionaries(){
    this.httpService.postData(this.httpService.getUrl()+"appLoginController/getDeparts.do",{userCode:this.username},data1=>{
      if (data1.success == "true"){
        this.storageService.sqliteInsert("departListData",this.username,JSON.stringify(data1.data));
        // this.storageService.write("departListData",data1.data);
      }else {
        alert(data1.msg)
      }
    });
    this.httpService.postData(this.httpService.getUrl()+"dictionariesController/getPyyyDic.do",{},data2=> {
      if (data2.success == "success"){
        this.storageService.sqliteInsert("lossReasonData",this.username,JSON.stringify(data2.data));
        // this.storageService.write("lossReasonData",data2.data);
      }
      else {
        alert(data2.msg)
      }
    });
    this.httpService.postData(this.httpService.getUrl()+"dictionariesController/getCfddDic.do",{},data3=> {
      if (data3.success == "success"){
        this.storageService.sqliteInsert("storePlaceData",this.username,JSON.stringify(data3.data));
        // this.storageService.write("storePlaceData",data3.data);
      }
      else {
        alert(data3.msg)
      }
    });
  }
}
