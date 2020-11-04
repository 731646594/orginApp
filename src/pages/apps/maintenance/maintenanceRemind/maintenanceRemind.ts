import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController, App, Events, LoadingController, ModalController, NavController, NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {ConfigProvider} from "../../../../services/config";
import {DatePipe} from "@angular/common";
import {File} from "@ionic-native/file";
import {MaintenanceAlertPage} from "../maintenanceAlert/maintenanceAlert";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ShowPicturePage} from "../../../commonStyle/showPicture/showPicture";
let that;
@Component({
  selector: 'page-maintenanceRemind',
  templateUrl: 'maintenanceRemind.html'
})
export class MaintenanceRemindPage{
  shape = "brief";
  isFocus = false;
  pageData;
  invoice = [];
  detail = {};
  base64List = [];
  i = 0;
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService, public datePipe?: DatePipe, public actionSheetCtrl?: ActionSheetController,
              public file?: File, public modalCtrl?: ModalController,public camera?:Camera) {
    that = this;
    this.invoice = this.navParams.get("data");

    this.pageData = {
      pageItem:[
        {itemName:"单位名称", itemType:"label",itemValue:"departName",nec:0},
        {itemName:"保养编号", itemType:"label",itemValue:"maintenanceNumberDetail",nec:0},
        {itemName:"设备名称", itemType:"label",itemValue:"assetsName",nec:0},
        {itemName:"设备编码", itemType:"label",itemValue:"assetsCode",nec:0},
        {itemName:"提醒日期", itemType:"label",itemValue:"remindDate",nec:0},
        {itemName:"保养金额", itemType:"input",itemValue:"maintenanceAmount",nec:0},
        {itemName:"保养位置", itemType:"input",itemValue:"maintenancePosition",nec:0},
        {itemName:"保养厂商", itemType:"input",itemValue:"maintenanceFactory",nec:0},
        {itemName:"设备使用状态", itemType:"select",itemValue:"deviceUseStatus",nec:1,itemValueName:"deviceUseStatusName",optionValueString:"optionValue",optionNameString:"optionName",
          option:[
            {optionName:"在用",optionValue:"0001"},
            {optionName:"停用",optionValue:"0002"},
            {optionName:"维修中",optionValue:"0003"},
            {optionName:"保养中",optionValue:"0004"},
          ],
        },
        {itemName:"设备技术状态", itemType:"select",itemValue:"deviceTechStatus",nec:1,itemValueName:"deviceTechStatusName",optionValueString:"optionValue",optionNameString:"optionName",
          option:[
            {optionName:"完好",optionValue:"0001"},
            {optionName:"故障",optionValue:"0002"},
          ],
        },
        {itemName:"保养记录", itemType:"textarea",itemValue:"maintenanceRemark",nec:1},
      ],
    }
  }
  ionViewDidLoad() {

  }
  getInputValue(value,key){
    this.showFooter();
    this.detail[key] = value;
  }
  getSelectValue(value,key){
    this.detail[key] = value["selectedValue"];
  }
  hideFooter() {
    this.isFocus = true;
  }
  showFooter() {
    this.isFocus = false;
  }
  showMaintenanceStandard(){
    this.httpService.postData2(this.httpService.getUrl()+"serviceStandardController/getStandard.do",{checkCode:this.invoice["checkCode"]},(data)=>{
      let maintenanceStandardData = data.data[0].entityList[0];
      let modal = this.modalCtrl.create(MaintenanceAlertPage,{data:maintenanceStandardData},{
      });
      modal.present();
      modal.onDidDismiss(data=>{
        if(data&&data.selectedData){
          console.log(data.selectedData)
        }
      })
    },true)
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
    if (type) {
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
      this.resolveUri(imageData).then(url => {
        url.file((file) => {
          let reader = new FileReader();
          reader.onloadend = (e) => {
            let node = document.getElementById("imgBox");
            let base64Image = e.target['result'];
            let div = document.createElement("div");
            div.className = "imgInclusion";
            div.innerHTML +=
              "<img id=\"i" + this.i + "\" name=\"i" + this.i + "\" class=\"imgShow\" src=\"" + base64Image + "\">" +
              "<img id=\"b" + this.i + "\" class=\"imgDeleteButton\" src='assets/imgs/delete.png'>";
            if (this.base64List.length==3){
              let alertCtrl = this.alertCtrl.create({
                title:"照片数量不能大于3张"
              });
              alertCtrl.present();
              return false;
            }
            node.appendChild(div);
            this.base64List.push(base64Image);
            document.getElementById("i" + this.i).onclick = function () {
              try {
                that.app.getRootNav().push(ShowPicturePage, {picture: base64Image})
              } catch (e) {
                alert(e)
              }
            };
            document.getElementById("b" + this.i).onclick = function () {
              try {
                node.removeChild(div);
                that.base64List.splice(parseInt(this.id.slice(1)), 1);
              } catch (e) {
                alert(e)
              }
            };
            this.i++;
          };
          reader.readAsDataURL(file);
        }, err => {
          alert(err)
        });
      }, err => {
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
  saveForm(){
    if (!this.detail['deviceUseStatus']||!this.detail['deviceTechStatus']||!this.detail['maintenanceRemark']){
      let alertCtrl = this.alertCtrl.create({
        title:'请填写必填项！'
      });
      alertCtrl.present();
      return false;
    }
    //uploadfile:JSON.stringify(this.base64List)
    this.httpService.postData(this.httpService.getUrl() + "serviceMaintenanceRecordController/saveForm.do", {userDepart:this.storageService.read('loginDepartCode'),userDepartName:this.storageService.read('loginDepartName'),data:JSON.stringify(this.invoice),formdata:JSON.stringify(this.detail),uploadfile:''}, (data)=>{
      let alertCtrl = this.alertCtrl.create({
        title:'保存成功！'
      });
      alertCtrl.present();
      this.app.getRootNav().pop();
    },true)

  }
}
