import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ShowPicturePage} from "../../../commonStyle/showPicture/showPicture";

@Component({
  selector: 'page-gasDataUploadDetail',
  templateUrl: 'gasDataUploadDetail.html'
})
export class GasDataUploadDetailPage {
  departCode;
  zjb=[];
  jjb=[];
  item=[];
  colItem=[];
  itemName;
  checkedArray=[false,false];
  colsItemName=[];
  photoArrary=[];
  photoShowArrary=[];
  signatureImage1;
  signatureImage2;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public navParams:NavParams,public app:App) {
    this.departCode = this.storageService.read("loginDepartCode");
    this.itemName = null;
    this.photoArrary = [];
    let url;
    if (navParams.get("name")=="zjb"){
      this.itemName = "zjb";
      url = "devWeeklyCheckController.do?getCheckListCols";
    }else if (navParams.get("name")=="jjb"){
      this.itemName = "jjb";
      url = "devHandOverController.do?getCheckListCols";
    }
    this.item = navParams.get("data");
    for(let i in this.item){
      if (i.indexOf("col")!=-1){
        this.colItem.push(this.item[i])
      }
    }
    if (this.itemName=="jjb") {
      this.photoArrary = this.item["uploadFile"];
      let photoLen = this.photoArrary.length;
      this.signatureImage1 = this.photoArrary[photoLen - 2];
      this.signatureImage2 = this.photoArrary[photoLen - 1];
      for(let i = 0;i<photoLen-2;i++){
        this.photoShowArrary[i] = this.photoArrary[i]
      }
    }
    this.httpService.postData(this.httpService.getUrl()+url,{departCode:this.departCode},data=>{
      if (data.success=="true"){
        let colsData = data.data.colsData;
        for (let i in colsData){
          for (let j in colsData[i]["fields"]){
            this.colsItemName.push(colsData[i]["fields"][j].columnTitle)
          }
        }
      }else {
        alert(data.msg);
      }
    },true);
  }
  ionViewDidEnter(){

  }
  showSign(imgData){
    this.app.getRootNav().push(ShowPicturePage,{base64:imgData});
  }
}
