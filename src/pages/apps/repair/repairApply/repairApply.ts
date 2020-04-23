import {Component} from '@angular/core';
import {AlertController, App, Events, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";
import {RepairApplyAddPage} from "../repairApplyAdd/repairApplyAdd";
import {RepairSupplementPage} from "../repairSupplement/repairSupplement";
import {RepairApprovalPage} from "../repairApproval/repairApproval";
import {RepairAcceptancePage} from "../repairAcceptance/repairAcceptance";
import {RepairAcceptanceApprovalPage} from "../repairAcceptanceApproval/repairAcceptanceApproval";
import {RepairSearchPage} from "../repairSearch/repairSearch";
import {RepairSearchAlertPage} from "../repairSearchAlert/repairSearchAlert";
import {RepairExternalPage} from "../repairExternal/repairExternal";
import {MaintenancePage} from "../../maintenance/maintenance";
import {ConfigProvider} from "../../../../services/config";
import * as $ from "jquery";
import {MaintenanceAcceptancePage} from "../../maintenance/maintenanceAcceptance/maintenanceAcceptance";

@Component({
  selector: 'page-repairApply',
  templateUrl: 'repairApply.html'
})
export class RepairApplyPage {
  cardData;
  itemData=[];
  itemDataOrgin = [];
  pageName;
  isFocus = false;
  isNewSearch = true;
  page=1;
  pageSize=20;
  listUrl = "";
  funccode="";
  operatorList = [];
  refreshData = true;
  searchValue = "";
  constructor(public navCtrl?: NavController, public navParams?: NavParams, public alertCtrl?: AlertController,
              public storageService?: StorageService, public events?: Events, public app?: App,
              public httpService?: HttpService,public modalCtrl?:ModalController, public toastCtrl?:ToastController) {
    this.pageName = this.navParams.get("pageName");
    this.funccode = this.navParams.get("funccode");
    this.events.subscribe("showFooter", (res) => {
      this.showFooter()
    });
    this.events.subscribe("hideFooter", (res) => {
      this.hideFooter();
    });
    // if (this.pageName == "开始维修"||this.pageName == "维修办结"){
    //   this.listUrl = "/lhd/app/devRepairController.do?datagrid"
    // }
    if (this.pageName == "维修申请"||this.pageName == "维修申请补录"||this.pageName == "维修审批"||this.pageName == "维修验收审批") {
      this.httpService.postData2(this.httpService.getUrl2() + "lhd/app/devRepairController.do?editData", {}, data => {
        this.storageService.write("listJjcd", data.obj.zd.listJjcd);
        this.storageService.write("listWxfs", data.obj.zd.listWxfs);
      }, false);
      this.httpService.postData2(this.httpService.getUrl2() + "lhd/app/rewriteDevWXYSFJController.do?datagrid", {
        queryfilter: JSON.stringify({ysdwbm: this.storageService.read("loginDepartCode") + "%"}),
        rows: "全部"
      }, (data) => {
        for (let i in data.obj.rows) {
          data.obj.rows[i]["yslbName"] = ConfigProvider.yslbName(data.obj.rows[i]["yslb"])
        }
        this.storageService.write("WXYS", data.obj.rows);
        this.httpService.postData2(this.httpService.getUrl2() + "lhd/app/devRepairController.do?gysList", {dataobj: "(gyszt = '0' and instr(wxdwbm,'" + this.storageService.read("loginDepartCode") + "') > 0)"}, (data2) => {
          this.storageService.write("GYS", data2.obj.rows)
        }, false);
      }, false);
    }
    if (this.pageName == "维修申请"){
      this.listUrl = "lhd/app/devRepairController.do?datagrid";
      this.funccode = "4000001000"
    }else if (this.pageName == "维修申请补录"){
      this.listUrl = "lhd/app/devRepairController.do?datagridbl";
      this.funccode = "4000001001"
    }else if (this.pageName == "维修审批"){
      this.listUrl = "lhd/app/devRepairController.do?datagridsp";
      this.funccode = "4000001002"
    }else if (this.pageName == "维修验收"){
      this.listUrl = "lhd/app/devRepairController.do?datagridys";
      this.funccode = "4000001006"
    }else if (this.pageName == "维修验收审批"){
      this.listUrl = "lhd/app/devRepairController.do?datagridyssp";
      this.funccode = "4000001007"
    }else if (this.pageName == "维修单据查询"){
      this.refreshData = false;
      this.listUrl = "lhd/app/devRepairQueryAppContoller.do?prepairOrderDetail"
      this.page = 1;
      this.isNewSearch = true;
      this.httpService.postData2(this.httpService.getUrl2()+this.listUrl,{page:this.page,rows:this.pageSize,funccode:this.funccode},data=>{
        this.itemData = data.obj.rows;
        for (let i in this.itemData){
          this.itemData[i]["djztName"] = ConfigProvider.djztName(this.itemData[i]["djzt"])
        }
        console.log(this.itemData)
      },true);
    }else if (this.pageName == "维修外委派单"){
      this.listUrl = "lhd/app/devPeripheryRepairController.do?getPeripheryPlan"
    }else if (this.pageName == "开始维修"){
      this.listUrl = "lhd/app/devPeripheryRepairController.do?getPeripheryRepairInfo"
    }else if (this.pageName == "维修办结"){
      this.listUrl = "lhd/app/devPeripheryRepairController.do?getPeripheryRepairInfo"
    }else if (this.pageName == "保养外委派单"){
      this.listUrl = "lhd/app/devMaintenanceController.do?getMaintenancePlan"
    }else if (this.pageName == "开始保养"||this.pageName == "保养办结"){
      this.listUrl = "lhd/app/devMaintenanceController.do?getPeripheryMaintenanceInfo"
    }else if (this.pageName == "保养验收"){
      this.listUrl = "lhd/app/devMaintenanceController.do?maintenanceAcceptance"
    }
    this.cardData = {
      cardParent:[
        {itemName:"单据编号", itemType:"label",itemValue:"wxdh"},
        {itemName:"单据状态", itemType:"label",itemValue:"djzt"},
        {itemName:"申请人", itemType:"label",itemValue:"sqrmc"},
        {itemName:"申请时间", itemType:"label",itemValue:"sqsj"},
      ],
    };
    if (this.pageName == "维修单据查询") {
      this.cardData.cardParent[2] = {itemName: "申请单位", itemType: "label", itemValue: "sqdwmc"}
    }
    if (this.pageName == "维修外委派单") {
      this.cardData.cardParent = [
        {itemName:"维修编号", itemType:"label",itemValue:"WXDH"},
        {itemName:"派单状态", itemType:"label",itemValue:"djztName"},
        {itemName:"单位名称", itemType:"label",itemValue:"SQDWMC"},
        {itemName:"设备名称", itemType:"label",itemValue:"SBMC"},
        {itemName:"维修人", itemType:"label",itemValue:"SQRMC"},
      ]
    }
    if (this.pageName == "开始维修"){
      this.cardData.cardParent = [
        {itemName:"维修编号", itemType:"label",itemValue:"WXDH"},
        {itemName:"维修状态", itemType:"label",itemValue:"wxztName"},
        {itemName:"单位名称", itemType:"label",itemValue:"SQDWMC"},
        {itemName:"设备名称", itemType:"label",itemValue:"SBMC"},
        {itemName:"维修人", itemType:"label",itemValue:"SQRMC"},
      ]
    }
    if (this.pageName == "维修办结"){
      this.cardData.cardParent = [
        {itemName:"维修编号", itemType:"label",itemValue:"WXDH"},
        {itemName:"办结状态", itemType:"label",itemValue:"bjztName"},
        {itemName:"单位名称", itemType:"label",itemValue:"SQDWMC"},
        {itemName:"设备名称", itemType:"label",itemValue:"SBMC"},
        {itemName:"维修人", itemType:"label",itemValue:"SQRMC"},
      ]
    }
    if (this.pageName == "保养外委派单") {
      this.cardData.cardParent = [
        {itemName:"保养编号", itemType:"label",itemValue:"maintenanceNumberDetail"},
        {itemName:"派单状态", itemType:"label",itemValue:"djztName"},
        {itemName:"单位名称", itemType:"label",itemValue:"departName"},
        {itemName:"设备名称", itemType:"label",itemValue:"assetsName"},
        {itemName:"保养人", itemType:"label",itemValue:"bpdr"},
      ]
    }
    if (this.pageName == "开始保养") {
      this.cardData.cardParent = [
        {itemName:"保养编号", itemType:"label",itemValue:"maintenanceNumberDetail"},
        {itemName:"保养进度", itemType:"label",itemValue:"byjdName"},
        {itemName:"验收状态", itemType:"label",itemValue:"checkStatusName"},
        {itemName:"单位名称", itemType:"label",itemValue:"departName"},
        {itemName:"设备名称", itemType:"label",itemValue:"assetsName"},
        {itemName:"保养人", itemType:"label",itemValue:"bpdr"},
      ]
    }
    if (this.pageName == "保养办结") {
      this.cardData.cardParent = [
        {itemName:"保养编号", itemType:"label",itemValue:"maintenanceNumberDetail"},
        {itemName:"保养进度", itemType:"label",itemValue:"byjdName"},
        {itemName:"单位名称", itemType:"label",itemValue:"departName"},
        {itemName:"设备名称", itemType:"label",itemValue:"assetsName"},
        {itemName:"保养人", itemType:"label",itemValue:"bpdr"},
      ]
    }
    if(this.pageName == "保养验收"){
      this.cardData.cardParent = [
        {itemName:"保养编号", itemType:"label",itemValue:"maintenanceNumberDetail"},
        {itemName:"保养状态", itemType:"label",itemValue:"checkDateName"},
        {itemName:"单位名称", itemType:"label",itemValue:"departName"},
        {itemName:"设备名称", itemType:"label",itemValue:"assetsName"},
        {itemName:"责任单位", itemType:"label",itemValue:"zrdwTypeName"}
      ]
    }
  }
  ionViewDidEnter(){
    if (this.refreshData){
      if (this.pageName == "维修外委派单"||this.pageName == "开始维修"||this.pageName == "维修办结"||this.pageName == "保养外委派单"||this.pageName == "开始保养"||this.pageName == "保养办结"||this.pageName == "保养验收") {
        this.isNewSearch = true;
        let body = {departCode:this.storageService.read("loginDepartCode"),userCode:this.storageService.read("loginUserCode"),wxType:1,funccode:this.funccode};
        if (this.pageName == "维修办结"){
          body.wxType = 2
        }
        if (this.pageName == "开始保养"){
          body["byType"] = 1
        }
        if (this.pageName == "保养办结"){
          body["byType"] = 2
        }
        this.httpService.postData2(this.httpService.getUrl2()+this.listUrl,body,data=>{
          this.itemDataOrgin = data.obj;
          if (this.pageName == "保养外委派单"){
            this.itemDataOrgin = data.obj.planList;
            this.operatorList = data.obj.operatorList;
          }
          this.itemData = [];
          if (this.itemDataOrgin.length>10){
            this.page = 1;
            for (let i=0; i<10;i++){
              this.itemData.push(this.itemDataOrgin[i]);
            }
          }else {
            this.itemData = this.itemDataOrgin;
            this.isNewSearch = false;
          }
          for (let i in this.itemData){
            this.itemData[i]["djztName"] = ConfigProvider.djztName(this.itemData[i]["DJZT"]);
            this.itemData[i]["wxztName"] = ConfigProvider.wxztName(this.itemData[i]["WXZT"]);
            if (this.pageName == "维修办结"){
              this.itemData[i]["bjztName"] = "未办结"
            }
            if (this.pageName == "保养外委派单"){
              this.itemData[i]["djztName"] = ConfigProvider.djzt2Name(this.itemData[i]["djzt"]);
            }
            if(this.pageName == "开始保养"){
              this.itemData[i]["byjdName"] = ConfigProvider.byjdName(this.itemData[i]["byjd"]);
              this.itemData[i]["checkDateName"] = ConfigProvider.checkDateName(this.itemData[i]["checkDate"]);
              this.itemData[i]["checkStatusName"] = ConfigProvider.checkStatusName(this.itemData[i]["checkStatus"])
            }
            if (this.pageName == "保养办结"){
              this.itemData[i]["byjdName"] = ConfigProvider.byjdName(this.itemData[i]["byjd"]);
              this.itemData[i]["checkDateName"] = ConfigProvider.checkDateName(this.itemData[i]["checkDate"]);
            }
            if (this.pageName == "保养验收"){
              this.itemData[i]["djztName"] = ConfigProvider.djzt2Name(this.itemData[i]["djzt"]);
              this.itemData[i]["checkDateName"] = ConfigProvider.checkDateName(this.itemData[i]["checkDate"]);
              this.itemData[i]["zrdwTypeName"] = ConfigProvider.zrdwTypeName(this.itemData[i]["zrdwType"]);
            }
          }
          console.log(this.itemData);
          (<HTMLElement>document.getElementsByClassName("contentBox")[0].parentNode).scrollTop = 0;
        },true,(err)=>{
          this.itemDataOrgin = [];
          this.itemData = [];
          let alertCtrl = this.alertCtrl.create({
            title:err
          });
          alertCtrl.present();
        });
      }
      else {
        this.page = 1;
        this.isNewSearch = true;
        this.httpService.postData2(this.httpService.getUrl2()+this.listUrl,{page:this.page,rows:this.pageSize,funccode:this.funccode},data=>{
          this.itemData = data.obj.rows;
          for (let i in this.itemData){
            this.itemData[i]["djztName"] = ConfigProvider.djztName(this.itemData[i]["djzt"])
          }
          console.log(this.itemData);
          (<HTMLElement>document.getElementsByClassName("contentBox")[0].parentNode).scrollTop = 0;
        },true,(err)=>{
          this.itemData = [];
          let alertCtrl = this.alertCtrl.create({
            title:err
          });
          alertCtrl.present();
        });
      }
    }
  }
  ionViewWillUnload() {
    this.events.unsubscribe("showFooter");
    this.events.unsubscribe("hideFooter")
  }
  hideFooter() {
    this.isFocus = true;
  }
  showFooter() {
    this.isFocus = false;
  }
  showForm(Data){
    if (this.pageName == "维修申请"){
      this.app.getRootNav().push(RepairApplyAddPage,{data:Data})
    }else if (this.pageName == "维修申请补录"){
      this.app.getRootNav().push(RepairSupplementPage,{data:Data})
    }else if (this.pageName == "维修审批"){
      this.app.getRootNav().push(RepairApprovalPage,{data:Data})
    }else if (this.pageName == "维修验收"){
      this.app.getRootNav().push(RepairAcceptancePage,{data:Data})
    }else if (this.pageName == "维修验收审批"){
      this.app.getRootNav().push(RepairAcceptanceApprovalPage,{data:Data})
    }else if (this.pageName == "维修单据查询"){
      this.app.getRootNav().push(RepairSearchPage,{data:Data})
    }else if (this.pageName == "维修外委派单"||this.pageName == "开始维修"||this.pageName == "维修办结"){
      this.app.getRootNav().push(RepairExternalPage,{pageName:this.pageName,data:Data})
    }else if (this.pageName == "保养外委派单"||this.pageName == "开始保养"||this.pageName == "保养办结"){
      this.app.getRootNav().push(MaintenancePage,{pageName:this.pageName,data:Data,operatorList:this.operatorList})
    }else if (this.pageName == "保养验收"){
      this.app.getRootNav().push(MaintenanceAcceptancePage,{pageName:this.pageName,data:Data,operatorList:this.operatorList})
    }
  }
  submitForm(detail){
    this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/rewriteDevJWXGLDJSQController.do?report",{dataobj:JSON.stringify([detail]),departName:this.storageService.read("loginDepartName"),departcode:this.storageService.read("loginDepartCode")},data=>{
      console.log(data)
      let alertCtrl = this.alertCtrl.create({
        title:"上报成功！"
      });
      alertCtrl.present();
      this.ionViewDidEnter()
    },true)
  }
  deleteForm(detail){
    if (detail.djzt != 1){
      let alertCtrl = this.alertCtrl.create({
        title:"不符合作废条件！"
      });
      alertCtrl.present();
      return false;
    }
    let alertCtrl = this.alertCtrl.create({
      title:"确定作废单据？",
      cssClass:"alertMiddle",
      buttons:[
        {
          text:"取消",
        },
        {
          text:"确定",
          handler:(e)=>{
            this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/rewriteDevJWXGLDJSQController.do?delete",{dataobj:JSON.stringify([detail])},data=>{
              console.log(data)
              let alertCtrl = this.alertCtrl.create({
                title:"作废成功！"
              });
              alertCtrl.present();
              this.ionViewDidEnter()
            },true)
          }
        }
      ]
    });
    alertCtrl.present();
  }
  finishForm(detail){
    if (detail.djzt != 2){
      let alertCtrl = this.alertCtrl.create({
        title:"不符合办结条件！"
      });
      alertCtrl.present();
      return false;
    }
    this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/rewriteDevJWXGLDJController.do?banjieLC",{dataobj:JSON.stringify(detail)},data=>{
      console.log(data)
      let alertCtrl = this.alertCtrl.create({
        title:"办结成功！"
      });
      alertCtrl.present();
      this.ionViewDidEnter()
    },true)
  }
  submitForm2(detail){
    if (!detail.xmmc){
      let alertCtrl = this.alertCtrl.create({
        title:"请先补录单据数据！"
      });
      alertCtrl.present();
      return false;
    }
    let url = "";
    let body = {};
    if (detail.djzt == 1){
      url = "lhd/app/rewriteDevJWXGLDJController.do?report";
      body = {dataobj:JSON.stringify([detail]),departName:this.storageService.read("loginDepartName"),departcode:this.storageService.read("loginDepartCode")}
      this.httpService.postData2(this.httpService.getUrl2()+url,body,data=>{
        console.log(data)
        let alertCtrl = this.alertCtrl.create({
          title:"上报成功！"
        });
        alertCtrl.present();
        this.ionViewDidEnter()
      },true)
    }
    if (detail.djzt == 2){
      let alertCtrl = this.alertCtrl.create({
        title:"上报",
        cssClass:"alertMiddle",
        inputs:[
          {
            type: 'radio',
            label: '重新流转',
            value: "0",
            checked:true
          },
          {
            type: 'radio',
            label: '提交给驳回人',
            value: "1",
          }
        ],
        buttons:[
          {
            text:"取消",
          },
          {
            text:"确定",
            handler:(e)=>{
              this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/rewriteDevJWXGLSHController.do?pass",{dataobj:JSON.stringify([detail]),yj:"",submitUserType:e},data=>{
                console.log(data)
                let alertCtrl = this.alertCtrl.create({
                  title:"上报成功！"
                });
                alertCtrl.present();
                this.ionViewDidEnter()
              },true)
            }
          }
        ]
      });
      alertCtrl.present();
    }

  }
  deleteForm2(detail){
    if (detail.djzt != 1&&detail.djzt != 2){
      let alertCtrl = this.alertCtrl.create({
        title:"不符合作废条件！"
      });
      alertCtrl.present();
      return false;
    }
    let alertCtrl = this.alertCtrl.create({
      title:"确定作废单据？",
      cssClass:"alertMiddle",
      buttons:[
        {
          text:"取消",
        },
        {
          text:"确定",
          handler:(e)=>{
            this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/rewriteDevJWXGLDJController.do?delete",{dataobj:JSON.stringify([detail])},data=>{
              console.log(data)
              let alertCtrl = this.alertCtrl.create({
                title:"作废成功！"
              });
              alertCtrl.present();
              this.ionViewDidEnter()
            },true);
          }
        }
      ]
    });
    alertCtrl.present();
  }
  finishForm2(detail){
    let alertCtrl = this.alertCtrl.create({
      title:"退回",
      cssClass:"alertMiddle",
      inputs:[
        {
          name:"reason",
          placeholder:"请输入退回原因",
        }
      ],
      buttons:[
        {
          text:"取消"
        },
        {
          text:"确定",
          handler:(e)=>{
            if (!e.reason){
              let alertCtrl1 = this.alertCtrl.create({
                title:"退回原因不能为空！"
              });
              alertCtrl1.present();
              return false;
            }else {
              this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/rewriteDevJWXGLDJController.do?backReport",{dataobj:JSON.stringify([detail]),thyy:e.reason},data=>{
                console.log(data)
                let alertCtrl = this.alertCtrl.create({
                  title:"退回成功！"
                });
                alertCtrl.present();
                this.ionViewDidEnter()
              },true)
            }
          }
        }
      ]
    })
    alertCtrl.present();
  }
  submitForm3(detail){
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
                dataobj: JSON.stringify([detail]),
                yj: e.reason
                ,flag:3
              }, data => {
                console.log(data)
                let alertCtrl = this.alertCtrl.create({
                  title: "通过成功！"
                });
                alertCtrl.present();
                this.ionViewDidEnter()
              }, true)
            }
          }
        }
      ]
    })
    alertCtrl.present();
  }
  deleteForm3(detail){
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
              this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/rewriteDevJWXGLSHController.do?reject",{dataobj:JSON.stringify([detail]),yj:e.reason,flag:3},data=>{
                console.log(data)
                let alertCtrl = this.alertCtrl.create({
                  title:"驳回成功！"
                });
                alertCtrl.present();
                this.ionViewDidEnter()
              },true)
            }
          }
        }
      ]
    })
    alertCtrl.present();
  }
  submitForm4(detail){
    if (!detail.ysjl){
      let alertCtrl = this.alertCtrl.create({
        title:"请先验收单据数据！"
      });
      alertCtrl.present();
      return false;
    }
    let url="lhd/app/rewriteDevJWXGLQRController.do?attest";
    if (detail.djzt == 2){
      url = "lhd/app/rewriteDevJWXGLQRController.do?reAttest"
    }
    this.httpService.postData2(this.httpService.getUrl2()+url,{dataobj:JSON.stringify([detail])},data=>{
      console.log(data)
      let alertCtrl = this.alertCtrl.create({
        title:"上报成功！"
      });
      alertCtrl.present();
      this.ionViewDidEnter()
    },true)
  }
  submitForm5(detail){
    if (detail["sbglrqrbz"]!=0){
      let alertCtrl = this.alertCtrl.create({
        title:"管理员已经验收完成！"
      });
      alertCtrl.present();
      return false;
    }
    if (detail["sjwxzz"]==null){
      let alertCtrl = this.alertCtrl.create({
        title:"单据验收数据未填写，请检查数据！"
      });
      alertCtrl.present();
      return false;
    }
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
              this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/rewriteDevJWXGLQRController.do?pass",{dataobj:JSON.stringify([detail]),yj:e.reason,flag:5},data=>{
                console.log(data)
                let alertCtrl = this.alertCtrl.create({
                  title:"通过成功！"
                });
                alertCtrl.present();
                this.ionViewDidEnter()
              },true)
            }
          }
        }
      ]
    })
    alertCtrl.present();
  }
  deleteForm5(detail){
    if (detail["sbglrqrbz"]!=0){
      let alertCtrl = this.alertCtrl.create({
        title:"管理员已经验收完成！"
      });
      alertCtrl.present();
      return false;
    }
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
              this.httpService.postData2(this.httpService.getUrl2()+"lhd/app/rewriteDevJWXGLQRController.do?reject",{dataobj:JSON.stringify([detail]),yj:e.reason,flag:5},data=>{
                console.log(data)
                let alertCtrl = this.alertCtrl.create({
                  title:"驳回成功！"
                });
                alertCtrl.present();
                this.ionViewDidEnter()
              },true)
            }
          }
        }
      ]
    })
    alertCtrl.present();
  }
  addInvoice(){
    this.app.getRootNav().push(RepairApplyAddPage)
  }
  screeningInvoice(){
    let modal = this.modalCtrl.create(RepairSearchAlertPage,{
    });
    modal.present();
    modal.onDidDismiss(data=>{
      if(data&&data.selectedData){
        console.log(data.selectedData)
        this.itemData=data.selectedData;
        this.page = 1;
        this.isNewSearch = true;
        console.log($(".scroll-content"))
        $(".scroll-content")[2].scrollTop = 0;
      }
    })
  }
  getMore(infiniteScroll){
    this.page++;
    let url,body;
    url = this.listUrl;
    body = {page:this.page,rows:this.pageSize,funccode:this.funccode};
    if (this.searchValue){
      body["wxdh"] = this.searchValue;
    }
    if (this.pageName == "维修外委派单"||this.pageName == "开始维修"||this.pageName == "维修办结"||this.pageName == "保养外委派单"||this.pageName == "开始保养"||this.pageName == "保养办结"||this.pageName == "保养验收") {
      for (let i = (this.page-1)*10;i < this.page*10;i++){
        if (!this.itemDataOrgin[i]){
          if (this.isNewSearch){
            this.isNewSearch = false;
            let toast = this.toastCtrl.create({
              message: "这已经是最后一页了",
              duration: 2000,
            });
            toast.present();
          }
        }else {
          this.itemData.push(this.itemDataOrgin[i]);
        }
      }
      for (let i = (this.page-1)*10;i < this.itemData.length;i++){
        this.itemData[i]["djztName"] = ConfigProvider.djztName(this.itemData[i]["DJZT"]);
        this.itemData[i]["wxztName"] = ConfigProvider.wxztName(this.itemData[i]["WXZT"]);
        if (this.pageName == "维修办结"){
          this.itemData[i]["bjztName"] = "未办结"
        }
        if (this.pageName == "保养外委派单"){
          this.itemData[i]["djztName"] = ConfigProvider.djzt2Name(this.itemData[i]["djzt"]);
        }
        if(this.pageName == "开始保养"){
          this.itemData[i]["byjdName"] = ConfigProvider.byjdName(this.itemData[i]["byjd"]);
          this.itemData[i]["checkDateName"] = ConfigProvider.checkDateName(this.itemData[i]["checkDate"]);
          this.itemData[i]["checkStatusName"] = ConfigProvider.checkStatusName(this.itemData[i]["checkStatus"])
        }
        if (this.pageName == "保养办结"){
          this.itemData[i]["byjdName"] = ConfigProvider.byjdName(this.itemData[i]["byjd"]);
          this.itemData[i]["checkDateName"] = ConfigProvider.checkDateName(this.itemData[i]["checkDate"]);
        }
        if (this.pageName == "保养验收"){
          this.itemData[i]["djztName"] = ConfigProvider.djzt2Name(this.itemData[i]["djzt"]);
          this.itemData[i]["checkDateName"] = ConfigProvider.checkDateName(this.itemData[i]["checkDate"]);
          this.itemData[i]["zrdwTypeName"] = ConfigProvider.zrdwTypeName(this.itemData[i]["zrdwType"]);
        }
      }
      infiniteScroll.complete();
    }else {
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
  searchDepart(){
    $(".scroll-content")[2].scrollTop = 0;
    this.page = 1;
    this.isNewSearch = true;
    let body = {page:this.page,rows:this.pageSize,funccode:this.funccode,searchValue:this.searchValue};
    if (this.searchValue){
      body["wxdh"] = this.searchValue;
    }
    this.httpService.postData2(this.httpService.getUrl2()+this.listUrl,body,data=>{
      this.itemData = data.obj.rows;
      for (let i in this.itemData){
        this.itemData[i]["djztName"] = ConfigProvider.djztName(this.itemData[i]["djzt"])
      }
      console.log(this.itemData)
    },false,(err)=>{
      this.itemData = [];
      let alertCtrl = this.alertCtrl.create({
        title:err
      });
      alertCtrl.present();
    });
  }
}
