import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {PageUtil,StorageService} from "../../../../services/storageService";
import {BarcodeScanner,} from "@ionic-native/barcode-scanner";
import {File} from "@ionic-native/file";
import {RFIDScanListPage} from "../RFIDScanList/RFIDScanList";
import * as  echarts from 'echarts';
let that;
import * as $ from "jquery";
declare let cordova: any;
@Component({
  selector: 'page-RFIDScan',
  templateUrl: 'RFIDScan.html'
})
export class RFIDScanPage{
  pageItem = [
    {itemName:"全部",itemValue:"all"},
    {itemName:"未盘",itemValue:"will"},
    {itemName:"已盘",itemValue:"exist"},
    {itemName:"盘盈",itemValue:"new"}
  ];
  numList = {
    scan:0,
    will:0,
    exist:0,
    new:0,
    all:0,
  };
  userCode;
  allPlan=[];
  willPlan=[];
  willMap={};
  existPlan=[];
  existMap={};
  newPlan=[];
  newMap={};
  scanPlan=[];
  barCode;
  isScanning = false;
  constructor(public navCtrl?:NavController,public storageService?:StorageService,public navParams?:NavParams,
              public events?:Events, public file?:File, public actionSheetCtrl?:ActionSheetController,
              public app?:App,public alertCtrl?:AlertController,public barcodeScanner?:BarcodeScanner) {
    that = this;
    PageUtil.pages["RFIDScan"]=this;
    /**接收消息触发 */
    document.addEventListener('rfid.receiveMessage', (event: any) => {
      // this.logger.log(event,'Receive notification');
      if (event.data.length==16){
        let str = event.data.split("AA")[0];
        this.getScanValue(str);
      }
    }, false);
    this.init();
  }
  ionViewWillUnload(){
    this.dispose()
  }
  ionViewDidEnter(){
    this.userCode = this.storageService.read("loginUserCode");
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("willPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.willPlan = JSON.parse(res.rows.item(0).stringData);
        this.numList["will"] = this.willPlan.length;
        for (let i in this.willPlan){
          this.willMap[this.willPlan['barCode']] = this.willPlan[i]
        }
      }
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
        if (res.rows.length>0){
          this.existPlan = JSON.parse(res.rows.item(0).stringData);
          this.numList["exist"] = this.existPlan.length;
          for (let i in this.existPlan){
            this.existMap[this.existPlan['barCode']] = this.existPlan[i]
          }
        }
        this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
          if (res.rows.length>0){
            this.newPlan = JSON.parse(res.rows.item(0).stringData);
            this.numList["new"] = this.newPlan.length;
            for (let i in this.newPlan){
              this.newMap[this.newPlan['barCode']] = this.newPlan[i]
            }
          }
          this.allPlan = [];
          this.allPlan = this.allPlan.concat(this.willPlan).concat(this.existPlan).concat(this.newPlan);
          this.numList["all"] = this.numList["will"]+this.numList["exist"]+this.numList["new"];
          if (this.numList["all"]==0){
            let alertCtrl = this.alertCtrl.create({
              title:"请先下载盘点计划！"
            });
            alertCtrl.present();
            this.app.getRootNav().pop();
            return false;
          }
          this.drawChart();
        });
      });
    });
  }
  drawChart(){
    const ec = echarts as any;
    const container1 = document.getElementById('chart1');
    const chart1 = ec.init(container1);
    let zclbmc=[];
    let yz = [];
    for (let i in that.queryResult){
      zclbmc.push(that.queryResult[i].zclbmc);
      yz.push(that.queryResult[i].yz);
    }
    let option1 = {
      title: {
        left: "center",
        text: "盘点数据",
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data:['未盘','已盘','盘盈','已扫描']
      },
      graphic: [
        {　　　　　　　　　　　　　　　　//环形图中间添加文字
          type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
          left: 'center',
          top: '120',
          style: {
            text: "总数",
            textAlign: 'center',
            fill: '#4389e8',　　　　　　　　//文字的颜色
            fontSize: '30',
            fontWeight: 'bold',
          }
        },
        {
          type: 'text',
          left: 'center',
          top: '155',
          style: {
            text: that.numList["all"],
            textAlign: 'center',
            fill: '#4389e8',
            fontSize: '30',
            fontWeight: 'bold',
          }
        }
      ],
      series: [
        {
          name:'数据来源',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter:function(){
                return "";
              },
              textStyle:{
                color:'#4389e8'
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
            {value:this.numList["will"], name:'未盘'},
            {value:this.numList["exist"], name:'已盘'},
            {value:this.numList["new"], name:'盘盈'},
            {value:this.numList["scan"], name:'已扫描'},
          ]
        }
      ]
    };
    chart1.setOption(option1);
  }
  nextPage(value){
    this.app.getRootNav().push(RFIDScanListPage,{type:value});
  }
  beginScan(){
    this.startScan();
    this.drawChart();
  }
  stopScan(){
    this.endScan();
  }
  cal(){
    let haveNew = false;
    for(let i in this.scanPlan){
      if(this.scanPlan[i].checkResult==''){
        this.scanPlan[i].checkResult = "1";
        for(let j = 0; j<this.willPlan.length;j++){
          if(this.willPlan[j].barCode == this.scanPlan[i].barCode){
            this.willPlan.splice(j,1);
          }
        }
        this.storageService.sqliteInsert("willPlanDetail",this.userCode,JSON.stringify(this.willPlan));
        this.existPlan.push(this.scanPlan[i]);
        this.storageService.sqliteInsert("existPlanDetail",this.userCode,JSON.stringify(this.existPlan));
      }else{
        haveNew = true;
      }
    }
    if(haveNew){
      let alertCtrl = this.alertCtrl.create({
        title:"请填写已扫描中剩余的盘盈数据！"
      });
      alertCtrl.present();
    }
    this.drawChart();
  }
  getScanValue(barCode){
    if(this.scanPlan.length>0){
      for (let i in this.scanPlan){
        if (barCode != this.scanPlan[i].barCode){
          if (this.willMap[barCode]){
            this.scanPlan.push(this.willMap[barCode])
          }else if (this.newMap[barCode]){

          }else if (this.existMap[barCode]){

          }else {
            this.scanPlan.push({barCode:barCode,checkResult:"3"})
          }
          this.numList["scan"]++;
        }
      }
    }else{
      if (this.willMap[barCode]){
        this.scanPlan.push(this.willMap[barCode])
      }else if (this.newMap[barCode]){

      }else if (this.existMap[barCode]){

      }else {
        this.scanPlan.push({barCode:barCode,checkResult:"3"})
      }
      this.numList["scan"]++;
    }
  }
  init(){
    cordova.plugins.RfidScanPlugin.initEngine("CX900", result => {
      cordova.plugins.RfidScanPlugin.init("", result =>  {}, error => alert(error));

    }, error => alert(error));
  }
  startScan(){
    this.isScanning = true;
    cordova.plugins.RfidScanPlugin.startScan("", result =>  {}, error => alert(error));
  }
  endScan(){
    this.isScanning = false;
    cordova.plugins.RfidScanPlugin.stopScan("", result =>  {}, error => alert(error));
  }

  getScanStatus(){
    cordova.plugins.RfidScanPlugin.getScanStatus("", result =>{
      let scanStatus = JSON.stringify(result)
    }, error => alert(error));
  }

  dispose(){
    cordova.plugins.RfidScanPlugin.dispose("", result => {}, error => alert(error));
  }
}
