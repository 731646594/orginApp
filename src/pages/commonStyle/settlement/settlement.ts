import { Component } from '@angular/core';
import {AlertController, App, Events, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";
import * as $ from "jquery";
import {ConfigProvider} from "../../../services/config";
import {ProspectingPage} from "../../apps/settlement/prospecting/prospecting";

@Component({
  selector: 'page-settlement',
  templateUrl: 'settlement.html'
})
export class SettlementPage {
  cardData;
  itemData=[];
  pageName;
  isFocus = false;
  isNewSearch = true;
  page=1;
  pageSize=20;
  listUrl = "";
  submitUrl = "";
  deleteUrl = "";
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService,public modalCtrl?:ModalController, public toastCtrl?:ToastController) {
    this.pageName = this.navParams.get("pageName");
    if (this.pageName == "勘探部项目款审批"){
      this.listUrl = "lhd/app/devRepairController.do?datagrid";
      this.submitUrl = "";
      this.deleteUrl = "";
    }else if (this.pageName == "工程竣工决算款审批"){
      this.listUrl = "lhd/app/devRepairController.do?datagridbl";
      this.submitUrl = "";
      this.deleteUrl = "";
    }else if (this.pageName == "进度款审批"){
      this.listUrl = "lhd/app/devRepairController.do?datagridsp";
      this.submitUrl = "";
      this.deleteUrl = "";
    }else if (this.pageName == "一厂/三厂进度款审批"){
      this.listUrl = "lhd/app/devRepairController.do?datagridys";
      this.submitUrl = "";
      this.deleteUrl = "";
    }else if (this.pageName == "储气库投资表审批"){
      this.listUrl = "lhd/app/devRepairController.do?datagridyssp"
      this.submitUrl = "";
      this.deleteUrl = "";
    }
    this.cardData = {
      cardParent:[
        {itemName:"单据编号", itemType:"label",itemValue:"wxdh"},
        {itemName:"单据状态", itemType:"label",itemValue:"djzt"},
        {itemName:"申请人", itemType:"label",itemValue:"sqrmc"},
        {itemName:"申请时间", itemType:"label",itemValue:"sqsj"},
      ],
    };
    if (this.pageName == "勘探部项目款审批") {
      this.cardData.cardParent[2] = {itemName: "申请单位", itemType: "label", itemValue: "sqdwmc"}
    }
    if (this.pageName == "工程竣工决算款审批") {
      this.cardData.cardParent = [
        {itemName:"维修编号", itemType:"label",itemValue:"WXDH"},
        {itemName:"派单状态", itemType:"label",itemValue:"djztName"},
        {itemName:"单位名称", itemType:"label",itemValue:"SQDWMC"},
        {itemName:"设备名称", itemType:"label",itemValue:"SBMC"},
        {itemName:"维修人", itemType:"label",itemValue:"SQRMC"},
      ]
    }
  }
  ionViewDidLoad(){
    this.itemData = [{}]
    // this.page = 1;
    // this.isNewSearch = true;
    // this.httpService.postData2(this.httpService.getUrl3()+this.listUrl,{page:this.page,rows:this.pageSize,funccode:this.funccode},data=>{
    //   this.itemData = data.obj.rows;
    //   for (let i in this.itemData){
    //     this.itemData[i]["djztName"] = ConfigProvider.djztName(this.itemData[i]["djzt"])
    //   }
    //   console.log(this.itemData)
    // },true);
  }
  showForm(Data){
    if (this.pageName == "勘探部项目款审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data})
    }else if (this.pageName == "工程竣工决算款审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data})
    }else if (this.pageName == "进度款审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data})
    }else if (this.pageName == "一厂/三厂进度款审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data})
    }else if (this.pageName == "储气库投资表审批"){
      this.app.getRootNav().push(ProspectingPage,{pageName:this.pageName,data:Data})
    }
  }
  submitForm(detail){
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
              this.httpService.postData2(this.httpService.getUrl3() + this.submitUrl, {
                dataobj: JSON.stringify([detail]),
                yj: e.reason
                ,flag:3
              }, data => {
                console.log(data)
                let alertCtrl = this.alertCtrl.create({
                  title: "通过成功！"
                });
                alertCtrl.present();
                this.ionViewDidLoad()
              }, true)
            }
          }
        }
      ]
    })
    alertCtrl.present();
  }
  deleteForm(detail){
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
              this.httpService.postData2(this.httpService.getUrl3()+this.deleteUrl,{dataobj:JSON.stringify([detail]),yj:e.reason,flag:3},data=>{
                console.log(data)
                let alertCtrl = this.alertCtrl.create({
                  title:"驳回成功！"
                });
                alertCtrl.present();
                this.ionViewDidLoad()
              },true)
            }
          }
        }
      ]
    })
    alertCtrl.present();
  }
  getMore(infiniteScroll){
    this.page++;
    let url,body;
    url = this.listUrl;
    body = {page:this.page,rows:this.pageSize};
    this.httpService.postData2(this.httpService.getUrl2()+url,body,data=>{
      console.log(data)
      for (let i in data.obj.rows){
        data.obj.rows[i]["djztName"] = ConfigProvider.djztName(data.obj.rows[i]["djzt"])
        this.itemData.push(data.obj.rows[i])
      }
      if (!data.obj.rows[0]){
        this.isNewSearch = false;
        let toast = this.toastCtrl.create({
          message: "这已经是最后一页了",
          duration: 2000,
        });
        toast.present();
      }
      infiniteScroll.complete();
    })
  }
}
