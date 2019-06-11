import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";

@Component({
  selector: 'page-allocateApplication',
  templateUrl: 'allocateApplication.html'
})
export class AllocateApplicationPage {
  userName;
  userCode;
  departName;
  departCode;
  isOnfocus=false;
  shape = "brief";
  radioButton = "资产条码";
  invoice=JSON;
  detailList=[
    {
      "oldAssetsCode": "101000500032092",
      "markAppendix": 0,
      "depreciateDate": "",
      "createdate": null,
      "yearDepreciate": 0,
      "LEndDate": "",
      "nowValue": 12000,
      "usableYear": 0,
      "assetsStandard": "",
      "RContractCode": "",
      "rentTypeName": "",
      "charItem40": "",
      "trunNumber": "",
      "oilareaName": "",
      "assetsFundCanalName": "地质勘探支出",
      "unitCode": "Ci",
      "financeYear": "",
      "appfiletype": "",
      "disposeType": "",
      "taxOriginalValue": 12000,
      "companyName": "",
      "usePeriodType": "",
      "compactTypeName": "",
      "discardCode": "",
      "zztzlb": "",
      "LContractCode": "",
      "varTypeName": "调拨前",
      "depreciateRate": 0,
      "patchDate": "",
      "partDepartCode": "21511",
      "oilgasType": 0,
      "aufwb": 0,
      "startDate": "",
      "financeOriginalValue": 0,
      "stopDate": "",
      "cErpReturnStatus": "",
      "partnerEntityCode": "003003001000073",
      "depreciateStatus": "",
      "numItem20": 0,
      "charItem29": "",
      "applyCodeName": "",
      "REndDate": "",
      "numItem18": 0,
      "erpFkber": "",
      "numItem19": 0,
      "charItem20": "",
      "splitDeviceOldAssetsCode": "",
      "turnDate": "2018-03-01",
      "totalAmount": 0,
      "charItem27": "",
      "addReasonName": "新购建",
      "technicalCondition": "01",
      "charItem28": "",
      "charItem25": "",
      "technicalDepart": "",
      "charItem26": "",
      "depreciateCode": "Z001",
      "charItem23": "",
      "LContractDate": "",
      "assetsStatusName": "",
      "effectiveDate": "",
      "preNowValue": 0,
      "charItem24": "",
      "charItem21": "",
      "charItem22": "",
      "aafav": 0,
      "erpAufnr": "",
      "inConfirmDate": "",
      "erpInbda": "2018-03-01",
      "numItem13": 0,
      "numItem12": 0,
      "numItem11": 0,
      "aafal": 0,
      "wbsDepreciate": "",
      "partnerCompanyCode": "B865",
      "numItem10": 0,
      "costCenter": "B865030011",
      "numItem17": 0,
      "numItem16": 0,
      "operator": "吴老二",
      "numItem15": 0,
      "numItem14": 0,
      "markDepreciate": 1,
      "charItem30": "",
      "relevanceBillnumber": "",
      "charItem31": "",
      "areaName": "",
      "preAddDepreciate": 0,
      "aafag": 0,
      "charItem36": "",
      "erpAfabg": "2018-04-01",
      "charItem37": "",
      "charItem38": "",
      "addDepreciate": 0,
      "charItem39": "",
      "charItem32": "",
      "charItem33": "",
      "lastmodifyuserid": "",
      "charItem34": "",
      "charItem35": "",
      "gdFlag": "",
      "depreciateYear": 12,
      "serialNumber": "",
      "inConfirmPerson": "",
      "equipType": "01",
      "quoteMoney": 0,
      "numItem9": 0,
      "managerDepart": "21511280000010003",
      "zztzlbName": "",
      "dutyCenterName": "中国石油集团长城钻探工程有限公司苏里格气田分公司",
      "erpGjahr": 2018,
      "referenceOriginalValue": 6000,
      "barCode": "200143634",
      "kaafa": 0,
      "apppath": "",
      "departName": "长城\\苏10\\本部\\生产协调科",
      "erpReturnInfo": "",
      "depreciateStartDate": "",
      "gmDescription": "",
      "numItem2": 0,
      "charItem18": "",
      "numItem1": 0,
      "charItem19": "",
      "numItem4": 0,
      "invoiceNumber": "ZCDB_1511_2018030276",
      "numItem3": 0,
      "cErpBelnr": "",
      "dutyCenter": "201915112801",
      "numItem6": 0,
      "numItem5": 0,
      "nowScrapValue": 0,
      "numItem8": 0,
      "numItem7": 0,
      "borrowReason": "",
      "charItem11": "",
      "varLevel": 5,
      "charItem10": "",
      "erpDepreciateCode": "Z001",
      "charItem13": "",
      "charItem12": "",
      "capitalizationDate": "2018-03-01",
      "charItem15": "",
      "depreciateStopDate": "",
      "charItem14": "",
      "selfCode": "",
      "markPatch": 0,
      "charItem17": "",
      "charItem16": "",
      "profitCenter": "",
      "fmisCostCenterName": "(B865000000002对应有误)",
      "contractCode": "",
      "partnerDepartName": "长城\\苏10\\本部\\经理办",
      "backPerson": "",
      "partnerAssetsCode": "101000064450",
      "markStatus": "B4",
      "erpPeraf": 3,
      "oldDevalueValue": 0,
      "appendixAmount": 0,
      "adjustStatus": "",
      "contractDate": "",
      "keyCode": "81e7a75f-d751-4db6-9755-9de624839948",
      "RContractName": "",
      "contentAssetsCode": "05010101",
      "cErpAwref": "",
      "userPerson": "",
      "repairReason": "",
      "realAssetsCode": "",
      "deviceInvoice": "",
      "productCode": "",
      "moneyRate": 0,
      "kaufw": 0,
      "economyFunctionName": "",
      "erpReturnStatus": "",
      "sysModifytime": null,
      "operateDate": "2018-03-01",
      "LStartDate": "",
      "markAdjust": 0,
      "appname": "",
      "ckErpBelnr": "",
      "getMode": "",
      "assetsFundCanal": "0101",
      "fullDate": "",
      "assetsTypeName": "固定资产",
      "RStartDate": "",
      "dutyName": "",
      "endDate": "",
      "oldAddDepreciate": 0,
      "lastmodifydate": null,
      "storePlace": "",
      "erpSchrw": 0,
      "allotReason": "123",
      "knafa": 0,
      "RContractDate": "",
      "technicalConditionName": "完好",
      "usedYear": 0,
      "nafav": 0,
      "varDate": "2018-03-23",
      "rentDate": "",
      "partYear": 2018,
      "wbsTxt": "",
      "markCore": 0,
      "oldBarCode": "",
      "kErpAwref": "",
      "addVoucherDate": "2018-01-25",
      "oldOriginalValue": 0,
      "moneyValue": 0,
      "erpNdper": 0,
      "charItem9": "",
      "costCenterName": "",
      "invoiceStatus": 3,
      "charItem8": "",
      "charItem7": "",
      "assetsType": "0101",
      "charItem6": "",
      "charItem5": "",
      "departCode": "21511280000010003",
      "inOutType": 1,
      "charItem4": "",
      "charItem3": "",
      "charItem2": "",
      "charItem1": "",
      "assetsCode": "101000064450",
      "partnerDutyCenter": "201915112801",
      "deviceSyncStatus": "",
      "erpXnega": "",
      "gmGrantNbr": "",
      "unitCodeName": "居里",
      "contractMoney": 0,
      "markImport": 0,
      "addDevalueValue": 0,
      "erpXref2Hd": "DB180228100741066170",
      "varType": "B1",
      "bsAreaName": "",
      "singleAmount": 2,
      "fkber": "",
      "preMonthDepreciate": 0,
      "clearValue": 0,
      "rentSource": "",
      "getModeName": "",
      "productDate": "",
      "repairResult": "",
      "areaCode": "",
      "assetsStatus": "",
      "contractValidTerm": 0,
      "equipTypeName": "移动设备",
      "kCompanyCode": "",
      "kErpBelnr": "",
      "originalValue": 12000,
      "bsArea": "2019",
      "lessReason": "",
      "oldNowValue": 0,
      "partnerDepartCode": "21511280000010002",
      "oilareaNum": "",
      "compactType": "",
      "contractName": "",
      "zztznrName": "",
      "cErpReturnInfo": "",
      "remark": "",
      "monthAmount": 0,
      "balanceDate": "",
      "outConfirmPerson": "",
      "rowSequence": "",
      "recordPrice": 0,
      "oldYearDepreciate": 0,
      "LContractName": "",
      "entityCode": "003003001000073",
      "taxCostRate": 0,
      "disposeMoney": 0,
      "barStatus": 1,
      "economyFunction": "",
      "expenseDepreciate": 0,
      "addReason": "01",
      "technicalDepartName": "",
      "futureValue": 0,
      "aufwl": 0,
      "usedState": "010102",
      "ckErpAwref": "",
      "deleteStatus": 0,
      "devalueValue": 0,
      "devalueDate": "",
      "aufwv": 0,
      "licenceNumber": "",
      "partnerSubAssetsCode": "0000",
      "makeFactory": "",
      "fmisCostCenter": "0003",
      "createuserid": "",
      "zztznr": "",
      "scrapValue": 3,
      "varDutycenterLevel": 0,
      "erpBelnr": "",
      "patchDepreciate": 0,
      "disposeDate": "",
      "tempDepreciate": 0,
      "managerDepartName": "长城\\苏10\\本部\\生产协调科",
      "usedStateName": "生产经营用-其他",
      "rentType": "",
      "preOriginalValue": 0,
      "id": 600000150757737,
      "kDepartCode": "",
      "markDevice": 0,
      "backDate": "",
      "evalMoney": 0,
      "markEvaluate": 0,
      "financeMonth": "",
      "assetsName": "拱顶容器",
      "nafal": 0,
      "nafag": 0,
      "erpDepreciateName": "",
      "subAssetsCode": "0000",
      "repairContent": "",
      "companyCode": "B865",
      "entityName": "",
      "outConfirmDate": "",
      "discardReason": "",
      "monthDepreciate": 0,
      "contentAssetsType": "00010100",
      "erpAwref": "",
      "erpKtext": "",
      "applyCode": "",
      "owerPerson": "",
      "varTime": "2018-02-28 10:07:40",
      "borrowPerson": ""
    },
    {
      "oldAssetsCode": "101000500032094",
      "markAppendix": 0,
      "depreciateDate": "",
      "createdate": null,
      "yearDepreciate": 0,
      "LEndDate": "",
      "nowValue": 6000,
      "usableYear": 0,
      "assetsStandard": "",
      "RContractCode": "",
      "rentTypeName": "",
      "charItem40": "",
      "trunNumber": "",
      "oilareaName": "",
      "assetsFundCanalName": "地质勘探支出",
      "unitCode": "Ci",
      "financeYear": "",
      "appfiletype": "",
      "disposeType": "",
      "taxOriginalValue": 6000,
      "companyName": "",
      "usePeriodType": "1",
      "compactTypeName": "",
      "discardCode": "",
      "zztzlb": "",
      "LContractCode": "",
      "varTypeName": "调拨前",
      "depreciateRate": 0,
      "patchDate": "",
      "partDepartCode": "21511",
      "oilgasType": 0,
      "aufwb": 0,
      "startDate": "",
      "financeOriginalValue": 0,
      "stopDate": "",
      "cErpReturnStatus": "",
      "partnerEntityCode": "003003001000073",
      "depreciateStatus": "",
      "numItem20": 0,
      "charItem29": "",
      "applyCodeName": "",
      "REndDate": "",
      "numItem18": 0,
      "erpFkber": "",
      "numItem19": 0,
      "charItem20": "",
      "splitDeviceOldAssetsCode": "",
      "turnDate": "2018-03-01",
      "totalAmount": 0,
      "charItem27": "",
      "addReasonName": "新购建",
      "technicalCondition": "01",
      "charItem28": "",
      "charItem25": "",
      "technicalDepart": "",
      "charItem26": "",
      "depreciateCode": "Z001",
      "charItem23": "",
      "LContractDate": "",
      "assetsStatusName": "",
      "effectiveDate": "",
      "preNowValue": 0,
      "charItem24": "",
      "charItem21": "",
      "charItem22": "",
      "aafav": 0,
      "erpAufnr": "",
      "inConfirmDate": "",
      "erpInbda": "2018-03-01",
      "numItem13": 0,
      "numItem12": 0,
      "numItem11": 0,
      "aafal": 0,
      "wbsDepreciate": "",
      "partnerCompanyCode": "B865",
      "numItem10": 0,
      "costCenter": "B865030011",
      "numItem17": 0,
      "numItem16": 0,
      "operator": "吴老二",
      "numItem15": 0,
      "numItem14": 0,
      "markDepreciate": 1,
      "charItem30": "",
      "relevanceBillnumber": "",
      "charItem31": "",
      "areaName": "",
      "preAddDepreciate": 0,
      "aafag": 0,
      "charItem36": "",
      "erpAfabg": "2018-04-01",
      "charItem37": "",
      "charItem38": "",
      "addDepreciate": 0,
      "charItem39": "",
      "charItem32": "",
      "charItem33": "",
      "lastmodifyuserid": "",
      "charItem34": "",
      "charItem35": "",
      "gdFlag": "",
      "depreciateYear": 12,
      "serialNumber": "",
      "inConfirmPerson": "",
      "equipType": "01",
      "quoteMoney": 0,
      "numItem9": 0,
      "managerDepart": "21511280000010003",
      "zztzlbName": "",
      "dutyCenterName": "中国石油集团长城钻探工程有限公司苏里格气田分公司",
      "erpGjahr": 2018,
      "referenceOriginalValue": 6000,
      "barCode": "200143636",
      "kaafa": 0,
      "apppath": "",
      "departName": "长城\\苏10\\本部\\生产协调科",
      "erpReturnInfo": "",
      "depreciateStartDate": "",
      "gmDescription": "",
      "numItem2": 0,
      "charItem18": "",
      "numItem1": 0,
      "charItem19": "",
      "numItem4": 0,
      "invoiceNumber": "ZCDB_1511_2018030276",
      "numItem3": 0,
      "cErpBelnr": "",
      "dutyCenter": "201915112801",
      "numItem6": 0,
      "numItem5": 0,
      "nowScrapValue": 0,
      "numItem8": 0,
      "numItem7": 0,
      "borrowReason": "",
      "charItem11": "",
      "varLevel": 5,
      "charItem10": "",
      "erpDepreciateCode": "Z001",
      "charItem13": "",
      "charItem12": "",
      "capitalizationDate": "2018-03-01",
      "charItem15": "",
      "depreciateStopDate": "",
      "charItem14": "",
      "selfCode": "",
      "markPatch": 0,
      "charItem17": "",
      "charItem16": "",
      "profitCenter": "",
      "fmisCostCenterName": "(B865000000002对应有误)",
      "contractCode": "",
      "partnerDepartName": "长城\\苏10\\本部\\经理办",
      "backPerson": "",
      "partnerAssetsCode": "101000064452",
      "markStatus": "B4",
      "erpPeraf": 3,
      "oldDevalueValue": 0,
      "appendixAmount": 0,
      "adjustStatus": "",
      "contractDate": "",
      "keyCode": "f75c9295-a186-4ec1-95ea-2c89a53c52e9",
      "RContractName": "",
      "contentAssetsCode": "05010101",
      "cErpAwref": "",
      "userPerson": "",
      "repairReason": "",
      "realAssetsCode": "",
      "deviceInvoice": "",
      "productCode": "",
      "moneyRate": 0,
      "kaufw": 0,
      "economyFunctionName": "",
      "erpReturnStatus": "",
      "sysModifytime": null,
      "operateDate": "2018-03-01",
      "LStartDate": "",
      "markAdjust": 0,
      "appname": "",
      "ckErpBelnr": "",
      "getMode": "",
      "assetsFundCanal": "0101",
      "fullDate": "",
      "assetsTypeName": "固定资产",
      "RStartDate": "",
      "dutyName": "",
      "endDate": "",
      "oldAddDepreciate": 0,
      "lastmodifydate": null,
      "storePlace": "",
      "erpSchrw": 0,
      "allotReason": "123",
      "knafa": 0,
      "RContractDate": "",
      "technicalConditionName": "完好",
      "usedYear": 0,
      "nafav": 0,
      "varDate": "2018-03-23",
      "rentDate": "",
      "partYear": 2018,
      "wbsTxt": "",
      "markCore": 0,
      "oldBarCode": "",
      "kErpAwref": "",
      "addVoucherDate": "2018-01-25",
      "oldOriginalValue": 0,
      "moneyValue": 0,
      "erpNdper": 0,
      "charItem9": "",
      "costCenterName": "",
      "invoiceStatus": 3,
      "charItem8": "",
      "charItem7": "",
      "assetsType": "0101",
      "charItem6": "",
      "charItem5": "",
      "departCode": "21511280000010003",
      "inOutType": 1,
      "charItem4": "",
      "charItem3": "",
      "charItem2": "",
      "charItem1": "",
      "assetsCode": "101000064452",
      "partnerDutyCenter": "201915112801",
      "deviceSyncStatus": "",
      "erpXnega": "",
      "gmGrantNbr": "",
      "unitCodeName": "居里",
      "contractMoney": 0,
      "markImport": 0,
      "addDevalueValue": 0,
      "erpXref2Hd": "DB180228100742046027",
      "varType": "B1",
      "bsAreaName": "",
      "singleAmount": 1,
      "fkber": "",
      "preMonthDepreciate": 0,
      "clearValue": 0,
      "rentSource": "",
      "getModeName": "",
      "productDate": "",
      "repairResult": "",
      "areaCode": "",
      "assetsStatus": "",
      "contractValidTerm": 0,
      "equipTypeName": "移动设备",
      "kCompanyCode": "",
      "kErpBelnr": "",
      "originalValue": 6000,
      "bsArea": "2019",
      "lessReason": "",
      "oldNowValue": 0,
      "partnerDepartCode": "21511280000010002",
      "oilareaNum": "",
      "compactType": "",
      "contractName": "",
      "zztznrName": "",
      "cErpReturnInfo": "",
      "remark": "",
      "monthAmount": 0,
      "balanceDate": "",
      "outConfirmPerson": "",
      "rowSequence": "",
      "recordPrice": 0,
      "oldYearDepreciate": 0,
      "LContractName": "",
      "entityCode": "003003001000073",
      "taxCostRate": 0,
      "disposeMoney": 0,
      "barStatus": 1,
      "economyFunction": "",
      "expenseDepreciate": 0,
      "addReason": "01",
      "technicalDepartName": "",
      "futureValue": 0,
      "aufwl": 0,
      "usedState": "010102",
      "ckErpAwref": "",
      "deleteStatus": 0,
      "devalueValue": 0,
      "devalueDate": "",
      "aufwv": 0,
      "licenceNumber": "",
      "partnerSubAssetsCode": "0000",
      "makeFactory": "",
      "fmisCostCenter": "0003",
      "createuserid": "",
      "zztznr": "",
      "scrapValue": 3,
      "varDutycenterLevel": 0,
      "erpBelnr": "",
      "patchDepreciate": 0,
      "disposeDate": "",
      "tempDepreciate": 0,
      "managerDepartName": "长城\\苏10\\本部\\生产协调科",
      "usedStateName": "生产经营用-其他",
      "rentType": "",
      "preOriginalValue": 0,
      "id": 600000150757747,
      "kDepartCode": "",
      "markDevice": 0,
      "backDate": "",
      "evalMoney": 0,
      "markEvaluate": 0,
      "financeMonth": "",
      "assetsName": "拱顶容器",
      "nafal": 0,
      "nafag": 0,
      "erpDepreciateName": "",
      "subAssetsCode": "0000",
      "repairContent": "",
      "companyCode": "B865",
      "entityName": "",
      "outConfirmDate": "",
      "discardReason": "",
      "monthDepreciate": 0,
      "contentAssetsType": "00010100",
      "erpAwref": "",
      "erpKtext": "",
      "applyCode": "",
      "owerPerson": "",
      "varTime": "2018-02-28 10:07:40",
      "borrowPerson": ""
    }
  ];
  i=0;
  departments;
  barCode;
  assetsCode;
  lossReasonData=[];
  storePlaceData=[];
  loginDepartList;
  departListData;
  outDepartData;
  inDepartData;
  outDepartName;
  inDepartName;
  displayIndex;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public app:App,public alertCtrl:AlertController,public barcodeScanner:BarcodeScanner,
              public navParams:NavParams,public loadingCtrl:LoadingController) {
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    // this.invoice=JSON.parse("{}");
    // this.userName = this.storageService.read("loginUserName");
    // this.userCode = this.storageService.read("loginUserCode");
    // this.departName = this.storageService.read("loginDepartName");
    // this.departCode = this.storageService.read("loginDepartCode");
    // this.invoice["barCode"] = this.navParams.get("barCode");
    // this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
    //   if (res.rows.length>0){
    //     this.departments = JSON.parse(res.rows.item(0).stringData)["departments"];
    //   }
    // }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
    // this.storageService.getUserTable().executeSql(this.storageService.getSSS("departListData",this.userCode),[]).then(res=>{
    //   if (res.rows.length>0){
    //     this.departListData = JSON.parse(res.rows.item(0).stringData);
    //     this.outDepartData = JSON.parse(res.rows.item(0).stringData);
    //     this.inDepartData = JSON.parse(res.rows.item(0).stringData);
    //   }
    // }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
    // let date = new Date();
    // this.invoice["invoiceType"]="1401";
    // this.invoice["inDepartcode"]="";
    // this.invoice["sl"]=0;
    // this.invoice["originalValue"]="0.00";
    // this.invoice["nowValue"]="0.00";
    // this.invoice["addDepreciate"]="0.00";
    // this.invoice["createUserName"]=this.userName;
    // this.invoice["createTime"]=date.toLocaleDateString();
    // this.invoice["createDepart"]=this.departName;
    // this.storageService.getUserTable().executeSql(this.storageService.getSSS("allotInvoice",this.userCode),[]).then(res=>{
    //   if (res.rows.length>0){
    //     this.invoice = JSON.parse(res.rows.item(0).stringData)
    //   }
    // }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
    // this.storageService.getUserTable().executeSql(this.storageService.getSSS("allotDetail",this.userCode),[]).then(res=>{
    //   if (res.rows.length>0){
    //     this.detailList = JSON.parse(res.rows.item(0).stringData)
    //   }
    // }).catch(e =>alert("erro2_3:"+JSON.stringify(e)));
  }
  inputOnfocus(){
    this.isOnfocus=true;
  }
  inputOnblur(){
    this.isOnfocus=false;
  }
  scan() {
    let options: BarcodeScannerOptions = {
      preferFrontCamera: false,//前置摄像头
      showFlipCameraButton: true,//翻转摄像头按钮
      showTorchButton: true,//闪关灯按钮
      prompt: '扫描中……',//提示文本
      // formats: 'QR_CODE',//格式
      orientation: 'portrait',//方向
      torchOn: false,//启动闪光灯
      resultDisplayDuration: 500,//显示扫描文本
      disableSuccessBeep: true // iOS and Android
    };
    this.barcodeScanner
      .scan(options)
      .then((data) => {
        this.barCode = data.text;
        // const alert = this.alertCtrl.create({
        //   title: 'Scan Results',
        //   subTitle: data.text,
        //   buttons: ['OK']
        // });
        // alert.present();
      })
      .catch((err) => {
        const alert = this.alertCtrl.create({
          title: 'Attention!',
          subTitle: err,
          buttons: ['Close']
        });
        alert.present();
      });
  }
  saveInfo(){
    if (!this.confirmChecked()){
      return false;
    }
    this.storageService.sqliteInsert("allotInvoice",this.userCode,JSON.stringify(this.invoice));
    let list=[];
    for(let index in this.detailList){
      if(this.detailList[index]["checkedIcon"]){
        list.push(this.detailList[index]);
      }
    }
    this.detailList = list;
    this.storageService.sqliteInsert("allotDetail",this.userCode,JSON.stringify(this.detailList));
    let alertCtrl = this.alertCtrl.create({
      title:"保存成功！"
    });
    alertCtrl.present();
  }
  searchDetail(){
    //问题
    if (!this.confirmInput()){
      return false;
    }
    for (let detail in this.detailList){
      if (this.detailList[detail]["assetsCode"]==this.assetsCode||this.detailList[detail]["barCode"]==this.barCode){
        let alertCtrl = this.alertCtrl.create({
          title:"该条明细已被搜出！"
        });
        alertCtrl.present();
        return false;
      }
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:10000
    });
    loading.present();
    if(!this.assetsCode){
      this.assetsCode = "";
    }
    if (!this.barCode){
      this.barCode = "";
    }
    this.httpService.post(this.httpService.getUrl()+"discardController.do?queryByCodeOrBar",{userCode:this.userCode,departCode:this.departCode,assetsCode:this.assetsCode,barCode:this.barCode}).subscribe(data=>{
      if (data.success=="true"){
        this.detailList.push(data.data);
      }
      else {
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present();
      }
      loading.dismiss();
    })
  }
  uploadData(){
    if (!this.confirmChecked()){
      return false;
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:10000
    });
    loading.present();
    let url;
    url = "allotController.do?add";
    this.httpService.post(this.httpService.getUrl()+url,{departCode:this.departCode,departName:this.departName,userCode:this.userCode,userName:this.userName,
      allotInvoiceDTO:this.invoice,eamDiscardInvoices:this.invoice,eamAllotDetal:this.detailList,eamDiscardDetails:this.detailList}).subscribe(data=>{
      if (data.success == "true"){
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present()
      }
      else {
        alert(data.msg)
      }
      loading.dismiss();
    })
  }
  censorship(){
    if (!this.confirmChecked()){
      return false;
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:10000
    });
    loading.present();
    let url;
    url = "allotController.do?sendAllot";
    let phoneInvoiceNumber = this.userCode+this.departCode+this.formatDateAndTimeToString(new Date());
    this.httpService.post(this.httpService.getUrl()+url,{departCode:this.departCode,userCode:this.userCode,phoneInvoiceNumber:phoneInvoiceNumber}).subscribe(data=>{
      if (data.success == "true"){
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present()
      }
      else {
        alert(data.msg)
      }
      loading.dismiss();
    })
  }

  formatDateToString(date){
    if(!date){
      date = new Date();
    }
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(month<10) month = "0"+month;
    if(day<10) day = "0"+day;
    return year+""+month+""+day;
  }
  formatDateAndTimeToString(date)
  {
    var hours = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    if(hours<10) hours = "0"+hours;
    if(mins<10) mins = "0"+mins;
    if(secs<10) secs = "0"+secs;
    return this.formatDateToString(date)+""+hours+""+mins+""+secs;
  }
  uploadDataToEAM(){
    if (!this.confirmChecked()){
      return false;
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:10000
    });
    loading.present();
    let url;
    url = "allotController.do?confirm";
    let phoneInvoiceNumber = this.userCode+this.departCode+this.formatDateAndTimeToString(new Date());
    this.httpService.post(this.httpService.getUrl()+url,{departCode:this.departCode,phoneInvoiceNumber:phoneInvoiceNumber}).subscribe(data=>{
      if (data.success=="true"){
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present()
      }
      else {
        alert(data.msg)
      }
      loading.dismiss();
    })
  }
  selectDepart(departName,funIndex){
    if (funIndex == "out"){
      this.outDepartName = departName;
    }else if (funIndex == "in"){
      this.inDepartName = departName;
    }
  }
  filterDepartName(ev: any,funIndex) {
    const val = ev.target.value;
    let item = [];
    if (val && val.trim() != '') {
      for (let i in this.departListData){
        if(this.departListData[i]["departname"].indexOf(val)>=0){
          item.push(this.departListData[i])
        }
      }
    }
    else {
      item = this.departListData;
    }
    if (funIndex=="out"){
      this.outDepartData = item;
      if (!item.length){
        this.invoice["outDepartcode"]=""
      }
    }
    else  if (funIndex=="in"){
      this.inDepartData = item;
      if (!item.length){
        this.invoice["inDepartcode"]=""
      }
    }
  }
  checkedItem(index){
    this.detailList[index]["checkedIcon"] = !this.detailList[index]["checkedIcon"];
    this.invoice["originalValue"] = <any>this.invoice["originalValue"]*1;
    this.invoice["nowValue"] = <any>this.invoice["nowValue"]*1;
    this.invoice["addDepreciate"] = <any>this.invoice["addDepreciate"]*1;
    this.invoice["devalueValue"] = <any>this.invoice["devalueValue"]*1;
    if (this.detailList[index]["checkedIcon"]){
      this.invoice["allotAmount"]++;
      this.invoice["originalValue"] += <any>this.detailList[index]["originalValue"]*1;
      this.invoice["nowValue"] += <any>this.detailList[index]["nowValue"]*1;
      this.invoice["addDepreciate"] += <any>this.detailList[index]["addDepreciate"]*1;
      this.invoice["devalueValue"] += <any>this.detailList[index]["devalueValue"]*1;
    }else {
      this.invoice["allotAmount"]--;
      this.invoice["originalValue"] -= <any>this.detailList[index]["originalValue"]*1;
      this.invoice["nowValue"] -= <any>this.detailList[index]["nowValue"]*1;
      this.invoice["addDepreciate"] -= <any>this.detailList[index]["addDepreciate"]*1;
      this.invoice["devalueValue"] -= <any>this.detailList[index]["devalueValue"]*1;
    }
    this.invoice["originalValue"] = this.invoice["originalValue"].toFixed(2)
    this.invoice["nowValue"] = this.invoice["nowValue"].toFixed(2)
    this.invoice["addDepreciate"] = this.invoice["addDepreciate"].toFixed(2)
    this.invoice["devalueValue"] = this.invoice["devalueValue"].toFixed(2)
  }
  displayContent(index){
    let content = document.getElementsByClassName("disContent");
    if ((<HTMLElement>content[index]).style.display=="block"){
      (<HTMLElement>content[index]).style.display="none";
    }else {
      if(this.displayIndex>=0){
        (<HTMLElement>content[this.displayIndex]).style.display="none";
      }
      (<HTMLElement>content[index]).style.display="block";
      this.displayIndex = index;
    }
  }
  confirmInput(){
    if(this.radioButton=="资产条码"){
      this.assetsCode = "";
      if(!this.barCode){
        let alertCtrl = this.alertCtrl.create({
          title:"请输入或扫描资产条码！"
        });
        alertCtrl.present();
        return false;
      }
    }
    if (this.radioButton=="资产编码"){
      this.barCode = "";
      if(!this.assetsCode){
        let alertCtrl = this.alertCtrl.create({
          title:"请输入资产编码！"
        });
        alertCtrl.present();
        return false;
      }
    }
    return true;
  }
  confirmChecked(){
    for(let index in this.detailList){
      if(this.detailList[index]["checkedIcon"]){
        return true;
      }
    }
    let alertCtrl = this.alertCtrl.create({
      title:"请选择明细！"
    });
    alertCtrl.present();
    return false;
  }
}
