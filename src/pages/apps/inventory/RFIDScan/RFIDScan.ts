import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {PageUtil,StorageService} from "../../../../services/storageService";
import {BarcodeScanner,} from "@ionic-native/barcode-scanner";
import {File} from "@ionic-native/file";
import {RFIDScanListPage} from "../RFIDScanList/RFIDScanList";
import * as  echarts from 'echarts';
let that;
import * as $ from "jquery";
import {NativeAudio} from "@ionic-native/native-audio";
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
  barCode;
  isScanning = false;
  scanList = {};
  constructor(public navCtrl?:NavController,public storageService?:StorageService,public navParams?:NavParams,
              public events?:Events, public file?:File, public actionSheetCtrl?:ActionSheetController,
              public app?:App,public alertCtrl?:AlertController,public barcodeScanner?:BarcodeScanner,
              private nativeAudio?: NativeAudio) {
    that = this;
    PageUtil.pages["RFIDScan"]=this;
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/beep.ogg');
    /**接收消息触发 */
    document.addEventListener('rfid.receiveMessage', (event: any) => {
      // this.logger.log(event,'Receive notification');
      if (event.data.length==16){
        let str = event.data.split("AA")[0];
        this.scanList[str] = {barCode:str,checkResult:"3"};
        let len = 0;
        for (let i in this.scanList){
          if (this.willMap[i]){
            this.scanList[i] = this.willMap[i];
          }
          if (this.newMap[i]){
            delete this.scanList[i]
          }else if (this.existMap[i]){
            delete this.scanList[i]
          }
          len++
        }
        if(len>this.numList["scan"]){
          this.nativeAudio.play('uniqueId1');
        }
        this.numList["scan"] = len;
        PageUtil.pages["RFIDScanList"].data = this.scanList;
        PageUtil.pages["RFIDScanList"].getData();
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
          this.willMap[this.willPlan[i]['barCode']] = this.willPlan[i]
        }
      }
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
        if (res.rows.length>0){
          this.existPlan = JSON.parse(res.rows.item(0).stringData);
          this.numList["exist"] = this.existPlan.length;
          for (let i in this.existPlan){
            this.existMap[this.existPlan[i]['barCode']] = this.existPlan[i]
          }
        }
        this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
          if (res.rows.length>0){
            this.newPlan = JSON.parse(res.rows.item(0).stringData);
            this.numList["new"] = this.newPlan.length;
            for (let i in this.newPlan){
              this.newMap[this.newPlan[i]['barCode']] = this.newPlan[i]
            }
          }
          this.allPlan = [];
          this.allPlan = this.allPlan.concat(this.willPlan).concat(this.existPlan).concat(this.newPlan);
          this.numList["all"] = this.numList["will"]+this.numList["exist"]+this.numList["new"];
          let len = 0;
          for (let i in this.scanList){
            len++
          }
          this.numList["scan"] = len;
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
    this.app.getRootNav().push(RFIDScanListPage,{type:value,data:this.scanList});
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
    for(let i in this.scanList){
      if(!this.scanList[i].checkResult||this.scanList[i].checkResult==''){
        this.scanList[i].checkResult = "1";
        this.scanList[i]["uploadFile"] = [];
        if(!this.scanList[i]["realcodeStatus"]){
          this.scanList[i]["realcodeStatus"] = "0";
        }if(!this.scanList[i]["usedState"]){
          this.scanList[i]["usedState"] = "010101";
        }if(!this.scanList[i]["usedStateName"]){
          this.scanList[i]["usedStateName"] = "生产经营用-科研";
        }if(!this.scanList[i]["technicalCondition"]){
          this.scanList[i]["technicalCondition"] = "01";
        }if(!this.scanList[i]["technicalConditionName"]){
          this.scanList[i]["technicalConditionName"] = "完好";
        }if(!this.scanList[i]["storePlace"]){
          this.scanList[i]["storePlace"] = "";
          this.scanList[i]["storePlaceName"] = "";
        }else {
          this.scanList[i]["storePlaceName"] = this.scanList[i]["storePlace"];
        }
        for(let j = 0; j<this.willPlan.length;j++){
          if(this.willPlan[j].barCode == i){
            this.willPlan.splice(j,1);
          }
        }
        this.existPlan.push(this.scanList[i]);
        delete this.scanList[i];
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
    this.storageService.sqliteInsert2("willPlanDetail",this.userCode,JSON.stringify(this.willPlan),(e)=>{
      this.storageService.sqliteInsert2("existPlanDetail",this.userCode,JSON.stringify(this.existPlan),(e)=>{
        this.ionViewDidEnter();
      });
    });
  }
  init(){
    cordova.plugins.RfidScanPlugin.initEngine(this.storageService.read("deviceType"), result => {
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
