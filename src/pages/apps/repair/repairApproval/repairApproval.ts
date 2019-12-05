import {Component} from '@angular/core';
import {
  ActionSheetController, AlertController, App, Events, ModalController, NavController,
  NavParams
} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";
import {DatePipe} from "@angular/common";
import {Camera} from "@ionic-native/camera";
import {ShowPicturePage} from "../../../commonStyle/showPicture/showPicture";
import {File} from "@ionic-native/file";
import {ConfigProvider} from "../../../../services/config";
import * as $ from "jquery";
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
      // this.invoice["ygwxzz"] = this.invoice["rgfwf"] + this.invoice["wxbjjehj"];
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
          {itemName:"备注", itemType:"label",itemValue:"remark",nec:0},
          {itemName:"单据来源", itemType:"label", itemValue:"djlyName",nec:0},
          {itemName:"维修预算", itemType:"filter", itemValue:"ysze",nec:1},
          {itemName:"已占用预算", itemType:"label",itemValue:"yzyysze",nec:0},
          {itemName:"已使用预算", itemType:"label",itemValue:"ysyysze",nec:0},
          {itemName:"未使用预算", itemType:"label", itemValue:"wsyysze",nec:0},
          {itemName:"预算编码", itemType:"label", itemValue:"ysbm",nec:0},
          {itemName:"预算类别", itemType:"label",itemValue:"yslbName",nec:0},
          {itemName:"预算单位", itemType:"label", itemValue:"ysdwmc",nec:0},
          {itemName:"预算年度", itemType:"label",itemValue:"ysnd",nec:0},
          {itemName:"项目名称", itemType:"input",itemValue:"xmmc",nec:1},
          {itemName:"人工及配件费用", itemType:"input-spec",itemValue:"rgfwf",nec:1},
          {itemName:"备件", itemType:"filter2",itemValue:"bjmc",nec:0},
          {itemName:"备件费用", itemType:"input-spec",itemValue:"wxbjjehj",nec:0},
          {itemName:"预估维修总值", itemType:"label",itemValue:"ygwxzz",nec:0},
          {itemName:"监控防范措施", itemType:"textarea",itemValue:"jkffcs",nec:0},
          {itemName:"整改措施", itemType:"textarea",itemValue:"zgcs",nec:0},
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
    }
    if (this.invoice["wxfs"]=="供应商维修"){
      this.pageData.segmentName =["单据信息", "主设备","供应商"]
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
  passForm(){
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
