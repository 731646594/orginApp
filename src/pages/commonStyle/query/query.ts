import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";

@Component({
  selector: 'page-query',
  templateUrl: 'query.html'
})
export class QueryPage {
  data = {};
  pageName;
  pageData;
  isFocus;
  invoice=[];
  maxDate;
  userCode;
  departCode;
  searchDatas;
  searchFormUrl;
  nextPage;
  constructor(public navCtrl?: NavController,public navParams?:NavParams,public storageService?:StorageService,public app?:App,public loadingCtrl?:LoadingController,
              public httpService?:HttpService,public alertCtrl?:AlertController) {
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.invoice["invoiceStatus"]="0";
    let date = new Date();
    this.invoice["invoiceYM"]=new Date(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1)).toISOString();
    this.maxDate = this.invoice["invoiceYM"];
  }
  ionViewDidEnter(){

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
  getDateValue(value,key){
    this.invoice[key] = value;
  }
  searchForm(){
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration: 5000
    });
    loading.present();
    if (!this.invoice["invoiceNumber"]){
      this.invoice["invoiceNumber"]="";
    }
    this.httpService.post(this.httpService.getUrl()+this.searchFormUrl,{departCode:this.departCode,userCode:this.userCode,invoiceNumber:this.invoice["invoiceNumber"],invoiceStatus:this.invoice["invoiceStatus"],invoiceYM:this.invoice["invoiceYM"]}).subscribe(data=>{
      if (data.success=="true"){
        let alert = this.alertCtrl.create({
          title:"查询成功！"
        });
        alert.present();
        this.searchDatas=data.data;
      }else {
        alert(data.msg)
      }
      loading.dismiss();
    })
  }
  invoiceDetail(index){
    this.app.getRootNav().push(this.nextPage,{invoice:this.searchDatas[index]})
  }
}
