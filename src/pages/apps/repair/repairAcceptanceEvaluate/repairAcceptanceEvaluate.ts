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
  selector: 'page-repairAcceptanceEvaluate',
  templateUrl: 'repairAcceptanceEvaluate.html'
})
export class RepairAcceptanceEvaluatePage {
  isFocus = false;
  pageData;
  insertCspjData = [];
  insertCspjModal = {};
  insertCspjIndex= 0;
  checkedData;
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
    }
    this.pageData = {
      pageItem:[
        [
          {itemName:"维修时限评分", itemType:"input",itemValue:"szyl1",nec:1},
          {itemName:"作业风险", itemType:"select", itemValue:"zfyl10",nec:1,itemValueName:"zfyl10",optionValueString:"optionValue",optionNameString:"optionName",
            option:[
              {optionName:"有",optionValue:"1"},
              {optionName:"无",optionValue:"0"},
            ],
          },
          {itemName:"首次修复", itemType:"select", itemValue:"zfyl9",nec:1,itemValueName:"zfyl9",optionValueString:"optionValue",optionNameString:"optionName",
            option:[
              {optionName:"是",optionValue:"1"},
              {optionName:"否",optionValue:"0"},
            ],
          },
          {itemName:"整体服务", itemType:"star",itemValue:"zfyl8",nec:1},
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
  saveForm(){
    for (let i=0;i<this.insertCspjData.length;i++){
      let j = this.pageData.pageItem[0].filter((item) => {
        return (item.nec==1&&!this.insertCspjData[i][item.itemValue]&&this.insertCspjData[i][item.itemValue]!="0");
      });
      if (j.length>0){
        let alertCtrl = this.alertCtrl.create({
          title:"请填写第"+(i+1)+"个评价的"+j[0].itemName
        });
        alertCtrl.present();
        return false;
      }
    }
    this.events.publish("saveInsertCspjData",this.insertCspjData)
    this.app.getRootNav().pop()
  }
}
