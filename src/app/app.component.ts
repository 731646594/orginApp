import {Component, ViewChild} from '@angular/core';
import {AlertController, App, Nav, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageService } from "../services/storageService";

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/mine/login/login";
import {HttpService} from "../services/httpService";
import {AppVersion} from "@ionic-native/app-version";
declare var wkWebView: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild('myNav') nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,storageService:StorageService,httpService:HttpService, toastCtrl: ToastController,alertCtrl:AlertController,app:App,appVersion:AppVersion) {
    // let olog = console.error;
    // console.error = function() {
    //   alert([].join.call(arguments, ''))
    //   olog.apply(this, arguments);
    //
    // };
    document.addEventListener('deviceready', () => {
      httpService.getUrl();
      let url = storageService.read("serverUrl");
      // wkWebView.injectCookie(url["agreement"]+"://"+url["address"]+"/");
    });
    let alertControl = alertCtrl;
    appVersion.getVersionNumber().then((value:any)=>{
      httpService.postData(httpService.getUrl()+"appVersionController/getVersionUrl.do",{currentVersion:"v"+value},data=>{
        let alertCtrl = alertControl.create({
          title:"请更新最新版本的APP",
          subTitle:data.data.APP_PACKAGE_VERSION,
          message:data.data.APP_PACKAGE_MSG,
          buttons:[
            {
              text:"更新",
              handler:()=>{
                window.open(data.data.APP_PACKAGE_URL)
              }
            },
          ]
        });
        alertCtrl.present();
      },false,(err)=>{});
    }).catch(err=>{
      let alertCtrl = alertControl.create({
        title:"error:"+err,
      });
      alertCtrl.present();
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleBlackTranslucent();
      splashScreen.hide();
      // platform.registerBackButtonAction(() => {
      //   return;
      // });
      platform.registerBackButtonAction(() => {
        if (!this.nav.canGoBack()){
          if (this.backButtonPressed){
            platform.exitApp();
          } else {
            toastCtrl.create({
              message: '再按一次退出应用',
              duration: 2000,
              position: 'bottom',
              cssClass:"toastTextCenter"
            }).present();
            this.backButtonPressed = true;
            setTimeout(() => {
              this.backButtonPressed = false;
            }, 2000)
          }
          return;
        }

        app.navPop();//剩余的情况全部使用全局路由进行操作
      }, 999);
      if (storageService.read("loginUserName")&&storageService.read("loginDepartName")){
        this.rootPage = TabsPage;
      }else {
        this.rootPage = LoginPage;
      }
      storageService.initDatabase();
    });
  }
}
