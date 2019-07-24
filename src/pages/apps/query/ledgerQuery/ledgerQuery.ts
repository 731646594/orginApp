import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
@Component({
  selector: 'page-ledgerQuery',
  templateUrl: 'ledgerQuery.html'
})
export class LedgerQueryPage {
  shape="detail";
  detail=[];
  plan=[];
  isOnfocus=false;

  assetsType="0101";
  departCode;
  userPerson;
  page=1;
  pageSize=10;
  departListData;
  lastDepartListData;
  departName;
  loginDepartCode;
  loginDepartName;
  userCode;
  displayIndex;
  queryResult = [];
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,public loadingCtrl:LoadingController,
              public app:App,public navParams:NavParams, public alertCtrl:AlertController, public toastCtrl:ToastController) {
    this.loadData();
  }
  loadData(){
    this.departCode = this.storageService.read("loginDepartCode");
    this.departName = this.storageService.read("loginDepartName");
    this.loginDepartCode = this.storageService.read("loginDepartCode");
    this.loginDepartName = this.storageService.read("loginDepartName");
    this.userCode = this.storageService.read("loginUserCode");
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("departListData",this.userCode),[]).then(res=>{
      if (res.rows.length>0) {
        this.departListData = JSON.parse(res.rows.item(0).stringData);
        this.lastDepartListData = JSON.parse(res.rows.item(0).stringData);
      }
    })
  }

  inputOnfocus(){
    this.isOnfocus=true;
  }
  inputOnblur(){
    this.isOnfocus=false;
  }
  query(){
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:10000
    });
    loading.present();
    let url,body;
    this.page=1;
    url = "cellPhoneController.do?queryLedgerList";
    if (!this.userPerson){
      this.userPerson = ""
    }
    body = {departCode:this.departCode,assetsType:this.assetsType,userPerson:this.userPerson,page:this.page,pageSize:this.pageSize};
    this.httpService.postData(this.httpService.getUrl()+url,body,data=>{
      if (data.success == "true"){
        this.detail = data.data;
        this.detail["count"] = data.count;
        let alert = this.alertCtrl.create({
          title:"查询成功！"
        });
        alert.present();
      }else {
        alert(data.msg)
      }
      loading.dismiss();
    })
  }
  getMore(infiniteScroll){
    this.page++;
    let url,body;
    url = "cellPhoneController.do?queryLedgerList";
    if (!this.userPerson){
      this.userPerson = ""
    }
    body = {departCode:this.departCode,assetsType:this.assetsType,userPerson:this.userPerson,page:this.page,pageSize:this.pageSize};
    this.httpService.postData(this.httpService.getUrl()+url,body,data=>{
      console.log(data)
      if (data.success == "true"){
        for (let i in data.data){
          this.detail.push(data.data[i])
        }
      }else {
        alert(data.msg)
      }
      if (!data.data[0]){
        infiniteScroll.enable(false);
        let toast = this.toastCtrl.create({
          message: "这已经是最后一页了",
          duration: 2000,
        });
        toast.present();
      }
      infiniteScroll.complete();
    })
  }
  selectDepart(departName){
    this.departName = departName;
  }
  filterDepartName(ev: any) {
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
    this.lastDepartListData = item;
    if (!item.length){
      this.departCode=""
    }
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
}
