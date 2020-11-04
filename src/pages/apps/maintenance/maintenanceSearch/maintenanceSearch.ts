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
let that;
@Component({
  selector: 'page-maintenanceSearch',
  templateUrl: 'maintenanceSearch.html'
})
export class MaintenanceSearchPage {
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
  insertCspj = [];
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService, public datePipe?: DatePipe, public actionSheetCtrl?: ActionSheetController,
              public camera?: Camera, public file?: File, public modalCtrl?: ModalController) {
    that = this;
    this.invoice = this.navParams.get("data");
      if (this.invoice["sfscfj"] == 1)
        this.listBase64 = this.listBase64.concat( this.invoice['imgUrl']);
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

    this.pageData = {
      pageItem:[
        // {itemName:"单位名称", itemType:"label",itemValue:"departName",nec:0},
        {itemName:"保养编号", itemType:"label",itemValue:"maintenanceNumberDetail",nec:0},
        {itemName:"设备名称", itemType:"label",itemValue:"assetsName",nec:0},
        {itemName:"设备编码", itemType:"label",itemValue:"assetsCode",nec:0},
        // {itemName:"提醒日期", itemType:"label",itemValue:"remindDate",nec:0},
        {itemName:"保养金额", itemType:"label",itemValue:"maintenanceAmount",nec:0},
        {itemName:"保养位置", itemType:"label",itemValue:"maintenancePosition",nec:0},
        {itemName:"保养厂商", itemType:"label",itemValue:"maintenanceFactory",nec:0},
        {itemName:"设备使用状态", itemType:"label",itemValue:"deviceUseStatus",nec:0},
        {itemName:"设备技术状态", itemType:"label",itemValue:"deviceTechStatus",nec:0},
        {itemName:"保养记录", itemType:"textarea",itemValue:"maintenanceRemark",nec:0},
      ],
    }
  }
  ionViewDidLoad() {

  }
}
