import { Component } from '@angular/core';
import {AlertController, App, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
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
import {Network} from "@ionic-native/network";
import {RepairApplyPage} from "../../apps/repair/repairApply/repairApply";
import {RFIDScanPage} from "../../apps/inventory/RFIDScan/RFIDScan";
import {SettlementPage} from "../settlement/settlement";
import {InventoryDataSyncPage} from "../../apps/inventory/inventoryDataSync/inventoryDataSync";
import {RFIDSpecScanPage} from "../../apps/inventory/RFIDSpecScan/RFIDSpecScan";
import {DayReportEntryPage} from "../../apps/report/dayReportEntry/dayReportEntry";
import {DayReportSupplementPage} from "../../apps/report/dayReportSupplement/dayReportSupplement";
import {DayReportSearchPage} from "../../apps/report/dayReportSearch/dayReportSearch";
import {SimpleSummaryPage} from "../../apps/reportQuery/simpleSummary/simpleSummary";
import {GasInputStatusQueryPage} from "../../apps/reportQuery/gasInputStatusQuery/gasInputStatusQuery";
import {InventoryDataUploadQueryPage} from "../../apps/inventory/inventoryDataUploadQuery/inventoryDataUploadQuery";
import {DatePipe} from "@angular/common";

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
  paramsData;
  constructor(public app:App,public navCtrl: NavController,public storageService:StorageService,
              public navParams:NavParams, public httpService:HttpService,public alertCtrl:AlertController,
              public loadingCtrl:LoadingController,public network:Network,public events:Events,
              public datePipe:DatePipe) {
    this.events.subscribe('menuNumPublish',(e)=>{
      if (this.httpService.getUrl() == 'http://swapp.0731ctny.com:/plamassets/mobile/') {
        this.menuNum(e);
      }
    })
  }
  ionViewDidEnter(){
    this.loadData();
  }
  ionViewWillUnload(){
    this.events.unsubscribe("menuNumPublish");
  }
  loadData(){
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.paramsData = this.navParams.data;
    this.pageName = this.paramsData.pageName;
    this.pageData = this.paramsData.pageData;
    if (this.httpService.getUrl() == 'http://swapp.0731ctny.com:/plamassets/mobile/'){
      this.menuNum();
    }
  }
  menuNum(name?:any){
    this.pageData.forEach((item1)=>{
      item1[1].pageData.forEach((item2)=>{
        item2.forEach((item3)=>{
          if ((!name || name=='inventoryDataDownloadComplete') && item3[0] == 13){
            this.httpService.postData(this.httpService.getUrl()+"cellPhoneControllerOffline/phonecheckplandownload.do",{userCode:this.userCode,departCode:this.departCode},data=>{
              let num = 0;
              let planList=data.data;
              let planListLen = planList.length;
              num = planListLen;
              this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
                if (res.rows.length>0){
                  try {
                    if (JSON.parse(res.rows.item(0).stringData)["planNumber"]){
                      num = planListLen - 1
                    }
                  }catch {}
                }
                item3[6] = num;
              }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
            },false,(err)=>{
              item3[6] =0;
              let alertCtrl = this.alertCtrl.create({
                title:err
              });
              alertCtrl.present();
            });
          }
          if ((!name|| name=='inventoryDataDownloadComplete' || name=='inventoryDataComplete') && item3[0] == 12){
            this.storageService.getUserTable().executeSql(this.storageService.getSSS("willPlanDetail",this.userCode),[]).then(res=>{
              let num = 0;
              if (res.rows.length>0){
                let willPlan = JSON.parse(res.rows.item(0).stringData);
                let willPlanLen = 0;
                for (let i in willPlan){
                  if (this.departCode == willPlan[i]["departCode"]){
                    willPlanLen++;
                  }
                }
                num  = willPlanLen;
              }
              item3[6] = num;
            }).catch(e =>alert("erro2_3:"+JSON.stringify(e)));
          }
          if ((!name || name=='inventoryDataDownloadComplete' || name=='inventoryDataComplete' || name=='inventoryDataUploadComplete') && item3[0] == 15){
            let planDetailList = [];
            this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
              if (res.rows.length>0){
                let newPlanDetail = JSON.parse(res.rows.item(0).stringData);
                planDetailList = planDetailList.concat(newPlanDetail);
              }
              this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
                if (res.rows.length>0){
                  let existPlanDetail = JSON.parse(res.rows.item(0).stringData);
                  planDetailList = planDetailList.concat(existPlanDetail);
                }
                planDetailList = planDetailList.filter((item,i)=>{
                  return !item["Uploaded"]
                });
                item3[6] = planDetailList.length;
              }).catch(e =>alert("erro2_3_2:"+JSON.stringify(e)));
            }).catch(e =>alert("erro2_3_1:"+JSON.stringify(e)));
          }
          if ((!name) && item3[0] == 51){
            item3[6] = 1;
            let date = this.datePipe.transform(new Date(),"yyyy-MM-dd");
            if (date == this.storageService.read('weeklyCheckDataCompleteDate')){
              item3[6] = 0;
            }
          }
          if ((name=='weeklyCheckDataComplete') && item3[0] == 51) {
            let date = this.datePipe.transform(new Date(),"yyyy-MM-dd");
            this.storageService.write('weeklyCheckDataCompleteDate',date);
            item3[6] = 0;
          }
          if ((!name || name=='weeklyCheckDataComplete' || name=='weeklyCheckDataUploadComplete') && item3[0] == 53) {
            this.storageService.getUserTable().executeSql(this.storageService.getSSS("zjb",this.userCode),[]).then(res =>{
              let num = 0;
              if (res.rows.length>0){
                num = 1;
              }
              item3[6] = num;
            }).catch(e =>alert("erro21:"+JSON.stringify(e))  );
          }
          if ((!name || name=='repairAcceptanceDataComplete') && item3[0] == 64) {
            this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/devRepairController.do?datagridys", {page:1,rows:100,funccode:"4000001006"},data=>{
              let itemData = data.obj.rows;
              item3[6] = itemData.length;
            },false,(err)=>{
              item3[6] =0;
              let alertCtrl = this.alertCtrl.create({
                title:err
              });
              alertCtrl.present();
            });
          }
        })
      })
    });
  }
  appChoose(page,params,canIn,funccode){
    if(canIn=="0"){
      let alertCtrl = this.alertCtrl.create({
        title:"您无权访问该功能！"
      });
      alertCtrl.present();
      return false;
    }
    if(this.storageService.getDevice()!=2&&(page == 11||page == 16||page == 17||page == 19||page == 51||page == 52)&&!this.storageService.read('noFlightMode')){
      if(this.network.type != 'none'){
        let alertCtrl = this.alertCtrl.create({
          title:"请切换到飞行模式！"
        });
        alertCtrl.present();
        return false;
      }
    }
    else {
      if(page !=12&&page !=14&&this.network.type == 'none'&&!this.storageService.read('noFlightMode')){
        let alertCtrl = this.alertCtrl.create({
          title:"请恢复网络链接！"
        });
        alertCtrl.present();
        return false;
      }
    }

    //11:快速扫码
    //12:盘点查询
    //13:数据下载
    //14:本地下载查询
    //15:数据上传
    //16:盘盈录入
    //17:RFID
    //18:数据同步
    //19:RFID特殊
    //20:上传查询
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
    //61:维修申请
    //62:维修申请补录//去除
    //63:维修审批
    //64:维修验收/检维修确认
    //65:维修验收审批/检维修确认审批
    //66:维修单据查询
    //67:外委派单
    //68:外委开始维修
    //69:外委办结
    //71:外委派单
    //72:开始保养
    //73:保养办结
    //74:保养验收
    //75:保养提醒
    //76:保养单据查询
    //81:勘探部项目款审批
    //82:工程竣工决算款审批
    //83:进度款审批
    //84:一厂/三厂进度款审批
    //85:储气库投资表审批
    //91:加油站日报录入
    //92:加油站日报补录
    //93:加油站日报查询
    //101:日简表
    //102:月简表
    //103:油站录入情况查询
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
    else if(page == 17){
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=> {
        if (res.rows.length > 0) {
          this.app.getRootNav().push(RFIDScanPage,params)
        }else {
          let alertCtrl = this.alertCtrl.create({
            title:"请下载盘点计划！"
          });
          alertCtrl.present();
          return false;
        }
      })
    }
    else if(page == 18){
      willGoPage = InventoryDataSyncPage;
    }
    else if(page == 19){
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=> {
        if (res.rows.length > 0) {
          this.app.getRootNav().push(RFIDSpecScanPage,params)
        }else {
          let alertCtrl = this.alertCtrl.create({
            title:"请下载盘点计划！"
          });
          alertCtrl.present();
          return false;
        }
      })
    }
    else if(page == 20){
      willGoPage = InventoryDataUploadQueryPage;
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
      params = {pageName:"调出确认",postUrl:"allotController/queryAllotOut.do",childPageName:"调出确认详情",childPostUrl:"allotController/allotOut.do"}    }
    else if(page == 35){
      willGoPage = TransferConfirmationPage;
      params = {pageName:"调入确认",postUrl:"allotController/queryAllotIn.do",childPageName:"调入确认详情",childPostUrl:"allotController/allotIn.do"}
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
    }
    else if(page == 52){
      willGoPage = ChangeShiftsEntryPage;
    }
    else if(page == 53){
      willGoPage = GasDataUploadPage;
    }
    else if(page == 61){
      willGoPage = RepairApplyPage;
      params = {pageName:"维修申请",funccode:funccode};
    }
    else if(page == 62){
      willGoPage = RepairApplyPage;
      params = {pageName:"维修申请补录",funccode:funccode};
    }
    else if(page == 63){
      willGoPage = RepairApplyPage;
      params = {pageName:"维修审批",funccode:funccode};
    }
    else if(page == 64){
      willGoPage = RepairApplyPage;
      params = {pageName:"维修验收",funccode:funccode};
      if(this.httpService.getUrl()=="http://swapp.0731ctny.com:/plamassets/mobile/"){
        params = {pageName:"检维修确认",funccode:funccode};
      }
    }
    else if(page == 65){
      willGoPage = RepairApplyPage;
      params = {pageName:"维修验收审批",funccode:funccode};
      if(this.httpService.getUrl()=="http://swapp.0731ctny.com:/plamassets/mobile/"){
        params = {pageName:"检维修确认审批",funccode:funccode};
      }
    }
    else if(page == 66){
      willGoPage = RepairApplyPage;
      params = {pageName:"维修单据查询",funccode:funccode};
    }
    else if(page == 67){
      willGoPage = RepairApplyPage;
      params = {pageName:"维修外委派单",funccode:funccode};
    }
    else if(page == 68){
      willGoPage = RepairApplyPage;
      params = {pageName:"开始维修",funccode:funccode};
    }
    else if(page == 69){
      willGoPage = RepairApplyPage;
      params = {pageName:"维修办结",funccode:funccode};
    }
    else if(page == 71){
      willGoPage = RepairApplyPage;
      params = {pageName:"保养外委派单",funccode:funccode};
    }
    else if(page == 72){
      willGoPage = RepairApplyPage;
      params = {pageName:"开始保养",funccode:funccode};
    }
    else if(page == 73){
      willGoPage = RepairApplyPage;
      params = {pageName:"保养办结",funccode:funccode};
    }
    else if(page == 74){
      willGoPage = RepairApplyPage;
      params = {pageName:"保养验收",funccode:funccode};
    }
    else if(page == 75){
      willGoPage = RepairApplyPage;
      params = {pageName:"保养提醒",funccode:funccode};
    }
    else if(page == 76){
      willGoPage = RepairApplyPage;
      params = {pageName:"保养单据查询",funccode:funccode};
    }
    else if(page == 81){
      willGoPage = SettlementPage;
      params = {pageName:"勘探部项目款审批"};
    }
    else if(page == 82){
      willGoPage = SettlementPage;
      params = {pageName:"工程竣工决算款审批"};
    }
    else if(page == 83){
      willGoPage = SettlementPage;
      params = {pageName:"进度款审批"};
    }
    else if(page == 84){
      willGoPage = SettlementPage;
      params = {pageName:"一厂/三厂进度款审批"};
    }
    else if(page == 85){
      willGoPage = SettlementPage;
      params = {pageName:"储气库投资表审批"};
    }
    else if(page == 91){
      willGoPage = DayReportEntryPage;
      params = {pageName:"加油站日报录入"};
    }
    else if(page == 92){
      willGoPage = DayReportSupplementPage;
      params = {pageName:"加油站日报补录"};
    }
    else if(page == 93){
      willGoPage = DayReportSearchPage;
      params = {pageName:"加油站日报查询"};
    }
    else if(page == 101){
      willGoPage = SimpleSummaryPage;
      params = {pageName:"日简表"};
    }
    else if(page == 102){
      willGoPage = SimpleSummaryPage;
      params = {pageName:"月简表"};
    }
    else if(page == 103){
      willGoPage = GasInputStatusQueryPage;
      params = {pageName:"油站录入情况查询"};
    }
    if (willGoPage!=null){
      this.app.getRootNav().push(willGoPage,params)
    }

  }
}
