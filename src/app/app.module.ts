import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MenuPage } from '../pages/commonStyle/menu/menu';
import { HomePage } from '../pages/home/home';
import { MinePage } from "../pages/mine/mine/mine";
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/mine/login/login";
import { ModifyPasswordPage } from '../pages/mine/modifyPassword/modifyPassword';
import { ServerSettingPage } from "../pages/mine/serverSetting/serverSetting";
import { ShowPicturePage } from "../pages/commonStyle/showPicture/showPicture";
import { ScanCodePage } from "../pages/apps/inventory/scanCode/scanCode";
import {RFIDScanPage} from "../pages/apps/inventory/RFIDScan/RFIDScan";
import {RFIDScanListPage} from "../pages/apps/inventory/RFIDScanList/RFIDScanList";
import { InventoryEntryPage } from "../pages/apps/inventory/inventoryEntry/inventoryEntry";
import { InventoryQueryPage } from "../pages/apps/inventory/inventoryQuery/inventoryQuery";
import { InventoryDataUploadPage } from "../pages/apps/inventory/inventoryDataUpload/inventoryDataUpload";
import { InventoryDataDownloadPage } from "../pages/apps/inventory/inventoryDataDownload/inventoryDataDownload";
import { InventoryDataDownloadDetailPage } from "../pages/apps/inventory/inventoryDataDownloadDetail/inventoryDataDownloadDetail";
import { LocalDownloadQueryPage } from "../pages/apps/inventory/localDownloadQuery/localDownloadQuery";
import { LocalDownloadQueryListPage } from "../pages/apps/inventory/localDownloadQueryList/localDownloadQueryList";
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
import { TransferConfirmationPage } from "../pages/apps/allocate/transferConfirmation/transferConfirmation";
import { TransferConfirmationDetailPage } from "../pages/apps/allocate/transferConfirmationDetail/transferConfirmationDetail";
import { AssetQuiryPage } from "../pages/apps/query/assetQuiry/assetQuiry";
import { LedgerQueryPage } from "../pages/apps/query/ledgerQuery/ledgerQuery";
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
import {ApplicationPage} from "../pages/commonStyle/application/application";
import {ComponentsModule} from "../components/components.module";
import {SelectFilterPage} from "../pages/commonStyle/selectFilter/selectFilter";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {QueryPage} from "../pages/commonStyle/query/query";
import {QueryDetailPage} from "../pages/commonStyle/queryDetail/queryDetail";
import {ApprovalPage} from "../pages/commonStyle/approval/approval";
import {InventoryPage} from "../pages/commonStyle/inventory/inventory";
import {DatePipe} from "@angular/common";
import {Network} from "@ionic-native/network";
import {RepairApplyPage} from "../pages/apps/repair/repairApply/repairApply";
import {RepairApplyAddPage} from "../pages/apps/repair/repairApplyAdd/repairApplyAdd";
import {RepairAlertPage} from "../pages/apps/repair/repairAlert/repairAlert";
import {RepairSupplementPage} from "../pages/apps/repair/repairSupplement/repairSupplement";
import {RepairSupplementAlertPage} from "../pages/apps/repair/repairSupplementAlert/repairSupplementAlert";
import {RepairBjAlertPage} from "../pages/apps/repair/repairBjAlert/repairBjAlert";
import {RepairGysAlertPage} from "../pages/apps/repair/repairGysAlert/repairGysAlert";
import {RepairApprovalPage} from "../pages/apps/repair/repairApproval/repairApproval";
import {RepairAcceptancePage} from "../pages/apps/repair/repairAcceptance/repairAcceptance";
import {RepairAcceptanceApprovalPage} from "../pages/apps/repair/repairAcceptanceApproval/repairAcceptanceApproval";
import {RepairAcceptanceEvaluatePage} from "../pages/apps/repair/repairAcceptanceEvaluate/repairAcceptanceEvaluate";
import {RepairSearchPage} from "../pages/apps/repair/repairSearch/repairSearch";
import {RepairSearchAlertPage} from "../pages/apps/repair/repairSearchAlert/repairSearchAlert";
import {RepairSearchFilterAlertPage} from "../pages/apps/repair/repairSearchFilterAlert/repairSearchFilterAlert";
import {RepairExternalPage} from '../pages/apps/repair/repairExternal/repairExternal';
import {RepairExternalSignaturePage} from "../pages/apps/repair/repairExternalSignature/repairExternalSignature";
import {MaintenancePage} from "../pages/apps/maintenance/maintenance";
import {MaintenanceAlertPage} from "../pages/apps/maintenance/maintenanceAlert/maintenanceAlert";
import {FileOpener} from "@ionic-native/file-opener";
import {ProspectingPage} from "../pages/apps/settlement/prospecting/prospecting";
import {SettlementPage} from "../pages/commonStyle/settlement/settlement";
import {HTTP} from "@ionic-native/http";
import {DeviceTypePage} from "../pages/mine/deviceType/deviceType";
import {MaintenanceAcceptancePage} from "../pages/apps/maintenance/maintenanceAcceptance/maintenanceAcceptance";
import {AppVersion} from "@ionic-native/app-version";
import {InventoryDataSyncPage} from "../pages/apps/inventory/inventoryDataSync/inventoryDataSync";
import {InventoryDataSyncDetailPage} from "../pages/apps/inventory/inventoryDataSyncDetail/inventoryDataSyncDetail";
import {MenuHelpPage} from "../pages/commonStyle/menuHelp/menuHelp";
import {RFIDSpecScanPage} from "../pages/apps/inventory/RFIDSpecScan/RFIDSpecScan";
import {RFIDSpecScanListPage} from "../pages/apps/inventory/RFIDSpecScanList/RFIDSpecScanList";
// import {JPush} from "@jiguang-ionic/jpush";
// import {JpushUtils} from "../services/JpushUtils";//jpush 1.0.2
import {NativeService} from "../services/NativeService";
import {NativeAudio} from "@ionic-native/native-audio";

