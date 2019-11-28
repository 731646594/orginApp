import { Component } from '@angular/core';
import {
  AlertController, App, Events, LoadingController, NavController, NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import * as $ from 'jquery';
@Component({
  selector: 'page-repairAlert',
  templateUrl: 'repairAlert.html'
})
export class RepairAlertPage{
  data;
  filterData;
  item;
  checkedData = null;
  searchValue = "";
  searchCon = [];
  searchSelect = "";
  displayIndex;
  checkBox = false;
  url;
  body;
  bodyOrgin;
  page=1;
  pageSize =20;
  isNewSearch = true;
  constructor(
              public storageService?: StorageService,
              public events?: Events,
              public alertCtrl?: AlertController,
              public app?: App,
              public toastCtrl?: ToastController,
              public loadingCtrl?: LoadingController,
              public httpService?: HttpService,
              public navCtrl?: NavController,
              public navParams?: NavParams,
              public viewCtrl?:ViewController) {
    this.data = this.navParams.get('data');
    if (this.navParams.get('checkBox')){
      this.checkBox = true;
      this.checkedData = "";
    }
    this.searchCon = this.navParams.get("content").searchCon;
    this.searchSelect = this.navParams.get("content").searchSelect;
    this.url = this.navParams.get("content").url;
    this.item = this.navParams.get("content").item;
    this.bodyOrgin = this.navParams.get("content").body;
    this.body = JSON.parse(JSON.stringify(this.bodyOrgin))
    this.filterData = JSON.parse(JSON.stringify(this.data));
  }
  ionViewDidEnter(){
    let div = $(".contentBox")[2];
    div.addEventListener('scroll',(e)=>{
      if((div.scrollHeight-div.scrollTop==div.clientHeight)&&this.isNewSearch){
        this.getMore();
      }
    })
  }
  back(){
    let modelData: string = '-1';
    this.viewCtrl.dismiss(modelData);
  }
  showFooter(){
    this.events.publish("showFooter");
  }
  hideFooter(){
    this.events.publish("hideFooter")
  }
  checkedItemRadio(index){
    if (this.checkBox){
      this.filterData[index]["checkedIcon"] = !this.filterData[index]["checkedIcon"];
      if (this.filterData[index]["checkedIcon"]){
        if (this.checkedData){
          this.checkedData += ","+this.filterData[index]["userName"]
        }else {
          this.checkedData += this.filterData[index]["userName"]
        }
      }
    }else {
      for (let i in this.filterData){
        this.filterData[i]["checkedIcon"] = false;
      }
      this.filterData[index]["checkedIcon"] = true;
      this.checkedData = this.filterData[index];
    }
  }
  displayContent(index){
    let content = document.getElementsByClassName("disContentAlertPage");
    if (content.length>0) {
      if ((<HTMLElement>content[index]).style.display == "block") {
        (<HTMLElement>content[index]).style.display = "none";
      } else {
        if (this.displayIndex >= 0) {
          (<HTMLElement>content[this.displayIndex]).style.display = "none";
        }
        (<HTMLElement>content[index]).style.display = "block";
        this.displayIndex = index;
      }
    }
  }
  goToPost(url,bodyJson){
    this.page = 1;
    this.httpService.postData2(this.httpService.getUrl2() + url, {dataobj:JSON.stringify(bodyJson),page:this.page,rows:this.pageSize},
      (data)=>{
        let rows = data.obj.rows;
        this.filterData = [];
        this.isNewSearch = false;
        let div = $(".contentBox")[2];
        if (rows[0]){
          div.scrollTop = 0;
          this.filterData = rows;
          this.isNewSearch = true;
        }
        console.log(data);
      },true)
  }
  getMore() {
    this.page++;
    this.httpService.postData2(this.httpService.getUrl2() + this.url, {dataobj:JSON.stringify(this.body),page:this.page,rows:this.pageSize}, data => {
      if (!data.obj.rows[0]) {
        this.isNewSearch = false;
        if (this.page > 1) {
          let toast = this.toastCtrl.create({
            message: "这已经是最后一页了",
            duration: 2000,
          });
          toast.present();
        }
        return false;

      } else {
        this.filterData = this.filterData.concat(data.obj.rows)
      }
    }, true)
  }
  changeSearchSelect(value){
    this.searchSelect = value;
  }
  searchFun(){
    if (this.searchValue==""){
      let alertCtrl = this.alertCtrl.create({
        title:"请输入搜索内容"
      });
      alertCtrl.present();
      return false;
    }
    let body = JSON.parse(JSON.stringify(this.bodyOrgin))
    if (this.searchSelect=="0"){
      body["sbmcSearch"]=this.searchValue
    }else {
      body["sbbmSearch"]=this.searchValue
    }
    this.body = JSON.parse(JSON.stringify(body));
    this.goToPost(this.url,this.body)
  }
  returnSelect(){
    if (!this.checkedData){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择主设备"
      });
      alertCtrl.present();
      return false
    }
    let modelData = {selectedData:this.checkedData};
    if (this.checkBox){
      modelData = {selectedData:{userName:this.checkedData}};
    }
    this.viewCtrl.dismiss(modelData);
  }
}
