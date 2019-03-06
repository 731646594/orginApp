import { Component } from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";

@Component({
  selector: 'page-insertForm',
  templateUrl: 'insertForm.html'
})
export class InsertFormPage {
  userName;
  userCode;
  departName;
  departCode;

  pageName;
  contentData;
  footerContentData;
  inputData;
  selectData;
  selectShowData=[];
  selectedData;

  isShow;
  isOnfocus;
  constructor(public app:App,public navCtrl: NavController,public storageService:StorageService, public httpService:HttpService,
              public navParams:NavParams) {

  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.pageName = this.navParams.data.pageName;
    this.inputData = this.navParams.data.pageData.tsData.inputData;
    this.selectData = this.navParams.data.pageData.tsData.selectData;
    for (let i in this.selectData){
      this.selectShowData.push(this.selectData[i]);
    }
    this.selectedData = this.navParams.data.pageData.tsData.selectedData;
    this.isShow = this.navParams.data.pageData.htmlData.footerData.isShow;
    this.contentData = this.navParams.data.pageData.htmlData.contentData;
    this.footerContentData = this.navParams.data.pageData.htmlData.footerData.footerContentData;
  }
  inputOnfocus(){
    this.isOnfocus=true;
  }
  inputOnblur(){
    this.isOnfocus=false;
  }
  filterOptionName(ev: any,index) {
    const val = ev.value;
    let item = [];
    if (val && val.trim() != '') {
      for (let i in this.selectData[index]){
        if(this.selectData[index][i][1].indexOf(val)>=0){
          item.push(this.selectData[index][i])
        }
      }
    }
    else {
      item = this.selectData[index];
    }
    this.selectShowData[index] = item;
  }
  showOptionName(name,index){
    this.inputData[index] = name;
  }

}
