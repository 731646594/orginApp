import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {File} from "@ionic-native/file";

@Component({
  selector: 'page-scrapApplication',
  templateUrl: 'scrapApplication.html'
})
export class ScrapApplicationPage {
  isOnfocus=false;
  shape = "brief";
  radioButton = "资产条码";
  invoice=JSON;
  detail=[];
  i=0;
  departments;
  barCode;
  assetsCode;
  lossReasonData=[];
  storePlaceData=[];
  loginDepartList;
  departListData;
  userName;
  userCode;
  departName;
  departCode;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public app:App,public alertCtrl:AlertController,public barcodeScanner:BarcodeScanner,public file:File,
              public actionSheetCtrl:ActionSheetController,public navParams:NavParams) {
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    this.invoice=JSON.parse("{}");
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.invoice["barCode"] = this.navParams.get("barCode");
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.departments = JSON.parse(res.rows.item(0).stringData)["departments"];
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
    if (this.storageService.read("loginDepartList")){
      this.loginDepartList = this.storageService.read("loginDepartList");
    }
    let date = new Date();
    this.invoice["discardTypeCode"]="020201";
    this.invoice["allotAmount"]=0;
    this.invoice["originalValue"]=0;
    this.invoice["nowValue"]=0;
    this.invoice["addDepreciate"]=0;
    this.invoice["devalueValue"]=0;
    if (this.lossReasonData[0])
    this.invoice["lossReason"]=this.lossReasonData[0]["complexcode"];
    if (this.storePlaceData[0])
    this.invoice["storePlace"]=this.storePlaceData[0]["complexcode"];
    this.invoice["departCode"]=this.departCode;
    this.invoice["createuserid"]=this.userName;
    this.invoice["createdate"]=date.toLocaleDateString();

    this.detail["stopDate"]=date.toLocaleDateString();
    this.detail["discardReasonCode"]="01";
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
        this.detail["barCode"] = data.text;
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
    this.storageService.sqliteInsert("discardInvoice",this.userCode,JSON.stringify(this.invoice));
    this.storageService.sqliteInsert("discardDetail",this.userCode,JSON.stringify(this.detail));
  }

  searchDetail(){
    //问题
    if(!this.assetsCode){
      this.assetsCode = "";
    }
    if (!this.barCode){
      this.barCode = "";
    }
    this.httpService.post(this.httpService.getUrl()+"discardController.do?queryByCodeOrBar",{userCode:this.userCode,departCode:this.departCode,assetsCode:this.assetsCode,barCode:this.barCode}).subscribe(data=>{
      if (data.success=="true"){
        this.detail = data.data;
      }
      else {
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present();
      }
    })
  }
  uploadData(){
    let url;
    url = "discardController.do?add"
    this.httpService.post(this.httpService.getUrl()+url,{departCode:this.departCode,departName:this.departName,userCode:this.userCode,userName:this.userName,
      allotInvoiceDTO:this.invoice,eamDiscardInvoices:this.invoice,eamAllotDetal:this.detail,eamDiscardDetails:this.detail}).subscribe(data=>{
      if (data.success == "true"){
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present()
      }
      else {
        alert(data.msg)
      }
    })
  }
  censorship(){
    let url;
    url = "discardController.do?send";
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
    let url;
    url = "discardController.do?confirm";
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
    })
  }

}
