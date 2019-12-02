import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {BarcodeScanner,} from "@ionic-native/barcode-scanner";
import {File} from "@ionic-native/file";
import {RFIDScanListPage} from "../RFIDScanList/RFIDScanList";
import * as  echarts from 'echarts';
import { ConfigProvider } from '../../../../services/config';
let that;

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
  numList = {};
  constructor(public navCtrl?:NavController,public storageService?:StorageService,public navParams?:NavParams,
              public events?:Events, public file?:File, public actionSheetCtrl?:ActionSheetController,
              public app?:App,public alertCtrl?:AlertController,public barcodeScanner?:BarcodeScanner) {
    that = this;
    this.numList["scan"] = 100;
    this.numList["will"] = 555;
    this.numList["exist"] = 312;
    this.numList["new"] = 50;
    this.numList["all"] = this.numList["will"]+this.numList["exist"]+this.numList["new"];
  }
  ionViewDidEnter(){
    this.drawChart();
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
    console.log(value)
    this.app.getRootNav().push(RFIDScanListPage,{data:value});
  }
  beginScan(){
    this.numList["scan"]++;
    this.drawChart();
  }
  stopScan(){
    
  }
  cal(){
    this.numList["exist"]+=this.numList["scan"]/2;
    this.numList["new"]+= this.numList["scan"]/2;
    this.numList["all"] = this.numList["will"]+this.numList["exist"]+this.numList["new"];
    this.numList["scan"] = 0;
    this.drawChart();
  }
}
