import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
// import {GasDataUploadDetailPage} from "../gasDataUploadDetail/gasDataUploadDetail";
import {ShowPicturePage} from "../../../commonStyle/showPicture/showPicture";
import {GasDataUploadDetailPage} from "../gasDataUploadDetail/gasDataUploadDetail";

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
  jjb=[];
  item=[];
  colItem=[];
  itemName;
  checkedArray=[false,false];
  colsItemName=[];
  colsItemNameW=[];
  colsItemNameH=[];
  colsDataW;
  colsDataH;
  detailDataW;
  detailDataH;
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
        this.zjb = JSON.parse(res.rows.item(0).stringData);
        this.isHaveData = true;
      }
    }).catch(e =>alert("erro21:"+JSON.stringify(e))  );
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("jjb",this.userCode),[]).then(res =>{
      if (res.rows.length>0){
        this.jjb = JSON.parse(res.rows.item(0).stringData);
        this.isHaveData = true;
      }
    }).catch(e =>alert("erro22:"+JSON.stringify(e))  );
    this.httpService.postData(this.httpService.getUrl()+"devWeeklyCheckController/getCheckListCols.do",{departCode:this.departCode},data=>{
      let colsData = data.data.colsData;
      this.detailDataW = data.data.detailData;
      this.colsDataW = colsData;
      for (let i in colsData){
        for (let j in colsData[i]["fields"]){
          this.colsItemNameW.push(colsData[i]["fields"][j].columnTitle)
        }
      }
      this.httpService.postData(this.httpService.getUrl()+"devHandOverController/getCheckListCols.do",{departCode:this.departCode},data2=>{
          let colsData = data2.data.colsData;
          this.detailDataH = data.data.detailData;
          this.colsDataH = colsData;
          for (let i in colsData){
            for (let j in colsData[i]["fields"]){
              this.colsItemNameH.push(colsData[i]["fields"][j].columnTitle)
            }
          }
      },true);
    },false);
  }

  ionViewDidEnter(){

  }
  checkedItem(index){
    if (!this.checkedArray[index]){
      if(this.zjb.length == 0){
        document.getElementsByClassName("uploadIcon")[0].setAttribute("style","color: #4389e8;");
      }else {
        document.getElementsByClassName("uploadIcon")[index].setAttribute("style","color: #4389e8;");
      }
      this.checkedArray[index]=true;
    }else {
      if(this.zjb.length == 0){
        document.getElementsByClassName("uploadIcon")[0].setAttribute("style","color: #dedede;");
      }else {
        document.getElementsByClassName("uploadIcon")[index].setAttribute("style","color: #dedede;");
      }
      this.checkedArray[index]=false;
    }
  }
  detailPage(data,name){
    this.app.getRootNav().push(GasDataUploadDetailPage,{name:name,data:data})
  }
  uploadGasInfo(){
    if(!this.isHaveData){
      let alertCtrl = this.alertCtrl.create({
        title:"没有可上传的数据！"
      });
      alertCtrl.present();
      return false;
    }
    if(!this.checkedArray[0]&&!this.checkedArray[1]){
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
    let json = JSON.parse(JSON.stringify(data));
    delete json.uploadFile;
    for (let x in json) {
      if (name=="zjb"){
        for (let i in this.colsDataW){
          for (let j in this.colsDataW[i]["fields"]){
            if(this.colsDataW[i]["fields"][j].columnName==x&&this.detailDataW[this.colsDataW[i]["fields"][j].columnName]){
              json[x] = this.detailDataW[x]+","+json[x]
            }
          }
        }
      }else if (name=="jjb"){
        for (let i in this.colsDataH){
          for (let j in this.colsDataH[i]["fields"]){
            if(this.colsDataH[i]["fields"][j].columnName==x&&this.detailDataH[this.colsDataH[i]["fields"][j].columnName]){
              json[x] = this.detailDataH[x]+","+json[x]
            }
          }
        }
      }
    }
    this.httpService.postData(this.httpService.getUrl()+url,{userCode:this.userCode,userName:this.userName,userDepart:this.departCode,userDepartName:this.departName,data:JSON.stringify(json),uploadFile:data["uploadFile"]},data=>{
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
