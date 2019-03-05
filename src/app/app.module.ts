import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AppsPage } from '../pages/commonStyle/apps/apps';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/mine/login/login";
import { ModifyPasswordPage } from '../pages/mine/modifyPassword/modifyPassword';
import { ServerSettingPage } from "../pages/mine/serverSetting/serverSetting";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from "@ionic-native/sqlite";
import { HttpModule } from "@angular/http";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpService } from "../services/httpService";
import { StorageService } from "../services/storageService";

@NgModule({
  declarations: [
    MyApp,
    AppsPage,
    HomePage,
    TabsPage,
    LoginPage,
    ModifyPasswordPage,
    ServerSettingPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true' ,       //隐藏全部子页面tabs
      iconMode: 'ios',
      mode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      scrollAssist:false,
      autoFocusAssit:false,
      backButtonText: '返回',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AppsPage,
    HomePage,
    TabsPage,
    LoginPage,
    ModifyPasswordPage,
    ServerSettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    HttpClient,
    HttpService,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
