import {Component} from '@angular/core';
import {
  ActionSheetController, AlertController, App, Events, ModalController, NavController,
  NavParams
} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";
import {DatePipe} from "@angular/common";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ShowPicturePage} from "../../../commonStyle/showPicture/showPicture";
import {File} from "@ionic-native/file";
import {RepairAlertPage} from "../repairAlert/repairAlert";
import {ConfigProvider} from "../../../../services/config";
import * as $ from "jquery";
let that;
@Component({
  selector: 'page-repairApplyAdd',
  templateUrl: 'repairApplyAdd.html'
})
export class RepairApplyAddPage {
  shape = "brief";
  isFocus = false;
  pageData;
  invoice = {};
  data = [];
  i = 0;
  displayIndex;
  listBase64=[];
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService,public datePipe?:DatePipe,public actionSheetCtrl?:ActionSheetController,
              public camera?:Camera,public file?:File,public modalCtrl?:ModalController) {
    that = this;
    let listJjcd = this.storageService.read("listJjcd");
    let listWxfs = this.storageService.read("listWxfs");
    this.invoice["djzt"] = 1;
    this.invoice["djztName"] = "新增";
    this.invoice["wxdh"] = "自动生成";
    let date = new Date();
    this.invoice["sqsj"] = this.datePipe.transform(date,"yyyy-MM-dd hh:mm:ss");
    this.invoice["sqrmc"] = this.storageService.read("loginUserName");
    this.invoice["sqrbm"] = this.storageService.read("loginUserCode");
    let str = JSON.stringify(this.storageService.read("loginDepartLongName"));
    str = str.substring(1,str.length-1);
    this.invoice["sqdwmc"] = str;
    this.invoice["sqdwbm"] = this.storageService.read("loginDepartCode");
    this.invoice["sscs"] = "福建";
    if (str.indexOf("/")>-1){
      this.invoice["sqdwmc"] = str.substring(str.lastIndexOf("/")+1,str.length);
      this.invoice["sscs"] = str.substring(str.indexOf("/")+1,str.indexOf("/",str.indexOf("/")+1));
    }
    this.invoice["djly"] = 2;
    if(this.navParams.get("data")){
      this.invoice = this.navParams.get("data");
      this.httpService.postData(this.httpService.getUrl2() + "lhd/app/devRepairController.do?editData", {djFormData:JSON.stringify(this.invoice)}, (data)=>{
        let temp = data.obj;
        temp.djFormData["djztName"] = ConfigProvider.djztName(temp.djFormData["djzt"]);
        this.invoice = temp.djFormData;
        this.data = this.data.concat(temp.listMainEquip);
        this.listBase64 = this.listBase64.concat(temp.imgUrl);
        let node = document.getElementById("imgBox");
        for (let j in this.listBase64){
          let base64Image = this.listBase64[j].imgUrl;
          let div = document.createElement("div");
          div.className = "imgInclusion";
          div.innerHTML +=
            "<img id=\"i" + this.i + "\" name=\"i" + this.i + "\" class=\"imgShow\" src=\"" + base64Image + "\">" +
            "<img id=\"b" + this.i + "\" class=\"imgDeleteButton\" src='assets/imgs/delete.png'>";
          node.appendChild(div);
          document.getElementById("i" + this.i).onclick = function () {
            try {
              that.app.getRootNav().push(ShowPicturePage, {picture: base64Image})
            } catch (e) {
              alert(e)
            }
          };
          document.getElementById("b" + this.i).onclick = function () {
            try {
              let id = this.id;
              if (that.invoice["sfscfj"] == 1&&that.listBase64.length==1){
                let alertCtrl = that.alertCtrl.create({
                  title:"不能删除该图片，或将是否上传附件选为否"
                });
                alertCtrl.present();
                return false;
              }
              that.httpService.postData(that.httpService.getUrl2() + "lhd/app/devRepairController.do?deleteAttach", {attachId:that.listBase64[id.slice(1)].attachId}, (data)=>{
                node.removeChild(div);
                that.listBase64.splice(parseInt(id.slice(1)), 1);
              },true)
            } catch (e) {
              alert(e)
            }
          };
          this.i++;
        }

      },true)
    }
    this.pageData = {
      segmentName:["单据信息", "主设备"],
      pageItem:[
        [
          {itemName:"维修单号", itemType:"label",itemValue:"wxdh",nec:0},
          {itemName:"单据状态", itemType:"label",itemValue:"djztName",nec:0},
          {itemName:"申请时间", itemType:"label",itemValue:"sqsj",nec:0},
          {itemName:"申请单位", itemType:"label",itemValue:"sqdwmc",nec:0},
          {itemName:"所属城市", itemType:"label",itemValue:"sscs",nec:0},
          {itemName:"申请人", itemType:"label",itemValue:"sqrmc",nec:0},
          {itemName:"联系电话", itemType:"input",itemValue:"zfyl8",nec:1},
          {itemName:"维修方式", itemType:"select", itemValue:"zfyl1",nec:1,itemValueName:"zfyl1",optionValueString:"complexcode",optionNameString:"complexname",
            option:listWxfs,
          },
          {itemName:"紧急程度", itemType:"select", itemValue:"zfyl7",nec:1,itemValueName:"zfyl7",optionValueString:"complexname",optionNameString:"complexname",
            option:listJjcd,
          },
          {itemName:"故障描述", itemType:"textarea",itemValue:"wxms",nec:1},
          {itemName:"是否上传附件", itemType:"select", itemValue:"sfscfj",nec:1,itemValueName:"sfscfj",optionValueString:"optionValue",optionNameString:"optionName",
            option:[
              {optionName:"是",optionValue:1},
              {optionName:"否",optionValue:0},
            ],
          },
        ],
        [
          {itemType:"card",
            card:{
              cardParent:[
                {itemName:"设备编码", itemType:"label",itemValue:"sbbm"},
                {itemName:"设备名称", itemType:"label",itemValue:"sbmc"},
              ],
              cardChild:[
                {itemName:"是否外包", itemType:"label",itemValue:"zfyl10"},
                {itemName:"所属单位", itemType:"label",itemValue:"ssdwmc"},
                {itemName:"资产类型", itemType:"label",itemValue:"sblxmc"},
                {itemName:"资产类别", itemType:"label",itemValue:"zclbmc"},
                // {itemName:"资产名称", itemType:"label",itemValue:"zcmc"},
                // {itemName:"自编码", itemType:"label",itemValue:"zczbm"},
                {itemName:"特种设备", itemType:"label",itemValue:"tssb"},
                {itemName:"规格型号", itemType:"label",itemValue:"ggxhmc"},
              ]
            }
          }
        ]
      ],
    }
    this.events.subscribe("showFooter", (res) => {
      this.showFooter()
    });
    this.events.subscribe("hideFooter", (res) => {
      this.hideFooter();
    });
  }
  ionViewWillUnload() {
    this.events.unsubscribe("showFooter");
    this.events.unsubscribe("hideFooter")
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
  deleteItem(index){
    let contentBox = document.getElementsByClassName("detailCallContentBox");
    if (index==this.displayIndex){
      this.displayIndex = -1;
    }
    contentBox[index].parentNode.removeChild(contentBox[index]);
    this.data.splice(index,1)
  }
  hideFooter() {
    this.isFocus = true;
  }
  showFooter() {
    this.isFocus = false;
  }
  getSelectValue(value, key,keyName) {
    this.invoice[keyName] = value["selectedValue"];
  }
  getInputValue(value,key){
    this.showFooter();
    this.invoice[key] = value;
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
    if (type) {
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
            if (this.listBase64.length==3){
              let alertCtrl = this.alertCtrl.create({
                title:"照片数量不能大于3张"
              });
              alertCtrl.present();
              return false;
            }
            if (this.navParams.get("data")){
              this.httpService.postData(this.httpService.getUrl2() + "/lhd/app/devRepairController.do?addAttach", {wxdh:this.invoice["wxdh"],base64:base64Image}, (data)=>{
                node.appendChild(div);
                this.listBase64.push(base64Image);
                let attachId = data.obj;
                document.getElementById("i" + this.i).onclick = function () {
                  try {
                    that.app.getRootNav().push(ShowPicturePage, {picture: base64Image})
                  } catch (e) {
                    alert(e)
                  }
                };
                document.getElementById("b" + this.i).onclick = function () {
                  try {
                    let id = this.id;
                    if (that.invoice["sfscfj"] == 1&&that.listBase64.length==1){
                      let alertCtrl = that.alertCtrl.create({
                        title:"不能删除该图片，或将是否上传附件选为否"
                      });
                      alertCtrl.present();
                      return false;
                    }
                    that.httpService.postData(that.httpService.getUrl2() + "lhd/app/devRepairController.do?deleteAttach", {attachId:attachId}, (data)=>{
                      node.removeChild(div);
                      that.listBase64.splice(parseInt(id.slice(1)), 1);
                    },true)
                  } catch (e) {
                    alert(e)
                  }
                };
                this.i++;
              },true)
            }else {
              node.appendChild(div);
              this.listBase64.push(base64Image);
              document.getElementById("i" + this.i).onclick = function () {
                try {
                  that.app.getRootNav().push(ShowPicturePage, {picture: base64Image})
                } catch (e) {
                  alert(e)
                }
              };
              document.getElementById("b" + this.i).onclick = function () {
                try {
                  if (that.invoice["sfscfj"] == 1&&that.listBase64.length==1){
                    let alertCtrl = that.alertCtrl.create({
                      title:"不能删除该图片，或将是否上传附件选为否"
                    });
                    alertCtrl.present();
                    return false;
                  }
                  node.removeChild(div);
                  that.listBase64.splice(parseInt(this.id.slice(1)), 1);
                } catch (e) {
                  alert(e)
                }
              };
              this.i++;
            }
          };
          reader.readAsDataURL(file);
        }, err => {
          alert(JSON.stringify(err))
        });
      }, err => {
        alert(JSON.stringify(err))
      })
    }, (err) => {
      // Handle error
      // alert(JSON.stringify(err))
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
  changeTab(){
    this.showFooter();
    if (this.shape=="brief"){
      setTimeout(() => {
        let node = document.getElementById("imgBox");
        for (let j in this.listBase64) {
          let base64Image = "";
          let isUrl = true;
          if (this.listBase64[j].imgUrl) {
            base64Image = this.listBase64[j].imgUrl;
          } else {
            base64Image = this.listBase64[j];
            isUrl = false;
          }
          let div = document.createElement("div");
          div.className = "imgInclusion";
          div.innerHTML +=
            "<img id=\"i" + j + "\" name=\"i" + j + "\" class=\"imgShow\" src=\"" + base64Image + "\">" +
            "<img id=\"b" + j + "\" class=\"imgDeleteButton\" src='assets/imgs/delete.png'>";
          node.appendChild(div);
          document.getElementById("i" + j).onclick = function () {
            try {
              that.app.getRootNav().push(ShowPicturePage, {picture: base64Image})
            } catch (e) {
              alert(e)
            }
          };
          document.getElementById("b" + j).onclick = function () {
            try {
              let id = this.id;
              if (that.invoice["sfscfj"] == 1 && that.listBase64.length == 1) {
                let alertCtrl = that.alertCtrl.create({
                  title: "不能删除该图片，或将是否上传附件选为否"
                });
                alertCtrl.present();
                return false;
              }
              if (isUrl) {
                that.httpService.postData(that.httpService.getUrl2() + "lhd/app/devRepairController.do?deleteAttach", {attachId: that.listBase64[id.slice(1)].attachId}, (data) => {
                  node.removeChild(div);
                  that.listBase64.splice(parseInt(id.slice(1)), 1);
                }, true)
              } else {
                node.removeChild(div);
                that.listBase64.splice(parseInt(this.id.slice(1)), 1);
              }
            } catch (e) {
              alert(e)
            }
          };
        }
      },100)
    }
  }
  addForm(){
    let content = {
      searchCon:[
        {value : "0", text : '名称'},
        {value : "1", text : '编码'},
      ],
      searchSelect:0,
      url:"lhd/app/devRepairController.do?equipmentList",
      body:{
        ssdwbm:this.storageService.read("loginDepartCode"),
        scbz:"0"
      },
      item:{
        parent:[
          {itemName:"设备编码",itemValue:"sbbm"},
          {itemName:"设备名称",itemValue:"sbmc"},
        ],
        children:[
          {itemName:"是否外包", itemValue:"sfwb"},
          {itemName:"所属单位", itemValue:"ssdwmc"},
          {itemName:"资产类型", itemValue:"zclxmc"},
          {itemName:"资产类别", itemValue:"zclbmc"},
          // {itemName:"资产名称", itemValue:"zcmc"},
          // {itemName:"自编码", itemValue:"zczbm"},
          {itemName:"特种设备", itemValue:"tssb"},
          {itemName:"规格型号", itemValue:"ggxhmc"},
        ]
      }
    }
    let body = {data:[],content:content}
    this.createAlertPage(RepairAlertPage,body)
  }
  createAlertPage(pageUrl,body){
    let modal = this.modalCtrl.create(pageUrl,body,{
    });
    modal.present();
    modal.onDidDismiss(data=>{
      if(data&&data.selectedData){
        console.log(data.selectedData)
        let json = {
          sbbm:data.selectedData.sbbm,
          sbmc:data.selectedData.sbmc,
          zclbbm:data.selectedData.zclbbm,
          zclbmc:data.selectedData.zclbmc,
          sblxbm:data.selectedData.sblbbm,
          sblxmc:data.selectedData.zclbmc,
          ggxhbm:data.selectedData.ggxhbm,
          ggxhmc:data.selectedData.ggxhmc,
          cpjh:data.selectedData.cpjh,
          cfdd:data.selectedData.cfdd,
          ssdwbm:data.selectedData.ssdwbm,
          ssdwmc:data.selectedData.ssdwmc,
          zzcjbm:data.selectedData.zzcjbm,
          zzcjmc:data.selectedData.zzcjmc,
          zjrq:data.selectedData.zjrq,
          tcrq:data.selectedData.tcrq,
          jsbmbm:data.selectedData.jsbmbm,
          jsbmmc:data.selectedData.jsbmmc,
          bgrbm:data.selectedData.bgrbm,
          bgrmc:data.selectedData.bgrmc,
          yz:data.selectedData.yz,
          jz:data.selectedData.jz,
          ljzj:data.selectedData.ljzj,
          zfyl5:data.selectedData.zcbm,
          zfyl10:data.selectedData.sfwb,
          sbid:data.selectedData.id,
          tssb:data.selectedData.tssb
        }
        this.data.push(json);
      }
    })
  }
  saveInfo(){
    let departCode = "";
    departCode = this.storageService.read("loginDepartCode");
    if (
      (departCode.indexOf("13710001300040003")==-1)&&
      (departCode.indexOf("13710001300040002")==-1)&&
      (departCode.indexOf("13710001300040001")==-1)&&
      (departCode.indexOf("137100002")==-1)&&
      (departCode.indexOf("137100010")==-1)&&
      (departCode.indexOf("137100005")==-1)&&
      (departCode.indexOf("137100003")==-1)&&
      (departCode.indexOf("137100004")==-1)&&
      (departCode.indexOf("137100006")==-1)&&
      (departCode.indexOf("137100009")==-1)&&
      (departCode.indexOf("137100007")==-1)&&
      (departCode.indexOf("137100008")==-1)&&
      (this.invoice["zfyl1"] == "05")
    ){
      let alertCtrl = this.alertCtrl.create({
        title:"当前单位不能选择外包维修！"
      });
      alertCtrl.present();
      return false;
    }
    if((this.invoice["sfscfj"] != 1) && (this.invoice["zfyl1"] == "04")){
      let alertCtrl = this.alertCtrl.create({
        title:"大维修必须上传图片！"
      });
      alertCtrl.present();
      return false;
    }
    if(this.data.length==0){
      let alertCtrl = this.alertCtrl.create({
        title:"请添加主设备！"
      });
      alertCtrl.present();
      return false;
    }
    let listWxfs = this.storageService.read("listWxfs");
    for(let i in listWxfs){
      if (listWxfs[i].complexcode == this.invoice["zfyl1"]){
        this.invoice["wxfs"] = listWxfs[i].complexname;
      }
    }
    for (let i in this.data){
      if (this.invoice["zfyl1"] == "05"&&this.data[i]["zfyl10"]!="是"){
        let alertCtrl = this.alertCtrl.create({
          title:"外包维修不能包含非外包设备！"
        });
        alertCtrl.present();
        return false;
      }
    }
    let j = this.pageData.pageItem[0].filter((item) => {
      return (item.nec==1&&!this.invoice[item.itemValue]&&this.invoice[item.itemValue]!="0");
    });
    if (j.length>0){
      let alertCtrl = this.alertCtrl.create({
        title:"请填写"+j[0].itemName
      });
      alertCtrl.present();
      return false;
    }
    let body = {djFormData:JSON.stringify(this.invoice),mainEquipData:JSON.stringify(this.data)};
    if (!this.navParams.get("data")){
      if (this.invoice["sfscfj"]==1&&this.listBase64.length==0){
        let alertCtrl = this.alertCtrl.create({
          title:"请上传图片，或将是否上传附件选为否"
        });
        alertCtrl.present();
        return false;
      }
      body["listBase64"] = JSON.stringify(this.listBase64);
    }
    body["flag"] = 1;
    console.log(body);
    this.httpService.postData(this.httpService.getUrl2()+"lhd/app/devRepairController.do?saveGrid",body,(data)=>{
      let alertCtrl = this.alertCtrl.create({
        title:"保存成功！"
      });
      alertCtrl.present();
      this.app.getRootNav().pop();
    },true)
  }
}
