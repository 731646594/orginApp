import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, AlertController, App, Events, Navbar, NavController, NavParams, Platform} from 'ionic-angular';
import {PageUtil, StorageService} from "../../../services/storageService";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {Camera,CameraOptions} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {ShowPicturePage} from "../../commonStyle/showPicture/showPicture";
declare let cordova: any;
let that;
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage {
  @ViewChild(Navbar) navBar: Navbar;
  userCode;
  isFocus=false;
  invoice=JSON;
  i=0;
  barCode;
  assetsCode;
  lossReasonData=[];
  storePlaceData=[];
  loginDepartList;
  departListData;
  storePlaceName;
  isDistinguish=false;
  pageData;
  pageName;
  data={};
  selectFilterData=[];
  nextPage;
  imgBox;
  uploadFile=[];
  constructor(public navCtrl?:NavController,public storageService?:StorageService,public navParams?:NavParams,public events?:Events,
              public camera?:Camera,public file?:File, public actionSheetCtrl?:ActionSheetController,
              public app?:App,public alertCtrl?:AlertController,public barcodeScanner?:BarcodeScanner,
              public platform?:Platform) {
    that = this;
    this.userCode = this.storageService.read("loginUserCode");
    this.invoice=JSON.parse("{}");
    this.events.subscribe("showFooter",(res) => {
      this.showFooter()
    });
    this.events.subscribe("hideFooter",(res) => {
      this.hideFooter();
    });
    document.addEventListener('scan.receiveScanAndroidCallback', that.scanPlugin, false);
  }
  scanPlugin(event){
    let barCode =  event.data;
    that.invoice["barCode"] = barCode.replace(/\s+/g,"").replace("\u0008", "");
    that.searchLocalPlanDetail();
  }
  ionViewWillUnload(){
    this.events.unsubscribe("showFooter");
    this.events.unsubscribe("hideFooter");
    document.removeEventListener('scan.receiveScanAndroidCallback',that.scanPlugin);
  }
  ionViewDidEnter(){
    this.navBar.backButtonClick = this.backButtonClick;
  }
  backButtonClick = (e: UIEvent) => {
    // to do what you want
    if (this.invoice["barCode"]) {
      let alertCtrl = this.alertCtrl.create({
        title: "数据未保存，是否返回？",
        buttons: [
          {
            text: "是",
            handler: () => {
              this.navCtrl.pop();
            }
          },
          {
            text: "否",
            handler: () => {

            }
          }
        ]
      });
      alertCtrl.present();
    }else {
      this.navCtrl.pop();
    }
  };
  scanCheck(){
    if (this.invoice["barCode"]) {
      let alertCtrl = this.alertCtrl.create({
        title: "数据未保存，是否扫码？",
        buttons: [
          {
            text: "是",
            handler: () => {
              this.scan()
            }
          },
          {
            text: "否",
            handler: () => {

            }
          }
        ]
      });
      alertCtrl.present();
    }else {
      this.scan()
    }
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
          this.invoice["barCode"] = data.text.replace(/\s+/g,"").replace("\u0008", "");
          this.searchLocalPlanDetail();
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
      destinationType: this.camera.DestinationType.NATIVE_URI,        //DATA_URL 是 base64   FILE_URL 是文件路径
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
            let node = document.getElementById(this.imgBox);
            let base64Image=e.target['result'];
            let div = document.createElement("div");
            div.className = "imgInclusion";
            div.innerHTML+=
              "<img id=\"i"+this.i+this.imgBox+"\" name=\"i"+this.i+this.imgBox+"\" class=\"imgShow\" src=\""+base64Image+"\">" +
              "<img id=\"b"+this.i+this.imgBox+"\" class=\"imgDeleteButton\" src='assets/imgs/delete.png'>";
            if (this.uploadFile.length==4){
              let alertCtrl = this.alertCtrl.create({
                title:"照片数量不能大于4张"
              });
              alertCtrl.present();
              return false;
            }
            node.appendChild(div);
            this.uploadFile.push(imageData);
            document.getElementById("i"+this.i+this.imgBox).onclick=(e)=> {
              try {
                this.app.getRootNav().push(ShowPicturePage,{picture:base64Image})
              } catch (e) {
                alert(e)
              }
            };
            document.getElementById("b"+this.i+this.imgBox).onclick=(e)=> {
              try {
                node.removeChild(div);
                this.uploadFile.splice(parseInt((<HTMLElement>div.firstChild).id.slice(1)),1);
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
        let alertCtrl = this.alertCtrl.create({
          title:"无法获取该路径的图片，如想使用请将它复制到系统的相册里"
        });
        alertCtrl.present()
      })
    }, (err) => {
      // Handle error
      if (err=="No Image Selected"){
        let alertCtrl = this.alertCtrl.create({
          title:"请选择图片"
        });
        alertCtrl.present()
      }else if(err=="Unable to retrieve path to picture!"){
        let alertCtrl = this.alertCtrl.create({
          title:"无法获取该路径的图片，如想使用请将它复制到系统的相册里"
        });
        alertCtrl.present()
      }else {
        let alertCtrl = this.alertCtrl.create({
          title:err
        });
        alertCtrl.present()
      }

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
    if(!this.isDistinguish){
      let alert = this.alertCtrl.create({
        title:"请识别资产条码！"
      });
      alert.present();
      return false;
    }
    let j = this.pageData.pageItem.filter((item) => {
      if(item.itemValue.constructor==Array){
        return (item.nec==1&&!this.invoice[item.itemValue[0]]&&this.invoice[item.itemValue[0]]!="0");
      }else {
        return (item.nec==1&&!this.invoice[item.itemValue]&&this.invoice[item.itemValue]!="0");
      }
    });
    if (j.length>0){
      let alertCtrl = this.alertCtrl.create({
        title:"请填写"+j[0].itemName
      });
      alertCtrl.present();
      return false;
    }
    this.invoice["uploadFile"] = [];
    this.invoice["uploadFile"] = this.invoice["uploadFile"].concat(this.uploadFile);
    this.invoice["checkResult"] = "1";
    let invoiceList = [];
    let isReplace = false;
    let willList = [];
    let willListLength=0;
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("willPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        willList = JSON.parse(res.rows.item(0).stringData);
        willListLength = JSON.parse(res.rows.item(0).stringData).length;
      }
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
        if (res.rows.length>0){
          invoiceList = JSON.parse(res.rows.item(0).stringData);
          for (let i in invoiceList){
            if (invoiceList[i]["barCode"] == this.invoice["barCode"]){
              this.invoice["Uploaded"] = false;
              invoiceList[i] = this.invoice;
              isReplace = true;
            }
          }
          if (!isReplace){
            for (let i in willList){
              if (willList[i]["barCode"] == this.invoice["barCode"]){
                willList.splice(Number(i),1);
                willListLength--;
                invoiceList.push(this.invoice)
              }
            }
          }
        }else {
          for (let i in willList){
            if (willList[i]["barCode"] == this.invoice["barCode"]){
              willList.splice(Number(i),1);
              willListLength--;
              invoiceList[0]=this.invoice;
            }
          }
        }
        this.storageService.sqliteInsert("willPlanDetail",this.userCode,JSON.stringify(willList));
        if (PageUtil.pages["home"]){
          PageUtil.pages["home"].inventoryNum = willListLength;
        }
        this.storageService.sqliteInsert("existPlanDetail",this.userCode,JSON.stringify(invoiceList));
        this.events.publish('menuNumPublish','inventoryDataComplete');
        for(let key in this.invoice){
          this.invoice[key] = "";
        }
        this.invoice["usedState"]="010101";
        this.invoice["usedStateName"]="生产经营用-科研";
        this.invoice["realcodeStatus"]="0";
        this.invoice["technicalCondition"]="01";
        this.invoice["technicalConditionName"]="完好";
        this.invoice["storePlace"] = "";
        this.invoice["storePlaceName"] = "";
        document.getElementById("storePlace").getElementsByClassName("select-text")[0].innerHTML = "";
        this.getAndShowPics([]);
        this.isDistinguish = false;
        let alertCtrl = this.alertCtrl.create({
          title:"保存成功！"
        });
        alertCtrl.present();
      });
    });
  }

  searchLocalPlanDetail(){
    if(!this.invoice["barCode"]){
      let alert = this.alertCtrl.create({
        title:"请输入或扫描资产条码！"
      });
      alert.present();
      return false;
    }
    let localPlanDetail = [];
    let isSearch = false;
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        localPlanDetail = JSON.parse(res.rows.item(0).stringData);
        for(let i in  localPlanDetail){
          if (this.invoice["barCode"] == localPlanDetail[i]["barCode"]){
            isSearch = true;
            let alertCtrl = this.alertCtrl.create({
              title:"已存在该盘点数据，是否重新盘点？",
              buttons:[
                {
                  text:"是",
                  handler:()=>{
                    this.invoice = localPlanDetail[i];
                    document.getElementById("storePlace").getElementsByClassName("select-text")[0].innerHTML = this.invoice["storePlaceName"];
                    this.getAndShowPics(this.invoice["uploadFile"]);
                    this.isDistinguish = true;
                  }
                },
                {
                  text:"否",
                  handler:()=>{
                    this.invoice["barCode"] = "";
                  }
                }
              ]
            });
            alertCtrl.present();
            return false;
          }
        }
      }
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("willPlanDetail",this.userCode),[]).then(res=>{
        if (res.rows.length>0){
          localPlanDetail = JSON.parse(res.rows.item(0).stringData);
          for(let i in  localPlanDetail){
            if (this.invoice["barCode"] == localPlanDetail[i]["barCode"]){
              this.invoice = localPlanDetail[i];
              if (this.invoice["uploadFile"]){
                this.getAndShowPics(this.invoice["uploadFile"]);
              }
              this.invoice["realcodeStatus"] = "0";
              this.invoice["storePlaceName"] = this.invoice["storePlace"];
              document.getElementById("storePlace").getElementsByClassName("select-text")[0].innerHTML = this.invoice["storePlaceName"];
              isSearch = true;
              this.isDistinguish = true;
            }
          }
        }
        if (!isSearch){
          let alertCtrl = this.alertCtrl.create({
            title:"是否进入盘盈？",
            buttons:[
              {
                text:"是",
                handler:()=>{
                  this.isDistinguish = false;
                  this.app.getRootNav().push(this.nextPage,{barCode:this.invoice["barCode"]})
                }
              },
              {
                text:"否",
                handler:()=>{
                  this.invoice["barCode"] = "";
                }
              }
            ]
          });
          alertCtrl.present();
        }
      });
    });
  }
  getAndShowPics(base64Images){
    this.uploadFile=[];
    let node = document.getElementById(this.imgBox);
    let childs = node.childNodes;
    for(let i = childs .length - 1; i >= 1; i--) {
      node.removeChild(childs[i]);
    }
    this.i=0;
    if (base64Images.length>0){
      for (let i in base64Images){
        let imageData = base64Images[i]
        this.resolveUri(imageData).then(url=> {
          url.file((file) => {
            let reader = new FileReader();
            reader.onloadend = (e) => {
              let base64Image = e.target['result'];
              let div = document.createElement("div");
              div.className = "imgInclusion";
              div.innerHTML +=
                "<img id=\"i" + this.i + this.imgBox + "\" name=\"i" + this.i + this.imgBox + "\" class=\"imgShow\" src=\"" + base64Image + "\">" +
                "<img id=\"b" + this.i + this.imgBox + "\" class=\"imgDeleteButton\" src='assets/imgs/delete.png'>";
              node.appendChild(div);
              this.uploadFile.push(base64Images[i]);
              document.getElementById("i" + this.i + this.imgBox).onclick = (e) => {
                try {
                  this.app.getRootNav().push(ShowPicturePage, {picture: base64Image})
                } catch (e) {
                  alert(e)
                }
              };
              document.getElementById("b" + this.i + this.imgBox).onclick = (e) => {
                try {
                  let j;
                  for(let i in node.childNodes){
                    if(node.childNodes[i] == div){
                      j = i;
                    }
                  }
                  j --;
                  this.uploadFile.splice(j, 1);
                  node.removeChild(div);
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
        },err=>{
          if (err.message == "NOT_FOUND_ERR"){
            let alertCtrl = this.alertCtrl.create({
              title:"该资产的图片已丢失！"
            });
            alertCtrl.present();
          }else {
            let alertCtrl = this.alertCtrl.create({
              title:err.message
            });
            alertCtrl.present();
          }
        })
      }
    }
  }
  hideFooter(){
    this.isFocus=true;
  }
  showFooter(){
    this.isFocus=false;
  }
  getInputValue(value,key){
    this.showFooter();
    this.invoice[key] = value;
  }
  getSelectValue(value,key){
    if (key.constructor == Array){
      this.invoice[key[0]] = value["selectedValue"];
      this.invoice[key[1]] = value["selectedName"];
      document.getElementById(key[0]).getElementsByClassName("select-text")[0].innerHTML = value["selectedName"];
    }else {
      this.invoice[key] = value["selectedValue"];
      if(key=="technicalCondition"||key=="managerDepart"||key == "usedState"){
        this.invoice[key+"Name"] = value["selectedName"];
      }
    }
  }
}
