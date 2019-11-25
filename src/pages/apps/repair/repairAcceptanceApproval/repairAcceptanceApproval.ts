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
@Component({
  selector: 'page-repairAcceptanceApproval',
  templateUrl: 'repairAcceptanceApproval.html'
})
export class RepairAcceptanceApprovalPage {
  shape = "brief";
  isFocus = false;
  pageData;
  invoice = [];
  data;
  detailData;
  evaluateData = {};
  i = 0;
  displayIndex;
  tableData;
  lightStar = ["star","star","star","star-outline","star-outline"]
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService, public datePipe?: DatePipe, public actionSheetCtrl?: ActionSheetController,
              public camera?: Camera, public file?: File, public modalCtrl?: ModalController) {
    this.invoice["repairMethod"]="供应商维修"
    this.invoice["验收人"] = this.storageService.read("loginUserName");
    let date = new Date();
    this.invoice["维修结束日期"] = this.datePipe.transform(date,"yyyy-MM-dd");
    this.pageData = {
      segmentName:["单据信息", "主设备","","厂商评价"],
      pageItem:[
        [
          {itemName:"维修单号", itemType:"label",itemValue:"createUserName1",nec:0},
          {itemName:"单据状态", itemType:"label",itemValue:"invoiceStatus",nec:0},
          {itemName:"申请时间", itemType:"label",itemValue:"createdate",nec:0},
          {itemName:"申请单位", itemType:"label",itemValue:"departName",nec:0},
          {itemName:"所属城市", itemType:"label",itemValue:"city",nec:0},
          {itemName:"申请人", itemType:"label",itemValue:"createUserName",nec:0},
          {itemName:"联系电话", itemType:"label",itemValue:"createUserName4",nec:0},
          {itemName:"维修方式", itemType:"label", itemValue:"invoiceType",nec:0},
          {itemName:"紧急程度", itemType:"label", itemValue:"invoiceType",nec:0},
          {itemName:"故障描述", itemType:"label",itemValue:"createUserName5",nec:0},
          {itemName:"维修预算", itemType:"label", itemValue:"invoiceType",nec:0,},
          {itemName:"已占用预算", itemType:"label",itemValue:"createUserName",nec:0},
          {itemName:"已使用预算", itemType:"label",itemValue:"createUserName4",nec:0},
          {itemName:"未使用预算", itemType:"label", itemValue:"invoiceType",nec:0},
          {itemName:"预算编码", itemType:"label", itemValue:"invoiceType",nec:0},
          {itemName:"预算类别", itemType:"label",itemValue:"createUserName5",nec:0},
          {itemName:"预算单位", itemType:"label", itemValue:"invoiceType",nec:0},
          {itemName:"未使用预算", itemType:"label", itemValue:"invoiceType",nec:0},
          {itemName:"预算年度", itemType:"label",itemValue:"createUserName5",nec:0},
          {itemName:"项目名称", itemType:"label",itemValue:"createUserName4",nec:0},
          {itemName:"人工及配件费用", itemType:"label",itemValue:"人工及配件费用",nec:0},
          {itemName:"备件", itemType:"label",itemValue:"createUserName4",nec:0},
          {itemName:"备件费用", itemType:"label",itemValue:"备件费用",nec:0},
          {itemName:"预估维修总值", itemType:"label",itemValue:"预估维修总值",nec:0},
          {itemName:"监控防范措施", itemType:"textarea-readonly",itemValue:"createUserName4",nec:0},
          {itemName:"整改措施", itemType:"textarea-readonly",itemValue:"createUserName4",nec:0},
          {itemName:"验收日期", itemType:"label",itemValue:"验收日期",nec:0},
          {itemName:"验收人", itemType:"label",itemValue:"验收人",nec:0},
          {itemName:"维修结束日期", itemType:"label",itemValue:"维修结束日期",nec:0},
          {itemName:"发票类型", itemType:"label", itemValue:"发票类型",nec:0,itemValueName:"invoiceName",optionValueString:"optionValue",optionNameString:"optionName",
            option:[
              {optionName:"有形（正常报废）",optionValue:"020201"},
              {optionName:"有形（非正常地区公司批复）",optionValue:"020202"},
              {optionName:"有形（非正常总部批复）",optionValue:"020203"},
            ],},
          {itemName:"验收金额", itemType:"label",itemValue:"验收金额",nec:0},
          {itemName:"验收结论", itemType:"textarea-readonly",itemValue:"验收结论",nec:0},

        ],
        [
          {itemType:"card",
            card:{
              cardParent:[
                {itemName:"设备编码", itemType:"label",itemValue:"assetsCode"},
                {itemName:"设备名称", itemType:"label",itemValue:"assetsName"},
              ],
              cardChild:[
                {itemName:"是否外包", itemType:"label",itemValue:"assetsCode"},
                {itemName:"所属单位", itemType:"label",itemValue:"departName"},
                {itemName:"资产类型", itemType:"label",itemValue:"remark"},
                {itemName:"资产类别", itemType:"label",itemValue:"storePlace"},
                {itemName:"资产名称", itemType:"label",itemValue:"assetsStandard"},
                {itemName:"自编码", itemType:"label",itemValue:"licenceNumber"},
                {itemName:"特种设备", itemType:"label",itemValue:"makeFactory"},
                {itemName:"规格型号", itemType:"label",itemValue:"departCode"},
                {itemName:"历史维修信息",itemType:"label", itemValue:"makeFactory"},
                {itemName:"\u00A0\u00A0\u00A0\u00A0设备总维修次数",itemType:"label", itemValue:"makeFactory"},
                {itemName:"\u00A0\u00A0\u00A0\u00A0总维修金额",itemType:"label", itemValue:"departCode"},
                {itemName:"历史维修信息明细",itemType:"label", itemValue:"makeFactory"},
                {itemType:"table",tableItem:[
                    {colName:"维修日期",colValue:"repairDate"},
                    {colName:"维修金额",colValue:"repairMoney"},
                    {colName:"故障描述",colValue:"repairDescribe"},
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
                {itemName:"厂商序号", itemType:"label",itemValue:"assetsCode"},
                {itemName:"厂商单位名称", itemType:"label",itemValue:"assetsName"},
              ],
              cardChild:[
                {itemName:"厂商地址", itemType:"label",itemValue:"assetsCode"},
                {itemName:"联系电话", itemType:"label",itemValue:"departName"},
                {itemName:"手机", itemType:"label",itemValue:"remark"},
                {itemName:"厂商类型", itemType:"label",itemValue:"storePlace"},
              ]
            }
          }
        ],
        [
          {itemName:"维修时限评分", itemType:"label",itemValue:"维修时限评分",nec:0},
          {itemName:"作业风险", itemType:"label", itemValue:"作业风险",nec:0,itemValueName:"invoiceName",optionValueString:"optionValue",optionNameString:"optionName",
            option:[
              {optionName:"有",optionValue:"1"},
              {optionName:"无",optionValue:"0"},
            ],
          },
          {itemName:"首次修复", itemType:"label", itemValue:"首次修复",nec:0,itemValueName:"invoiceName",optionValueString:"optionValue",optionNameString:"optionName",
            option:[
              {optionName:"是",optionValue:"1"},
              {optionName:"否",optionValue:"0"},
            ],
          },
          {itemName:"整体服务", itemType:"star",itemValue:"整体服务",nec:0},
        ],
      ],
    }
    if (this.invoice["te"]==1){
      this.pageData.pageItem[0][29].itemType = "label";
      this.invoice["发票类型"] = "增值税普通发票";
    }
    this.data = [{assetsCode:"1",assetsName:"2"}]
    this.detailData = [{assetsCode:"1",assetsName:"2"}]
    if (this.invoice["repairMethod"]=="供应商维修"){
      this.pageData.segmentName =["单据信息", "主设备","供应商","厂商评价"]
    }
    this.invoice["uploadFile"] = [
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569582922634&di=2bad3d7f4143ebfc5b14b2795b8945bf&imgtype=0&src=http%3A%2F%2Fpic26.nipic.com%2F20130121%2F8854832_165308225000_2.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569582957497&di=70fb6489a4602b571e0697a9303537db&imgtype=0&src=http%3A%2F%2Fpic22.nipic.com%2F20120624%2F8960079_094140526342_2.jpg"
    ]
    this.tableData = [
      {repairDate:"2019-10-18",repairMoney:"2000",repairDescribe:"ceshi1"},
      {repairDate:"2019-11-19",repairMoney:"3000",repairDescribe:"ceshi2"},
      {repairDate:"2019-12-20",repairMoney:"4000",repairDescribe:"ceshi3"},
    ]
  }
  ionViewDidLoad() {
    if (this.invoice["uploadFile"]&&this.invoice["uploadFile"].length>0){
      this.getAndShowPics(this.invoice["uploadFile"])
    }
  }
  hideFooter() {
    this.isFocus = true;
  }
  showFooter() {
    this.isFocus = false;
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
  getAndShowPics(base64Images){
    let node = document.getElementById("imgBox");
    this.i=0;
    if (base64Images.length>0){
      for (let i in base64Images){
        let base64Image = base64Images[i];
        let div = document.createElement("div");
        div.className = "imgInclusion";
        div.innerHTML +=
          "<img id=\"i" + this.i + "\" name=\"i" + this.i + "\" class=\"imgShow\" src=\"" + base64Image + "\">" +
          // "<img id=\"b" + this.i + "\" class=\"imgDeleteButton\" src='assets/imgs/delete.png'>" +
          "";
        node.appendChild(div);
        // this.invoice["uploadFile"].push(base64Images[i]);
        document.getElementById("i" + this.i).onclick = (e) => {
          try {
            this.app.getRootNav().push(ShowPicturePage, {picture: base64Image})
          } catch (e) {
            alert(e)
          }
        };
        // document.getElementById("b" + this.i).onclick = (e) => {
        //   try {
        //     node.removeChild(div);
        //     this.invoice["uploadFile"].splice(parseInt((<HTMLElement>div.firstChild).id.slice(1)), 1);
        //   } catch (e) {
        //     alert(e)
        //   }
        // };
        this.i++;
      }
    }
  }
  lightingStar(index){
    if (this.lightStar[index] == "star-outline"){
      for (let i = 0; i<index;i++){
        this.lightStar[i] = "star"
      }
      this.lightStar[index] = "star";
    }else {
      for (let i = this.lightStar.length-1; i>index;i--){
        this.lightStar[i] = "star-outline"
      }
    }
  }
}
