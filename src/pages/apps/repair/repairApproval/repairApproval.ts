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
import {ConfigProvider} from "../../../../services/config";
import * as $ from "jquery";
import {RepairSupplementAlertPage} from "../repairSupplementAlert/repairSupplementAlert";
import {RepairBjAlertPage} from "../repairBjAlert/repairBjAlert";
import {RepairGysAlertPage} from "../repairGysAlert/repairGysAlert";
let that;
@Component({
  selector: 'page-repairApproval',
  templateUrl: 'repairApproval.html'
})
export class RepairApprovalPage {
  shape = "brief";
  isFocus = false;
  pageData;
  invoice = [];
  data=[];
  detailData=[];
  i = 0;
  displayIndex;
  tableData=[];
  listBase64=[];
  isFist = false;
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService, public datePipe?: DatePipe, public actionSheetCtrl?: ActionSheetController,
              public camera?: Camera, public file?: File, public modalCtrl?: ModalController) {
    that = this;
    this.invoice = this.navParams.get("data");
    this.httpService.postData2(this.httpService.getUrl2() + "lhd/app/devRepairController.do?editData", {djFormData:JSON.stringify(this.invoice)}, (data)=>{
      let temp = data.obj;
      temp.djFormData["djztName"] = ConfigProvider.djztName(temp.djFormData["djzt"]);
      if(temp.djFormData["djly"])
        temp.djFormData["djlyName"] = ConfigProvider.djlyName(temp.djFormData["djly"]);
      if(temp.djFormData["yslb"])
        temp.djFormData["yslbName"] = ConfigProvider.yslbName(temp.djFormData["yslb"]);
      if (temp.ysmx){
        temp.djFormData["ysze"] = temp.ysmx["ysze"];
        temp.djFormData["yzyysze"] = temp.ysmx["yzyysze"];
        temp.djFormData["ysyysze"] = temp.ysmx["ysyysze"];
        temp.djFormData["wsyysze"] = temp.ysmx["wsyysze"];
      }
      this.invoice = temp.djFormData;
      $(".inputSpec").eq(0).children("input").val(this.invoice["rgfwf"]);
      $(".inputSpec").eq(1).children("input").val(this.invoice["wxbjjehj"]);
      this.invoice["ygwxzz"] = this.invoice["rgfwf"] + this.invoice["wxbjjehj"];
      this.detailData = this.detailData.concat(temp.listMainEquip);
      this.data = this.data.concat(temp.listCsxx);
      for (let i in this.detailData){
        this.getWxHistory(i)
      }
      if (this.invoice["sfscfj"] == 1)
        this.listBase64 = this.listBase64.concat(temp.imgUrl);
      let node = document.getElementById("imgBox");
      for (let j in this.listBase64){
        let base64Image = this.listBase64[j].imgUrl;
        let div = document.createElement("div");
        div.className = "imgInclusion";
        div.innerHTML +=
          "<img id=\"i" + this.i + "\" name=\"i" + this.i + "\" class=\"imgShow\" src=\"" + base64Image + "\">"
        node.appendChild(div);
        document.getElementById("i" + this.i).onclick = function () {
          try {
            that.app.getRootNav().push(ShowPicturePage, {picture: base64Image})
          } catch (e) {
            alert(e)
          }
        };
        this.i++;
      }

    },true)
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
          {itemName:"联系电话", itemType:"label",itemValue:"zfyl8",nec:0},
          {itemName:"维修方式", itemType:"label", itemValue:"wxfs",nec:0},
          {itemName:"紧急程度", itemType:"label", itemValue:"zfyl7",nec:0},
          {itemName:"故障描述", itemType:"textarea-readonly",itemValue:"wxms",nec:0},
          {itemName:"备注", itemType:"label",itemValue:"bzxx",nec:0},
          {itemName:"单据来源", itemType:"label", itemValue:"djlyName",nec:0},
          {itemName:"维修预算", itemType:"label", itemValue:"ysze",nec:0},
          {itemName:"已占用预算", itemType:"label",itemValue:"yzyysze",nec:0},
          {itemName:"已使用预算", itemType:"label",itemValue:"ysyysze",nec:0},
          {itemName:"未使用预算", itemType:"label", itemValue:"wsyysze",nec:0},
          {itemName:"预算编码", itemType:"label", itemValue:"ysbm",nec:0},
          {itemName:"预算类别", itemType:"label",itemValue:"yslbName",nec:0},
          {itemName:"预算单位", itemType:"label", itemValue:"ysdwmc",nec:0},
          {itemName:"预算年度", itemType:"label",itemValue:"ysnd",nec:0},
          {itemName:"项目名称", itemType:"label",itemValue:"xmmc",nec:0},
          {itemName:"人工及配件费用", itemType:"label",itemValue:"rgfwf",nec:0},
          {itemName:"备件", itemType:"label",itemValue:"bjmc",nec:0},
          {itemName:"备件费用", itemType:"label",itemValue:"wxbjjehj",nec:0},
          {itemName:"预估维修总值", itemType:"label",itemValue:"ygwxzz",nec:0},
          {itemName:"监控防范措施", itemType:"textarea-readonly",itemValue:"jkffcs",nec:0},
          {itemName:"整改措施", itemType:"textarea-readonly",itemValue:"zgcs",nec:0},
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
                {itemName:"历史维修信息",itemType:"label", itemValue:"makeFactory"},
                {itemName:"\u00A0\u00A0\u00A0\u00A0设备总维修次数",itemType:"label", itemValue:"wxCount"},
                {itemName:"\u00A0\u00A0\u00A0\u00A0总维修金额",itemType:"label", itemValue:"sumMoney"},
                {itemName:"历史维修信息明细",itemType:"label", itemValue:"makeFactory"},
                {itemType:"table",tableItem:[
                    {colName:"维修日期",colValue:"wxrq"},
                    {colName:"维修金额",colValue:"zfyl1"},
                    {colName:"故障描述",colValue:"zfyl2"},
                  ]
                }
              ]
            }
          }
        ],
        [
          {itemType:"card",
            card:{
              cardParent:[
                {itemName:"厂商序号", itemType:"label",itemValue:"csxh"},
                {itemName:"厂商单位", itemType:"label",itemValue:"csdwmc"},
              ],
              cardChild:[
                {itemName:"厂商地址", itemType:"label",itemValue:"csdz"},
                {itemName:"联系电话", itemType:"label",itemValue:"lxdh"},
                {itemName:"手机", itemType:"label",itemValue:"phone"},
                {itemName:"厂商类型", itemType:"label",itemValue:"cslx"},
              ]
            }
          }
        ]
      ],
    };
    if (this.invoice["wxfs"]=="供应商维修"){
      this.pageData.segmentName =["单据信息", "主设备","供应商信息"]
    }
    if(this.httpService.getUrl()=="http://swapp.0731ctny.com:/plamassets/mobile/"){
      this.pageData.segmentName =["单据信息", "主设备"];
      this.pageData.pageItem[0].splice(6, 0, {itemName:"要求完成时间", itemType:"label",itemValue:"zfyl12",nec:0});
      this.pageData.pageItem[0].splice(17,4);
      this.pageData.pageItem[0].splice(9,1);
      this.pageData.pageItem[0].splice(1,1);
      this.pageData.pageItem[0].splice(8, 0,{itemName:"供应商信息", itemType:"label",itemValue:"zfyl9",nec:0});
    }
    this.httpService.postData2(this.httpService.getUrl2() + "lhd/app/devRepairController.do?ifFirst", {WXDH:this.invoice['wxdh']}, (data)=>{
      console.log(data);
      if (data.cause == 'sure'){
        this.isFist = true;
        this.invoice["ygwxzz"] = this.invoice["rgfwf"] + this.invoice["wxbjjehj"];
        this.pageData.pageItem[0] = [
          {itemName:"维修单号", itemType:"label",itemValue:"wxdh",nec:0},
          // {itemName:"单据状态", itemType:"label",itemValue:"djztName",nec:0},
          {itemName:"申请时间", itemType:"label",itemValue:"sqsj",nec:0},
          {itemName:"申请单位", itemType:"label",itemValue:"sqdwmc",nec:0},
          {itemName:"所属城市", itemType:"label",itemValue:"sscs",nec:0},
          {itemName:"申请人", itemType:"label",itemValue:"sqrmc",nec:0},
          {itemName:"要求完成时间", itemType:"label",itemValue:"zfyl12",nec:0},
          {itemName:"联系电话", itemType:"label",itemValue:"zfyl8",nec:0},
          {itemName:"维修方式", itemType:"label", itemValue:"wxfs",nec:0},
          {itemName:"供应商信息", itemType:"label",itemValue:"zfyl9",nec:0},
          // {itemName:"紧急程度", itemType:"label", itemValue:"zfyl7",nec:0},
          {itemName:"故障描述", itemType:"textarea-readonly",itemValue:"wxms",nec:0},
          {itemName:"备注", itemType:"label",itemValue:"bzxx",nec:0},
          {itemName:"单据来源", itemType:"label", itemValue:"djlyName",nec:0},
          {itemName:"维修预算", itemType:"filter", itemValue:"ysze",nec:1},
          {itemName:"已占用预算", itemType:"label",itemValue:"yzyysze",nec:0},
          {itemName:"已使用预算", itemType:"label",itemValue:"ysyysze",nec:0},
          {itemName:"未使用预算", itemType:"label", itemValue:"wsyysze",nec:0},
          // {itemName:"预算编码", itemType:"label", itemValue:"ysbm",nec:0},
          // {itemName:"预算类别", itemType:"label",itemValue:"yslbName",nec:0},
          // {itemName:"预算单位", itemType:"label", itemValue:"ysdwmc",nec:0},
          // {itemName:"预算年度", itemType:"label",itemValue:"ysnd",nec:0},
          {itemName:"项目名称", itemType:"input",itemValue:"xmmc",nec:1},
          {itemName:"人工及配件费用", itemType:"input-spec",itemValue:"rgfwf",nec:1},
          {itemName:"备件", itemType:"filter2",itemValue:"bjmc",nec:0},
          {itemName:"备件费用", itemType:"input-spec",itemValue:"wxbjjehj",nec:0},
          {itemName:"问题来源", itemType:"select", itemValue:"wtly",nec:1,itemValueName:"wtly",optionValueString:"complexcode",optionNameString:"complexname",
            option:[
              {complexname:"巡检",complexcode:"巡检"},
              {complexname:"交班检查",complexcode:"交班检查"},
              {complexname:"周检",complexcode:"周检"},
              {complexname:"月检",complexcode:"月检"},
              {complexname:"季检",complexcode:"季检"},
              {complexname:"年检",complexcode:"年检"},
              {complexname:"专项检查",complexcode:"专项检查"},
              {complexname:"上级检查",complexcode:"上级检查"},
              {complexname:"政府来文",complexcode:"政府来文"},
              {complexname:"其他",complexcode:"其他"},
            ],
          },
          {itemName:"问题类别", itemType:"select", itemValue:"wtlb",nec:1,itemValueName:"wtlb",optionValueString:"complexcode",optionNameString:"complexname",
            option:[],
          },
          {itemName:"预估维修总值", itemType:"label",itemValue:"ygwxzz",nec:0},
          {itemName:"监控防范措施", itemType:"textarea",itemValue:"jkffcs",nec:0},
          {itemName:"整改措施", itemType:"textarea",itemValue:"zgcs",nec:0},
        ];
        this.httpService.postData2(this.httpService.getUrl2() + "lhd/app/devRepairController.do?getProblem", {}, data => {
          console.log(data.obj)
          let optionData = [];
          for (let i in data.obj){
            optionData.push({complexname:data.obj[i]['complexname'],complexcode:data.obj[i]['complexname']})
          }
          this.pageData.pageItem[0][21].option = optionData;
        }, false);
      }
    },false,(err)=>{console.log(err)})
  }
  ionViewDidEnter(){
    if (this.isFist){
      let node = document.getElementById("imgBox");
      if (this.invoice["sfscfj"] == 1){
        node.innerHTML = '';
        this.i = 0;
      }
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
                title:"不能删除最后一张图片"
              });
              alertCtrl.present();
              return false;
            }
            that.httpService.postData2(that.httpService.getUrl2() + "lhd/app/devRepairController.do?deleteAttach", {attachId:that.listBase64[id.slice(1)].attachId}, (data)=>{
              node.removeChild(div);
              that.listBase64.splice(parseInt(id.slice(1)), 1);
            },true)
          } catch (e) {
            alert(e)
          }
        };
        this.i++;
      }
    }
  }
  getWxHistory(i){
    this.httpService.postData2(this.httpService.getUrl2() + "lhd/app/devRepairController.do?queryLsxx", {dataobj:JSON.stringify(this.detailData[i])}, (data3)=> {
      this.detailData[i].wxCount = data3.obj.wxCount;
      this.detailData[i].sumMoney = data3.obj.sumMoney;
      this.tableData[i] = data3.obj.wxHistory;
    },false);
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
  getInputValue(value,key){
    this.showFooter();
    this.invoice[key] = value;
  }
  getSelectValue(value, key,keyName) {
    this.invoice[keyName] = value["selectedValue"];
  }
  hideFooter() {
    this.isFocus = true;
  }
  showFooter() {
    this.isFocus = false;
  }
  showFooterParam(value,ev){
    this.isFocus = false;
    ev.value = ev.value*1;
    if (ev.value>=0){
      this.invoice["ygwxzz"] -= this.invoice[value]*1;
      this.invoice[value] = ev.value;
      this.invoice["ygwxzz"] += this.invoice[value]*1;
    }else {
      if (this.invoice[value]*1>=0){
        this.invoice["ygwxzz"] -= this.invoice[value]*1;
      }
    }
  }
  showDictionaries(){
    let data=this.storageService.read("WXYS");
    let content = {
      searchCon:[
        {value : 0, text : '预算年度'},
        {value : 1, text : '预算单位'},
      ],
      searchSelect:0,
      item:{
        parent:[
          {itemName:"预算年度",itemValue:"ysnd"},
          {itemName:"预算单位",itemValue:"ysdwmc"},
        ],
        children:[
          {itemName:"预算编码", itemValue:"ysbm"},
          {itemName:"预算类别", itemValue:"yslbName"},
          {itemName:"预算项目", itemValue:"ysxm"},
          {itemName:"维修预算总额", itemValue:"ysze"},
          {itemName:"已占用预算总额", itemValue:"yzyysze"},
          {itemName:"已使用预算总额", itemValue:"ysyysze"},
          {itemName:"未使用预算总额", itemValue:"wsyysze"},
          {itemName:"已分解预算金额", itemValue:"yfjje"},
          {itemName:"剩余预算总额", itemValue:"syze"},
          {itemName:"预算项目编码", itemValue:"ysxmbm"},
          {itemName:"上级预算编码", itemValue:"sjysbm"},
        ]
      }
    }
    let body = {data:data,content:content}
    this.createDictionariesPage(RepairSupplementAlertPage,body)
  }
  createDictionariesPage(pageUrl,body){
    let modal = this.modalCtrl.create(pageUrl,body,{
    });
    modal.present();
    modal.onDidDismiss(data=>{
      if(data&&data.selectedData){
        console.log(data.selectedData);
        this.invoice["ysnd"] = data.selectedData["ysnd"];
        this.invoice["ysbm"] = data.selectedData["ysbm"];
        this.invoice["yslb"] = data.selectedData["yslb"];
        this.invoice["ysdwbm"] = data.selectedData["ysdwbm"];
        this.invoice["ysdwmc"] = data.selectedData["ysdwmc"];
        this.invoice["yslbName"] = data.selectedData["yslbName"];
        this.invoice["ysze"] = data.selectedData["ysze"];
        this.invoice["yzyysze"] = data.selectedData["yzyysze"];
        this.invoice["ysyysze"] = data.selectedData["ysyysze"];
        this.invoice["wsyysze"] = data.selectedData["wsyysze"];
      }
    })
  }
  addForm(){
    let data=[];
    let content = {
      searchCon:[
        {value : "bjmc", text : '备件名称'},
        {value : "bjbm", text : '备件编码'},
      ],
      searchSelect:"bjmc",
      item:{
        parent:[
          {itemName:"备件编码",itemValue:"bjbm"},
          {itemName:"备件名称",itemValue:"bjmc"},
        ],
      }
    }
    let body = {data:data,content:content}
    this.createAlertPage(RepairBjAlertPage,body)
  }
  createAlertPage(pageUrl,body){
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
  addForm2(){
    let data=this.storageService.read("GYS");
    let content = {
      searchCon:[
        {value : "gysdwmc", text : '厂商单位'},
        {value : "gysxh", text : '厂商序号'},
      ],
      searchSelect:"gysdwmc",
      item:{
        parent:[
          {itemName:"厂商序号", itemType:"label",itemValue:"gysxh"},
          {itemName:"厂商单位", itemType:"label",itemValue:"gysdwmc"},
        ],
        children:[
          {itemName:"厂商地址", itemType:"label",itemValue:"gysdz"},
          {itemName:"联系电话", itemType:"label",itemValue:"gyslxdh"},
          {itemName:"手机", itemType:"label",itemValue:"gyssjh"},
          {itemName:"厂商类型", itemType:"label",itemValue:"gyslxmc"},
        ]
      }
    }
    let body = {data:data,content:content}
    this.createAlertPage2(RepairGysAlertPage,body)
  }
  createAlertPage2(pageUrl,body){
    let modal = this.modalCtrl.create(pageUrl,body,{
    });
    modal.present();
    modal.onDidDismiss(data=>{
      if(data&&data.selectedData){
        console.log(data.selectedData);
        this.data.push({})
        this.data[this.data.length-1]["csxh"] = data.selectedData["gysxh"];
        this.data[this.data.length-1]["csdwmc"] = data.selectedData["gysdwmc"];
        this.data[this.data.length-1]["csdz"] = data.selectedData["gysdz"];
        this.data[this.data.length-1]["lxdh"] = data.selectedData["gyslxdh"];
        this.data[this.data.length-1]["phone"] = data.selectedData["gyssjh"];
        this.data[this.data.length-1]["cslx"] = data.selectedData["gyslxmc"];
      }
    })
  }
  deleteItem(index){
    let contentBox = document.getElementsByClassName("detailCallContentBox");
    if (index==this.displayIndex){
      this.displayIndex = -1;
    }
    contentBox[index].parentNode.removeChild(contentBox[index]);
    this.data.splice(index,1);
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
            if (this.listBase64.length==3){
              let alertCtrl = this.alertCtrl.create({
                title:"照片数量不能大于3张"
              });
              alertCtrl.present();
              return false;
            }
            this.httpService.postData2(this.httpService.getUrl2() + "/lhd/app/devRepairController.do?addAttach", {
              wxdh: this.invoice["wxdh"],
              base64: base64Image
            }, (data) => {
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
                  if (that.invoice["sfscfj"] == 1 && that.listBase64.length == 1) {
                    let alertCtrl = that.alertCtrl.create({
                      title: "不能删除最后一张图片"
                    });
                    alertCtrl.present();
                    return false;
                  }
                  that.httpService.postData2(that.httpService.getUrl2() + "lhd/app/devRepairController.do?deleteAttach", {attachId: attachId}, (data) => {
                    node.removeChild(div);
                    that.listBase64.splice(parseInt(id.slice(1)), 1);
                  }, true)
                } catch (e) {
                  alert(e)
                }
              };
              this.i++;
            }, true)
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
    if (this.isFist){
      if (this.shape=="brief"){
        setTimeout(() => {
          $(".inputSpec").eq(0).children("input").val(this.invoice["rgfwf"])
          $(".inputSpec").eq(1).children("input").val(this.invoice["wxbjjehj"])
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
                    title: "不能删除最后一张图片"
                  });
                  alertCtrl.present();
                  return false;
                }
                if (isUrl) {
                  that.httpService.postData2(that.httpService.getUrl2() + "lhd/app/devRepairController.do?deleteAttach", {attachId: that.listBase64[id.slice(1)].attachId}, (data) => {
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
    }else {
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
              "<img id=\"i" + j + "\" name=\"i" + j + "\" class=\"imgShow\" src=\"" + base64Image + "\">"
            node.appendChild(div);
            document.getElementById("i" + j).onclick = function () {
              try {
                that.app.getRootNav().push(ShowPicturePage, {picture: base64Image})
              } catch (e) {
                alert(e)
              }
            };
          }
        },100)
      }
    }

  }
  saveInfo(){
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
    let body = {djFormData:JSON.stringify(this.invoice),mainEquipData:JSON.stringify(this.detailData)};
    console.log(body);
    body["flag"] = 2;
    body['userName'] = this.storageService.read('loginUserName');
    body['userCode'] = this.storageService.read('loginUserCode');
    // body['DjFormData'] = JSON.stringify(this.invoice);
    // body['msData'] = this.invoice['wxms'];
    // body['bzData'] = this.invoice['bzxx'];
    // body['YSZY'] = this.invoice['yzyysze'];
    //"lhd/maintenanceremouldyn/devJWXGLDJSQYNController.do?saveInvoiceAndDetail"
    this.httpService.postData2(this.httpService.getUrl()+'lhd/app/devRepairController.do?saveGrid',body,(data)=>{
      let alertCtrl = this.alertCtrl.create({
        title:"保存成功！"
      });
      alertCtrl.present();
      this.app.getRootNav().pop();
    },true)
  }
  passForm(){
    if (this.isFist){
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
      let body = {djFormData:JSON.stringify(this.invoice),mainEquipData:JSON.stringify(this.detailData)};
      body["flag"] = 2;
      body['userName'] = this.storageService.read('loginUserName');
      body['userCode'] = this.storageService.read('loginUserCode');
      this.httpService.postData2(this.httpService.getUrl()+'lhd/app/devRepairController.do?saveGrid',body,(data)=>{
      let alertCtrl = this.alertCtrl.create({
        title:"通过",
        cssClass:"alertMiddle",
        inputs:[
          {
            name:"reason",
            placeholder:"请输入通过意见",
          }
        ],
        buttons:[
          {
            text:"取消",
          },
          {
            text:"确定",
            handler:(e)=>{
              if (!e.reason){
                let alertCtrl1 = this.alertCtrl.create({
                  title:"通过意见不能为空！"
                });
                alertCtrl1.present();
                return false;
              }else {
                this.httpService.postData2(this.httpService.getUrl2() + "lhd/app/rewriteDevJWXGLSHController.do?pass", {
                  dataobj: JSON.stringify([this.invoice]),
                  yj: e.reason,
                  flag:3
                }, data => {
                  console.log(data)
                  let alertCtrl = this.alertCtrl.create({
                    title: "通过成功！"
                  });
                  alertCtrl.present();
                  this.app.getRootNav().pop()
                }, true)
              }
            }
          }
        ]
      })
      alertCtrl.present();
    },true)
    }else {
      let alertCtrl = this.alertCtrl.create({
        title:"通过",
        cssClass:"alertMiddle",
        inputs:[
          {
            name:"reason",
            placeholder:"请输入通过意见",
          }
        ],
        buttons:[
          {
            text:"取消",
          },
          {
            text:"确定",
            handler:(e)=>{
              if (!e.reason){
                let alertCtrl1 = this.alertCtrl.create({
                  title:"通过意见不能为空！"
                });
                alertCtrl1.present();
                return false;
              }else {
                this.httpService.postData2(this.httpService.getUrl2() + "lhd/app/rewriteDevJWXGLSHController.do?pass", {
                  dataobj: JSON.stringify([this.invoice]),
                  yj: e.reason,
                  flag:3
                }, data => {
                  console.log(data)
                  let alertCtrl = this.alertCtrl.create({
                    title: "通过成功！"
                  });
                  alertCtrl.present();
                  this.app.getRootNav().pop()
                }, true)
              }
            }
          }
        ]
      })
      alertCtrl.present();
    }
  }
  rejectForm(){
    let alertCtrl = this.alertCtrl.create({
      title:"驳回",
      cssClass:"alertMiddle",
      inputs:[
        {
          name:"reason",
          placeholder:"请输入驳回意见",
        }
      ],
      buttons:[
        {
          text:"取消",
        },
        {
          text:"确定",
          handler:(e)=>{
            if (!e.reason){
              let alertCtrl1 = this.alertCtrl.create({
                title:"驳回意见不能为空！"
              });
              alertCtrl1.present();
              return false;
            }else {
              this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/rewriteDevJWXGLSHController.do?reject",{dataobj:JSON.stringify([this.invoice]),yj:e.reason,flag:3},data=>{
                console.log(data)
                let alertCtrl = this.alertCtrl.create({
                  title:"驳回成功！"
                });
                alertCtrl.present();
                this.app.getRootNav().pop()
              },true)
            }
          }
        }
      ]
    })
    alertCtrl.present();
  }
}
