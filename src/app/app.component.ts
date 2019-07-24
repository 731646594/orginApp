import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageService } from "../services/storageService";

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/mine/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,storageService:StorageService) {
    // let olog = console.error;
    // console.error = function() {
    //   alert([].join.call(arguments, ''))
    //   olog.apply(this, arguments);
    //
    // };
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleBlackTranslucent();
      splashScreen.hide();
      platform.registerBackButtonAction(() => {
        return;
      });
      if (storageService.read("loginUserName")&&storageService.read("loginDepartName")){
        this.rootPage = TabsPage;
      }else {
        this.rootPage = LoginPage;
      }
      storageService.initDatabase();
    });
  }
}
