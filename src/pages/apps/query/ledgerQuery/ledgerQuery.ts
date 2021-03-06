import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ShowPicturePage} from "../../../commonStyle/showPicture/showPicture";
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
  isNewSearch = true;
  imgUrl = "";
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public app:App,public navParams:NavParams, public alertCtrl:AlertController, public toastCtrl:ToastController) {
    this.loadData();
  }
  loadData(){
    this.imgUrl = this.storageService.read('serverUrl')['agreement']+'://'+this.storageService.read('serverUrl')['address']+':'+this.storageService.read('serverUrl')['port']+'/';
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
    let url,body;
    this.page=1;
    url = "cellPhoneControllerOffline/queryLedgerList.do";
    if (!this.userPerson){
      this.userPerson = ""
    }
    body = {departCode:this.departCode,assetsType:this.assetsType,userPerson:this.userPerson,page:this.page,pageSize:this.pageSize};
    this.httpService.postData(this.httpService.getUrl()+url,body,data=>{
      if (data.success == "true"){
        if(data.data.length>0){
          this.detail = data.data;
          for (let i in this.detail){
            if (this.detail[i]["imguUrl"]){
              let len = this.detail[i]["imguUrl"].length-1;
              this.detail[i]["imguUrl"] = this.detail[i]["imguUrl"].substring(0,len);
              this.detail[i]["imgUrlArr"] = this.detail[i]["imguUrl"].split(";");
            }else {
              this.detail[i]["imgUrlArr"] = []
            }
          }
          this.detail["count"] = data.count;
          let alert = this.alertCtrl.create({
            title:"查询成功！"
          });
          alert.present();
          this.isNewSearch = true;
        }else {
          this.detail = [];
          this.detail["count"] = null;
          let alert = this.alertCtrl.create({
            title:"查询无数据！"
          });
          alert.present();
        }
      }else {
        alert(data.msg)
      }
    },true)
  }
  getMore(infiniteScroll){
    this.page++;
    let url,body;
    url = "cellPhoneControllerOffline/queryLedgerList.do";
    if (!this.userPerson){
      this.userPerson = ""
    }
    body = {departCode:this.departCode,assetsType:this.assetsType,userPerson:this.userPerson,page:this.page,pageSize:this.pageSize};
    this.httpService.postData(this.httpService.getUrl()+url,body,data=>{
      console.log(data)
      if (data.success == "true"){
        for (let i in data.data){
          if (data.data[i]["imguUrl"]){
            let len = data.data[i]["imguUrl"].length-1;
            data.data[i]["imguUrl"] = data.data[i]["imguUrl"].substring(0,len);
            data.data[i]["imgUrlArr"] = data.data[i]["imguUrl"].split(";");
          }else {
            data.data[i]["imgUrlArr"] = []
          }
          this.detail.push(data.data[i])
        }
      }else {
        alert(data.msg)
      }
      if (!data.data[0]){
        this.isNewSearch = false;
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
  getSelectValue(value) {
    this.departCode = value["selectedValue"];
    this.departName = value["selectedName"];
  }
  showImg(src){
    this.app.getRootNav().push(ShowPicturePage,{picture:src})
  }
}
