import {Component} from '@angular/core';
import {
  ActionSheetController, AlertController, App, Events, LoadingController, ModalController, NavController,
  NavParams
} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";
import {DatePipe} from "@angular/common";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ShowPicturePage} from "../../commonStyle/showPicture/showPicture";
import {File} from "@ionic-native/file";
import {RepairAlertPage} from "../repair/repairAlert/repairAlert";
import {MaintenanceAlertPage} from "./maintenanceAlert/maintenanceAlert";
import {RepairBjAlertPage} from "../repair/repairBjAlert/repairBjAlert";
import {Http} from "@angular/http";
let that
@Component({
  selector: 'page-maintenance',
  templateUrl: 'maintenance.html'
})
export class MaintenancePage {
  isFocus = false;
  pageData;
  invoice = [];
  data;
  detailData;
  i = 0;
  displayIndex;
  tableData;
  pageName;
  signatureImage = "";
  maintenanceStandardData = {};
  operatorList = [];
  base64List = [];
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService, public datePipe?: DatePipe, public actionSheetCtrl?: ActionSheetController,
              public camera?: Camera, public file?: File, public modalCtrl?: ModalController,public http?:Http,
              public loadingCtrl?:LoadingController) {
    that = this;
    this.pageName = this.navParams.get("pageName");
    this.invoice = this.navParams.get("data");
    if (!this.invoice["byjdName"]){
      this.invoice["byjdName"] = "未开始"
    }
    this.operatorList = this.navParams.get("operatorList");
    this.pageData = {
      pageItem:[
        [
          {itemName:"单位名称", itemType:"label",itemValue:"departName",nec:0},
          {itemName:"保养编号", itemType:"label",itemValue:"maintenanceNumberDetail",nec:0},
          {itemName:"派单状态", itemType:"label",itemValue:"djztName",nec:0},
          {itemName:"设备名称", itemType:"label",itemValue:"assetsName",nec:0},
          {itemName:"设备编码", itemType:"label",itemValue:"assetsCode",nec:0},
          {itemName:"提醒日期", itemType:"label",itemValue:"remindDate",nec:0},
          {itemName:"进场人员", itemType:"select", itemValue:"ACCOUNT",itemValueName:"FULLNAME",optionValueString:"ACCOUNT",optionNameString:"FULLNAME",nec:1,
            option:this.operatorList},
          // {itemName:"联系电话", itemType:"input",inputType:"number", itemValue:"bpdrdh",nec:1},
          {itemName:"备注", itemType:"input",itemValue:"remark",nec:1},
        ],
      ],
    };
    if (this.invoice["bpdrbm"]){
      this.invoice["FULLNAME"] = this.invoice["bpdr"];
      this.pageData.pageItem[0][6] = {itemName:"进场人员", itemType:"label",itemValue:"FULLNAME",nec:0};
      // this.pageData.pageItem[0][7] = {itemName:"联系电话", itemType:"label",itemValue:"bpdrdh",nec:0};
      this.pageData.pageItem[0][7] = {itemName:"备注", itemType:"label",itemValue:"remark",nec:0};
    }
    if (this.pageName == "开始保养"){
      if (!this.invoice["beginTime"]){
        this.invoice["beginTime"] = "点击“进场”后自动生成"
      }
      this.pageData.pageItem[0][2] = {itemName:"保养状态", itemType:"label",itemValue:"checkDateName",nec:0};
      this.pageData.pageItem[0][6] = {itemName:"进场人员", itemType:"label",itemValue:"FULLNAME",nec:0};
      this.pageData.pageItem[0][7] = {itemName:"备注", itemType:"label",itemValue:"remark",nec:0};
      this.pageData.pageItem[0][8] = {itemName:"联系电话", itemType:"input",inputType:"number", itemValue:"bpdrdh",nec:1};
      this.pageData.pageItem[0][9] = {itemName:"进场信息", itemType:"textarea",itemValue:"jcxx",nec:1};
      this.pageData.pageItem[0][10] = {itemName:"开始时间", itemType:"label",itemValue:"beginTime",nec:0};
      if(this.invoice["jcxx"]&&this.invoice["checkStatus"]!="2"){
        this.pageData.pageItem[0][8] = {itemName:"联系电话", itemType:"label",itemValue:"bpdrdh",nec:0};
        this.pageData.pageItem[0][9] = {itemName:"进场信息", itemType:"textarea-readonly",itemValue:"jcxx",nec:0};
      }
      if (this.invoice["jcxx"]&&this.invoice["checkStatus"]=="2"){
        this.pageData.pageItem[0][8] = {itemName:"驳回原因", itemType:"label",itemValue:"checkRemark",nec:0};
        this.pageData.pageItem[0][9] = {itemName:"联系电话", itemType:"input",inputType:"number", itemValue:"bpdrdh",nec:1};
        this.pageData.pageItem[0][10] = {itemName:"进场信息", itemType:"textarea",itemValue:"jcxx",nec:1};
        this.pageData.pageItem[0][11] = {itemName:"开始时间", itemType:"label",itemValue:"beginTime",nec:0};
      }
    }else if (this.pageName == "保养办结"){
      this.invoice["finishTime"] = "点击“办结”后自动生成";
      this.pageData.pageItem[0][2] = {itemName:"保养状态", itemType:"label",itemValue:"checkDateName",nec:0};
      this.pageData.pageItem[0][6] = {itemName:"进场人员", itemType:"label",itemValue:"FULLNAME",nec:0};
      this.pageData.pageItem[0][7] = {itemName:"备注", itemType:"label",itemValue:"remark",nec:0};
      this.pageData.pageItem[0][8] = {itemName:"联系电话", itemType:"label",itemValue:"bpdrdh",nec:0};
      this.pageData.pageItem[0][9] = {itemName:"进场信息", itemType:"textarea-readonly",itemValue:"jcxx",nec:0};
      this.pageData.pageItem[0][10] = {itemName:"开始时间", itemType:"label",itemValue:"beginTime",nec:0};
      this.pageData.pageItem[0][11] = {itemName:"办结时间", itemType:"label",itemValue:"finishTime",nec:0};
      this.pageData.pageItem[0][12] = {itemName:"保养金额", itemType:"input",inputType:"number",itemValue:"maintenanceAmount",nec:1};
      this.pageData.pageItem[0][13] = {itemName:"保养位置", itemType:"input",itemValue:"maintenancePosition",nec:1};
      this.pageData.pageItem[0][14] = {itemName:"设备使用状态", itemType:"select",itemValue:"deviceUseStatus",nec:1,itemValueName:"deviceUseStatusName",optionValueString:"optionValue",optionNameString:"optionName",
        option:[
          {optionName:"在用",optionValue:"0001"},
          {optionName:"停用",optionValue:"0002"},
          {optionName:"维修中",optionValue:"0003"},
          {optionName:"保养中",optionValue:"0004"},
        ],
      };
      this.pageData.pageItem[0][15] = {itemName:"设备技术状态", itemType:"select",itemValue:"deviceTechStatus",nec:1,itemValueName:"deviceTechStatusName",optionValueString:"optionValue",optionNameString:"optionName",
        option:[
          {optionName:"完好",optionValue:"0001"},
          {optionName:"故障",optionValue:"0002"},
        ],};
      this.pageData.pageItem[0][16] = {itemName:"保养记录", itemType:"textarea",itemValue:"maintenanceRemark",nec:1};
      this.pageData.pageItem[0][17] = {itemName:"备件", itemType:"filter",itemValue:"bjmc",nec:1};
      this.pageData.pageItem[0][18] = {itemName:"图片", itemType:"photo",itemValue:"createUserName4",nec:0};
    }
  }
  ionViewDidLoad() {

  }
  getSelectValue(select,value,name){
    this.invoice[value] = select["selectedValue"];
    this.invoice[name] = select["selectedName"]
  }
  displayContent(index){
    let content = document.getElementsByClassName("disContent");
    if (content.length>0) {
      if ((<HTMLElement>content[index]).style.display == "block") {
        (<HTMLElement>content[index]).style.display = "none";
      } else {
        if (this.displayIndex >= 0) {
          (<HTMLElement>content[this.displayIndex]).style.display = "none";
        }
        (<HTMLElement>content[index]).style.display = "block";
        this.displayIndex = index;
      }
    }
  }
  hideFooter() {
    this.isFocus = true;
  }
  showFooter() {
    this.isFocus = false;
  }
  getInputValue(value, key) {
    this.showFooter();
    this.invoice[key] = value;
  }
  showDictionaries(value){
    let data=[];
    let content = {
      searchCon: [
        {value: "bjmc", text: '备件名称'},
        {value: "bjbm", text: '备件编码'},
      ],
      searchSelect: "bjmc",
      item: {
        parent: [
          {itemName: "备件编码", itemValue: "bjbm"},
          {itemName: "备件名称", itemValue: "bjmc"},
        ],
      }
    }
    let body = {data:data,content:content}
    this.createDictionariesPage(RepairBjAlertPage,body,value)
  }
  createDictionariesPage(pageUrl,body,value){
    let modal = this.modalCtrl.create(pageUrl,body,{
    });
    modal.present();
    modal.onDidDismiss(data=>{
      if(data&&data.selectedData){
        console.log(data.selectedData);
        this.invoice["bjbm"] = data.selectedData["bjbm"];
        this.invoice["bjmc"] = data.selectedData["bjmc"];
      }
    })
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
  showMaintenanceStandard(){
    this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/devMaintenanceController.do?getMaintenanceStandard",{checkCode:this.invoice["checkCode"]},(data)=>{
      this.maintenanceStandardData = data.obj;
      let modal = this.modalCtrl.create(MaintenanceAlertPage,{data:this.maintenanceStandardData},{
      });
      modal.present();
      modal.onDidDismiss(data=>{
        if(data&&data.selectedData){
          console.log(data.selectedData)
        }
      })
    },true)
  }
  dispatchForm(){
    if (!this.invoice["ACCOUNT"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择进场人员！"
      });
      alertCtrl.present();
      return false;
    }
    if (!this.invoice["remark"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请填写备注！"
      });
      alertCtrl.present();
      return false;
    }
    this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/devMaintenanceController.do?saveMaintenancePicketing",{
      userCode:this.storageService.read("loginUserCode"),
      userName:this.storageService.read("loginUserName"),
      maintenanceNumberDetail:this.invoice["maintenanceNumberDetail"],
      id:this.invoice["id"],
      repairUser:this.invoice["FULLNAME"],
      repairUserCode:this.invoice["ACCOUNT"],
      // bpdrdh:this.invoice["bpdrdh"],
      remark:this.invoice["remark"]
    },(data)=>{
      console.log(data);
      let alertCtrl = this.alertCtrl.create({
        title:"派单成功！"
      });
      alertCtrl.present();
      this.app.getRootNav().pop()
    },true)
  }
  enterForm(){
    if (!this.invoice["bpdrdh"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请填写进场人员电话！"
      });
      alertCtrl.present();
      return false;
    }
    if(!(/^1[3456789]\d{9}$/.test(this.invoice["bpdrdh"]))){
      let alertCtrl = this.alertCtrl.create({
        title:"进场人员电话填写有误！"
      });
      alertCtrl.present();
      return false;
    }
    if (!this.invoice["jcxx"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请填写进场信息！"
      });
      alertCtrl.present();
      return false;
    }
    this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/devMaintenanceController.do?savePeripheryMaintenancer",{
      maintenanceNumberDetail:this.invoice["maintenanceNumberDetail"],
      id:this.invoice["id"],
      jcxx:this.invoice["jcxx"],
      bpdrdh:this.invoice["bpdrdh"],
    },(data)=>{
      console.log(data);
      let alertCtrl = this.alertCtrl.create({
        title:"进场完成！"
      });
      alertCtrl.present();
      this.app.getRootNav().pop()
    },true)
  }
  compressBase64Pics(base64Images){
    for (let i in base64Images){
      let base64 = base64Images[i];
      let newImage = new Image();
      let quality = 1;    //压缩系数0-1之间
      newImage.src = base64;
      newImage.setAttribute("crossOrigin", 'Anonymous');  //url为外域时需要
      let imgWidth, imgHeight;
      newImage.onload =  (ev:any)=> {
        let img = ev.target;
        imgWidth = img.width;
        imgHeight = img.height;
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let w = 500;
        if (Math.max(imgWidth, imgHeight) > w) {
          if (imgWidth > imgHeight) {
            canvas.width = w;
            canvas.height = w * imgHeight / imgWidth;
          } else {
            canvas.height = w;
            canvas.width = w * imgWidth / imgHeight;
          }
        } else {
          canvas.width = imgWidth;
          canvas.height = imgHeight;
          quality = 1;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let base64Image = canvas.toDataURL("image/jpeg", quality); //压缩语句
        this.base64List[i] = base64Image;
        if (parseInt(i) == base64Images.length - 1){
          this.finishForm2()
        }
      }
    }
  }
  finishForm(){
    if (this.base64List.length>0){
      this.compressBase64Pics(this.base64List);
    }else {
      this.finishForm2()
    }
  }
  finishForm2(){
    if (!this.invoice["maintenanceAmount"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请填写保养金额！"
      });
      alertCtrl.present();
      return false;
    }
    if (!this.invoice["maintenancePosition"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请填写保养位置！"
      });
      alertCtrl.present();
      return false;
    }
    if (!this.invoice["deviceUseStatus"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择设备使用状态！"
      });
      alertCtrl.present();
      return false;
    }
    if (!this.invoice["deviceTechStatus"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择设备技术状态！"
      });
      alertCtrl.present();
      return false;
    }
    if (!this.invoice["maintenanceRemark"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请填写保养记录！"
      });
      alertCtrl.present();
      return false;
    }
    if (!this.invoice["bjbm"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择备件！"
      });
      alertCtrl.present();
      return false;
    }
    let body = {
      id:this.invoice["id"],
      maintenanceAmount:this.invoice["maintenanceAmount"],
      maintenancePosition:this.invoice["maintenancePosition"],
      deviceUseStatus:this.invoice["deviceUseStatusName"],
      deviceTechStatus:this.invoice["deviceTechStatusName"],
      maintenanceRemark:this.invoice["maintenanceRemark"],
      maintenanceFactory:this.storageService.read("loginDepartName"),
      bjmc:this.invoice["bjmc"],
      bjbm:this.invoice["bjbm"],
      listBase64:JSON.stringify(this.base64List)
    };
    // let bodyForm = new FormData();
    // bodyForm.append("token",this.storageService.read("token"));
    // bodyForm.append("departCode",this.storageService.read("loginDepartCode"))
    // bodyForm.append("id",this.invoice["id"]);
    // bodyForm.append("maintenanceAmount",this.invoice["maintenanceAmount"]);
    // bodyForm.append("maintenancePosition",this.invoice["maintenancePosition"]);
    // bodyForm.append("deviceUseStatus",this.invoice["deviceUseStatusName"]);
    // bodyForm.append("deviceTechStatus",this.invoice["deviceTechStatusName"]);
    // bodyForm.append("maintenanceRemark",this.invoice["maintenanceRemark"]);
    // bodyForm.append("maintenanceFactory",this.storageService.read("loginDepartName"));
    // bodyForm.append("bjmc",this.invoice["bjmc"]);
    // bodyForm.append("bjbm",this.invoice["bjbm"]);
    // let stringBase64 = "";
    // for (let i=0;i<this.base64List.length;i++){
    //   stringBase64 += this.base64List[i];
    //   if (i != this.base64List.length-1){
    //     stringBase64  += "||&&||&&||";
    //   }
    // }
    // bodyForm.append("attachmentList",stringBase64);
    // let loading = this.loadingCtrl.create({
    //   content:"请等待...",
    //   dismissOnPageChange:true,
    //   // duration:5000
    // });
    // loading.present();
    // this.http.post(this.httpService.getUrl2()+"lhd/app/devMaintenanceController.do?savePeripheryMaintenancerFinish",bodyForm)
    //   .subscribe((data:any)=>{
    //       loading.dismiss();
    //       let res = JSON.parse(data._body);
    //       if (res["success"]=="true"||res["success"]=="success"||res["success"]==true){
    //         let alertCtrl = this.alertCtrl.create({
    //           title:"办结成功！"
    //         });
    //         alertCtrl.present();
    //         this.app.getRootNav().pop()
    //       }else {
    //         let alertCtrl = this.alertCtrl.create({
    //           title:res.msg
    //         });
    //         alertCtrl.present();
    //       }
    //     },err => {
    //     let errMsg = "网络通信异常";
    //     switch (err.status) {
    //       case 401:
    //         errMsg = "请重新登录";
    //         break;
    //       case 404:
    //         errMsg = '抱歉，后台服务找不到对应接口';
    //         break;
    //       case 0:
    //         errMsg = '网络无法连接';
    //       default:
    //         break;
    //     }
    //     let alertCtrl = this.alertCtrl.create({
    //       title:errMsg
    //     });
    //     alertCtrl.present();
    //     })
    this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/devMaintenanceController.do?savePeripheryMaintenancerFinish",body,(data)=>{
      console.log(data);
      let alertCtrl = this.alertCtrl.create({
        title:"办结成功！"
      });
      alertCtrl.present();
      this.app.getRootNav().pop()
    },true)
  }
}
