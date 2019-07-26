import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import * as  echarts from 'echarts';
let that;

@Component({
  selector: 'page-aggregateQuery',
  templateUrl: 'aggregateQuery.html'
})
export class AggregateQueryPage {
  shape="detail";
  detail=[];
  plan=[];
  isOnfocus=false;
  i;

  departCode;
  departListData;
  lastDepartListData;
  departName;
  loginDepartCode;
  loginDepartName;
  userCode;

  queryResult = [];
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public app:App,public navParams:NavParams, public alertCtrl:AlertController) {
    this.loadData();
    that = this;
  }
  ionViewDidEnter(){
    this.detail["assetsType"] = "0101";
    this.detail["groupDepart"] = "5";
    this.detail["groupZclb"] = "2";
    this.detail["groupJszk"] = "1";
    this.detail["groupSyzt"] = "1";
    this.detail["groupZjyy"] = "1";
    this.detail["groupZjqd"] = "1";

    this.plan["groupDepart"] = true;

  }
  loadData(){
    this.departCode = this.storageService.read("loginDepartCode");
    this.departName = this.storageService.read("loginDepartName");
    this.loginDepartCode = this.storageService.read("loginDepartCode");
    this.loginDepartName = this.storageService.read("loginDepartName");
    this.userCode = this.storageService.read("loginUserCode");
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("departListData",this.userCode),[]).then(res=>{
      if (res.rows.length>0) {
        this.departListData = JSON.parse(res.rows.item(0).stringData);
        this.lastDepartListData = JSON.parse(res.rows.item(0).stringData);
      }
    })
  }

  inputOnfocus(){
    this.isOnfocus=true;
  }
  inputOnblur(){
    this.isOnfocus=false;
  }
  query(){
    let url,body;

    url = "summaryController/querySummary.do";
    let whichChecked;
    for (let i in  this.plan){
      if (this.plan[i] == true){
        whichChecked = i;
      }
    }
    body = {departCode:this.departCode,assetsType:this.detail["assetsType"]};
    if (whichChecked){
      body[whichChecked] = this.detail[whichChecked]
    }
    this.httpService.postData(this.httpService.getUrl()+url,body,data=>{
      if (data.success == "true"){
        this.queryResult = data.data;
        this.shape = "result";
        let alert = this.alertCtrl.create({
          title:"查询成功！"
        });
        alert.present();
      }else {
        alert(data.msg)
      }
    },true)
  }
  selectDepart(departName){
    this.departName = departName;
  }
  filterDepartName(ev: any) {
    const val = ev.target.value;
    let item = [];
    if (val && val.trim() != '') {
      for (let i in this.departListData){
        if(this.departListData[i]["departname"].indexOf(val)>=0){
          item.push(this.departListData[i])
        }
      }
    }
    else {
      item = this.departListData;
    }
    this.lastDepartListData = item;
    if (!item.length){
      this.departCode=""
    }
  }
  changeCheck(whichChecked){
    if (this.plan[whichChecked]==true){
      for (let i in this.plan){
        if (i != whichChecked){
          this.plan[i] = false;
        }
      }
    }
  }
  inChart(){
    if (that.queryResult.length!=0){
      setTimeout(this.drawChart,100)
    }
  }
  drawChart(){
    const ec = echarts as any;
    const container1 = document.getElementById('chart1');
    const chart1 = ec.init(container1);
    const container2 = document.getElementById('chart2');
    const chart2 = ec.init(container2);
    const container3 = document.getElementById('chart3');
    const chart3 = ec.init(container3);
    const container4 = document.getElementById('chart4');
    const chart4 = ec.init(container4);
    let zclbmc=[];
    let yz = [];
    let jz = [];
    let ljzj = [];
    let jzzb = [];
    for (let i in that.queryResult){
      zclbmc.push(that.queryResult[i].zclbmc);
      yz.push(that.queryResult[i].yz);
      jz.push(that.queryResult[i].jz);
      ljzj.push(that.queryResult[i].ljzj);
      jzzb.push(that.queryResult[i].jzzb);
    }
    let option1 = {
      title: {
        left: "center",
        text: "原值分布图",
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : zclbmc,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'原值',
          type:'bar',
          barWidth: '60%',
          data:yz,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#ff4844', '#9ac3e5', '#66ac52', '#ffc032', '#549bd3', '#f47e39'];
                return colorList[params.dataIndex];
              }
            },
          },
        }
      ]
    };
    let option2 = {
      title: {
        left: "center",
        text: "净值分布图",
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : zclbmc,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'净值',
          type:'bar',
          barWidth: '60%',
          data:jz,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#ff4844', '#9ac3e5', '#66ac52', '#ffc032', '#549bd3', '#f47e39'];
                return colorList[params.dataIndex];
              }
            },
          },
        }
      ]
    };
    let option3 = {
      title: {
        left: "center",
        text: "累计折旧分布图",
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : zclbmc,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'累计折旧',
          type:'bar',
          barWidth: '60%',
          data:ljzj,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#ff4844', '#9ac3e5', '#66ac52', '#ffc032', '#549bd3', '#f47e39'];
                return colorList[params.dataIndex];
              }
            },
          },
        }
      ]
    };
    let option4 = {
      title: {
        left: "center",
        text: "减值准备分布图",
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : zclbmc,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'减值准备',
          type:'bar',
          barWidth: '60%',
          data:jzzb,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#ff4844', '#9ac3e5', '#66ac52', '#ffc032', '#549bd3', '#f47e39'];
                return colorList[params.dataIndex];
              }
            },
          },
        }
      ]
    };
    chart1.setOption(option1);
    chart2.setOption(option2);
    chart3.setOption(option3);
    chart4.setOption(option4);
  }

}
