import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MenuPage } from '../pages/commonStyle/menu/menu';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/mine/login/login";
import { ModifyPasswordPage } from '../pages/mine/modifyPassword/modifyPassword';
import { ServerSettingPage } from "../pages/mine/serverSetting/serverSetting";
import { ShowPicturePage } from "../pages/commonStyle/showPicture/showPicture";
import { ScanCodePage } from "../pages/apps/inventory/scanCode/scanCode";
import { InventoryEntryPage } from "../pages/apps/inventory/inventoryEntry/inventoryEntry";
import { InventoryQueryPage } from "../pages/apps/inventory/inventoryQuery/inventoryQuery";
import { InventoryQueryDetailPage } from "../pages/apps/inventory/inventoryQueryDetail/inventoryQueryDetail";
import { InventoryDataUploadPage } from "../pages/apps/inventory/inventoryDataUpload/inventoryDataUpload";
import { InventoryDataDownloadPage } from "../pages/apps/inventory/inventoryDataDownload/inventoryDataDownload";
import { LocalDownloadQueryPage } from "../pages/apps/inventory/localDownloadQuery/localDownloadQuery";
import { LocalDownloadQueryListPage } from "../pages/apps/inventory/localDownloadQueryList/localDownloadQueryList";
import { LocalDownloadQueryListDetailPage } from "../pages/apps/inventory/localDownloadQueryListDetail/localDownloadQueryListDetail";
import { ScrapApplicationPage } from "../pages/apps/scrap/scrapApplication/scrapApplication";
import { ScrapApprovalPage } from "../pages/apps/scrap/scrapApproval/scrapApproval";
import { ScrapApprovalDetailPage } from "../pages/apps/scrap/scrapApprovalDetail/scrapApprovalDetail";
import { ScrapQueryPage } from "../pages/apps/scrap/scrapQuery/scrapQuery";
import { ScrapQueryDetailPage } from "../pages/apps/scrap/scrapQueryDetail/scrapQueryDetail";
import { AllocateApplicationPage } from "../pages/apps/allocate/allocateApplication/allocateApplication";
import { AllocateApprovalPage } from "../pages/apps/allocate/allocateApproval/allocateApproval";
import { AllocateApprovalDetailPage } from "../pages/apps/allocate/allocateApprovalDetail/allocateApprovalDetail";
import { AllocateQueryPage } from "../pages/apps/allocate/allocateQuery/allocateQuery";
import { AllocateQueryDetailPage } from "../pages/apps/allocate/allocateQueryDetail/allocateQueryDetail";

import { AssetQuiryPage } from "../pages/apps/query/assetQuiry/assetQuiry";
import { LedgerQueryPage } from "../pages/apps/query/ledgerQuery/ledgerQuery";
import { LedgerQueryDetailPage } from "../pages/apps/query/ledgerQueryDetail/ledgerQueryDetail";
import { AggregateQueryPage } from "../pages/apps/query/aggregateQuery/aggregateQuery";
import { ChangeShiftsEntryPage } from "../pages/apps/gas/changeShiftsEntry/changeShiftsEntry";
import { ChangeShiftsEntrySignaturePage } from "../pages/apps/gas/changeShiftsEntrySignature/changeShiftsEntrySignature";
import { WeeklyChecklistEntryPage } from "../pages/apps/gas/weeklyChecklistEntry/weeklyChecklistEntry";
import { GasDataUploadPage } from "../pages/apps/gas/gasDataUpload/gasDataUpload";
import { GasDataUploadDetailPage } from "../pages/apps/gas/gasDataUploadDetail/gasDataUploadDetail";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from "@ionic-native/sqlite";
import { HttpModule } from "@angular/http";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpService } from "../services/httpService";
import { StorageService } from "../services/storageService";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Camera } from '@ionic-native/camera';
import { File } from "@ionic-native/file";
import { FileTransfer,FileTransferObject } from "@ionic-native/file-transfer";
import { SignaturePadModule } from "angular2-signaturepad";

@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    HomePage,
    TabsPage,
    LoginPage,
    ModifyPasswordPage,
    ServerSettingPage,
    ShowPicturePage,
    ScanCodePage,
    InventoryEntryPage,
    InventoryQueryPage,
    InventoryQueryDetailPage,
    InventoryDataUploadPage,
    InventoryDataDownloadPage,
    LocalDownloadQueryPage,
    LocalDownloadQueryListPage,
    LocalDownloadQueryListDetailPage,
    ScrapApplicationPage,
    ScrapApprovalPage,
    ScrapApprovalDetailPage,
    ScrapQueryPage,
    ScrapQueryDetailPage,
    AllocateApplicationPage,
    AllocateApprovalPage,
    AllocateApprovalDetailPage,
    AllocateQueryPage,
    AllocateQueryDetailPage,

    AssetQuiryPage,
    LedgerQueryPage,
    LedgerQueryDetailPage,
    AggregateQueryPage,
    ChangeShiftsEntryPage,
    ChangeShiftsEntrySignaturePage,
    WeeklyChecklistEntryPage,
    GasDataUploadPage,
    GasDataUploadDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    SignaturePadModule,
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
    MenuPage,
    HomePage,
    TabsPage,
    LoginPage,
    ModifyPasswordPage,
    ServerSettingPage,
    ShowPicturePage,
    ScanCodePage,
    InventoryEntryPage,
    InventoryQueryPage,
    InventoryQueryDetailPage,
    InventoryDataUploadPage,
    InventoryDataDownloadPage,
    LocalDownloadQueryPage,
    LocalDownloadQueryListPage,
    LocalDownloadQueryListDetailPage,
    ScrapApplicationPage,
    ScrapApprovalPage,
    ScrapApprovalDetailPage,
    ScrapQueryPage,
    ScrapQueryDetailPage,
    AllocateApplicationPage,
    AllocateApprovalPage,
    AllocateApprovalDetailPage,
    AllocateQueryPage,
    AllocateQueryDetailPage,

    AssetQuiryPage,
    LedgerQueryPage,
    LedgerQueryDetailPage,
    AggregateQueryPage,
    ChangeShiftsEntryPage,
    ChangeShiftsEntrySignaturePage,
    WeeklyChecklistEntryPage,
    GasDataUploadPage,
    GasDataUploadDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    HttpClient,
    BarcodeScanner,
    Camera,
    File,
    FileTransfer,
    FileTransferObject,
    HttpService,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
