import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {ServerSettingPage} from "../serverSetting/serverSetting";
import {ModifyPasswordPage} from "../modifyPassword/modifyPassword";
import {LoginPage} from "../login/login";
import {HttpService} from "../../../services/httpService";

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
              public httpService:HttpService,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {

  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
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
    if(this.pageName == "加油站管理"&&!this.itemData.length){
      let loading = this.loadingCtrl.create({
        content:"请等待...",
        duration: 10000
      });
      loading.present();
      this.httpService.post(this.httpService.getUrl()+"devWeeklyCheckController.do?getCheckListCols",{departCode:this.departCode}).subscribe(data=>{
        if (data.success=="true"){
          this.itemData.push(data.data);
          this.httpService.post(this.httpService.getUrl()+"devHandOverController.do?getCheckListCols",{departCode:this.departCode}).subscribe(data2=>{
            if (data2.success=="true"){
              this.itemData.push(data2.data);
              loading.dismiss();
            }else {
              alert(data2.msg);
              loading.dismiss();
            }
          });
        }else {
          alert(data.msg);
          loading.dismiss();
        }
      });
    }
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
      willGoPage = LoginPage;
    }
    else if(page == 5){
      this.storageService.remove("loginDepartName");
      this.storageService.remove("loginDepartCode");
      this.storageService.remove("loginUserName");
      this.storageService.remove("loginUserCode");
      willGoPage = LoginPage;
    }
    else if(page == 6){
      this.storageService.clear();
      this.storageService.remove("loginDepartList");
      this.storageService.dropUserTable("departListData");
      this.storageService.dropUserTable("lossReasonData");
      this.storageService.dropUserTable("storePlaceData");
      let alertCtrl = this.alertCtrl.create({
        title:"清除成功！"
      });
      alertCtrl.present();
      willGoPage = LoginPage;
    }
    else if(page == 7){
      this.downloadDictionaries();
    }
    if (willGoPage!=null){
      this.app.getRootNav().push(willGoPage,params)
    }

  }
  downloadDictionaries(){
    let loadingCtrl = this.loadingCtrl.create({
      content:"正在加载",
      duration:10000
    });
    loadingCtrl.present();
    this.httpService.post(this.httpService.getUrl()+"allotController.do?getDeparts",{userCode:this.userCode}).subscribe(data1=>{
      if (data1.success == "true"){
        this.storageService.sqliteInsert("departListData",this.userCode,JSON.stringify(data1.data));
        // this.storageService.write("departListData",data1.data);
        loadingCtrl.dismiss();
        let alertCtrl = this.alertCtrl.create({
          title:"更新成功！"
        });
        alertCtrl.present();
      }else {
        alert(data1.msg)
      }
    });
    this.httpService.get(this.httpService.getUrl()+"dictionariesController.do?getPyyyDic",{}).subscribe(data2=> {
      if (data2.success == "success"){
        this.storageService.sqliteInsert("lossReasonData",this.userCode,JSON.stringify(data2.data));
        // this.storageService.write("lossReasonData",data2.data);
      }
      else {
        alert(data2.msg)
      }
    });
    this.httpService.get(this.httpService.getUrl()+"dictionariesController.do?getCfddDic",{}).subscribe(data3=> {
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
