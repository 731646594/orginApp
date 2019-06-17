import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";
import {ScanCodePage} from "../../apps/inventory/scanCode/scanCode";
import {InventoryEntryPage} from "../../apps/inventory/inventoryEntry/inventoryEntry";
import {InventoryQueryPage} from "../../apps/inventory/inventoryQuery/inventoryQuery";
import {InventoryDataUploadPage} from "../../apps/inventory/inventoryDataUpload/inventoryDataUpload";
import {InventoryDataDownloadPage} from "../../apps/inventory/inventoryDataDownload/inventoryDataDownload";
import {LocalDownloadQueryPage} from "../../apps/inventory/localDownloadQuery/localDownloadQuery";
import {ScrapApplicationPage} from "../../apps/scrap/scrapApplication/scrapApplication";
import {ScrapApprovalPage} from "../../apps/scrap/scrapApproval/scrapApproval";
import {ScrapQueryPage} from "../../apps/scrap/scrapQuery/scrapQuery";
import {ChangeShiftsEntryPage} from "../../apps/gas/changeShiftsEntry/changeShiftsEntry";
import {WeeklyChecklistEntryPage} from "../../apps/gas/weeklyChecklistEntry/weeklyChecklistEntry";
import {GasDataUploadPage} from "../../apps/gas/gasDataUpload/gasDataUpload";
import {AssetQuiryPage} from "../../apps/query/assetQuiry/assetQuiry";
import {LedgerQueryPage} from "../../apps/query/ledgerQuery/ledgerQuery";
import {AggregateQueryPage} from "../../apps/query/aggregateQuery/aggregateQuery";
import {AllocateApplicationPage} from "../../apps/allocate/allocateApplication/allocateApplication";
import {AllocateQueryPage} from "../../apps/allocate/allocateQuery/allocateQuery";
import {AllocateApprovalPage} from "../../apps/allocate/allocateApproval/allocateApproval";
import {TransferConfirmationPage} from "../../apps/allocate/transferConfirmation/transferConfirmation";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  userName;
  userCode;
  departName;
  departCode;
  pageName;
  pageData;
  itemData=[];
  paramsData;
  constructor(public app:App,public navCtrl: NavController,public storageService:StorageService,public navParams:NavParams,
              public httpService:HttpService,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {

  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.paramsData = this.navParams.data;
    this.pageName = this.paramsData.pageName;
    this.pageData = this.paramsData.pageData;
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("weeklyData",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.itemData.push(JSON.parse(res.rows.item(0).stringData));
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("handoverData",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.itemData.push(JSON.parse(res.rows.item(0).stringData));
      }
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
  }
  appChoose(page,params){

    //11:快速扫码
    //12:盘点查询
    //13:数据下载
    //14:本地下载查询
    //15:数据上传
    //16:盘盈录入
    //21:报废申请
    //22:报废审批
    //23:报废查询
    //31:调拨申请
    //32:调拨审批
    //33:调拨查询
    //34:调出确认
    //35:调入确认
    //41:资产查询
    //42:台账查询
    //43:汇总查询
    //51:周检表录入
    //52:交接班录入
    //53:数据上传
    let willGoPage = null;
    if(page == 11){
      willGoPage = ScanCodePage;
    }
    else if(page == 12){
      willGoPage = InventoryQueryPage;
    }
    else if(page == 13){
      willGoPage = InventoryDataDownloadPage;
    }
    else if(page == 14){
      willGoPage = LocalDownloadQueryPage;
    }
    else if(page == 15){
      willGoPage = InventoryDataUploadPage;
    }
    else if(page == 16){
      willGoPage = InventoryEntryPage;
    }
    else if(page == 21){
      willGoPage = ScrapApplicationPage;
    }
    else if(page == 22){
      willGoPage = ScrapApprovalPage;
    }
    else if(page == 23){
      willGoPage = ScrapQueryPage;
    }
    else if(page == 31){
      willGoPage = AllocateApplicationPage;
    }
    else if(page == 32){
      willGoPage = AllocateApprovalPage;
    }
    else if(page == 33){
      willGoPage = AllocateQueryPage;
    }
    else if(page == 34){
      willGoPage = TransferConfirmationPage;
      params = {pageName:"调出确认",postUrl:"allotController.do?queryAllotOut",childPageName:"调出确认详情",childPostUrl:"allotController.do?allotOut"}
    }
    else if(page == 35){
      willGoPage = TransferConfirmationPage;
      params = {pageName:"调入确认",postUrl:"allotController.do?queryAllotIn",childPageName:"调入确认详情",childPostUrl:"allotController.do?allotIn"}
    }
    else if(page == 41){
      willGoPage = AssetQuiryPage;
    }
    else if(page == 42){
      willGoPage = LedgerQueryPage;
    }
    else if(page == 43){
      willGoPage = AggregateQueryPage;
    }
    else if(page == 51){
      willGoPage = WeeklyChecklistEntryPage;
      params = {Data:this.itemData[0]};
    }
    else if(page == 52){
      willGoPage = ChangeShiftsEntryPage;
      params = {Data:this.itemData[1]};
    }
    else if(page == 53){
      willGoPage = GasDataUploadPage;
    }
    if (willGoPage!=null){
      this.app.getRootNav().push(willGoPage,params)
    }

  }
}
