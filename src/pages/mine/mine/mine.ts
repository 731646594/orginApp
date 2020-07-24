import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {ServerSettingPage} from "../serverSetting/serverSetting";
import {ModifyPasswordPage} from "../modifyPassword/modifyPassword";
import {LoginPage} from "../login/login";
import {HttpService} from "../../../services/httpService";
import {DeviceTypePage} from "../deviceType/deviceType";

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html'
})
export class MinePage {
  userName;
  userCode;
  departName;
  departCode;
  pageName;
  pageData;
  itemData=[];
  constructor(public app:App,public navCtrl: NavController,public storageService:StorageService,public navParams:NavParams,
              public httpService:HttpService,public alertCtrl:AlertController) {

  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
    // PageUtil.pages["mine"]=this;
    // let alertCtrl = this.alertCtrl.create({
    //   title:"清除成功",
    //   subTitle:"点击确定隐藏点击确点击确定隐藏点击确点击确定隐藏点击确点击确定隐藏点击确定隐藏点击确点击确定隐藏",
    //   cssClass:"myAlertStyle",
    //   buttons:[{
    //     text:"确定",
    //     cssClass:"myAlertButtonStyle"
    //   }]
    // });
    // alertCtrl.present();
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.pageName = this.navParams.data.pageName;
    this.pageData = this.navParams.data.pageData;
  }
  appChoose(page,params){

    //1:commonStyle/apps通用菜单样式
    //2:mine/serverSetting服务器设置
    //3:mine/modifyPassword修改密码
    //4:mine/login切换单位
    //5:mine/login重新登录
    //6:清除数据
    //7:更新字典
    let willGoPage = null;
    if(page == 2){
      willGoPage = ServerSettingPage;
    }
    else if(page == 3){
      willGoPage = ModifyPasswordPage;
    }
    else if(page == 4){
      this.storageService.remove("loginDepartName");
      this.storageService.remove("loginDepartCode");
      willGoPage = null;
      this.app.getRootNav().setRoot(LoginPage);
    }
    else if(page == 5){
      let alertCtrl = this.alertCtrl.create({
        title:"是否退出登录？",
        buttons:[
          {
            text:"是",
            handler:()=>{
              this.storageService.remove("loginDepartName");
              this.storageService.remove("loginDepartCode");
              this.storageService.remove("loginUserName");
              this.storageService.remove("loginUserCode");
              willGoPage = null;
              this.app.getRootNav().setRoot(LoginPage)
            }
          },
          {
            text:"否",
          }
        ]
      });
      alertCtrl.present();
    }
    else if(page == 6){
      this.storageService.remove("loginDepartName");
      this.storageService.remove("loginDepartCode");
      this.storageService.remove("loginUserName");
      this.storageService.remove("loginUserCode");
      let alertCtrl = this.alertCtrl.create({
        title:"清除成功！"
      });
      alertCtrl.present();
      willGoPage = LoginPage;
    }
    else if(page == 7){
      this.downloadDictionaries();
    }
    else if(page == 8){
      willGoPage = DeviceTypePage;
    }
    if (willGoPage!=null){
      this.app.getRootNav().push(willGoPage,params)
    }

  }
  downloadDictionaries(){
    this.httpService.postData(this.httpService.getUrl()+"appLoginController/getDeparts.do",{userCode:this.userCode},data1=>{
      if (data1.success == "true"){
        this.storageService.sqliteInsert("departListData",this.userCode,JSON.stringify(data1.data));
        // this.storageService.write("departListData",data1.data);
        let alertCtrl = this.alertCtrl.create({
          title:"更新成功！"
        });
        alertCtrl.present();
      }else {
        alert(data1.msg)
      }
    },true);
    this.httpService.postData(this.httpService.getUrl()+"dictionariesController/getPyyyDic.do",{},data2=> {
      if (data2.success == "success"){
        this.storageService.sqliteInsert("lossReasonData",this.userCode,JSON.stringify(data2.data));
        // this.storageService.write("lossReasonData",data2.data);
      }
      else {
        alert(data2.msg)
      }
    });
    this.httpService.postData(this.httpService.getUrl()+"dictionariesController/getCfddDic.do",{},data3=> {
      if (data3.success == "success"){
        this.storageService.sqliteInsert("storePlaceData",this.userCode,JSON.stringify(data3.data));
        // this.storageService.write("storePlaceData",data3.data);
      }
      else {
        alert(data3.msg)
      }
    });
  }
}
