import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";
import {BarcodeScanner,BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {Camera,CameraOptions} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {ShowPicturePage} from "../showPicture/showPicture";

@Component({
  selector: 'page-insertForm',
  templateUrl: 'insertForm.html'
})
export class InsertFormPage {
  userName;
  userCode;
  departName;
  departCode;

  pageName;
  isNeedPictureArea=false;
  contentData;
  footerContentData;
  inputData;
  selectData;
  selectShowData=[];
  selectedData;

  photoFiles=[];

  isShow;
  isOnfocus;
  constructor(public app:App,public navCtrl: NavController,public storageService:StorageService, public httpService:HttpService,
              public navParams:NavParams,public barcodeScanner:BarcodeScanner,public camera:Camera,public alertCtrl:AlertController,
              public actionSheetCtrl:ActionSheetController,public file:File) {

  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.pageName = this.navParams.data.pageName;
    this.isNeedPictureArea = this.navParams.data.isNeedPictureArea;
    this.inputData = this.navParams.data.pageData.tsData.inputData;
    this.selectData = this.navParams.data.pageData.tsData.selectData;
    for (let i in this.selectData){
      this.selectShowData.push(this.selectData[i]);
    }
    this.selectedData = this.navParams.data.pageData.tsData.selectedData;
    this.isShow = this.navParams.data.pageData.htmlData.footerData.isShow;
    this.contentData = this.navParams.data.pageData.htmlData.contentData;
    this.footerContentData = this.navParams.data.pageData.htmlData.footerData.footerContentData;
  }
  inputOnfocus(){
    this.isOnfocus=true;
  }
  inputOnblur(){
    this.isOnfocus=false;
  }
  filterOptionName(ev: any,index) {
    const val = ev.value;
    let item = [];
    if (val && val.trim() != '') {
      for (let i in this.selectData[index]){
        if(this.selectData[index][i][1].indexOf(val)>=0){
          item.push(this.selectData[index][i])
        }
      }
    }
    else {
      item = this.selectData[index];
    }
    this.selectShowData[index] = item;
  }
  showOptionName(name,index){
    this.inputData[index] = name;
  }
  footerFunction(param,page){
    //0:照片，1:扫码，2：保存
    if (param == 0){
      this.pickPhoto()
    }
    else if(param == 1){
      this.scan(page)
    }
    else if(param == 2){
      this.saveInfo()
    }
  }
  scan(page) {
    //0:盘点，1：盘盈
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
        if (page==0){
          this.inputData[0] = data.text;
          this.searchLocalPlanDetail();
        }else if (page==1){
          this.inputData[1] = data.text;
        }
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
  searchLocalPlanDetail(){

  }
  pickPhoto(){
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍摄照片',
          icon: 'camera',
          handler: () => {
            this.openCamera(0);
          }
        },
        {
          text: '从相册中选择照片',
          icon: 'images',
          handler: () => {
            this.openCamera(1);
          }
        },
      ]
    });
    actionSheet.present();
  }
  openCamera(param) {
    let sourceType;
    if (param == 0){
      sourceType = this.camera.PictureSourceType.CAMERA;
    }else if(param == 1){
      sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    }
    const options: CameraOptions = {
      quality: 50,                                                   //相片质量 0 -100
      destinationType: this.camera.DestinationType.FILE_URI,        //DATA_URL 是 base64   FILE_URL 是文件路径
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,                                       //是否保存到相册
      sourceType: sourceType ,         //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择, CAMERA : 拍照,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.resolveUri(imageData).then(url=>{
        url.file((file)=>{
          let reader = new FileReader();
          reader.onloadend=(e)=>{
            let base64Image=e.target['result'];
            this.photoFiles.push(base64Image);
          };
          reader.readAsDataURL(file);
        },err=>{
          alert(err)
        });
      },err=>{
        alert(err)
      })
    }, (err) => {
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
  showPhoto(index){
    this.app.getRootNav().push(ShowPicturePage,{picture:this.photoFiles[index]});
  }
  deletePhoto(index){
    this.photoFiles.splice(index,1);
  }
  saveInfo(){
    console.log(this.inputData);
    console.log(this.selectedData);
  }

}
