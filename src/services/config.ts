import {Injectable} from '@angular/core';

@Injectable()
export class ConfigProvider {

  constructor() {

  }
  static checkStatus = [
    {name: "未验收", value: "0"},
    {name: "验收通过", value: "1"},
    {name: "验收驳回", value: "2"}
  ];
  static syncStatus = [
    {name:"未同步",value:1},
    {name:"正在同步",value:2},
    {name:"已完成",value:3},
    {name:"部分失败",value:4},
    {name:"部分同步",value:5},
  ];
  static djzt = [
    {name:"新增",value:1},
    {name:"驳回",value:2},
    {name:"审批中",value:3},
    {name:"待验收",value:4},
    // {name:"审批通过",value:4},
    {name:"变更新增",value:5},
    {name:"已办结",value:6},
    {name:"未派单",value:9},
    {name:"已派单",value:10},
  ];
  static status = [
    {name:"待送审",value:"01"},
    {name:"待审批",value:"02"},
    {name:"审批中",value:"03"},
    {name:"驳回",value:"04"},
    {name:"审核通过",value:"05"},
  ];
  static result = [
    {name: "未审", value: "0"},
    {name: "通过", value: "1"},
    {name: "驳回", value: "2"}
  ]
  static djzt2 = [
    {name:"未派单",value:"0"},
    {name:"已派单",value:"1"},
  ];
  static wxzt = [
    {name:"未开始",value:0},
    {name:"已开始",value:1},
  ];
  static byjd = [
    {name:"未开始",value:0},
    {name:"已开始",value:1},
    {name:"已完成",value:2},
  ];
  static yslb = [
    {name:"日常预算",value:1},
    {name:"专项预算",value:2},
  ];
  static djly = [
    {name:"电脑端",value:1},
    {name:"手机端",value:2},
  ];
  static checkDate = [
    {name:"未保养",value:0},
    {name:"已保养",value:1},
  ];
  static checkClass = [
    {name:"日常清理",value:"01"},
    {name:"日常检查",value:"02"},
  ];
  static checkType = [
    {name:"日",value:"01"},
    {name:"周",value:"02"},
    {name:"月",value:"03"},
    {name:"季度",value:"04"},
    {name:"年",value:"05"},
  ];
  static remindType = [
    {name:"系统提醒",value:"01"},
    {name:"短信提醒",value:"02"},
    {name:"全部方式",value:"03"},
  ];
  static serviceClass = [
    {name:"油站经理",value:"01"},
    {name:"设备设施管理岗",value:"02"},
  ];
  static serviceType = [
    {name:"清扫",value:"01"},
    {name:"更换零件",value:"02"},
  ];
  static checkStatusName(value): any{
    for (let i in this.checkStatus){
      if (this.checkStatus[i].value==value){
        return this.checkStatus[i].name
      }
    }
    return false;
  }
  static syncStatusName(value): any {
    for (let i in this.syncStatus){
      if (this.syncStatus[i].value==value){
        return this.syncStatus[i].name
      }
    }
    return false;
  }
  static djztName(value): any {
    for (let i in this.djzt){
      if (this.djzt[i].value==value){
        return this.djzt[i].name
      }
    }
    return false;
  }
  static statusName(value): any {
    for (let i in this.status){
      if (this.status[i].value==value){
        return this.status[i].name
      }
    }
    return false;
  }
  static resultName(value): any {
    for (let i in this.result){
      if (this.result[i].value==value){
        return this.result[i].name
      }
    }
    return false;
  }
  static djzt2Name(value): any {
    for (let i in this.djzt2){
      if (this.djzt2[i].value==value){
        return this.djzt2[i].name
      }
    }
    return false;
  }
  static yslbName(value): any {
    for (let i in this.yslb){
      if (this.yslb[i].value==value){
        return this.yslb[i].name
      }
    }
    return false;
  }
  static djlyName(value): any {
    for (let i in this.djly){
      if (this.djly[i].value==value){
        return this.djly[i].name
      }
    }
    return false;
  }
  static wxztName(value): any {
    for (let i in this.wxzt){
      if (this.wxzt[i].value==value){
        return this.wxzt[i].name
      }
    }
    return false;
  }
  static byjdName(value): any {
    for (let i in this.byjd){
      if (this.byjd[i].value==value){
        return this.byjd[i].name
      }
    }
    return false;
  }
  static checkDateName(value): any {
    for (let i in this.checkDate){
      if (this.checkDate[i].value==value){
        return this.checkDate[i].name
      }
    }
    return false;
  }
  static checkClassName(value): any {
    for (let i in this.checkClass){
      if (this.checkClass[i].value==value){
        return this.checkClass[i].name
      }
    }
    return false;
  }
  static checkTypeName(value): any {
    for (let i in this.checkType){
      if (this.checkType[i].value==value){
        return this.checkType[i].name
      }
    }
    return false;
  }
  static remindTypeName(value): any {
    for (let i in this.remindType){
      if (this.remindType[i].value==value){
        return this.remindType[i].name
      }
    }
    return false;
  }
  static serviceClassName(value): any {
    for (let i in this.serviceClass){
      if (this.serviceClass[i].value==value){
        return this.serviceClass[i].name
      }
    }
    return false;
  }
  static serviceTypeName(value): any {
    for (let i in this.serviceType){
      if (this.serviceType[i].value==value){
        return this.serviceType[i].name
      }
    }
    return false;
  }
}
