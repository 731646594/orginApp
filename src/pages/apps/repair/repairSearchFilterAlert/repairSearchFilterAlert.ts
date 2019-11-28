import { Component } from '@angular/core';
import {
  AlertController, App, Events, LoadingController, NavController, NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import * as $ from 'jquery';
import {ConfigProvider} from "../../../../services/config";
@Component({
  selector: 'page-repairSearchFilterAlert',
  templateUrl: 'repairSearchFilterAlert.html'
})
export class RepairSearchFilterAlertPage{
  data;
  filterData=[];
  item;
  checkedData = null;
  searchValue = "";
  searchCon = [];
  searchSelect;
  displayIndex;
  isNewSearch = true;
  url = "";
  page = 1;
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
    this.searchCon = this.navParams.get("content").searchCon;
    this.searchSelect = this.navParams.get("content").searchSelect;
    if(this.searchSelect == "complexName"){
      this.isNewSearch = false;
    }
    this.url = this.navParams.get("content").url;
    this.item = this.navParams.get("content").item;
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
    for (let i in this.filterData){
      this.filterData[i]["checkedIcon"] = false;
    }
    this.filterData[index]["checkedIcon"] = true;
    this.checkedData = this.filterData[index];
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
  goToPost(){
    let body = {};
    body[this.searchSelect] = this.searchValue;
    this.httpService.postData2(this.httpService.getUrl2()+this.url,body,(data)=>{
      let temp = data.obj.rows;
      for (let i in temp){
        temp[i]["djztName"] = ConfigProvider.djztName(temp[i]["djzt"])
      }
      this.page = 1;
      let div = $(".contentBox")[2];
      this.filterData = [];
      if (temp[0]){
        div.scrollTop = 0;
        this.filterData = temp;
        this.isNewSearch = true;
      }
    },true);
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
    this.goToPost()
  }
  getMore() {
    this.page++;
    let body = {};
    body[this.searchSelect] = this.searchValue;
    body["page"] = this.page;
    body["rows"] = 20;
    this.httpService.postData2(this.httpService.getUrl2() + this.url, body, data => {
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
        let temp = data.obj.rows;
        for (let i in temp){
          temp[i]["djztName"] = ConfigProvider.djztName(temp[i]["djzt"])
        }
        this.filterData = this.filterData.concat(temp);
      }
    }, true)
  }
  returnSelect(){
    if (!this.checkedData){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择"
      });
      alertCtrl.present();
      return false
    }
    let modelData = {selectedData:this.checkedData};
    this.viewCtrl.dismiss(modelData);
  }
}
