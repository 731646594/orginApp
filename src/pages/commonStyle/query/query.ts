import {Component} from '@angular/core';
import {AlertController, App, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'page-query',
  templateUrl: 'query.html'
})
export class QueryPage {
  data = {};
  pageName;
  pageData;
  isFocus;
  invoice = [];
  maxDate;
  userCode;
  departCode;
  searchDatas;
  searchFormUrl;
  nextPage;

  constructor(public navCtrl?: NavController, public navParams?: NavParams, public storageService?: StorageService, public app?: App,
              public httpService?: HttpService, public alertCtrl?: AlertController,public datePipe?:DatePipe) {
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.invoice["invoiceStatus"] = "0";
    // let date = new Date();
    // this.invoice["invoiceYM"] = new Date(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1)).toISOString();
    this.invoice["invoiceYM"] = new Date(new Date().getTime()+8*60*60*1000).toISOString();
    this.maxDate = this.invoice["invoiceYM"];

  }

  ionViewDidEnter() {

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

  getSelectValue(value, key) {
    this.invoice[key] = value["selectedValue"];
  }

  getDateValue(value, key) {
    this.invoice[key] = value;
  }

  searchForm() {
    if (!this.invoice["invoiceNumber"]) {
      this.invoice["invoiceNumber"] = "";
    }

    let invoiceYM= this.datePipe.transform(this.invoice["invoiceYM"],"yyyy-MM");

    // this.httpService.postData(this.httpService.getUrl() + this.searchFormUrl, {
    //   departCode: this.departCode,
    //   userCode: this.userCode,
    //   invoiceNumber: this.invoice["invoiceNumber"],
    //   invoiceStatus: this.invoice["invoiceStatus"],
    //   invoiceYM: invoiceYM
    // },data => {
    //   if (data.success == "true") {
    //     let alert = this.alertCtrl.create({
    //       title: "查询成功！"
    //     });
    //     alert.present();
    //     this.searchDatas = data.data;
    //   } else {
    //     alert(data.msg)
    //   }
    //   loading.dismiss();
    // })

    this.httpService.postData(this.httpService.getUrl() + this.searchFormUrl, {
      departCode: this.departCode,
      userCode: this.userCode,
      invoiceNumber: this.invoice["invoiceNumber"],
      invoiceStatus: this.invoice["invoiceStatus"],
      invoiceYM: invoiceYM
    },data => {
      if (data.success == "true") {
        if(data.data[0]["invoiceStatus"]){
          for (let i in data.data){
            switch (data.data[i]["invoiceStatus"]){
              case "0":
                data.data[i]["invoiceStatus"] = "全部";
                break;
              case "1":
                data.data[i]["invoiceStatus"] = "新建";
                break;
              case "2":
                data.data[i]["invoiceStatus"] = "驳回";
                break;
              case "3":
                data.data[i]["invoiceStatus"] = "待审批";
                break;
              case "4":
                data.data[i]["invoiceStatus"] = "审批中";
                break;
              case "5":
                data.data[i]["invoiceStatus"] = "审批完成";
                break;
            }
          }
        }
        let alert = this.alertCtrl.create({
          title: "查询成功！"
        });
        alert.present();
        this.searchDatas = data.data;
      }
    },true)
  }

  invoiceDetail(index) {
    this.app.getRootNav().push(this.nextPage, {invoice: this.searchDatas[index]})
  }
}
