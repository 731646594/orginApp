import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {ShowPicturePage} from "../../../commonStyle/showPicture/showPicture";
let that;
@Component({
  selector: 'page-weeklyChecklistEntry',
  templateUrl: 'weeklyChecklistEntry.html'
})
export class WeeklyChecklistEntryPage {
  userName;
  userCode;
  departCode;
  loginDepartCode;
  departName;
  gasStationCode;
  gasStationName;
  detail=[];
  localData;
  departListData = null;
  departList = null;
  gasStationData = null;
  gasStation = null;
  colsData = null;
  isOnfocus = false;
  i = 0;
  signatureImage1 = '';
  signatureImage2 = '';
  temporaryStorageData=[];
  storageData={};
  signIndex;
  detailData;
  pageName = '周检';
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public navParams:NavParams,
              public actionSheetCtrl:ActionSheetController,public camera:Camera,public file:File,
              public app:App,public events:Events) {
    if(this.httpService.getUrl()=="http://swapp.0731ctny.com:/plamassets/mobile/") {
      this.pageName = '巡检';
    }
     this.loadData()
  }
  ionViewDidEnter(){
    that = this;
  }
  loadData(){
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.loginDepartCode = this.storageService.read("loginDepartCode");
    this.departName = this.storageService.read("loginDepartName");
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("weeklyData",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.localData = JSON.parse(res.rows.item(0).stringData);
        this.departListData = this.localData.fgsData;
        this.detailData = this.localData.detailData;
        this.departList = this.departListData;
        let isEqual = true;
        for (let i in this.departList){
          if (this.departCode != this.departList[i].departcode){
            isEqual = false;
          }else {
            isEqual = true;
          }
        }
        if (!isEqual){
          this.departCode = this.departList[0].departcode;
          this.departName = this.departList[0].departname;
        }
        this.gasStationData = this.localData.jyzData;
        this.gasStation = this.gasStationData;
        isEqual = true;
        for (let i in this.departList){
          if (this.gasStation[i]&&this.departCode != this.gasStation[i].departcode){
            isEqual = false;
          }else {
            isEqual = true;
          }
        }
        if (!isEqual){
          this.gasStationCode = this.gasStation[0].departcode;
          this.gasStationName = this.gasStation[0].departname;
        }else {
          this.gasStationCode = this.departCode;
          this.gasStationName = this.departName;
        }
        this.colsData = this.localData.colsData;
        this.storageData["uploadFile"]=[];
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
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
    this.departList = item;
    if (this.departCode!="-1"){
      this.departCode = "-1";
    }
  }
  selectDepart(departName){
    this.departName = departName;
  }
  filterStationName(ev: any) {
    const val = ev.target.value;
    let item = [];
    if (val && val.trim() != '') {
      for (let i in this.gasStationData){
        if(this.gasStationData[i]["departname"].indexOf(val)>=0){
          item.push(this.gasStationData[i])
        }
      }
    }
    else {
      item = this.gasStationData;
    }
    this.gasStation = item;
    if (this.gasStationCode!="-1"){
      this.gasStationCode = "-1";
    }
  }
  selectStation(departName){
    this.gasStationName = departName;
  }
  inputOnfocus(){
    this.isOnfocus=true;
  }
  inputOnblur(){
    this.isOnfocus=false;
  }
  controlField(i){
    let item = document.getElementById("field"+i).style.display;
    let transform;
    if (item == ""||item == "block"){
      item = "none";
      transform = "transform: rotate(-90deg);"
    }else if (item == "none"){
      item = "block";
      transform = "transform: rotate(0deg);"
    }
    document.getElementById("field"+i).style.display = item;
    document.getElementById("icon"+i).setAttribute("style",transform)
  }
  pickPhoto(){
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍摄照片',
          icon: 'camera',
          handler: () => {
            this.openCamera(true);
          }
        },
        {
          text: '从相册中选择照片',
          icon: 'images',
          handler: () => {
            this.openCamera(false);
          }
        },
      ]
    });
    actionSheet.present();
  }
  openCamera(type) {
    let sourceType;
    let saveToPhotoAlbum;
    if (type){
      sourceType = this.camera.PictureSourceType.CAMERA;
      saveToPhotoAlbum = true;
    }
    else {
      sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
      saveToPhotoAlbum = false;
    }
    const options: CameraOptions = {
      quality: 50,                                                   //相片质量 0 -100
      destinationType: this.camera.DestinationType.FILE_URI,        //DATA_URL 是 base64   FILE_URL 是文件路径
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: saveToPhotoAlbum,                                       //是否保存到相册
      sourceType: sourceType,         //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择, CAMERA : 拍照,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.resolveUri(imageData).then(url=>{
        url.file((file)=>{
          let reader = new FileReader();
          reader.onloadend=(e)=>{
            let node = document.getElementById("imgBox");
            let base64Image=e.target['result'];
            let div = document.createElement("div");
            div.className = "imgInclusion";
            div.innerHTML+=
              "<img id=\"i"+this.i+"\" name=\"i"+this.i+"\" class=\"imgShow\" src=\""+base64Image+"\">" +
              "<img id=\"b"+this.i+"\" class=\"imgDeleteButton\" src='assets/imgs/delete.png'>";
            node.appendChild(div);
            that.storageData["uploadFile"].push(base64Image);
            document.getElementById("i"+that.i).onclick=function() {
              try {
                that.app.getRootNav().push(ShowPicturePage,{picture:base64Image})
              } catch (e) {
                alert(e)
              }
            };
            document.getElementById("b"+that.i).onclick=function(){
              try {
                node.removeChild(div);
                that.storageData["uploadFile"].splice(parseInt(this.id.slice(1)),1);
              }catch(e) {
                alert(e)
              }
            };
            this.i++;
          };
          reader.readAsDataURL(file);
        },err=>{
          alert(err)
        });
      },err=>{
        alert(err)
      })
    }, (err) => {
      // Handle error
      alert(err)
    });
  }

  selectedChange(ev,index,index2){
    if (ev == "合格"){
      this.storageData[this.colsData[index].fields[index2].columnName]=ev;
      this.temporaryStorageData[this.colsData[index].fields[index2].columnName]="";
    }else if(ev == "其他情况"){
      this.temporaryStorageData[this.colsData[index].fields[index2].columnName]=ev;
      this.storageData[this.colsData[index].fields[index2].columnName]="";
    }else if(ev == "暂未整改"){
      this.temporaryStorageData[this.colsData[index].fields[index2].columnName]=ev;
      this.storageData[this.colsData[index].fields[index2].columnName]="同上";
    }
  }
  deleteImg(index){
    if (index==1){
      this.signatureImage1 = "";
    }else if(index==2){
      this.signatureImage2 = "";
    }
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
  saveInfo(){
    if(this.departCode=="-1"){
      let alertCtrl = this.alertCtrl.create({
        title:"分公司输入有误，请检查输入的字符，并重新选择下拉选项"
      });
      alertCtrl.present();
      return false;
    }
    if(this.gasStationCode=="-1"){
      let alertCtrl = this.alertCtrl.create({
        title:"加油站输入有误，请检查输入的字符，并重新选择下拉选项"
      });
      alertCtrl.present();
      return false;
    }
    for(let i = 0;i < this.colsData.length;i++){
      for (let j = 0;j < this.colsData[i].fields.length;j++){
        if(this.storageData[this.colsData[i].fields[j].columnName]){
          this.storageData[this.colsData[i].fields[j].columnName] = (this.storageData[this.colsData[i].fields[j].columnName]).trim();
        }
        for (let x in this.storageData){
          if(this.colsData[i]["fields"][j].columnName==x&&!this.detailData[this.colsData[i]["fields"][j].columnName]){
            if(this.storageData[this.colsData[i].fields[j].columnName]=="同上"){
              let alertCtrl1 = this.alertCtrl.create({
                title:"请勿在无未整改内容的项目里填写同上！"
              });
              alertCtrl1.present();
              this.storageData[this.colsData[i].fields[j].columnName]="";
              return false;
            }
          }
        }
        if(this.storageData[this.colsData[i].fields[j].columnName]==";"){
          let alertCtrl1 = this.alertCtrl.create({
            title:"填写有误！"
          });
          alertCtrl1.present();
          this.storageData[this.colsData[i].fields[j].columnName]="";
          return false;
        }
        if(!this.storageData[this.colsData[i].fields[j].columnName]&&this.colsData[i].fields[j].columnRequire==1){
          let alertCtrl = this.alertCtrl.create({
            title:"有必填项未填！"
          });
          alertCtrl.present();
          return false;
        }
      }
    }
    if(this.departCode&&this.gasStationCode){
      this.storageData["zjry"]=this.userName;
    }else {
      let alertCtrl = this.alertCtrl.create({
        title:"有必填项未填！"
      });
      alertCtrl.present();
      return false;
    }
    this.storageData["fgsbm"]=this.departCode;
    this.storageData["fgsmc"]=this.departName;
    this.storageData["yzbm"]=this.gasStationCode;
    this.storageData["yzmc"]=this.gasStationName;
    this.storageData = JSON.stringify(this.storageData);
    let tableName;
    tableName = "zjb";
    this.storageService.getUserTable().executeSql(this.storageService.getSSS(tableName,this.userCode),[]).then(res =>{
      if (res.rows.length>0){
        this.storageService.updateUserTable(tableName,this.userCode,this.storageData);
      }else {
        this.storageService.insertIntoUserTable(tableName,this.userCode,this.storageData);
      }
      this.events.publish('menuNumPublish','weeklyCheckDataComplete');
      let alertCtrl = this.alertCtrl.create({
        title:"保存成功！"
      });
      alertCtrl.present();
      this.navCtrl.pop();
    }).catch(e =>alert("erro2:"+JSON.stringify(e))  )


  }
  myCallbackFunction  =(params) => {
    return new Promise((resolve, reject) => {

      if(typeof(params)!='undefined'){
        resolve('ok');
        if (this.signIndex==1){
          this.signatureImage1 = params;
        }else if(this.signIndex==2){
          this.signatureImage2 = params;
        }
      }else{

        reject(Error('error'))
      }

    });
  };
}
