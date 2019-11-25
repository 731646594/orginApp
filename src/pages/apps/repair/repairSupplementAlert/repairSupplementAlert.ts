import { Component } from '@angular/core';
import {
  AlertController, App, Events, LoadingController, NavController, NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import * as $ from 'jquery';
@Component({
  selector: 'page-repairSupplementAlert',
  templateUrl: 'repairSupplementAlert.html'
})
export class RepairSupplementAlertPage{
  data;
  filterData;
  item;
  checkedData = null;
  searchValue = "";
  searchCon = [];
  searchSelect;
  displayIndex;
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
    this.searchCon = this.navParams.get("content").searchCon;
    this.searchSelect = this.navParams.get("content").searchSelect;
    this.item = this.navParams.get("content").item;
    this.filterData = JSON.parse(JSON.stringify(this.data));
  }
  ionViewDidEnter(){

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
    let temp = [];
    for (let i in this.data){
      if (this.searchSelect==0&&(this.data[i].ysnd.indexOf(this.searchValue)>-1)){
        temp.push(this.data[i])
      }else if (this.searchSelect==1&&(this.data[i].ysdwmc.indexOf(this.searchValue)>-1)){
        temp.push(this.data[i])
      }
    }
    this.filterData = temp;
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
  returnSelect(){
    if (!this.checkedData){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择维修预算"
      });
      alertCtrl.present();
      return false
    }
    let modelData = {selectedData:this.checkedData};
    this.viewCtrl.dismiss(modelData);
  }
}
