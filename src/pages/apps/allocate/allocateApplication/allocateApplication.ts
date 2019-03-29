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
  detailList=[];
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
    this.invoice["originalValue"]="0.00";
    this.invoice["nowValue"]="0.00";
    this.invoice["addDepreciate"]="0.00";
    this.invoice["createUserName"]=this.userName;
    this.invoice["createTime"]=date.toLocaleDateString();
    this.invoice["createDepart"]=this.departName;
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("allotInvoice",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.invoice = JSON.parse(res.rows.item(0).stringData)
      }
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("allotDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.detailList = JSON.parse(res.rows.item(0).stringData)
      }
    }).catch(e =>alert("erro2_3:"+JSON.stringify(e)));
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
