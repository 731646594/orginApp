import { Component } from '@angular/core';
import {App, NavController, ToastController} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {File} from "@ionic-native/file";
import {HttpService} from "../../../../services/httpService";
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
  departments=[];
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
  pageData={};
  loginDepartCode;
  pageName = '盘点查询';
  existName = '存在';
  constructor(public navCtrl: NavController,public storageService:StorageService,
              public app:App,public toastCtrl:ToastController,public file:File,
              public httpService:HttpService) {
    this.loadData();
    if (this.httpService.getUrl() == 'http://swapp.0731ctny.com:/plamassets/mobile/'){
      this.pageName = '盘点进度';
      this.existName = '已盘';
    }
  }
  ionViewDidEnter(){
  }
  loadData(){
    this.pageData["pageItem"]=[];
    this.userCode = this.storageService.read("loginUserCode");
    this.loginDepartCode = this.storageService.read("loginDepartCode");
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
        let isInclude = true;
        for (let i in this.loginDepartCode){
          if (this.loginDepartCode[i] != this.departments[0]["departCode"][i]){
            isInclude = false;
          }
        }
        if (isInclude){
          if (this.departments.length>0){
            this.departCode = this.departments[0]["departCode"];
          }
          this.planStatus = "will";
          this.selectDepart(this.departCode);
        }else {
          this.departments = [];
        }
      }
      this.plan["username"]=this.storageService.read("loginUserName");
      this.pageData={
        pageItem:[
          {itemName:"盘点计划编码", itemType:"label",itemValue:"planNumber"},
          {itemName:"盘点计划名称", itemType:"label",itemValue:"planName"},
          {itemName:"计划下达日期", itemType:"label",itemValue:"startDate"},
          {itemName:"计划结束日期", itemType:"label",itemValue:"stopDate"},
          {itemName:"操作人", itemType:"label",itemValue:"username"},
          //departCode
          {itemName:"盘点单位", itemType:"select",itemValue:this.departCode,optionValueString:"departCode",optionNameString:"departName",
            option:this.departments,
          },
          {itemName:"资产总数", itemType:"label",itemValue:"number"},
        ],
        cardItem:{
          cardParent:[
            {itemName:"资产名称", itemType:"label",itemValue:"assetsName"},
            {itemName:"资产编码", itemType:"label",itemValue:"assetsCode"},
            {itemName:"规格型号", itemType:"label",itemValue:"assetsStandard"},
          ],
          cardChild:[
            {itemName:"资产编码", itemType:"label",itemValue:"assetsCode"},
            {itemName:"资产名称", itemType:"label",itemValue:"assetsName"},
            {itemName:"所属单位", itemType:"label",itemValue:"departName"},
            {itemName:"资产条码", itemType:"label",itemValue:"barCode"},
            {itemName:"规格型号", itemType:"label",itemValue:"assetsStandard"},
            {itemName:"车牌井号", itemType:"label",itemValue:"licenceNumber"},
            {itemName:"保管人", itemType:"label",itemValue:"userPerson"},
            {itemName:"存放地点", itemType:"label",itemValue:"storePlace"},
            // {itemName:"出厂编号", itemType:"label",itemValue:"productId"},
            // {itemName:"资产状态编码", itemType:"label",itemValue:"assetsStatus"},
            {itemName:"资产状态名称", itemType:"label",itemValue:"assetsStatusName"},
            // {itemName:"使用状态编码", itemType:"label",itemValue:"usedState"},
            {itemName:"使用状态名称", itemType:"label",itemValue:"usedStateName"},
            {itemName:"技术状况", itemType:"label",itemValue:"technicalConditionName"},
            // {itemName:"制造厂家", itemType:"label",itemValue:"makeFactory"},
            {itemName:"备注", itemType:"label",itemValue:"remark"},
            // {itemName:"原值", itemType:"label",itemValue:"originalValue"},
            // {itemName:"净值", itemType:"label",itemValue:"nowValue"},
            // {itemName:"所属单位编码", itemType:"label",itemValue:"managerDepart"},
            // {itemName:"所属单位名称", itemType:"label",itemValue:"managerDepartName"},
          ]
        }
      }
    });
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
        for (let j in item[i].uploadFile) {
          let imageData = item[i].uploadFile[j];
          this.resolveUri(imageData).then(url => {
            url.file((file) => {
              let reader = new FileReader();
              reader.onloadend = (e) => {
                let base64Image = e.target['result'];
                item[i].uploadFile[j] = base64Image;
              };
              reader.readAsDataURL(file);
            }, err => {
              alert("1："+JSON.stringify(err))
            });
          }, err => {

          })
        }
        this.planDetailList.push(item[i]);
        this.page=1;
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
      // let toast = this.toastCtrl.create({
      //   message: "这已经是最后一页了",
      //   duration: 2000,
      // });
      // toast.present();
    }else {
      let i = this.page*10;
      for (i;i<(this.page*10+10);i++){
        if(item[i]){
          for (let j in item[i].uploadFile) {
            let imageData = item[i].uploadFile[j];
            this.resolveUri(imageData).then(url => {
              url.file((file) => {
                let reader = new FileReader();
                reader.onloadend = (e) => {
                  let base64Image = e.target['result'];
                  item[i].uploadFile[j] = base64Image;
                };
                reader.readAsDataURL(file);
              }, err => {
                alert("3："+JSON.stringify(err))
              });
            }, err => {
              alert("4："+JSON.stringify(err))
            })
          }
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
  //转换url
  resolveUri(uri:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.file.resolveLocalFilesystemUrl(uri).then(filePath =>{
        resolve(filePath);
      }).catch(err =>{
        reject(err);
      });
    })
  }
  selectDepart(value){
    if(value["selectedValue"]||value["selectedValue"]=="0")
      this.departCode = value["selectedValue"];
    else
      this.departCode = value;
    this.existPlanDetail=[];
    this.willPlanDetail=[];
    this.newPlanDetail=[];
    for (let x in this.existPlan){
      if (this.departCode == this.existPlan[x]["departCode"]){
        this.existPlanDetail.push(this.existPlan[x])
      }
    }
    for (let i in this.willPlan){
      if (this.departCode == this.willPlan[i]["departCode"]){
        this.willPlanDetail.push(this.willPlan[i])
      }
    }
    for (let j in this.newPlan){
      if (this.departCode == this.newPlan[j]["departCode"]){
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
