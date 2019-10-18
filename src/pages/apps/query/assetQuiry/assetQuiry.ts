import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {ShowPicturePage} from "../../../commonStyle/showPicture/showPicture";
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

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
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,private fileOpener: FileOpener,  private transfer: FileTransfer, private file: File,
              public app:App,public navParams:NavParams,public barcodeScanner:BarcodeScanner, public alertCtrl:AlertController) {
    this.loginDepartCode = this.storageService.read("loginDepartCode");
    this.imgUrl = this.storageService.read('serverUrl')['agreement']+'://'+this.storageService.read('serverUrl')['address']+':'+this.storageService.read('serverUrl')['port']+'/';
    if (this.navParams.get("barCode")){
      this.barCode = this.navParams.get("barCode");
      this.query();
      let wordUrl = "https://qdcu01.baidupcs.com/file/3b49d14d001418abba72c40a4736e5e2?bkt=en-2d9e6f81f9f5bca05438c60bd194b6178e93686212626ef0b643699932aac0cba910b9ffeeb16b4a60fab1b1a0973e266c701169565309657e07ca5221eb0170&fid=1329605026-250528-1075033549565185&time=1571369114&sign=FDTAXGERLQBHSKfW-DCb740ccc5511e5e8fedcff06b081203-qLI8JArHIvoNNCO2XpRd%2BynAZ2k%3D&to=65&size=98304&sta_dx=98304&sta_cs=0&sta_ft=doc&sta_ct=0&sta_mt=0&fm2=MH%2CYangquan%2CAnywhere%2C%2Cliaoning%2Ccnc&ctime=1571369108&mtime=1571369108&resv0=cdnback&resv1=0&resv2=&resv3=&resv4=&vuk=1329605026&iv=0&htype=&randtype=&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=en-4a1f60d79afdf47941e436ef11d1bbcb994f45201d88fbb0b38a061b0002fcd6dd1e0a4d23b7c0845f3c3a5c2233cf94a7da93dc43e8454c305a5e1275657320&sl=68616270&expires=8h&rt=pr&r=950506746&vbdid=1556343402&fin=%E4%BA%95%E5%8F%A3%E8%87%AA%E5%8A%A8%E5%8C%96%E8%A3%85%E7%BD%AE%E6%93%8D%E4%BD%9C%E4%BF%9D%E5%85%BB%E8%A7%84%E7%A8%8B.doc&fn=%E4%BA%95%E5%8F%A3%E8%87%AA%E5%8A%A8%E5%8C%96%E8%A3%85%E7%BD%AE%E6%93%8D%E4%BD%9C%E4%BF%9D%E5%85%BB%E8%A7%84%E7%A8%8B.doc&rtype=1&dp-logid=6736955326362778794&dp-callid=0.1&hps=1&tsl=200&csl=200&csign=srzYcURE31zpHQ%2F60OpjIGCxgFk%3D&so=0&ut=6&uter=4&serv=0&uc=4076634613&ti=54c943154d862903c58b0a913738545c165e9f5440f5e496&by=themis"
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.download(wordUrl, this.file.dataDirectory + 'file.doc').then((entry) => {
        this.fileOpener.open(entry.nativeURL, this.getFileMimeType(this.getFileType('file.doc')))
          .then(() => {

          })
          .catch((e) => {
            let alert = this.alertCtrl.create({
              title:"打开失败，"+e
            });
            alert.present();
          });
      }, (error) => {
        let alert = this.alertCtrl.create({
          title:"下载失败，"+error
        });
        alert.present();
      });

    }
  }
  getFileMimeType(fileType: string): string {
    let mimeType: string = '';

    switch (fileType) {
      case 'txt':
        mimeType = 'text/plain';
        break;
      case 'docx':
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'doc':
        mimeType = 'application/msword';
        break;
      case 'pptx':
        mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      case 'ppt':
        mimeType = 'application/vnd.ms-powerpoint';
        break;
      case 'xlsx':
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'xls':
        mimeType = 'application/vnd.ms-excel';
        break;
      case 'zip':
        mimeType = 'application/x-zip-compressed';
        break;
      case 'rar':
        mimeType = 'application/octet-stream';
        break;
      case 'pdf':
        mimeType = 'application/pdf';
        break;
      case 'jpg':
        mimeType = 'image/jpeg';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      default:
        mimeType = 'application/' + fileType;
        break;
    }
    return mimeType;
  }
  getFileType(fileName: string): string {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();
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
