import { Component } from '@angular/core';
import { App, NavController} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {InventoryEnquiryDetailPage} from "../inventoryEnquiryDetail/inventoryEnquiryDetail";

@Component({
  selector: 'page-inventoryEnquiry',
  templateUrl: 'inventoryEnquiry.html'
})
export class InventoryEnquiryPage {
  agreement;
  address;
  port;
  serviceName;
  plan=JSON;
  departments;
  departCode;
  planStatus="";
  existPlanDetail=[];
  willPlanDetail=[];
  newPlanDetail=[];
  planDetailList;
  existNum=0;
  willNum=0;
  newNum=0;
  userCode;
  constructor(public navCtrl: NavController,public storageService:StorageService,public app:App) {
    this.loadData();
  }
  ionViewDidEnter(){

  }
  loadData(){
    this.userCode = this.storageService.read("loginUserCode");
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
    if (this.planStatus=="exist"){
      this.planDetailList = this.existPlanDetail;
    }else if (this.planStatus=="will"){
      this.planDetailList = this.willPlanDetail;
    }else {
      this.planDetailList = this.newPlanDetail;
    }
  }
  selectDepart(){
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.existPlanDetail = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("willPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.willPlanDetail = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_3:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.newPlanDetail = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_4:"+JSON.stringify(e)));
    let item = [];
    for (let x in this.existPlanDetail){
      if (this.departCode == this.existPlanDetail[x]["managerDepart"]){
        item.push(this.existPlanDetail[x])
      }
    }
    this.existPlanDetail = item;
    item = [];
    for (let i in this.willPlanDetail){
      if (this.departCode == this.willPlanDetail[i]["managerDepart"]){
        item.push(this.willPlanDetail[i])
      }
    }
    this.willPlanDetail = item;
    item = [];
    for (let j in this.newPlanDetail){
      if (this.departCode == this.newPlanDetail[j]["managerDepart"]){
        item.push(this.newPlanDetail[j])
      }
    }
    this.newPlanDetail = item;
    console.log("exist："+this.existPlanDetail+"will:"+this.willPlanDetail+"new:"+this.newPlanDetail)
    if(this.existPlanDetail)
      this.existNum = this.existPlanDetail.length;
    if(this.willPlanDetail)
      this.willNum = this.willPlanDetail.length;
    if(this.newPlanDetail)
      this.newNum = this.newPlanDetail.length;
    this.plan["number"] = this.existNum+this.willNum+this.newNum;
    this.readData();
  }
  planListLocalDetailPage(planDetail,pageIndex){
    this.app.getRootNav().push(InventoryEnquiryDetailPage,{planDetail:planDetail})
  }

}
