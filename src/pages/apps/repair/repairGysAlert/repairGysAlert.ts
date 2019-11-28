import { Component } from '@angular/core';
import {
  AlertController, App, Events, LoadingController, NavController, NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ConfigProvider} from "../../../../services/config";
import * as $ from "jquery";
@Component({
  selector: 'page-repairGysAlert',
  templateUrl: 'repairGysAlert.html'
})
export class RepairGysAlertPage{
  data=[];
  filterData=[];
  item;
  checkedData = null;
  searchValue = "";
  searchCon = [];
  searchSelect;
  displayIndex;
  isNewSearch = true;
  url;
  body;
  page = 1;
  pageSize = 20;
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
    this.url = "lhd/app/devRepairController.do?gysList";
    this.body = "(gyszt = '0' and instr(wxdwbm,"+this.storageService.read("loginDepartCode")+") > 0)";
    this.data = this.navParams.get("data");
    this.filterData = JSON.parse(JSON.stringify(this.data));
    this.searchCon = this.navParams.get("content").searchCon;
    this.searchSelect = this.navParams.get("content").searchSelect;
    this.item = this.navParams.get("content").item;
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
  getMore() {
    this.page++;
    this.httpService.postData2(this.httpService.getUrl2() + this.url, {dataobj:this.body,page:this.page,rows:this.pageSize}, data => {
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
    this.page = 1;
    this.body = "gyszt = '0' and instr(wxdwbm,"+this.storageService.read("loginDepartCode")+") > 0 and "+this.searchSelect+" like '%"+this.searchValue+"%'";
    this.httpService.postData2(this.httpService.getUrl2() + "lhd/app/devRepairController.do?gysList", {dataobj:"gyszt = '0' and instr(wxdwbm,"+this.storageService.read("loginDepartCode")+") > 0 and "+this.searchSelect+" like '%"+this.searchValue+"%'"}, (data)=> {
      let rows = data.obj.rows;
      this.filterData = [];
      this.isNewSearch = false;
      let div = $(".contentBox")[2];
      if (rows[0]){
        div.scrollTop = 0;
        this.filterData = rows;
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
  returnSelect(){
    if (!this.checkedData){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择供应商"
      });
      alertCtrl.present();
      return false
    }
    let modelData = {selectedData:this.checkedData};
    this.viewCtrl.dismiss(modelData);
  }
}
