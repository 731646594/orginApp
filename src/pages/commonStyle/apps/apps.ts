import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {ServerSettingPage} from "../../mine/serverSetting/serverSetting";
import {ModifyPasswordPage} from "../../mine/modifyPassword/modifyPassword";
import {LoginPage} from "../../mine/login/login";
import {HttpService} from "../../../services/httpService";

@Component({
  selector: 'page-apps',
  templateUrl: 'apps.html'
})
export class AppsPage {
  userName;
  userCode;
  departName;
  pageName;
  pageData;
  constructor(public app:App,public navCtrl: NavController,public storageService:StorageService,public navParams:NavParams,
              public httpService:HttpService,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {

  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
    console.log(this.navParams.data);
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUsercode");
    this.departName = this.storageService.read("loginDepartName");
    this.pageName = this.navParams.data.pageName;
    this.pageData = this.navParams.data.pageData;
  }
  appChoose(page,params){

    //1:commonStyle/apps通用样式
    //2:mine/serverSetting服务器设置
    //3:mine/modifyPassword修改密码
    //4:mine/login切换单位
    //5:mine/login重新登录
    //6:清除数据
    //7:更新字典

    let willGoPage = null;
    if(page == 1){
      willGoPage = AppsPage;
    }
    else if(page == 2){
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
      this.storageService.deleteUserTable("loginDepartList");
      this.storageService.deleteUserTable("departListData");
      this.storageService.deleteUserTable("lossReasonData");
      this.storageService.deleteUserTable("storePlaceData");
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
      content:"正在加载"
    });
    loadingCtrl.present();
    this.httpService.post(this.httpService.getUrl()+"allotController.do?getDeparts",{userCode:this.userCode}).subscribe(data1=>{
      if (data1.success == "true"){
        this.sqliteInsert("departListData",this.userCode,JSON.stringify(data1.data));
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
        this.sqliteInsert("lossReasonData",this.userCode,JSON.stringify(data2.data));
        // this.storageService.write("lossReasonData",data2.data);
      }
      else {
        alert(data2.msg)
      }
    });
    this.httpService.get(this.httpService.getUrl()+"dictionariesController.do?getCfddDic",{}).subscribe(data3=> {
      if (data3.success == "success"){
        this.sqliteInsert("storePlaceData",this.userCode,JSON.stringify(data3.data));
        // this.storageService.write("storePlaceData",data3.data);
      }
      else {
        alert(data3.msg)
      }
    });
  }
  sqliteInsert(tableName,userCode,stringData){
    this.storageService.createUserTable(tableName);
    this.storageService.getUserTable().executeSql('SELECT * FROM '+tableName+' WHERE userCode=\''+userCode+'\';',[]).then(res =>{
      if (res.rows.length>0){
        this.storageService.updateUserTable(tableName,userCode,stringData);
      }else {
        this.storageService.insertIntoUserTable(tableName,userCode,stringData);
      }
    }).catch(e =>alert("erro2:"+JSON.stringify(e)));
  }
}
