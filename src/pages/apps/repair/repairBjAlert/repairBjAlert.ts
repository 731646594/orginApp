import { Component } from '@angular/core';
import {
  AlertController, App, Events, LoadingController, NavController, NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ConfigProvider} from "../../../../services/config";
@Component({
  selector: 'page-repairBjAlert',
  templateUrl: 'repairBjAlert.html'
})
export class RepairBjAlertPage{
  data;
  filterData;
  item;
  checkedData = null;
  searchValue = "";
  searchCon = [];
  searchSelect;
  displayIndex;
  isNewSearch = true;
  upperButton = false;
  lowerButton = true;
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
    if (this.navParams.get("data").length>0){
      this.data = this.navParams.get("data");
      this.filterData = JSON.parse(JSON.stringify(this.data));
    }else {
      this.httpService.postData2(this.httpService.getUrl2() + "lhd/common/sparepartCatalogController.do?datagrid", {bjcj:1}, (data)=> {
        this.data = data.obj;
        this.filterData = JSON.parse(JSON.stringify(this.data));
      },true);
    }
    this.searchCon = this.navParams.get("content").searchCon;
    this.searchSelect = this.navParams.get("content").searchSelect;
    this.item = this.navParams.get("content").item;
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
    this.upperButton = true;
    this.lowerButton = true;
    if (this.checkedData.bjcj==1){
      this.upperButton = false;
    }
    if (this.checkedData.sfmx==1){
      this.lowerButton = false;
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
  goToPost(){
    let body = {};
    if (this.searchSelect=="bjmc"){
      body={bjmc:this.searchValue+"%"}
    }else if (this.searchSelect=="bjbm"){
      body={bjbm:"%"+this.searchValue+"%"}
    }
    this.httpService.postData2(this.httpService.getUrl2() + "lhd/common/sparepartCatalogController.do?datagrid", body, (data)=> {
      this.data = data.obj;
      this.filterData = JSON.parse(JSON.stringify(this.data));
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
  goTosj(){
    let url = "lhd/common/sparepartCatalogController.do?findCodeUp";
    let bodyJson = {dataobj:JSON.stringify(this.checkedData)};
    this.httpService.postData2(this.httpService.getUrl2() + url, bodyJson, (data)=> {
      this.data = data.obj;
      this.filterData = JSON.parse(JSON.stringify(this.data));
    },true);
  }
  goToxj(){
    // this.checkedData
    let url = "lhd/common/sparepartCatalogController.do?findCodeDown";
    let bodyJson = {dataobj:JSON.stringify(this.checkedData)};
    this.httpService.postData2(this.httpService.getUrl2() + url, bodyJson, (data)=> {
      this.data = data.obj;
      this.filterData = JSON.parse(JSON.stringify(this.data));
    },true);
  }
  returnSelect(){
    if (!this.checkedData){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择备件"
      });
      alertCtrl.present();
      return false
    }
    let modelData = {selectedData:this.checkedData};
    this.viewCtrl.dismiss(modelData);
  }
}