@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    HomePage,
    MinePage,
    TabsPage,
    LoginPage,
    ModifyPasswordPage,
    ServerSettingPage,
    ShowPicturePage,
    ScanCodePage,
    RFIDScanPage,
    RFIDScanListPage,
    InventoryEntryPage,
    InventoryQueryPage,
    InventoryDataUploadPage,
    InventoryDataDownloadPage,
    InventoryDataDownloadDetailPage,
    LocalDownloadQueryPage,
    LocalDownloadQueryListPage,
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
    TransferConfirmationPage,
    TransferConfirmationDetailPage,
    AssetQuiryPage,
    LedgerQueryPage,
    AggregateQueryPage,
    ChangeShiftsEntryPage,
    ChangeShiftsEntrySignaturePage,
    WeeklyChecklistEntryPage,
    GasDataUploadPage,
    GasDataUploadDetailPage,
    ApplicationPage,
    SelectFilterPage,
    QueryPage,
    QueryDetailPage,
    ApprovalPage,
    InventoryPage,
    RepairApplyPage,
    RepairApplyAddPage,
    RepairAlertPage,
    RepairSupplementPage,
    RepairSupplementAlertPage,
    RepairBjAlertPage,
    RepairGysAlertPage,
    RepairApprovalPage,
    RepairAcceptancePage,
    RepairAcceptanceApprovalPage,
    RepairAcceptanceEvaluatePage,
    RepairSearchPage,
    RepairSearchAlertPage,
    RepairSearchFilterAlertPage,
    RepairExternalPage,
    RepairExternalSignaturePage,
    MaintenancePage,
    MaintenanceAlertPage,
    SettlementPage,
    ProspectingPage,
    DeviceTypePage,
    MaintenanceAcceptancePage,
    InventoryDataSyncPage,
    InventoryDataSyncDetailPage,
    MenuHelpPage,
    RFIDSpecScanPage,
    RFIDSpecScanListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    SignaturePadModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true' ,       //隐藏全部子页面tabs
      iconMode: 'ios',
      mode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      pageTransition:'md-transition',
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
    MinePage,
    TabsPage,
    LoginPage,
    ModifyPasswordPage,
    ServerSettingPage,
    ShowPicturePage,
    ScanCodePage,
    RFIDScanPage,
    RFIDScanListPage,
    InventoryEntryPage,
    InventoryQueryPage,
    InventoryDataUploadPage,
    InventoryDataDownloadPage,
    InventoryDataDownloadDetailPage,
    LocalDownloadQueryPage,
    LocalDownloadQueryListPage,
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
    TransferConfirmationPage,
    TransferConfirmationDetailPage,
    AssetQuiryPage,
    LedgerQueryPage,
    AggregateQueryPage,
    ChangeShiftsEntryPage,
    ChangeShiftsEntrySignaturePage,
    WeeklyChecklistEntryPage,
    GasDataUploadPage,
    GasDataUploadDetailPage,
    ApplicationPage,
    SelectFilterPage,
    QueryPage,
    QueryDetailPage,
    ApprovalPage,
    InventoryPage,
    RepairApplyPage,
    RepairApplyAddPage,
    RepairAlertPage,
    RepairSupplementPage,
    RepairSupplementAlertPage,
    RepairBjAlertPage,
    RepairGysAlertPage,
    RepairApprovalPage,
    RepairAcceptancePage,
    RepairAcceptanceApprovalPage,
    RepairAcceptanceEvaluatePage,
    RepairSearchPage,
    RepairSearchAlertPage,
    RepairSearchFilterAlertPage,
    RepairExternalPage,
    RepairExternalSignaturePage,
    MaintenancePage,
    MaintenanceAlertPage,
    SettlementPage,
    ProspectingPage,
    DeviceTypePage,
    MaintenanceAcceptancePage,
    InventoryDataSyncPage,
    InventoryDataSyncDetailPage,
    MenuHelpPage,
    RFIDSpecScanPage,
    RFIDSpecScanListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    HttpClient,
    BarcodeScanner,
    Camera,
    File,
    FileOpener,
    FileTransfer,
    FileTransferObject,
    HttpService,
    StorageService,
    ScreenOrientation,
    DatePipe,
    Network,
    HTTP,
    AppVersion,
    // JPush,
    // JpushUtils,
    NativeService,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
