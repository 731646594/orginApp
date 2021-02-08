import {Component, EventEmitter, Output} from '@angular/core';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {Platform} from "ionic-angular";
declare let cordova: any;
let that;
// import {AlertController} from "ionic-angular";

/**
 * Generated class for the ScannerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'scanner',
  templateUrl: 'scanner.html'
})
export class ScannerComponent {
  @Output() backValue = new EventEmitter();
  constructor(private barcodeScanner:BarcodeScanner,public platform:Platform) {
    that = this;
    document.addEventListener('scan.receiveScanAndroidCallback', that.scanPlugin, false);
  }
  scanPlugin(event){
    let barCode =  event.data;
    that.backValue.emit(barCode.replace(/\s+/g,"").replace("\u0008", ""));
  }
  ngOnDestroy(){
    document.removeEventListener('scan.receiveScanAndroidCallback',that.scanPlugin);
  }
  scan() {
    if (this.platform.is('android')){
      cordova.plugins.ScanKitPlugin.scan("test", result => {}, error => alert(error));
    }else {
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
          this.backValue.emit(data.text.replace(/\s+/g,"").replace("\u0008", ""));
        })
        .catch((err) => {
          // const alert = this.alertCtrl.create({
          //   title: 'Attention!',
          //   subTitle: err,
          //   buttons: ['Close']
          // });
          // alert.present();
        });
    }
  }
}
