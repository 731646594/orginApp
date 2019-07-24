import {Component} from '@angular/core';
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
  invoice = [];
  shape = "brief";
  data = {};
  isFocus = false;
  searchDatas = [];
  radioValue;
  radioInput = "";
  // radioInputPostUrl = "discardController.do?queryByCodeOrBar";
  radioInputPostUrl = "ledgerController/queryByCodeOrBar.do";
  userName;
  userCode;
  departName;
  departCode;
  selectFilterData = [];
  censorshipUrl = "";
  saveInfoTableName = [];
  uploadDataUrl = "";
  uploadDataToEAMUrl = "";
  sqlInvoiceTableName = "";
  sqlSearchDatasTableName = "";
  allData = [];
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App, public loadingCtrl?: LoadingController,
              public httpService?: HttpService) {
    // PageUtil.pages["application"]=this;
    this.invoice = JSON.parse("{}");
    // this.invoice["barCode"] = this.navParams.get("barCode");
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.events.subscribe("showFooter", (res) => {
      this.showFooter()
    });
    this.events.subscribe("hideFooter", (res) => {
      this.hideFooter();
    });
  }

  ionViewWillUnload() {
    this.events.unsubscribe("showFooter");
    this.events.unsubscribe("hideFooter")
  }

  ionViewDidEnter() {
    this.storageService.getUserTable().executeSql(this.storageService.getSSS(this.sqlInvoiceTableName, this.userCode), []).then(res => {
      if (res.rows.length > 0) {
        this.invoice = JSON.parse(res.rows.item(0).stringData)
      }
    }).catch(e => alert("erro2_2:" + JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS(this.sqlSearchDatasTableName, this.userCode), []).then(res => {
      if (res.rows.length > 0) {
        this.searchDatas = JSON.parse(res.rows.item(0).stringData)
      }
    }).catch(e => alert("erro2_3:" + JSON.stringify(e)));
  }

  hideFooter() {
    this.isFocus = true;
  }

  showFooter() {
    this.isFocus = false;
  }

  getInputValue(value, key) {
    this.showFooter();
    this.invoice[key] = value;
  }

  getSelectValue(value, key,keyName) {
    if(key instanceof Array){
      this.invoice[key[0]] = value["selectedValue"];
      this.invoice[key[1]] = value["selectedName"];
    }else{
      this.invoice[key] = value["selectedValue"];
      this.invoice[keyName] = value["selectedName"];
    }
  }

  getRadioValue(value) {
    this.radioValue = value.radioValue;
  }

  getRadioInputValue(value) {
    for (let i in this.searchDatas) {
      if (this.searchDatas[i].assetsCode == value.assetsCode) {
        let alertCtrl = this.alertCtrl.create({
          title: "该条明细已被搜出！"
        });
        alertCtrl.present();
        return false;
      }
    }
    this.searchDatas.push(value)
  }

  getCardSelectValue(index) {
    // this.searchDatas[index]["checkedIcon"] = !this.searchDatas[index]["checkedIcon"];
    this.invoice["allotAmount"] = this.invoice["allotAmount"] ? <any>this.invoice["allotAmount"] * 1 : 0;
    this.invoice["originalValueSum"] = this.invoice["originalValueSum"] ? <any>this.invoice["originalValueSum"] * 1 : 0;
    this.invoice["nowValueSum"] = this.invoice["nowValueSum"] ? <any>this.invoice["nowValueSum"] * 1 : 0;
    this.invoice["addDepreciateValueSum"] = this.invoice["addDepreciateValueSum"] ? <any>this.invoice["addDepreciateValueSum"] * 1 : 0;
    this.invoice["devalueValueSum"] = this.invoice["devalueValueSum"] ? <any>this.invoice["devalueValueSum"] * 1 : 0;
    if (this.searchDatas[index]["checkedIcon"]) {
      this.invoice["allotAmount"]++;
      this.invoice["originalValueSum"] += <any>this.searchDatas[index]["originalValue"] * 1;
      this.invoice["nowValueSum"] += <any>this.searchDatas[index]["nowValue"] * 1;
      this.invoice["addDepreciateValueSum"] += <any>this.searchDatas[index]["addDepreciate"] * 1;
      this.invoice["devalueValueSum"] += <any>this.searchDatas[index]["devalueValue"] * 1;
    } else {
      this.invoice["allotAmount"]--;
      this.invoice["originalValueSum"] -= <any>this.searchDatas[index]["originalValue"] * 1;
      this.invoice["nowValueSum"] -= <any>this.searchDatas[index]["nowValue"] * 1;
      this.invoice["addDepreciateValueSum"] -= <any>this.searchDatas[index]["addDepreciate"] * 1;
      this.invoice["devalueValueSum"] -= <any>this.searchDatas[index]["devalueValue"] * 1;
    }
    this.invoice["originalValueSum"] = this.invoice["originalValueSum"].toFixed(2)
    this.invoice["nowValueSum"] = this.invoice["nowValueSum"].toFixed(2)
    this.invoice["addDepreciateValueSum"] = this.invoice["addDepreciateValueSum"].toFixed(2)
    this.invoice["devalueValueSum"] = this.invoice["devalueValueSum"].toFixed(2)
  }

  getScannerValue(value) {
    this.radioInput = value;
  }

  confirmChecked(): any {
    for (let index in this.searchDatas) {
      if (this.searchDatas[index]["checkedIcon"]) {
        return true;
      }
    }
    let alertCtrl = this.alertCtrl.create({
      title: "请选择明细！"
    });
    alertCtrl.present();
    return false;
  }

  checkDepart():any{
    return true;
  }

  formatDateToString(date) {
    if (!date) {
      date = new Date();
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    return year + "" + month + "" + day;
  }

  formatDateAndTimeToString(date) {
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;
    return this.formatDateToString(date) + "" + hours + "" + mins + "" + secs;
  }

  // censorship() {
  //   if (!this.confirmChecked()) {
  //     return false;
  //   }
  //   let loading = this.loadingCtrl.create({
  //     content: "请等待...",
  //     duration: 5000
  //   });
  //   loading.present();
  //   let phoneInvoiceNumber = this.userCode + this.departCode + this.formatDateAndTimeToString(new Date());
  //   this.httpService.postData(this.httpService.getUrl() + this.censorshipUrl, {
  //     departCode: this.departCode,
  //     userCode: this.userCode,
  //     phoneInvoiceNumber: phoneInvoiceNumber
  //   },data => {
  //     if (data.success == "true") {
  //       let alertCtrl = this.alertCtrl.create({
  //         title: data.msg
  //       });
  //       alertCtrl.present()
  //     } else {
  //       alert(data.msg)
  //     }
  //     loading.dismiss();
  //   })
  // }
  /**
   * 设置下拉框选择名称
   */
  setSelectValue(){

  }
  censorship() {
    if (!this.confirmChecked()) {
      return false;
    }
    if (!this.checkDepart()) {
      return false;
    }

    let loading = this.loadingCtrl.create({
      content: "请等待...",
      duration: 5000
    });
    loading.present();
    let url;
    url = this.censorshipUrl;
    let phoneInvoiceNumber = this.userCode + this.departCode + this.formatDateAndTimeToString(new Date());

    this.setSelectValue();
    // this.httpService.postData(this.httpService.getUrl() + url, {
    //   departCode: this.departCode,
    //   departName: this.departName,
    //   userCode: this.userCode,
    //   userName: this.userName,
    //   allotInvoiceDTO: JSON.stringify(this.invoice),
    //   eamDiscardInvoice: JSON.stringify(this.invoice),
    //   eamAllotDetails: JSON.stringify(this.searchDatas),
    //   eamDiscardDetails: JSON.stringify(this.searchDatas),
    //   phoneInvoiceNumber:phoneInvoiceNumber
    // },data => {
    //   if (data.success == "true") {
    //     this.storageService.deleteUserTable(this.sqlInvoiceTableName,this.userCode);
    //     this.storageService.deleteUserTable(this.sqlSearchDatasTableName,this.userCode);
    //     let alertCtrl = this.alertCtrl.create({
    //       title: data.msg
    //     });
    //     alertCtrl.present()
    //   } else {
    //     alert(data.msg)
    //   }
    //   loading.dismiss();
    // })

    this.httpService.postData(this.httpService.getUrl() + url, {
      departCode: this.departCode,
      departName: this.departName,
      userCode: this.userCode,
      userName: this.userName,
      allotInvoiceDTO: JSON.stringify(this.invoice),
      eamDiscardInvoice: JSON.stringify(this.invoice),
      eamAllotDetails: JSON.stringify(this.searchDatas),
      eamDiscardDetails: JSON.stringify(this.searchDatas),
      phoneInvoiceNumber:phoneInvoiceNumber
    },data => {
      if (data.success == "true") {
        this.storageService.deleteUserTable(this.sqlInvoiceTableName,this.userCode);
        this.storageService.deleteUserTable(this.sqlSearchDatasTableName,this.userCode);
        let alertCtrl = this.alertCtrl.create({
          title: data.msg
        });
        alertCtrl.present()
      }
      loading.dismiss();
    })
  }

  saveInfo() {
    if (!this.confirmChecked()) {
      return false;
    }

    if(!this.checkDepart()){
      return false;
    }

    this.storageService.sqliteInsert(this.saveInfoTableName[0], this.userCode, JSON.stringify(this.invoice));
    let list = [];
    for (let index in this.searchDatas) {
      if (this.searchDatas[index]["checkedIcon"]) {
        list.push(this.searchDatas[index]);
      }
    }
    this.searchDatas = list;
    this.storageService.sqliteInsert(this.saveInfoTableName[1], this.userCode, JSON.stringify(this.searchDatas));
    let alertCtrl = this.alertCtrl.create({
      title: "保存成功！"
    });
    alertCtrl.present();
  }

  uploadData() {
    if (!this.confirmChecked()) {
      return false;
    }
    let loading = this.loadingCtrl.create({
      content: "请等待...",
      duration: 5000
    });
    loading.present();
    let url;
    url = this.uploadDataUrl;
    this.httpService.postData(this.httpService.getUrl() + url, {
      departCode: this.departCode,
      departName: this.departName,
      userCode: this.userCode,
      userName: this.userName,
      allotInvoiceDTO: this.invoice,
      eamDiscardInvoices: this.invoice,
      eamAllotDetal: this.searchDatas,
      eamDiscardDetails: this.searchDatas
    },data => {
      if (data.success == "true") {
        let alertCtrl = this.alertCtrl.create({
          title: data.msg
        });
        alertCtrl.present()
      } else {
        alert(data.msg)
      }
      loading.dismiss();
    })
  }

  uploadDataToEAM() {
    if (!this.confirmChecked()) {
      return false;
    }
    let loading = this.loadingCtrl.create({
      content: "请等待...",
      duration: 5000
    });
    loading.present();
    let phoneInvoiceNumber = this.userCode + this.departCode + this.formatDateAndTimeToString(new Date());
    this.httpService.postData(this.httpService.getUrl() + this.uploadDataToEAMUrl, {
      departCode: this.departCode,
      phoneInvoiceNumber: phoneInvoiceNumber
    },data => {
      if (data.success == "true") {

        let alertCtrl = this.alertCtrl.create({
          title: data.msg
        });
        alertCtrl.present()
      } else {
        alert(data.msg)
      }
      loading.dismiss();
    })
  }
}
