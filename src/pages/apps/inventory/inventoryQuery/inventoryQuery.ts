import { Component } from '@angular/core';
import {App, NavController, ToastController} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
@Component({
  selector: 'page-inventoryQuery',
  templateUrl: 'inventoryQuery.html'
})
export class InventoryQueryPage {
  agreement;
  address;
  port;
  serviceName;
  plan=JSON;
  departments;
  departCode;
  planStatus="";
  existPlan=[];
  willPlan=[];
  newPlan=[];
  existPlanDetail=[];
  willPlanDetail=[];
  newPlanDetail=[];
  planDetailList=[];
  existNum=0;
  willNum=0;
  newNum=0;
  userCode;
  displayIndex;
  page=1;
  constructor(public navCtrl: NavController,public storageService:StorageService,public app:App,public toastCtrl:ToastController) {
    this.loadData();
  }
  ionViewDidEnter(){

  }
  loadData(){
    this.userCode = this.storageService.read("loginUserCode");
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.existPlan = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("willPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.willPlan = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_3:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.newPlan = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_4:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.plan = JSON.parse(res.rows.item(0).stringData);
        this.departments = this.plan["departments"];
        this.departCode = this.departments[0]["departCode"];
        this.planStatus = "will";
        this.selectDepart();
      }
      this.plan["username"]=this.storageService.read("loginUserName");
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
  }
  readData(){
    this.planDetailList = [];
    let item = [];
    if (this.planStatus=="exist"){
      item = this.existPlanDetail
    }else if (this.planStatus=="will"){
      item = this.willPlanDetail;
    }else {
      item = this.newPlanDetail;
    }
    for (let i = 0;i<10;i++){
      if(item[i]){
        this.planDetailList.push(item[i]);
      }
      else {
        this.page=-1
      }
    }
  }
  getMore(infiniteScroll){
    let item = [];
    if (this.planStatus=="exist"){
      item = this.existPlanDetail
    }else if (this.planStatus=="will"){
      item = this.willPlanDetail;
    }else {
      item = this.newPlanDetail;
    }
    if (this.page==-1){
      infiniteScroll.enable(false);
      let toast = this.toastCtrl.create({
        message: "这已经是最后一页了",
        duration: 2000,
      });
      toast.present();
    }else {
      let i = this.page*10;
      for (i;i<(this.page*10+10);i++){
        if(item[i]){
          this.planDetailList.push(item[i]);
        }
        else {
          this.page=-1
        }
      }
      if (this.page!=-1){
        this.page++;
      }
    }
    infiniteScroll.complete();

  }
  selectDepart(){
    this.existPlanDetail=[];
    this.willPlanDetail=[];
    this.newPlanDetail=[];
    for (let x in this.existPlan){
      if (this.departCode == this.existPlan[x]["managerDepart"]){
        this.existPlanDetail.push(this.existPlan[x])
      }
    }
    for (let i in this.willPlan){
      if (this.departCode == this.willPlan[i]["managerDepart"]){
        this.willPlanDetail.push(this.willPlan[i])
      }
    }
    for (let j in this.newPlan){
      if (this.departCode == this.newPlan[j]["managerDepart"]){
        this.newPlanDetail.push(this.newPlan[j])
      }
    }
    if(this.existPlanDetail)
      this.existNum = this.existPlanDetail.length;
    if(this.willPlanDetail)
      this.willNum = this.willPlanDetail.length;
    if(this.newPlanDetail)
      this.newNum = this.newPlanDetail.length;
    this.plan["number"] = this.existNum+this.willNum+this.newNum;
    this.readData();
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
