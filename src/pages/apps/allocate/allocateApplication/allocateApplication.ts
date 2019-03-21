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
  detail=[];
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
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public app:App,public alertCtrl:AlertController,public barcodeScanner:BarcodeScanner,
              public navParams:NavParams,public loadingCtrl:LoadingController) {
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
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("departListData",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.departListData = JSON.parse(res.rows.item(0).stringData);
        this.outDepartData = JSON.parse(res.rows.item(0).stringData);
        this.inDepartData = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
    let date = new Date();
    this.invoice["invoiceType"]="1401";
    this.invoice["inDepartcode"]="";
    this.invoice["sl"]=0;
    this.invoice["originalValue"]=0;
    this.invoice["nowValue"]=0;
    this.invoice["addDepreciate"]=0;
    this.invoice["createUserid"]=this.userCode;
    this.invoice["createTime"]=date.toLocaleDateString();
    this.invoice["createDepart"]=this.departName;
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
    this.storageService.sqliteInsert("allotInvoice",this.userCode,JSON.stringify(this.invoice));
    this.storageService.sqliteInsert("allotDetail",this.userCode,JSON.stringify(this.detail));
  }
  searchDetail(){
    //问题
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
        this.detail = data.data;
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
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:10000
    });
    loading.present();
    let url;
    url = "allotController.do?add";
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
      loading.dismiss();
    })
  }
  censorship(){
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

}
