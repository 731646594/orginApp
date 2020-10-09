import { Component } from '@angular/core';
import {AlertController, App, NavController} from 'ionic-angular';
import {HttpService} from "../../../services/httpService";
import {StorageService} from "../../../services/storageService";

import {ServerSettingPage} from "../serverSetting/serverSetting";
import {TabsPage} from "../../tabs/tabs";
import {ModifyPasswordPage} from "../modifyPassword/modifyPassword";

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
        //验证特殊字符
        let patternSpecial=/(?=(?:.*?[·~!@#￥%^&*()_\|,<>.?/=+]))/;
        //验证大写字母
        let patternCapital = /(?=(?:.*?[A-Z]))/;
        //验证密码长度
        let patternLength=/(?=^.{12,}$)/;
        //验证数字
        let patternNumber=/(?=(?:.*?\d))/;
        //验证小写字母
        let patternLower= /(?=(?:.*?[a-z]))/;
        //验证连续数字
        //验证顺序连续数字不能超过五位(结果注意取反)
        let patternContinuous= /(0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)){4}\d/;
        //验证倒序连续数字不能超过五位(结果注意取反)
        let patternBackNumber= /(9(?=8)|8(?=7)|7(?=6)|6(?=5)|5(?=4)|4(?=3)|3(?=2)|2(?=1)|1(?=0)){4}\d/;
        //验证五位重复数字(结果注意取反)
        let patternRepeat=/([\d])\1{4}/;
        if (
          !(patternSpecial.test(this.password))||
          !(patternCapital.test(this.password))||
          !(patternLength.test(this.password))||
          !(patternNumber.test(this.password))||
          !(patternLower.test(this.password))||
          (patternContinuous.test(this.password))||
          (patternBackNumber.test(this.password))||
          (patternRepeat.test(this.password))
        ){
          let alert1=this.alertCtrl.create({
            title:"密码不符合检验规则请修改密码！"
          });
          alert1.present();
          this.app.getRootNav().push(ModifyPasswordPage,{oldPsw:this.password});
          return;
        }
        let loginInfo = {};
        loginInfo = data.data;
        let item = loginInfo[2].func.replace(/'/g, '"');
        try {
          let i = JSON.parse(item);
          this.isLogin=true;
          this.departList = loginInfo[1].depart;
          this.storageService.write("loginUserName",loginInfo[0].user.username);
          this.storageService.write("loginUserCode",loginInfo[0].user.usercode);
          this.storageService.write("loginPassWord",this.password);
          this.storageService.write("loginDepartList",this.departList);
          this.storageService.write("applyPageData",loginInfo[2].func.replace(/'/g, '"'));
          if (loginInfo[4]){
            this.storageService.write("token",loginInfo[4].token);
            this.storageService.write("systemUrl",loginInfo[5].systemUrlJump);
          }
          this.depart = this.departList[0];
          if (this.httpService.getUrl() == 'http://210.12.194.113:7000/plamassets/mobile/'){
            this.storageService.write('noFlightMode',true)
          }else {
            this.storageService.write('noFlightMode',false)
          }
        }catch {
          let alert=this.alertCtrl.create({
            title:"该用户配置不正确，请联系管理员！"
          });
          alert.present();
          return;
        }
      }
    },true)
  }
  entry(){
    this.downloadDictionaries();
    if (this.httpService.getUrl()=="http://210.12.193.61:9082/plamassets/mobile/"||(this.httpService.getUrl().indexOf("192.168")>-1)){
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
