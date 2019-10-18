import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {ShowPicturePage} from "../../../commonStyle/showPicture/showPicture";
@Component({
  selector: 'page-assetQuiry',
  templateUrl: 'assetQuiry.html'
})
export class AssetQuiryPage {
  shape="detail";
  radioButton = '资产条码';
  detail=[];
  plan=[];
  isOnfocus=false;
  i;
  barCode;
  assetsCode;

  loginDepartCode;

  queryResult = [];
  imgUrl = "";
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public app:App,public navParams:NavParams,public barcodeScanner:BarcodeScanner, public alertCtrl:AlertController) {
    this.loginDepartCode = this.storageService.read("loginDepartCode");
    this.imgUrl = this.storageService.read('serverUrl')['agreement']+'://'+this.storageService.read('serverUrl')['address']+':'+this.storageService.read('serverUrl')['port']+'/';
    if (this.navParams.get("barCode")){
      this.barCode = this.navParams.get("barCode");
      this.query();
    }
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
        if(data.text){
          this.barCode = data.text;
        }else {
          let alertCtrl = this.alertCtrl.create({
            title:"请扫描条码"
          });
          alertCtrl.present();
        }
        // const alert = this.alertCtrl.create({
        //   title: 'Scan Results',
        //   subTitle: data.text,
        //   buttons: ['OK']
        // });
        // alert.present();
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
  query(){
    let url,body;
    url = "cellPhoneControllerOffline/queryLedger.do";
    if (!this.barCode){
      this.barCode = ""
    }
    if (!this.assetsCode){
      this.assetsCode = ""
    }
    body = {departCode:this.loginDepartCode,assetsCode:this.assetsCode,barCode:this.barCode};
    this.httpService.postData(this.httpService.getUrl()+url,body,data=>{
      if (data.success == "true"){
        if (data.data.length>0){
          this.detail = data.data[0];
          if (this.detail["imguUrl"]){
            let len = this.detail["imguUrl"].length-1;
            this.detail["imguUrl"] = this.detail["imguUrl"].substring(0,len);
            this.detail["imgUrlArr"] = this.detail["imguUrl"].split(";");
          }else {
            this.detail["imgUrlArr"] = []
          }
          this.plan = data.listRecord;
          let alert = this.alertCtrl.create({
            title:"查询成功！"
          });
          alert.present();
        }else {
          let alert = this.alertCtrl.create({
            title:"查询无数据！"
          });
          alert.present();
        }

      }else {
        alert(data.msg)
      }
    },true)
  }
  showImg(src){
    this.app.getRootNav().push(ShowPicturePage,{picture:src})
  }
}
