import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams} from 'ionic-angular';
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
  psdRules = [];
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public app:App,public navParams:NavParams) {
    this.loadData();
    if (this.navParams.get('oldPsw')){
      this.oldPsw = this.navParams.get('oldPsw');
    }
    this.psdRules = [
      '新密码必须含有特殊字符。',
      '新密码最短为12位。',
      '新密码必须含有大写字母。',
      '新密码必须含有小写字母。',
      '新密码必须含有数字。',
      '新密码不能有5位以上正序连续数字。',
      '新密码不能有5位以上倒序连续数字。',
      '新密码不能有5位以上重复数字'
    ]
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
    if (!(patternSpecial.test(this.newPsw))){
      let alert1=this.alertCtrl.create({
        title:"新密码必须含有特殊字符！"
      });
      alert1.present();
      return;
    }else if (!(patternCapital.test(this.newPsw))){
      let alert1=this.alertCtrl.create({
        title:"新密码必须含有大写字母！"
      });
      alert1.present();
      return;
    }else if (!(patternLength.test(this.newPsw))){
      let alert1=this.alertCtrl.create({
        title:"新密码最短为12位！"
      });
      alert1.present();
      return;
    }else if (!(patternNumber.test(this.newPsw))){
      let alert1=this.alertCtrl.create({
        title:"新密码必须含有数字！"
      });
      alert1.present();
      return;
    }else if (!(patternLower.test(this.newPsw))){
      let alert1=this.alertCtrl.create({
        title:"新密码必须含有小写字母！"
      });
      alert1.present();
      return;
    }else if ((patternContinuous.test(this.newPsw))){
      let alert1=this.alertCtrl.create({
        title:"新密码不能有5位以上正序连续数字！"
      });
      alert1.present();
      return;
    }else if ((patternBackNumber.test(this.newPsw))){
      let alert1=this.alertCtrl.create({
        title:"新密码不能有5位以上倒序连续数字！"
      });
      alert1.present();
      return;
    }else if ((patternRepeat.test(this.newPsw))){
      let alert1=this.alertCtrl.create({
        title:"新密码不能有5位以上重复数字！"
      });
      alert1.present();
      return;
    }
    if (!this.confirmPsw){
      let alert=this.alertCtrl.create({
        title:"确认密码不能为空！"
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
