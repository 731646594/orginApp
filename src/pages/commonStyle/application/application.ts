import { Component } from '@angular/core';
import {AlertController, App, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";

@Component({
  selector: 'page-application',
  templateUrl: 'application.html'
})
export class ApplicationPage {
  pageName;
  pageData;
  invoice=[];
  shape = "brief";
  data={};
  isFocus = false;
  searchDatas=[];
  radioValue;
  radioInput="";
  radioInputPostUrl="discardController.do?queryByCodeOrBar";
  userName;
  userCode;
  departName;
  departCode;
  selectFilterData=[];
  censorshipUrl="";
  saveInfoTableName=[];
  uploadDataUrl="";
  uploadDataToEAMUrl="";
  sqlInvoiceTableName="";
  sqlSearchDatasTableName="";
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public alertCtrl?:AlertController,
              public storageService?:StorageService,public events?:Events,public app?:App,public loadingCtrl?:LoadingController,
              public httpService?:HttpService) {
    // PageUtil.pages["application"]=this;
    this.invoice=JSON.parse("{}");
    // this.invoice["barCode"] = this.navParams.get("barCode");
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.events.subscribe("showFooter",(res) => {
      this.showFooter()
    });
    this.events.subscribe("hideFooter",(res) => {
      this.hideFooter();
    });
  }
  ionViewWillUnload(){
    this.events.unsubscribe("showFooter");
    this.events.unsubscribe("hideFooter")
  }
  ionViewDidEnter(){
    this.storageService.getUserTable().executeSql(this.storageService.getSSS(this.sqlInvoiceTableName,this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.invoice = JSON.parse(res.rows.item(0).stringData)
      }
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS(this.sqlSearchDatasTableName,this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.searchDatas = JSON.parse(res.rows.item(0).stringData)
      }
    }).catch(e =>alert("erro2_3:"+JSON.stringify(e)));
  }
  hideFooter(){
    this.isFocus=true;
  }
  showFooter(){
    this.isFocus=false;
  }
  getInputValue(value,key){
    this.showFooter();
    this.invoice[key] = value;
  }
  getSelectValue(value,key){
    this.invoice[key[0]] = value["selectedValue"];
    this.invoice[key[1]] = value["selectedName"];
  }
  getRadioValue(value){
    this.radioValue = value.radioValue;
  }
  getRadioInputValue(value){
    for(let i in this.searchDatas){
      if (this.searchDatas[i].assetsCode == value.assetsCode){
        let alertCtrl = this.alertCtrl.create({
          title:"该条明细已被搜出！"
        });
        alertCtrl.present();
        return false;
      }
    }
    this.searchDatas.push(value)
  }
  getCardSelectValue(index){
    // this.searchDatas[index]["checkedIcon"] = !this.searchDatas[index]["checkedIcon"];
    this.invoice["allotAmount"] = this.invoice["allotAmount"]?<any>this.invoice["allotAmount"]*1:0;
    this.invoice["originalValue"] = this.invoice["originalValue"]?<any>this.invoice["originalValue"]*1:0;
    this.invoice["nowValue"] = this.invoice["nowValue"]?<any>this.invoice["nowValue"]*1:0;
    this.invoice["addDepreciate"] = this.invoice["addDepreciate"]?<any>this.invoice["addDepreciate"]*1:0;
    this.invoice["devalueValue"] = this.invoice["devalueValue"]?<any>this.invoice["devalueValue"]*1:0;
    if (this.searchDatas[index]["checkedIcon"]){
      this.invoice["allotAmount"]++;
      this.invoice["originalValue"] += <any>this.searchDatas[index]["originalValue"]*1;
      this.invoice["nowValue"] += <any>this.searchDatas[index]["nowValue"]*1;
      this.invoice["addDepreciate"] += <any>this.searchDatas[index]["addDepreciate"]*1;
      this.invoice["devalueValue"] += <any>this.searchDatas[index]["devalueValue"]*1;
    }else {
      this.invoice["allotAmount"]--;
      this.invoice["originalValue"] -= <any>this.searchDatas[index]["originalValue"]*1;
      this.invoice["nowValue"] -= <any>this.searchDatas[index]["nowValue"]*1;
      this.invoice["addDepreciate"] -= <any>this.searchDatas[index]["addDepreciate"]*1;
      this.invoice["devalueValue"] -= <any>this.searchDatas[index]["devalueValue"]*1;
    }
    this.invoice["originalValue"] = this.invoice["originalValue"].toFixed(2)
    this.invoice["nowValue"] = this.invoice["nowValue"].toFixed(2)
    this.invoice["addDepreciate"] = this.invoice["addDepreciate"].toFixed(2)
    this.invoice["devalueValue"] = this.invoice["devalueValue"].toFixed(2)
  }
  getScannerValue(value){
    this.radioInput = value;
  }
  confirmChecked():any{
    for(let index in this.searchDatas){
      if(this.searchDatas[index]["checkedIcon"]){
        return true;
      }
    }
    let alertCtrl = this.alertCtrl.create({
      title:"请选择明细！"
    });
    alertCtrl.present();
    return false;
  }
  formatDateToString(date){
    if(!date){
      date = new Date();
    }
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if(month<10) month = "0"+month;
    if(day<10) day = "0"+day;
    return year+""+month+""+day;
  }
  formatDateAndTimeToString(date) {
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    if(hours<10) hours = "0"+hours;
    if(mins<10) mins = "0"+mins;
    if(secs<10) secs = "0"+secs;
    return this.formatDateToString(date)+""+hours+""+mins+""+secs;
  }
  censorship(){
    if (!this.confirmChecked()){
      return false;
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:5000
    });
    loading.present();
    let phoneInvoiceNumber = this.userCode+this.departCode+this.formatDateAndTimeToString(new Date());
    this.httpService.post(this.httpService.getUrl()+this.censorshipUrl,{departCode:this.departCode,userCode:this.userCode,phoneInvoiceNumber:phoneInvoiceNumber}).subscribe(data=>{
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
  saveInfo(){
    if (!this.confirmChecked()){
      return false;
    }
    console.log(JSON.stringify(this.invoice))
    this.storageService.sqliteInsert(this.saveInfoTableName[0],this.userCode,JSON.stringify(this.invoice));
    let list=[];
    for(let index in this.searchDatas){
      if(this.searchDatas[index]["checkedIcon"]){
        list.push(this.searchDatas[index]);
      }
    }
    this.searchDatas = list;
    this.storageService.sqliteInsert(this.saveInfoTableName[1],this.userCode,JSON.stringify(this.searchDatas));
    let alertCtrl = this.alertCtrl.create({
      title:"保存成功！"
    });
    alertCtrl.present();
  }
  uploadData(){
    if (!this.confirmChecked()){
      return false;
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:5000
    });
    loading.present();
    let url;
    url = this.uploadDataUrl;
    this.httpService.post(this.httpService.getUrl()+url,{departCode:this.departCode,departName:this.departName,userCode:this.userCode,userName:this.userName,
      allotInvoiceDTO:this.invoice,eamDiscardInvoices:this.invoice,eamAllotDetal:this.searchDatas,eamDiscardDetails:this.searchDatas}).subscribe(data=>{
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
  uploadDataToEAM(){
    if (!this.confirmChecked()){
      return false;
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:5000
    });
    loading.present();
    let phoneInvoiceNumber = this.userCode+this.departCode+this.formatDateAndTimeToString(new Date());
    this.httpService.post(this.httpService.getUrl()+this.uploadDataToEAMUrl,{departCode:this.departCode,phoneInvoiceNumber:phoneInvoiceNumber}).subscribe(data=>{
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
}
