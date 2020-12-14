import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ShowPicturePage} from "../../../commonStyle/showPicture/showPicture";
let that;
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
  i = 0;
  pageName = '周检';
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public navParams:NavParams,public app:App) {
    if(this.httpService.getUrl()=="http://swapp.0731ctny.com:/plamassets/mobile/") {
      this.pageName = '巡检';
    }
    that = this;
    this.departCode = this.storageService.read("loginDepartCode");
    this.itemName = null;
    this.photoArrary = [];
    let url;
    if (navParams.get("name")=="zjb"){
      this.itemName = "zjb";
      url = "devWeeklyCheckController/getCheckListCols.do";
    }else if (navParams.get("name")=="jjb"){
      this.itemName = "jjb";
      url = "devHandOverController/getCheckListCols.do";
    }
    this.item = navParams.get("data");
    for(let i in this.item){
      if (i.indexOf("col")!=-1){
        this.colItem.push(this.item[i])
      }
    }
    this.photoArrary = this.item["uploadFile"];
    let photoLen = this.photoArrary.length;
    if (this.itemName=="jjb") {
      this.signatureImage1 = this.photoArrary[photoLen - 2];
      this.signatureImage2 = this.photoArrary[photoLen - 1];
      photoLen = photoLen-2;
    }
    for(let i = 0;i<photoLen;i++){
      this.photoShowArrary.push(this.photoArrary[i])
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
    let node = document.getElementById("imgBox");
    if(node.children.length==0){
      for (let j in this.photoShowArrary){
        let base64Image = this.photoShowArrary[j];
        let div = document.createElement("div");
        div.className = "imgInclusion";
        div.innerHTML +=
          "<img id=\"i" + this.i + "\" name=\"i" + this.i + "\" class=\"imgShow\" src=\"" + base64Image + "\">"
        node.appendChild(div);
        document.getElementById("i" + this.i).onclick = function () {
          try {
            that.app.getRootNav().push(ShowPicturePage, {picture: base64Image})
          } catch (e) {
            alert(e)
          }
        };
        this.i++;
      }
    }
  }
  showSign(imgData){
    this.app.getRootNav().push(ShowPicturePage,{picture:imgData});
  }
}
