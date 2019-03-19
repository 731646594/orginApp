import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
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
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public app:App,public navParams:NavParams,public barcodeScanner:BarcodeScanner, public alertCtrl:AlertController) {
    this.loginDepartCode = this.storageService.read("loginDepartCode");
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
        this.barCode = data.text;
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
    url = "cellPhoneController.do?queryLedger";
    if (!this.barCode){
      this.barCode = ""
    }
    if (!this.assetsCode){
      this.assetsCode = ""
    }
    body = {departCode:this.loginDepartCode,assetsCode:this.assetsCode,barCode:this.barCode};
    this.httpService.post(this.httpService.getUrl()+url,body).subscribe(data=>{
      if (data.success == "true"){
        this.detail = data.data[0];
        this.plan = data.listRecord;
        let alert = this.alertCtrl.create({
          title:"查询成功！"
        });
        alert.present();
      }else {
        alert(data.msg)
      }
    })
  }
}
