import {Component} from '@angular/core';
import {
  ActionSheetController, AlertController, App, Events, ModalController, NavController,
  NavParams
} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";
import {DatePipe} from "@angular/common";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
let that;
@Component({
  selector: 'page-repairAcceptanceApprovalEvaluate',
  templateUrl: 'repairAcceptanceApprovalEvaluate.html'
})
export class RepairAcceptanceApprovalEvaluatePage {
  isFocus = false;
  pageData;
  insertCspjData = [];
  insertCspjModal = {};
  lightStar = [];

  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService, public datePipe?: DatePipe, public actionSheetCtrl?: ActionSheetController,
              public camera?: Camera, public file?: File, public modalCtrl?: ModalController) {
    this.insertCspjData = JSON.parse(JSON.stringify(this.navParams.get("data")));
    this.insertCspjModal = this.navParams.get("modal");
    for (let i in this.insertCspjData){
      if (this.insertCspjData[i]["zfyl8"]==1){
        this.lightStar[i] = ["star","star-outline","star-outline","star-outline","star-outline"];
      }
      if (this.insertCspjData[i]["zfyl8"]==2){
        this.lightStar[i] = ["star","star","star-outline","star-outline","star-outline"];
      }
      if (this.insertCspjData[i]["zfyl8"]==3){
        this.lightStar[i] = ["star","star","star","star-outline","star-outline"];
      }
      if (this.insertCspjData[i]["zfyl8"]==4){
        this.lightStar[i] = ["star","star","star","star","star-outline"];
      }
      if (this.insertCspjData[i]["zfyl8"]==5){
        this.lightStar[i] = ["star","star","star","star","star"];
      }
      if(!this.insertCspjData[i]["bz"]){
        this.insertCspjData[i]["bz"] = "";
      }
      if (this.insertCspjData[i]["zfyl9"]=='1'){
        this.insertCspjData[i]["zfyl9Name"] = '是';
      }
      if (this.insertCspjData[i]["zfyl9"]=='0'){
        this.insertCspjData[i]["zfyl9Name"] = '否';
      }
      if (this.insertCspjData[i]["zfyl10"]=='1'){
        this.insertCspjData[i]["zfyl10Name"] = '有';
      }
      if (this.insertCspjData[i]["zfyl10"]=='0'){
        this.insertCspjData[i]["zfyl10Name"] = '无';
      }
    }
    if (this.insertCspjData.length == 0){
      this.addForm();
    }
    this.pageData = {
      pageItem:[
        [
          {itemName:"维修时限评分", itemType:"label",itemValue:"szyl1",nec:0},
          {itemName:"作业风险", itemType:"label", itemValue:"zfyl10Name",nec:0,},
          {itemName:"首次修复", itemType:"label", itemValue:"zfyl9Name",nec:0,},
          {itemName:"整体服务", itemType:"star",itemValue:"zfyl8",nec:0},
          {itemName:"备注", itemType:"textarea",itemValue:"bz",nec:0},
        ],
      ],
    }
  }
  lightingStar(index,pindex){
    if (this.lightStar[pindex][index] == "star-outline"){
      for (let i = 0; i<index;i++){
        this.lightStar[pindex][i] = "star"
      }
      this.lightStar[pindex][index] = "star";
    }else {
      for (let i = this.lightStar[pindex].length-1; i>index;i--){
        this.lightStar[pindex][i] = "star-outline"
      }
    }
    this.insertCspjData[pindex]["zfyl8"] = index+1
  }
  getInputValue(value,index,key){
    this.showFooter();
    this.insertCspjData[index][key] = value*1;
  }
  getSelectValue(value,index,key){
    this.insertCspjData[index][key] = value["selectedValue"];
  }
  hideFooter() {
    this.isFocus = true;
  }
  showFooter() {
    this.isFocus = false;
  }
  deleteForm(index){
    if (index==0){
      let alertCtrl = this.alertCtrl.create({
        title:"不可删除，至少要有一个评价"
      });
      alertCtrl.present();
      return false;
    }
    this.lightStar.splice(index,1);
    this.insertCspjData.splice(index,1);
  }
  addForm(){
    this.lightStar.push(["star-outline","star-outline","star-outline","star-outline","star-outline"]);
    let modal = JSON.parse(JSON.stringify(this.insertCspjModal))
    this.insertCspjData.push(modal);
  }
}
