import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {Camera,CameraOptions} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {ShowPicturePage} from "../../../commonStyle/showPicture/showPicture";

let that;
@Component({
  selector: 'page-inventoryEntry',
  templateUrl: 'inventoryEntry.html'
})
export class InventoryEntryPage {
  isOnfocus=false;
  invoice=JSON;
  i=0;
  departments;
  barCode;
  assetsCode;
  lossReasonData=[];
  showLossReasonData=[];
  storePlaceData=[];
  showStorePlaceData=[];
  loginDepartList;
  departListData;
  userCode;
  lossReasonName;
  storePlaceName;
  constructor(public navCtrl:NavController,public storageService:StorageService, public app:App,public alertCtrl:AlertController,public barcodeScanner:BarcodeScanner,
              public camera:Camera,public file:File, public actionSheetCtrl:ActionSheetController,public navParams:NavParams) {
    that = this;
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    this.invoice=JSON.parse("{}");
    this.invoice["barCode"] = this.navParams.get("barCode");
    this.userCode = this.storageService.read("loginUserCode");
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.departments = JSON.parse(res.rows.item(0).stringData)["departments"];
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("storePlaceData",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.storePlaceData = JSON.parse(res.rows.item(0).stringData);
        this.showStorePlaceData = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
    if (this.departments){
      this.invoice["managerDepart"]=this.departments[0].departCode
    }
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("lossReasonData",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.lossReasonData = JSON.parse(res.rows.item(0).stringData);
        this.showLossReasonData = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_3:"+JSON.stringify(e)));
    this.invoice["assetsStatus"]="010101";
    this.invoice["technicalCondition"]="01";
  }
  inputOnfocus(){
    this.isOnfocus=true;
  }
  inputOnblur(){
    this.isOnfocus=false;
  }
  scan() {
    let options: BarcodeScannerOptions = {
      preferFrontCamera: false,//前置摄像头
      showFlipCameraButton: true,//翻转摄像头按钮
      showTorchButton: true,//闪关灯按钮
      prompt: '扫描中……',//提示文本
      // formats: 'QR_CODE',//格式
      orientation: 'portrait',//方向
      torchOn: false,//启动闪光灯
      resultDisplayDuration: 500,//显示扫描文本
      disableSuccessBeep: true // iOS and Android
    };
    this.barcodeScanner
      .scan(options)
      .then((data) => {
        this.invoice["barCode"] = data.text;
      })
      .catch((err) => {
        const alert = this.alertCtrl.create({
          title: 'Attention!',
          subTitle: err,
          buttons: ['Close']
        });
        alert.present();
      });
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
    if (type){
      sourceType = this.camera.PictureSourceType.CAMERA;
    }
    else {
      sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
    }
    const options: CameraOptions = {
      quality: 50,                                                   //相片质量 0 -100
      destinationType: this.camera.DestinationType.FILE_URI,        //DATA_URL 是 base64   FILE_URL 是文件路径
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,                                       //是否保存到相册
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
    if(!this.invoice["barCode"]){
      let alert = this.alertCtrl.create({
        title:"请输入或扫描资产条码！"
      });
      alert.present();
      return false;
    }
    let invoiceList = [];
    let isReplace = false;
    isReplace = false;
    invoiceList = [];
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        invoiceList = JSON.parse(res.rows.item(0).stringData);
        for (let i in invoiceList){
          if (invoiceList[i]["barCode"] == this.invoice["barCode"]){
            invoiceList[i] = this.invoice;
            isReplace = true;
          }
        }
        if (!isReplace){
          invoiceList.push(this.invoice)
        }
      }else {
        invoiceList[0]=this.invoice;
      }
      this.storageService.sqliteInsert("newPlanDetail",this.userCode,JSON.stringify(invoiceList));
      let alertCtrl = this.alertCtrl.create({
        title:"保存成功！"
      });
      alertCtrl.present();
      this.navCtrl.pop();
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
  }
  filterReasonString(ev: any) {
    const val = ev.value;
    let item = [];
    if (val && val.trim() != '') {
      for (let i in this.lossReasonData){
        if(this.lossReasonData[i]["complexname"].indexOf(val)>=0){
          item.push(this.lossReasonData[i])
        }
      }
    }
    else {
      item = this.lossReasonData;
    }
    this.showLossReasonData = item;
  }
  selectLossReasonData(string){
    this.lossReasonName = string;
  }
  filterPlaceString(ev: any) {
    const val = ev.value;
    let item = [];
    if (val && val.trim() != '') {
      for (let i in this.storePlaceData){
        if(this.storePlaceData[i]["complexname"].indexOf(val)>=0){
          item.push(this.storePlaceData[i])
        }
      }
    }
    else {
      item = this.storePlaceData;
    }
    this.showStorePlaceData = item;
  }
  selectStorePlaceData(string){
    this.storePlaceName = string;
  }

}
