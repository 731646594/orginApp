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
// import {RepairExternalSignaturePage} from "../repairExternalSignature/repairExternalSignature";
import {ConfigProvider} from "../../../../services/config";
import {RepairBjAlertPage} from "../repairBjAlert/repairBjAlert";
let that;

@Component({
  selector: 'page-repairExternal',
  templateUrl: 'repairExternal.html'
})
export class RepairExternalPage {
  isFocus = false;
  pageData;
  invoice = [];
  data;
  detailData=[];
  i = 0;
  displayIndex;
  tableData=[];
  pageName;
  // signatureImage = "";
  listBase64 = [];
  isShowFooter = true;
  shape = "brief";
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService, public datePipe?: DatePipe, public actionSheetCtrl?: ActionSheetController,
              public camera?: Camera, public file?: File, public modalCtrl?: ModalController) {
    that = this;
    this.pageName = this.navParams.get("pageName");
    this.invoice = this.navParams.get("data");
    let selectData=[];
    let url = "lhd/app/devPeripheryRepairController.do?getPeripheryPlanDetail";
    if (this.pageName == "开始维修"||this.pageName == "维修办结"){
      url = "lhd/app/devPeripheryRepairController.do?getPeripheryRepairDetail"
    }
    this.httpService.postData2(this.httpService.getUrl2()+url,{wxdh:this.invoice["WXDH"],departCode:this.storageService.read("loginDepartCode"),id:this.invoice["ID"]},(data)=> {
      console.log(data);
      let temp = data.obj;
      if (this.pageName == "维修办结"){
        this.detailData.push(temp.mainEquipment);
        for (let i in this.detailData) {
          this.getWxHistory(i)
        }
      }
      this.invoice = temp.orderInfo;
      this.invoice["djztName"] = ConfigProvider.djztName(this.invoice["djzt"]);
      this.invoice["wxms"] = temp.wxms;
      if (!this.invoice["xysj"]){
        this.invoice["xysj"] = "点击“派单”后自动生成"
      }
      if (!this.invoice["hfsj"]){
        this.invoice["hfsj"] = "点击“办结”后自动生成"
      }
      if (this.pageName == "开始维修"){
        if (!this.invoice["zfyl16"]){
          this.invoice["zfyl16"] = "点击“进场”后自动生成"
        }
      }
      if (this.invoice["djzt"]==10){
        this.pageData.pageItem[0][10].itemType = "label";
        this.pageData.pageItem[0][10].itemValue = "bpdr";
      }
      if (this.invoice["zfyl17"]){
        this.pageData.pageItem[0][12].itemType = "textarea-readonly";
        if (this.pageName == "开始维修"){
          this.isShowFooter = false;
        }
      }
      selectData = temp.operatorList;
      this.pageData.pageItem[0][10].option = temp.operatorList;
      if (this.invoice["sfscfj"] == 1){
        let url = storageService.read("systemUrl")+"";
        let urlHead = url.split(":")[0]+"://"+url.split("/")[2];
        if (temp.imgUrlList.indexOf(",")>-1){
          for (let i in temp.imgUrlList.split(",")){
            this.listBase64.push(urlHead + temp.imgUrlList.split(",")[i]);
          }
        }else {
          this.listBase64.push(urlHead + temp.imgUrlList);
        }
        let node = document.getElementById("imgBox");
        for (let j in this.listBase64){
          let base64Image = this.listBase64[j];
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
      }
    },true);
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
          {itemName:"进场人员", itemType:"select",itemValue:"ACCOUNT",itemValueName:"FULLNAME",optionValueString:"ACCOUNT",optionNameString:"FULLNAME",nec:0,
            option:selectData
          },
          {itemName:"响应时间", itemType:"label", itemValue:"xysj",nec:0}
        ],
        [
          {itemType: "card",
            card: {
            cardParent: [
              {itemName: "设备编码", itemType: "label", itemValue: "sbbm"},
              {itemName: "设备名称", itemType: "label", itemValue: "sbmc"},
            ],
            cardChild: [
              {itemName: "是否外包", itemType: "label", itemValue: "zfyl10"},
              {itemName: "所属单位", itemType: "label", itemValue: "ssdwmc"},
              {itemName: "资产类型", itemType: "label", itemValue: "sblxmc"},
              {itemName: "资产类别", itemType: "label", itemValue: "zclbmc"},
              // {itemName:"资产名称", itemType:"label",itemValue:"zcmc"},
              // {itemName:"自编码", itemType:"label",itemValue:"zczbm"},
              {itemName: "特种设备", itemType: "label", itemValue: "tssb"},
              {itemName: "规格型号", itemType: "label", itemValue: "ggxhmc"},
              {itemName: "历史维修信息", itemType: "label", itemValue: "makeFactory"},
              {itemName: "\u00A0\u00A0\u00A0\u00A0设备总维修次数", itemType: "label", itemValue: "wxCount"},
              {itemName: "\u00A0\u00A0\u00A0\u00A0总维修金额", itemType: "label", itemValue: "sumMoney"},
              {itemName: "历史维修信息明细", itemType: "label", itemValue: "makeFactory"},
              {
                itemType: "table", tableItem: [
                  {colName: "维修日期", colValue: "wxrq"},
                  {colName: "维修金额", colValue: "zfyl1"},
                  {colName: "故障描述", colValue: "zfyl2"},
                ]
              }
            ]
          }
        }
      ]
      ],
    }
    if (this.pageName == "开始维修"){
      this.pageData.pageItem[0][9] = {itemName:"故障描述", itemType:"textarea-readonly",itemValue:"wxms",nec:0};
      this.pageData.pageItem[0][10] = {itemName:"进场人员", itemType:"label",itemValue:"bpdr",nec:0};
      this.pageData.pageItem[0][11] = {itemName:"相应时间", itemType:"label",itemValue:"xysj",nec:0};
      this.pageData.pageItem[0][12] = {itemName:"进场信息", itemType:"textarea",itemValue:"zfyl17",nec:1};
      this.pageData.pageItem[0][13] = {itemName:"进场时间", itemType:"label",itemValue:"zfyl16",nec:1};
    }else if (this.pageName == "维修办结"){
      this.pageData.pageItem[0][9] = {itemName:"故障描述", itemType:"textarea-readonly",itemValue:"wxms",nec:0};
      this.pageData.pageItem[0][10] = {itemName:"进场人员", itemType:"label",itemValue:"bpdr",nec:0};
      this.pageData.pageItem[0][11] = {itemName:"相应时间", itemType:"label",itemValue:"xysj",nec:0};
      this.pageData.pageItem[0][12] = {itemName:"进场信息", itemType:"textarea-readonly",itemValue:"zfyl17",nec:0};
      this.pageData.pageItem[0][13] = {itemName:"进场时间", itemType:"label",itemValue:"zfyl16",nec:0};
      this.pageData.pageItem[0][14] = {itemName:"备件", itemType:"filter",itemValue:"bjmc",nec:1};
      this.pageData.pageItem[0][15] = {itemName:"恢复时间", itemType:"label",itemValue:"hfsj",nec:1};
      this.pageData.pageItem[0][16] = {itemName:"油站经理签字", itemType:"sign",itemValue:"sign",nec:1};
    }
  }
  ionViewDidLoad() {

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
  getSelectValue(select,value,name){
    this.invoice[value] = select["selectedValue"];
    this.invoice[name] = select["selectedName"]
  }
  hideFooter() {
    this.isFocus = true;
  }
  showFooter() {
    this.isFocus = false;
  }
  showFooterParam(value,ev){
    this.isFocus = false;
    if (ev.value>=0){
      this.invoice["预估维修总值"] -= this.invoice[value]*1;
      this.invoice[value] = ev.value;
      this.invoice["预估维修总值"] += this.invoice[value]*1;
    }else {
      if (this.invoice[value]*1>=0){
        this.invoice["预估维修总值"] -= this.invoice[value]*1;
      }
    }
  }
  showDictionaries(value){
    this.httpService.postData2(this.httpService.getUrl2() + "lhd/app/devPeripheryRepairController.do?getSparePartsList", {}, (data)=> {
      let data1 = data.obj;
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
      let body = {data:data1,content:content}
      this.createDictionariesPage(RepairBjAlertPage,body)
    },true);
  }
  createDictionariesPage(pageUrl,body){
    let modal = this.modalCtrl.create(pageUrl,body,{
    });
    modal.present();
    modal.onDidDismiss(data=>{
      if(data&&data.selectedData){
        console.log(data.selectedData)
        this.invoice["bjbm"] = data.selectedData["bjbm"];
        this.invoice["bjmc"] = data.selectedData["bjmc"];
      }
    })
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
  // signature(){
  //   this.app.getRootNav().push(RepairExternalSignaturePage,{callback:this.myCallbackFunction})
  // }
  // myCallbackFunction  =(params) => {
  //   return new Promise((resolve, reject) => {
  //
  //     if(typeof(params)!='undefined'){
  //       resolve('ok');
  //       this.signatureImage = params;
  //     }else{
  //
  //       reject(Error('error'))
  //     }
  //
  //   });
  // };
  // showSign(){
  //   this.app.getRootNav().push(ShowPicturePage,{picture:this.signatureImage});
  // }
  // deleteImg(){
  //   this.signatureImage = "";
  // }
  dispatchForm(){
    if (!this.invoice["ACCOUNT"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择进场人员！"
      });
      alertCtrl.present();
      return false;
    }
    this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/devPeripheryRepairController.do?savePeripheryPicketing",{
      userCode:this.storageService.read("loginUserCode"),
      userName:this.storageService.read("loginUserName"),
      wxdh:this.invoice["wxdh"],
      id:this.invoice["id"],
      repairUser:this.invoice["FULLNAME"],
      repairUserCode:this.invoice["ACCOUNT"]
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
    if (!this.invoice["zfyl17"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请填写进场信息！"
      });
      alertCtrl.present();
      return false;
    }
    this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/devPeripheryRepairController.do?savePeripheryRepair",{
      wxdh:this.invoice["wxdh"],
      id:this.invoice["id"],
      jcxx:this.invoice["zfyl17"]
    },(data)=>{
      console.log(data);
      let alertCtrl = this.alertCtrl.create({
        title:"进场完成！"
      });
      alertCtrl.present();
      this.app.getRootNav().pop()
    },true)
  }
  saveForm(){
    if (!this.invoice["bjmc"]){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择备件！"
      });
      alertCtrl.present();
      return false;
    }
    // if (!this.signatureImage){
    //   let alertCtrl = this.alertCtrl.create({
    //     title:"请油站经理签字！"
    //   });
    //   alertCtrl.present();
    //   return false;
    // }
    this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/devPeripheryRepairController.do?savePeripheryRepairFinish",{
      wxdh:this.invoice["wxdh"],
      id:this.invoice["id"],
      bjmc:this.invoice["bjmc"],
      bjbm:this.invoice["bjbm"],
      // signImage:this.signatureImage
    },(data)=>{
      console.log(data);
      let alertCtrl = this.alertCtrl.create({
        title:"办结完成！"
      });
      alertCtrl.present();
      this.app.getRootNav().pop()
    },true)
  }
}
