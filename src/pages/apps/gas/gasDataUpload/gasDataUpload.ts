import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
// import {GasDataUploadDetailPage} from "../gasDataUploadDetail/gasDataUploadDetail";
import {ShowPicturePage} from "../../../commonStyle/showPicture/showPicture";

@Component({
  selector: 'page-gasDataUpload',
  templateUrl: 'gasDataUpload.html'
})
export class GasDataUploadPage {
  userName;
  userCode;
  departName;
  departCode;
  zjb=[];
  zjbString = "";
  jjb=[];
  jjbString = "";
  item=[];
  colItem=[];
  itemName;
  checkedArray=[false,false];
  colsItemName=[];
  photoArrary=[];
  photoShowArrary=[];
  signatureImage1;
  signatureImage2;
  isHaveData = false;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public navParams:NavParams,public app:App) {
    this.userCode = this.storageService.read("loginUserCode");
    this.userName = this.storageService.read("loginUserName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.departName = this.storageService.read("loginDepartName");
    this.itemName = null;
    this.photoArrary = [];
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("zjb",this.userCode),[]).then(res =>{
      if (res.rows.length>0){
        this.zjbString = res.rows.item(0).stringData;
        this.zjb = JSON.parse(res.rows.item(0).stringData);
        this.isHaveData = true;
      }
    }).catch(e =>alert("erro21:"+JSON.stringify(e))  );
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("jjb",this.userCode),[]).then(res =>{
      if (res.rows.length>0){
        this.jjbString = res.rows.item(0).stringData;
        this.jjb = JSON.parse(res.rows.item(0).stringData);
        this.isHaveData = true;
      }
    }).catch(e =>alert("erro22:"+JSON.stringify(e))  )
  }

  ionViewDidEnter(){

  }
  checkedItem(index){
    if (this.checkedArray[index]==false){
      document.getElementsByClassName("uploadIcon")[index].setAttribute("style","color: #4389e8;");
      this.checkedArray[index]=true;
    }else {
      document.getElementsByClassName("uploadIcon")[index].setAttribute("style","color: #dedede;");
      this.checkedArray[index]=false;
    }
  }
  detailPage(data,name){
    if(data.length!=0){
      // this.app.getRootNav().push(GasDataUploadDetailPage,{data:data,name:name})
      this.colItem = [];
      this.itemName = null;
      this.photoArrary = [];
      this.colsItemName = [];
      let url;
      let content;
      if (name=="zjb"){
        content = document.getElementsByClassName("disContent")[0];
        this.itemName = "zjb";
        url = "devWeeklyCheckController/getCheckListCols.do";
      }else if (name=="jjb"){
        content = document.getElementsByClassName("disContent")[1];
        this.itemName = "jjb";
        url = "devHandOverController/getCheckListCols.do";
      }
      if ((<HTMLElement>content).style.display=="block"){
        (<HTMLElement>content).style.display="none";
      }else {
        (<HTMLElement>content).style.display="block";
        this.item = data;
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
          this.photoShowArrary[i] = this.photoArrary[i]
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
    }
  }
  uploadGasInfo(){
    if(!this.isHaveData){
      let alertCtrl = this.alertCtrl.create({
        title:"没有可上传的数据！"
      });
      alertCtrl.present();
      return false;
    }
    if(!this.checkedArray[0]&&!this.checkedArray[0]){
      let alertCtrl = this.alertCtrl.create({
        title:"未选择要上传的数据！"
      });
      alertCtrl.present();
      return false;
    }
    if (this.checkedArray[0]){
      this.uploading("devWeeklyCheckController/saveCheckForm.do",this.zjb,"zjb")
    }
    if (this.checkedArray[1]){
      this.uploading("devHandOverController/saveCheckForm.do",this.jjb,"jjb")
    }
  }
  uploading(url,data,name){
    let json = "";
    if(name=="zjb"){
      json = this.zjbString
    }else {
      json = this.jjbString
    }
    this.httpService.postData(this.httpService.getUrl()+url,{userCode:this.userCode,userName:this.userName,userDepart:this.departCode,userDepartName:this.departName,data:json,uploadFile:data["uploadFile"]},data=>{
      if (data.success=="true"){
        if(name=="zjb"){
          this.zjb=[];
          this.storageService.deleteUserTable("zjb",this.userCode);
        }else {
          this.jjb=[];
          this.storageService.deleteUserTable("jjb",this.userCode);
        }
        this.httpService.postData(this.httpService.getUrl()+"devWeeklyCheckController/getCheckListCols.do",{departCode:this.departCode},data=>{
          if (data.success=="true"){
            this.storageService.sqliteInsert("weeklyData",this.userCode,JSON.stringify(data.data));
            this.httpService.postData(this.httpService.getUrl()+"devHandOverController/getCheckListCols.do",{departCode:this.departCode},data2=>{
              if (data2.success=="true"){
                this.storageService.sqliteInsert("handoverData",this.userCode,JSON.stringify(data2.data));
              }else {
                alert(data2.msg);
              }
            },false);
          }else {
            alert(data.msg);
          }
        },false);
        let alertCtrl = this.alertCtrl.create({
          title:"上传成功！"
        });
        alertCtrl.present();
      }else{
        alert(data.msg)
      }
    },true)
  }
  showSign(imgData){
    this.app.getRootNav().push(ShowPicturePage,{picture:imgData});
  }
}
