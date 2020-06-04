import { Component } from '@angular/core';
import {AlertController, App, Events, ModalController, NavController} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";
import {DatePipe} from "@angular/common";
import * as $ from "jquery";
import {DayReportSupplementAlertPage} from "../dayReportSupplementAlert/dayReportSupplementAlert";

@Component({
  selector: 'page-dayReportSimple',
  templateUrl: 'dayReportSimple.html'
})
export class DayReportSimplePage {
  pageName = "加油站日报模板";
  isFocus = false;
  itemName = '日报日期';
  itemName2 = '目标部门';
  dateValue;
  departText="请选择";
  departData;
  dataesList= [];
  data = 		[
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 1,
      "projectsName": "一、生产量（万箱）",
      "projectsCode": "01",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 1,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 2,
      "projectsName": "1、格桑泉330ml*24",
      "projectsCode": "0101",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 2,
      "parentGroupCode": "01",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 3,
      "projectsName": "2、格桑泉500ml*24",
      "projectsCode": "0102",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 3,
      "parentGroupCode": "01",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 4,
      "projectsName": "3、格桑泉4L*4",
      "projectsCode": "0103",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 4,
      "parentGroupCode": "01",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 5,
      "projectsName": "二、销售量（吨）",
      "projectsCode": "02",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 5,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 6,
      "projectsName": "福地公司（吨）",
      "projectsCode": "0201",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 6,
      "parentGroupCode": "02",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 7,
      "projectsName": "西藏公司（吨）",
      "projectsCode": "0202",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 7,
      "parentGroupCode": "02",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 8,
      "projectsName": "中油好客（吨）",
      "projectsCode": "0203",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 8,
      "parentGroupCode": "02",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 9,
      "projectsName": "1、格桑泉330ml*24",
      "projectsCode": "0204",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 9,
      "parentGroupCode": "02",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 10,
      "projectsName": "2、格桑泉500ml*24",
      "projectsCode": "0205",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 10,
      "parentGroupCode": "02",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 11,
      "projectsName": "3、格桑泉4L*4",
      "projectsCode": "0206",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 11,
      "parentGroupCode": "02",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 12,
      "projectsName": "三、库存数量（万箱）",
      "projectsCode": "03",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 12,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 13,
      "projectsName": "1、格桑泉330ml*24",
      "projectsCode": "0301",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 13,
      "parentGroupCode": "03",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 14,
      "projectsName": "2、格桑泉500ml*24",
      "projectsCode": "0302",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 14,
      "parentGroupCode": "03",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 15,
      "projectsName": "3、格桑泉4L*4",
      "projectsCode": "0303",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 15,
      "parentGroupCode": "03",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 16,
      "projectsName": "四、营业收入（万元）",
      "projectsCode": "04",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 16,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 17,
      "projectsName": "1、格桑泉330ml*24",
      "projectsCode": "0401",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 17,
      "parentGroupCode": "04",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 18,
      "projectsName": "2、格桑泉500ml*24",
      "projectsCode": "0402",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 18,
      "parentGroupCode": "04",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 19,
      "projectsName": "3、格桑泉4L*4",
      "projectsCode": "0403",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 19,
      "parentGroupCode": "04",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 20,
      "projectsName": "五、生产成本（万元）",
      "projectsCode": "05",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 20,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 21,
      "projectsName": "1、原材料",
      "projectsCode": "0501",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 21,
      "parentGroupCode": "05",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 22,
      "projectsName": "2、电费",
      "projectsCode": "0502",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 22,
      "parentGroupCode": "05",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 23,
      "projectsName": "3、人工成本",
      "projectsCode": "0503",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 23,
      "parentGroupCode": "05",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 24,
      "projectsName": "4、折旧费",
      "projectsCode": "0504",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 24,
      "parentGroupCode": "05",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 25,
      "projectsName": "5、维修费",
      "projectsCode": "0505",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 25,
      "parentGroupCode": "05",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 26,
      "projectsName": "6、化验费",
      "projectsCode": "0506",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 26,
      "parentGroupCode": "05",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 27,
      "projectsName": "7、其他费用",
      "projectsCode": "0507",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 27,
      "parentGroupCode": "05",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 28,
      "projectsName": "六、销售费用（万元）",
      "projectsCode": "06",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 28,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 29,
      "projectsName": "1、运费",
      "projectsCode": "0601",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 29,
      "parentGroupCode": "06",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 30,
      "projectsName": "2、资源税",
      "projectsCode": "0602",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 30,
      "parentGroupCode": "06",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 31,
      "projectsName": "3、其他",
      "projectsCode": "0603",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 31,
      "parentGroupCode": "06",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 32,
      "projectsName": "七、管理费用（万元）",
      "projectsCode": "07",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 32,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 33,
      "projectsName": "1、人工成本",
      "projectsCode": "0701",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 33,
      "parentGroupCode": "07",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 34,
      "projectsName": "2、电费",
      "projectsCode": "0702",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 34,
      "parentGroupCode": "07",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 35,
      "projectsName": "3、水费",
      "projectsCode": "0703",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 35,
      "parentGroupCode": "07",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 36,
      "projectsName": "4、折旧费",
      "projectsCode": "0704",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 36,
      "parentGroupCode": "07",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 37,
      "projectsName": "5、水资源补偿款",
      "projectsCode": "0705",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 37,
      "parentGroupCode": "07",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 38,
      "projectsName": "6、其他费用",
      "projectsCode": "0706",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 38,
      "parentGroupCode": "07",
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 39,
      "projectsName": "八、利润总额（万元）",
      "projectsCode": "08",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 39,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 40,
      "projectsName": "九、人数（个）",
      "projectsCode": "09",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 40,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 41,
      "projectsName": "十、人均创效（万元）",
      "projectsCode": "10",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 41,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 42,
      "projectsName": "十一、银行存款",
      "projectsCode": "11",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 42,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 43,
      "projectsName": "十二、预收账款",
      "projectsCode": "12",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 43,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 44,
      "projectsName": "十三、预付账款",
      "projectsCode": "13",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 44,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    },
    {
      "createBy": null,
      "createtime": null,
      "updatetime": null,
      "updateBy": null,
      "datafilter": null,
      "id": 45,
      "projectsName": "十四、应收账款",
      "projectsCode": "14",
      "targetValue": 0,
      "amount": 0,
      "difference": 0,
      "qoq": 0,
      "reason": null,
      "sort": 45,
      "parentGroupCode": null,
      "isGroupComputes": "1",
      "isUse": "1"
    }
  ];
  cellItem=[
    {itemName:"完成",itemValue:"amount"},
    {itemName:"目标值",itemValue:"targetValue"},
    {itemName:"差异",itemValue:"difference"},
    {itemName:"环比",itemValue:"qoq"},
    {itemName:"原因分析",itemValue:"reason"},
  ];
  dataIndex = 0;
  departList = [
    {
      "id": "GYSXH20180049",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "外委维修-泉州地区",
      "iconCls": null,
      "state": "open",
      "checked": false,
      "children": [],
      "marktail": 1
    },
    {
      "id": "GYSXH20180056",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "外委维修-莆田地区",
      "iconCls": null,
      "state": "open",
      "checked": false,
      "children": [],
      "marktail": 1
    },
    {
      "id": "GYSXH20200245",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "新增供应商-辽河数码",
      "iconCls": null,
      "state": "open",
      "checked": false,
      "children": [],
      "marktail": 1
    },
    {
      "id": "137100015",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "非油品分公司",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000150001",
          "pid": "137100015",
          "pText": "非油品分公司",
          "text": "非油品分公司",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        }
      ],
      "marktail": 0
    },
    {
      "id": "137100006",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "南平地区",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000060001",
          "pid": "137100006",
          "pText": "南平地区",
          "text": "南平分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000600010050",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平安窠右区加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010051",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平东平加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010052",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平麻沙加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010001",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010002",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平财务",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010003",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平营销",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010004",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平办公",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010005",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平人事",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010006",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平非油品",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010007",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "运兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010008",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "西溪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010009",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "湖尾加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010010",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "江汜加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010011",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "安济加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010012",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "口前加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010013",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "顺昌上凤加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010014",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "顺昌焕仔坑加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010015",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "邵武越王加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010016",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "光泽册下加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010017",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "武夷山运盛加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010018",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "建瓯平阳加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010019",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "建瓯运通加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010020",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "建瓯莲花坪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010021",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "建阳宝塔加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010022",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "西塘加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010023",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "昌隆水上加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010024",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "光泽廖家湾加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010025",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "崇仁加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010026",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "城东加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010027",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "顺阳加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010028",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "顺元加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010029",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "邵武迎宾加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010030",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "余乐加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010032",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "邵武城郊加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010033",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "光泽和顺加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010034",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "大埠岗服务区左站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010035",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "大埠岗服务区右站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010036",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "大白服务区左加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010037",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "大白服务区右加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010038",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平景区撬装加油站（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010039",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平富兴撬装加油站（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010040",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平平安加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010041",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平新屯加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010042",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平兴明加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010043",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平光泽城南加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010044",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平顺达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010045",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平八仙加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010046",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平武夷山边防加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010047",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平下沙加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010048",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平闽延加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010049",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平安窠左区加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000600010053",
              "pid": "1371000060001",
              "pText": "南平分公司",
              "text": "南平和平加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000060002",
          "pid": "137100006",
          "pText": "南平地区",
          "text": "南平闽延加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        }
      ],
      "marktail": 0
    },
    {
      "id": "137100010",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "漳州地区",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000100003",
          "pid": "137100010",
          "pText": "漳州地区",
          "text": "漳浦华泰加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000100001",
          "pid": "137100010",
          "pText": "漳州地区",
          "text": "漳州分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710001000010001",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010002",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州财务",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010003",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州营销",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010004",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州人事",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010005",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州办公",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010007",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "广达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010008",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "龙兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010009",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "吉祥加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010010",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "龙海同和加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010013",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳浦金浦加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010014",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳浦恒顺加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010015",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "长泰城中加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010016",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "诏安顺风加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010017",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "诏安安平加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010018",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "云霄大埔东加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010019",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "长泰敦信加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010020",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳浦京里加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010021",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳浦霞潭加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010022",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "南靖利民加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010023",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "南靖顺达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010024",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "龙海大桥加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010025",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "龙海月港加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010026",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "南靖雄安加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010027",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "平和宏达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010028",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "诏安平安加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010029",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "南靖书洋加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010082",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州朝阳加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010083",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州泽宇加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010084",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州诏安诏东加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010085",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州华丰东加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010086",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州华丰西加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010087",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州西环加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010088",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州安发加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010089",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州海门岛加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010090",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州南埔加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200050004",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "海沧角嵩加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010073",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州华安城东加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010074",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州华安塔美加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010075",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州龙海诚信加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010076",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州平和黄井加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010077",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州龙海永清加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010078",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州珩坑加油站（靖城大桥）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010079",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州全兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010080",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州前亭加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010081",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州兴港加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010091",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州银塘加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010030",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "云霄东厦加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010031",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "东龙加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010032",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "龙海进顺加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010034",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "华安华耀加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010036",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "大埔西加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010037",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "龙海龙佳加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010038",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "诏安北环加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010039",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "龙海佳宝加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010040",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州长运加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010041",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "平和东环加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010042",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "锦海加油船",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010043",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳浦城关加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010044",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "一路发加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010045",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "诏安迎宾加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010046",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳浦祥安加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010047",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "长运撬装设施1（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010048",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "仙都加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010049",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "古雷撬装设施1（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010050",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "隆丰撬装设施1（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010051",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳浦新城加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010052",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳浦金湖加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010053",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "平和延寿山加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010054",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "平和南胜加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010055",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州龙江加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010056",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "港尾撬装设施（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010058",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "赤湖加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010059",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州九湖撬装（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010060",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州新春撬装（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010061",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "龙海白水撬装（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010062",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "长泰林墩撬装（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010063",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳浦霞美加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010064",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳浦绥安加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010065",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "平和中远加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010066",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "龙海东泗撬装（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010067",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州智兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010068",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州杏仔撬装（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010069",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "古雷撬装2（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010070",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州龙江路加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010071",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "南靖和溪（新大）加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010072",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "漳州君勇加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010011",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "浮山加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000010012",
              "pid": "1371000100001",
              "pText": "漳州分公司",
              "text": "南靖湖美加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000100004",
          "pid": "137100010",
          "pText": "漳州地区",
          "text": "南靖中油闽星",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710001000040004",
              "pid": "1371000100004",
              "pText": "南靖中油闽星",
              "text": "漳州紫雁加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000040003",
              "pid": "1371000100004",
              "pText": "南靖中油闽星",
              "text": "漳州紫云加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000040002",
              "pid": "1371000100004",
              "pText": "南靖中油闽星",
              "text": "漳州紫星加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000040001",
              "pid": "1371000100004",
              "pText": "南靖中油闽星",
              "text": "中油闽星机关",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000040005",
              "pid": "1371000100004",
              "pText": "南靖中油闽星",
              "text": "漳州紫祥加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001000040006",
              "pid": "1371000100004",
              "pText": "南靖中油闽星",
              "text": "漳州紫峰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        }
      ],
      "marktail": 0
    },
    {
      "id": "137100013",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "中油海峡",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000130002",
          "pid": "137100013",
          "pText": "中油海峡",
          "text": "海峡福州分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710001300020002",
              "pid": "1371000130002",
              "pText": "海峡福州分公司",
              "text": "海峡福州环岛加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001300020001",
              "pid": "1371000130002",
              "pText": "海峡福州分公司",
              "text": "海峡福州鹅峰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000130004",
          "pid": "137100013",
          "pText": "中油海峡",
          "text": "海峡龙岩分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710001300040001",
              "pid": "1371000130004",
              "pText": "海峡龙岩分公司",
              "text": "海峡龙岩先富加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001300040003",
              "pid": "1371000130004",
              "pText": "海峡龙岩分公司",
              "text": "中油海峡龙岩恒骅加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001300040002",
              "pid": "1371000130004",
              "pText": "海峡龙岩分公司",
              "text": "海峡龙岩河田加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000130003",
          "pid": "137100013",
          "pText": "中油海峡",
          "text": "海峡漳州分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710001300030001",
              "pid": "1371000130003",
              "pText": "海峡漳州分公司",
              "text": "漳州海峡龙佳加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        }
      ],
      "marktail": 0
    },
    {
      "id": "137100011",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "福建公司",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000110001",
          "pid": "137100011",
          "pText": "福建公司",
          "text": "福建本部",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710001100010032",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "营销调运处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010031",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "零售管理处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010030",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "天然气项目销售处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010029",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "天然气项目管理处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010028",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "非油业务管理处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010027",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "龙长高速涂坊西服务区",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010026",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "龙长高速涂坊东服务区",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010024",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "龙长高速古城南服务区",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010025",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "龙长高速古城北服务区",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010023",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "龙长高速芷溪西服务区",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010022",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "龙长高速芷溪东服务区",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010021",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "矿泉水项目经理部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010014",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "工程建设管理中心",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010013",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "审计监察处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010012",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "信息化管理处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010011",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "大项目经理部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010010",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "投资建设管理处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010009",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "质量安全环保处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010008",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "加管处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010007",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "仓储调运处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010006",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "营销处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010001",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "总经理办公室",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010002",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "人事处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010003",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "企管法规处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010004",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "党群处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001100010005",
              "pid": "1371000110001",
              "pText": "福建本部",
              "text": "财务处",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        }
      ],
      "marktail": 0
    },
    {
      "id": "137100014",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "武夷山水",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000140001",
          "pid": "137100014",
          "pText": "武夷山水",
          "text": "武夷山水饮料公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710001400010002",
              "pid": "1371000140001",
              "pText": "武夷山水饮料公司",
              "text": "武夷山水饮料公司车间",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710001400010001",
              "pid": "1371000140001",
              "pText": "武夷山水饮料公司",
              "text": "武夷山水饮料公司本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        }
      ],
      "marktail": 0
    },
    {
      "id": "137100005",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "宁德地区",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000050001",
          "pid": "137100005",
          "pText": "宁德地区",
          "text": "宁德分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000500010038",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德福安王湾里加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010039",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德福安湾坞加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010002",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德财务",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010003",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德人事",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010004",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德办公",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010005",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德非油品",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010006",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "城北加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010007",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "金涵加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010008",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "霞浦头桥坡加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010009",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "霞浦古镇加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010010",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "洋中加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010011",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "柘荣加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010012",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "柘荣城郊加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010013",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "福鼎祥和加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010014",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "福鼎金塘加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010015",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "福安南方加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010016",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "福安武京加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010017",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "福安林业加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010018",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "古田天柱山加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010019",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "古田安顺加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010020",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "福鼎顺龙加油站（点头）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010021",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "霞浦六通加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010022",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "京宁加油站（站前路）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010023",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "福安下白石加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010024",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "周宁狮城油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010025",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "福鼎前歧加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010026",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "寿宁新城区油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010027",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "古田鹤塘加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010028",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "屏南新城加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010029",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "屏南中沁加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010030",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "寿宁车友加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010031",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "福鼎白琳加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010032",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德满春街加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010033",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德日新加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010034",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德白水洋加油站（大王峰）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010035",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德货运加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010036",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德撬装加油站（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010037",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德霞浦盐田加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500010001",
              "pid": "1371000050001",
              "pText": "宁德分公司",
              "text": "宁德本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000050002",
          "pid": "137100005",
          "pText": "宁德地区",
          "text": "福安大华公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000500020002",
              "pid": "1371000050002",
              "pText": "福安大华公司",
              "text": "福安大华油库/经理室",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500020003",
              "pid": "1371000050002",
              "pText": "福安大华公司",
              "text": "福安大华油库/办公室",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500020004",
              "pid": "1371000050002",
              "pText": "福安大华公司",
              "text": "福安大华油库/业务部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500020005",
              "pid": "1371000050002",
              "pText": "福安大华公司",
              "text": "福安大华油库/财务资产部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000500020001",
              "pid": "1371000050002",
              "pText": "福安大华公司",
              "text": "福安大华油库/大华本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        }
      ],
      "marktail": 0
    },
    {
      "id": "137100004",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "福州地区",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000040002",
          "pid": "137100004",
          "pText": "福州地区",
          "text": "福清鑫元加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000040001",
          "pid": "137100004",
          "pText": "福州地区",
          "text": "福州分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000400010002",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州财务",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010003",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州营销",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010004",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州规划",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010005",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州办公",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010006",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州非油品",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010007",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "森茂加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010008",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福清天安加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010009",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福清东辉加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010010",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福清鲲鹏加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010011",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "闽候祥和加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010012",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "罗源联运加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010013",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福清海口加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010014",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "闽侯峡南加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010015",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "长乐岐头加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010016",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "闽清传兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010017",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010080",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州鹭岭路加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010018",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "永泰金元加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010019",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "平潭大福加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010020",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "平潭恒隆加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010021",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "连江江南加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010022",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "闽侯闽穗加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010023",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "长乐三溪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010024",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "永泰茂泰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010025",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "长乐畅想加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010026",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "连江安凯加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010027",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "闽侯亨达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010028",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "连江建诚加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010029",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福清棉亭加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010030",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "马尾路通加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010031",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福清安民加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010032",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福清章银加油站（龙田）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010033",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "闽侯盟顺加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010034",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "马尾油库",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010035",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "南大门加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010036",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "名星加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010037",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "永泰闽运加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010038",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "后安油库",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010039",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "琅歧加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010040",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州洪山桥加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010041",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州象山加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010042",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福清新港加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010043",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "华威物流园",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010044",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "连江山坑加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010045",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州鹤林加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010046",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "连江顺利加油站（黄岐）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010047",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "罗源丰丰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010048",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "闽清华伦加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010049",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "联邦加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010050",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "金诚加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010051",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "池园加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010052",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "斗顶加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010053",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州琮鑫物流撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010054",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "马尾油库撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010055",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州城头宗法加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010056",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州罗源为东加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010057",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州中源新能源撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010058",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州闽清塔庄加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010059",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福清港头加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010060",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州长乐航城加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010061",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福清音西加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010062",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州福友加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010063",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州闽江大道东加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010064",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州闽江大道西加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010065",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州西洪路加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010066",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州中外运撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010067",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州福飞北路加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010068",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州连江南路加油站（边防）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010069",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州平潭环岛加油加气站（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010070",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州平潭澳前加油加气站（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010071",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州闽侯洪江加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010072",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州南三环加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010073",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州福弯路加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010074",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州仙歧加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010075",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州融荣加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010076",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州兰天加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010077",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州加管部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010078",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州安全环保部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010079",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州宗棠加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000400010001",
              "pid": "1371000040001",
              "pText": "福州分公司",
              "text": "福州本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        }
      ],
      "marktail": 0
    },
    {
      "id": "137100003",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "龙岩地区",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000030001",
          "pid": "137100003",
          "pText": "龙岩地区",
          "text": "龙岩分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000300010073",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩河田高速口加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010071",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩苏邦加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010072",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩永定矿区加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010067",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩卓宅加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010070",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩红炭山加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010068",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩富园加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010069",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩上东加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010025",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "连城洪山加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010026",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "长汀河田加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010027",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "连城李屋加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010028",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "上杭顺发加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010029",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "上杭富金加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010030",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "漳平鸿运加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010031",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "长汀富友加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010032",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "永定乘风加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010033",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "东宝加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010037",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "上杭宏达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010039",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "雁石加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010040",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "永定旅游加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010041",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "天祥加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010042",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "兴龙加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010043",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "永定天和加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010044",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩金山加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010045",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩石牛潭加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010046",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩闽盛撬装1（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010047",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩闽业撬装2（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010048",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "永定下洋加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010049",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "罗厝山撬装加油站（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010050",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "上杭赖坊加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010051",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "上杭坪埔加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010052",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "上杭太拔加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010053",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "漳平南埔加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010054",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "科雷诺撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010055",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "源华货物撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010056",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "富民加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010057",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩金凤加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010058",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩漳平永福加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010059",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩武平鑫泰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010060",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩工贸高速口加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010061",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩工贸中心加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010062",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩龙机加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010063",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩培丰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010064",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩小洋加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010065",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩连城莲冠加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010066",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩走四方加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010067",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩卓宅加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010068",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩富园加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010001",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010002",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩财务",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010003",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩营销",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010004",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩办公",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010005",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩人事",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010006",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "龙岩非油品",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010007",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "景明加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010010",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "月山加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010011",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "曹溪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010012",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "中溪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010013",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "福利加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010014",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "城东加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010015",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "连城长颖加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010016",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "连城连龙加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010017",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "永定迎宾加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010018",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "武平环球加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010019",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "武平十方加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010020",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "十方宏达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010021",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "武平岩前加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010022",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "东外环加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010023",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "永定抚市加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300010024",
              "pid": "1371000030001",
              "pText": "龙岩分公司",
              "text": "永定岐岭加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000030002",
          "pid": "137100003",
          "pText": "龙岩地区",
          "text": "龙岩老墟加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000030003",
          "pid": "137100003",
          "pText": "龙岩地区",
          "text": "武平宏达加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000030005",
          "pid": "137100003",
          "pText": "龙岩地区",
          "text": "中油龙地福建能源有限公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000300050001",
              "pid": "1371000030005",
              "pText": "中油龙地福建能源有限公司",
              "text": "龙地本部（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000300050002",
              "pid": "1371000030005",
              "pText": "中油龙地福建能源有限公司",
              "text": "龙岩天马加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000030004",
          "pid": "137100003",
          "pText": "龙岩地区",
          "text": "龙岩华油仓储有限",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        }
      ],
      "marktail": 0
    },
    {
      "id": "137100007",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "泉州地区",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000070023",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "南安中油油品经销有限公司晋江滨海加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070004",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "石狮销售公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000700040006",
              "pid": "1371000070004",
              "pText": "石狮销售公司",
              "text": "石狮销售公司/业务部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700040005",
              "pid": "1371000070004",
              "pText": "石狮销售公司",
              "text": "石狮销售公司/人力资源部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700040004",
              "pid": "1371000070004",
              "pText": "石狮销售公司",
              "text": "石狮销售公司/财务资产部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700040003",
              "pid": "1371000070004",
              "pText": "石狮销售公司",
              "text": "石狮销售公司/办公室",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700040002",
              "pid": "1371000070004",
              "pText": "石狮销售公司",
              "text": "石狮销售公司/经理室",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700040001",
              "pid": "1371000070004",
              "pText": "石狮销售公司",
              "text": "石狮销售公司/石狮销售本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000070005",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "石狮通用公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000700050006",
              "pid": "1371000070005",
              "pText": "石狮通用公司",
              "text": "石狮通用油库",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700050001",
              "pid": "1371000070005",
              "pText": "石狮通用公司",
              "text": "石狮通用本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700050002",
              "pid": "1371000070005",
              "pText": "石狮通用公司",
              "text": "石狮通用梅林港撬装（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700050003",
              "pid": "1371000070005",
              "pText": "石狮通用公司",
              "text": "石狮通用太平洋撬装（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700050004",
              "pid": "1371000070005",
              "pText": "石狮通用公司",
              "text": "石狮通用用肖厝港撬装（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700050005",
              "pid": "1371000070005",
              "pText": "石狮通用公司",
              "text": "石狮通用鸿达撬装（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000070006",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "福建仓储公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000700060004",
              "pid": "1371000070006",
              "pText": "福建仓储公司",
              "text": "福建仓储公司/财务资产部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700060001",
              "pid": "1371000070006",
              "pText": "福建仓储公司",
              "text": "福建仓储公司/福建仓储本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700060002",
              "pid": "1371000070006",
              "pText": "福建仓储公司",
              "text": "福建仓储公司/经理室",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700060003",
              "pid": "1371000070006",
              "pText": "福建仓储公司",
              "text": "福建仓储公司/办公室",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700060006",
              "pid": "1371000070006",
              "pText": "福建仓储公司",
              "text": "福建仓储公司/油库管理部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700060005",
              "pid": "1371000070006",
              "pText": "福建仓储公司",
              "text": "福建仓储公司/项目部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000070007",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州晋江加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070008",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "石狮海山加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070009",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州嘉宾加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070010",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州永兴加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070011",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州舜峰加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070012",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州隆发加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070013",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州崎盛加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070014",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州蟠龙加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070015",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州盘兴石化加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070002",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "南安仓储分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000700020005",
              "pid": "1371000070002",
              "pText": "南安仓储分公司",
              "text": "南安仓储分公司/业务部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700020004",
              "pid": "1371000070002",
              "pText": "南安仓储分公司",
              "text": "南安仓储分公司/财务资产",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700020003",
              "pid": "1371000070002",
              "pText": "南安仓储分公司",
              "text": "南安仓储分公司/办公室",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700020002",
              "pid": "1371000070002",
              "pText": "南安仓储分公司",
              "text": "南安仓储分公司/经理室",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700020001",
              "pid": "1371000070002",
              "pText": "南安仓储分公司",
              "text": "南安仓储分公司/南安仓储本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000070003",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "南安经销公司（加油站）",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000700030002",
              "pid": "1371000070003",
              "pText": "南安经销公司（加油站）",
              "text": "南安经销公司/经理室",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700030003",
              "pid": "1371000070003",
              "pText": "南安经销公司（加油站）",
              "text": "南安经销公司/办公室",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700030004",
              "pid": "1371000070003",
              "pText": "南安经销公司（加油站）",
              "text": "南安经销公司/财务资产部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700030006",
              "pid": "1371000070003",
              "pText": "南安经销公司（加油站）",
              "text": "南安经销公司/经销加油船",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700030001",
              "pid": "1371000070003",
              "pText": "南安经销公司（加油站）",
              "text": "南安经销公司/经销本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700030005",
              "pid": "1371000070003",
              "pText": "南安经销公司（加油站）",
              "text": "南安经销公司/业务部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000070016",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州龙凤加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070017",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州盘兴油品加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070018",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州德盛加油站",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000700180001",
              "pid": "1371000070018",
              "pText": "泉州德盛加油站",
              "text": "泉州德盛加油站/德盛加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700180002",
              "pid": "1371000070018",
              "pText": "泉州德盛加油站",
              "text": "泉州德盛加油站/农盛加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700180003",
              "pid": "1371000070018",
              "pText": "泉州德盛加油站",
              "text": "泉州德盛加油站/玉美加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700180004",
              "pid": "1371000070018",
              "pText": "泉州德盛加油站",
              "text": "泉州德盛加油站/联盛加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000070019",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州下洋加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000070020",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州云峰加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [
            {
              "id": "13710000700200002",
              "pid": "1371000070020",
              "pText": "泉州云峰加油站",
              "text": "晋江博览大道加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700200001",
              "pid": "1371000070020",
              "pText": "泉州云峰加油站",
              "text": "云峰龙湖加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 1
        },
        {
          "id": "1371000070021",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "晋江市滨海加油站有限公司",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [
            {
              "id": "13710000700210001",
              "pid": "1371000070021",
              "pText": "晋江市滨海加油站有限公司",
              "text": "南安油品滨海加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 1
        },
        {
          "id": "1371000070022",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州中油汽运油品供应有限公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000700220006",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "泉州汽运永春撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700220007",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "泉州汽运德化撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700220003",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "泉州汽运石狮撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700220012",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "泉州汽运石狮中心站撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700220010",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "泉州汽运中心站撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700220005",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "泉州汽运晋江撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700220008",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "泉州汽运安溪撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700220009",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "泉州汽运南安撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700220013",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "泉州汽运经贸学院撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700220011",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "泉州汽运新车站撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700220004",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "泉州汽运石狮服装城撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700220001",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "汽运公司",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700220002",
              "pid": "1371000070022",
              "pText": "泉州中油汽运油品供应有限公司",
              "text": "鲤城中心加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000070001",
          "pid": "137100007",
          "pText": "泉州地区",
          "text": "泉州分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000700010014",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "中南加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010015",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安恒隆加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010016",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安港龙加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010017",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "通达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010018",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "德和加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010019",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "黄塘加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010020",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "惠安螺阳加油站（螺城）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010021",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉港加油站（北）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010022",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "惠安惠崇加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010023",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "锦江加油站（南）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010025",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "锦江加油站（北）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010026",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉港加油站（南）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010027",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "石狮兴湖加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010028",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "石狮香江加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010029",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "惠安百崎加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010030",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "惠安东桥加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010031",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "安海飞达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010032",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "惠安东园加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010033",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "惠安国泰加油站（山霞）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010035",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安新华加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010036",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "惠安北关加油站（海洋）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010040",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江星侨加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010042",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "安溪城美加油站（南方）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010043",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安泉发加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010044",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江三欧加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010045",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江章程加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010046",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江恒泰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010047",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江群力加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010048",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "亿力加油站（电力）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010049",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉港区码头加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010050",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉港区西海加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010051",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉港区锦川加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010052",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉港区埭港加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010053",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州云峰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010054",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州英信加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010055",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江张林加油站（儒林）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010056",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江灵水加油站（灵源）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010057",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江富华加油站（苏坑）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010058",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "丰泽西福加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010059",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江东环加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010060",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "石狮南洋加油站（茂林）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010061",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安宝福加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010062",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安港口加油站（五里桥）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010064",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江长尾埔加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010065",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州华翔加油站（驿峰）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010066",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "石狮兴良加油站（古山）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010067",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉港肖厝加油站（南山）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010068",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "永春三益加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010070",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "惠安惠丰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010071",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江前尾加油站（吉安）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010085",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安红莲加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010086",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "安溪安德加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010087",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安振发加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010088",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安金辉诚加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010089",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "惠安跃兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010090",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "安溪益民加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010091",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安益发加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010092",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安大光明撬装站（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010093",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州汽运晋江加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010094",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州汽运中心站加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010095",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州汽运石狮加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010096",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州汽运南安加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010097",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州汽运永春加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010098",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州汽运新车站加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010099",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州汽运安溪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010100",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州汽运石狮服装城加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010101",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州汽运德化加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010102",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州法石加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010103",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安金英加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010104",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "惠安忠信加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010105",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江源兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010106",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州宏泰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010107",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州集英撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010108",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州南安信达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010109",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州力量加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010110",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州南兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010111",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州新民富加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010112",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州安溪龙桥服务区东站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010113",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州安溪龙桥服务区西站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010114",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州院前撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010115",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州文斗撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010116",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州大唐撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010117",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州南安站前加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010120",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州中油运输撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010122",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州安溪合兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010125",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州德远加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010127",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州福新加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010128",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州大众撬装（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010129",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州绿岛加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010130",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州中创撬装设施点",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010131",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州洛江顺发加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010132",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州晋江丽发加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010134",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州海峡培训中心",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010136",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州临江（边防）加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010137",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州石狮中心站撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010138",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州江滨（三龙）加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010139",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州阳溪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010140",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州东溪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010141",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州石祥加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010142",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州佳瑞达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010143",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州石狮阳光加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010001",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010002",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州财务",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010003",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州办公",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010004",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州非油品",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010005",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "永春和林加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010006",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "豪兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010007",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "恒盛加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010008",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "德化泉德加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010009",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "永春石鼓加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010010",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "安溪路发加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010011",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江顺安加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010012",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "紫帽加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010013",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "三友加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010163",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州友前加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010165",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州北环加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010164",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州德化宝美加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010156",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安盘石（全资）加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010157",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "安溪隆发（全资）加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010158",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州江南加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010159",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州安溪鑫通加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010160",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州龙涓顺安加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010161",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州桃园加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010162",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州成味加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010144",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州营销",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010145",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州城东加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010146",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州闽雁加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010147",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州德众加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010148",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江华仑加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010149",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安榕桥南（下行）加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010150",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安榕桥北（上行）加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010151",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州永春农盛（全资）加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010152",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州永春玉美（全资）加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010153",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州永春德盛（全资）加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010154",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "泉州永春联盛（全资）加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010155",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "南安盘油（全资）加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010072",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "惠安辋川加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010073",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江盛达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010074",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江东石环岛加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010075",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江梅岭加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010076",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "山前加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010077",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "立新加油站东站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010078",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "立新加油站西站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010079",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "海峡加油站（安吉）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010080",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "石狮金太阳加油站（玉浦）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010081",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "晋江富华加油站（苏坑）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010082",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "旦厝加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010083",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "胡厝加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000700010084",
              "pid": "1371000070001",
              "pText": "泉州分公司",
              "text": "石狮怡东加油站（院东）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        }
      ],
      "marktail": 0
    },
    {
      "id": "137100008",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "莆田地区",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000080001",
          "pid": "137100008",
          "pText": "莆田地区",
          "text": "莆田分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000800010042",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田恒顺加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010043",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田新度加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010001",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010002",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田财务",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010003",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田营销",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010004",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田人事",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010005",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田办公",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010006",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田非油品",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010007",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "顺达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010008",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "仙游西德加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010009",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "商贸加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010010",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "闽运加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010011",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "仙游郊尾加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010012",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "山牌加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010013",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "信达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010014",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "白塘加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010015",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "西田加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010016",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "涵三加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010017",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "南少林加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010019",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "仙游金建加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010022",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "仙游宝峰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010023",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "汽运撬装设施（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010024",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "城厢荣福加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010025",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "红星加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010026",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "高速善乡东服务区（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010027",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "高速善乡西服务区（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010028",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "仙游超宇加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010029",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "仙游海洋加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010030",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "秀屿上塘加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010032",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "笏石加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010033",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "笏石永兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010035",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田红旗加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010036",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田仙游枫亭加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010037",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田涵江白沙加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010038",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田城厢昌荣加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010039",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田边防加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010040",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田海警油库",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010041",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田海警加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010051",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田东湖加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010052",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田游洋加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010044",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田紫霄加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010045",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田联星加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010046",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田黄霞加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010047",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田荔城荔涵南加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010048",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田荔城荔涵北加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000800010049",
              "pid": "1371000080001",
              "pText": "莆田分公司",
              "text": "莆田秋芦加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        }
      ],
      "marktail": 0
    },
    {
      "id": "137100009",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "三明地区",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000090012",
          "pid": "137100009",
          "pText": "三明地区",
          "text": "三明中油交建公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000900120002",
              "pid": "1371000090012",
              "pText": "三明中油交建公司",
              "text": "三明交建大焦加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900120001",
              "pid": "1371000090012",
              "pText": "三明中油交建公司",
              "text": "三明中油交建本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "13710000900120004",
          "pid": "137100009",
          "pText": "三明地区",
          "text": "三明三元服务区右加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "13710000900120003",
          "pid": "137100009",
          "pText": "三明地区",
          "text": "三明三元服务区左加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000090001",
          "pid": "137100009",
          "pText": "三明地区",
          "text": "三明分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000900010011",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "盛建加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010012",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "明溪大焦加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010017",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明明溪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010018",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "富兴堡加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010019",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明大田长溪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010020",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "永安大湾加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010021",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "光辉加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010022",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "大田万湖加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010024",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "永安埔岭加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010026",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明永安黄历加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010027",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明沙县中联加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010028",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明尤溪闽中加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010030",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明宁化供销加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010031",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明建宁里心加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010032",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明建宁迎宾加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010033",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明将乐万安加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010036",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明大田长顺加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010037",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明永安丰海加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010038",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明永安小陶供销加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010039",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明永安贡川加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010040",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明永安环城路加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010041",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明大田梅里加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010044",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明将乐李氏加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010045",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明沙县金泰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010046",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明清流大路口加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010047",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明将乐公路港加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010048",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明小蕉加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010049",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明大湖加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010050",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明清流里田加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010051",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明大田岩盛加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010052",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明西互通加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010001",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010002",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明财务",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010003",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明规划",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010004",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明办公",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010005",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "大田人事",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010006",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "将乐人事",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010007",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "三明非油品",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010008",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "大田福田加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010009",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "大田华珠加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900010010",
              "pid": "1371000090001",
              "pText": "三明分公司",
              "text": "鑫丰加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000090003",
          "pid": "137100009",
          "pText": "三明地区",
          "text": "三明碧湖加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000090004",
          "pid": "137100009",
          "pText": "三明地区",
          "text": "三明汽运公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000900040006",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "润滑油部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040015",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "清流加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040017",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "三明汽运新阳加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040001",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "三明汽运本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040002",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "经理办公室",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040003",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "综合业务部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040004",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "财务资产部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040005",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "油库筹备组",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040016",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "泰宁加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040007",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "人力资源部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040008",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "永安加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040009",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "尤溪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040011",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "大田加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040012",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "上京加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040013",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "将乐一站将乐一站（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000900040014",
              "pid": "1371000090004",
              "pText": "三明汽运公司",
              "text": "将乐加油站二站将乐一站（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000090011",
          "pid": "137100009",
          "pText": "三明地区",
          "text": "三明华油仓储有限责任公司",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000090002",
          "pid": "137100009",
          "pText": "三明地区",
          "text": "三明公路加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        }
      ],
      "marktail": 0
    },
    {
      "id": "137100002",
      "pid": "13710",
      "pText": "中国石油天然气股份有限公司福建销售分公司",
      "text": "厦门地区",
      "iconCls": null,
      "state": "closed",
      "checked": false,
      "children": [
        {
          "id": "1371000020020",
          "pid": "137100002",
          "pText": "厦门地区",
          "text": "测试台账部门",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [],
          "marktail": 0
        },
        {
          "id": "1371000020002",
          "pid": "137100002",
          "pText": "厦门地区",
          "text": "厦门海沧加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000020003",
          "pid": "137100002",
          "pText": "厦门地区",
          "text": "厦门杏林加油站",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000020004",
          "pid": "137100002",
          "pText": "厦门地区",
          "text": "厦门市铭林实业有限公司（加油站）",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000020005",
          "pid": "137100002",
          "pText": "厦门地区",
          "text": "厦门港务仓储公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000200050001",
              "pid": "1371000020005",
              "pText": "厦门港务仓储公司",
              "text": "厦门中油港务仓储公司",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200050002",
              "pid": "1371000020005",
              "pText": "厦门港务仓储公司",
              "text": "计财组",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200050003",
              "pid": "1371000020005",
              "pText": "厦门港务仓储公司",
              "text": "施工组",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000020006",
          "pid": "137100002",
          "pText": "厦门地区",
          "text": "厦门市德义商贸有限公司（加油站）",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000020007",
          "pid": "137100002",
          "pText": "厦门地区",
          "text": "厦门海沧立欣石油有限公司（加油站）",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000020008",
          "pid": "137100002",
          "pText": "厦门地区",
          "text": "厦门市海通达石油有限公司（加油站）",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000020009",
          "pid": "137100002",
          "pText": "厦门地区",
          "text": "厦门福丽工贸有限公司（加油站）",
          "iconCls": null,
          "state": "open",
          "checked": false,
          "children": [],
          "marktail": 1
        },
        {
          "id": "1371000020010",
          "pid": "137100002",
          "pText": "厦门地区",
          "text": "中油海峡（厦门）有限公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000200100013",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "厦门田厝加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200100011",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "厦成高速东加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010081",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "厦门前边加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010079",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "厦门新圩加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200100012",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "厦成高速西站（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010080",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "厦门田墘加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200100010",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "中油海峡厦门海沧马青加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200100009",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "中油海峡厦门海沧港中加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200100008",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "中油海峡厦门中埔加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200100006",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "中油海峡厦门路和加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200100001",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "中油海峡本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200100002",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "中油海峡厦门同安滨海加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200100003",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "中油海峡厦门集美中洲加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200100004",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "中油海峡厦门坑内加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200100005",
              "pid": "1371000020010",
              "pText": "中油海峡（厦门）有限公司",
              "text": "中油海峡厦门高林加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        },
        {
          "id": "1371000020001",
          "pid": "137100002",
          "pText": "厦门地区",
          "text": "厦门分公司",
          "iconCls": null,
          "state": "closed",
          "checked": false,
          "children": [
            {
              "id": "13710000200010010",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "福建IC卡",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010011",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门非油品",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010013",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门第二加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010014",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "同安第一加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010015",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "集美第一加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010016",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "海堤加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010017",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "顺尔达加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010018",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "华丽晶加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010019",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "西柯加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010020",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "鹭岭加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010021",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "西塘加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010022",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "潘土加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010023",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "金山加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010024",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "宝兴加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010025",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "利民加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010026",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "良春加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010027",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "海沧马青加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010028",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "龙山加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010029",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "翔安新店加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010030",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "同安路和加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010031",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "海沧浦头加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010032",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "五缘湾加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010033",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "通海油库",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010034",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "仙岳加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010035",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "新霞加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010036",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "坑内加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010037",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "云顶岩隧道南加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010038",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "云顶岩隧道北加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010039",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门集北加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010040",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门县后加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010041",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门园博园加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010042",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门灌南加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010043",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门忠仑加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010044",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "同安云洋加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010045",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "翔安后垵加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010046",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门白城撬装设施（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010047",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "湖滨中路撬装设施（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010048",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "塞上撬装设施（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010049",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "同安西湖加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010050",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "翔安桐梓加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010051",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门洪溪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010052",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "公益公交",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010053",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "建发物流撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010054",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门港务海沧撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010055",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门港务塞上撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010056",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "中外运撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010057",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "高林加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010058",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门天润锦龙撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010059",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门澳溪加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010082",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门舫山西加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010083",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门山亭撬装加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010060",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门岳口加油站（福厦）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010061",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门象屿物流撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010062",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门源福仁撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010063",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门路桥游艇撬装设施点（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010064",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门同安滨海加油站（加气站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010065",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门集美中洲加油加气站（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010066",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门同安云埔南加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010067",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门同安云埔北加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010068",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门黄厝加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010069",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门同安民安加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010070",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门角嵩加油站（国志农机）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010071",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门集美下梧加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010072",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门枋湖加油站（加气站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010073",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门海天加气站（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010074",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门凤南东加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010075",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门凤南西加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010076",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门胜伟撬装供油设施（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010077",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门顺丰撬装供油设施（加油站）",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010078",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门五通加油站",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010001",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门本部",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010002",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门财务",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010003",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门营销",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010004",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门规划",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010005",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "福建工程",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010006",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门安全",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010007",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门办公",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010008",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "厦门人事",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            },
            {
              "id": "13710000200010009",
              "pid": "1371000020001",
              "pText": "厦门分公司",
              "text": "福建信息",
              "iconCls": null,
              "state": "open",
              "checked": false,
              "children": [],
              "marktail": 1
            }
          ],
          "marktail": 0
        }
      ],
      "marktail": 0
    }
  ];
  returnData = [];
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public app:App,public datePipe:DatePipe,public modalCtrl:ModalController,
              public events:Events) {
    let date = new Date();
    this.dateValue = this.datePipe.transform(date, "yyyy-MM-dd");
    for (let i in this.data) {
      let itemData = ["reason"];
      for (let y in itemData) {
        this.data[i] = this.addProp(this.data[i], itemData[y], "input")
      }
      if (this.data[i].targetValue == null) {
        this.data[i].targetValue = 0;
      }
      if (this.data[i].parentGroupCode == null) {
        this.data[i]["data"] = [];
        this.data[i]["rankIndex"] = [];
        this.dataesList.push(this.data[i])
      }
    }
    for (let i in this.data) {
      this.forCreateData(this.data[i],this.dataesList)
    }
    this.forRankData(this.dataesList
      ,(data)=> {
        this.forMothedData(data)
      }
      ,(data)=>{
      if(data.level==2){
        this.forMothedData(data)
      }
    });
    this.events.subscribe("focusInput",(res) => {
      let rankIndex = res.rankIndex;
      let itemValue = res.itemValue;
      if(rankIndex.length>1) {
        this.inputCalc(rankIndex,itemValue,'sub')
      }
      this.hideFooter()
    });
    this.events.subscribe("blurInput",(res) => {
      let rankIndex = res.rankIndex;
      let itemValue = res.itemValue;
      this.specInputCalc(rankIndex,itemValue);
      if(rankIndex.length>1) {
        this.inputCalc(rankIndex,itemValue,'add')
      }
      this.showFooter();
    });
    this.events.subscribe("showContent",(res) => {
      let rankIndex = res.rankIndex;
      let itemValue = res.itemValue;
      this.specInputCalc(rankIndex,itemValue);
      if(rankIndex.length>1) {
        this.inputCalc(rankIndex,itemValue,'add')
      }
      this.showFooter();
    });
    console.log(this.dataesList)
  }
  inputCalc(rankIndex,itemValue,method){
    let i = 0;
    let temp;
    for(let j=0;j<rankIndex.length-1;j++){
      let data = this.dataesList;
      for (i=0 ;i < rankIndex.length-j;i++){
        temp = data[rankIndex[i]];
        data = temp.data;
      }
      data = this.dataesList;
      let parent;
      for (i=0 ;i < rankIndex.length-(j+1);i++){
        parent = data[rankIndex[i]];
        data = parent.data;
      }
      if(method=='add'){
        parent[itemValue]=parent[itemValue] + temp[itemValue]
      }else if(method=='sub'){
        parent[itemValue]=parent[itemValue] - temp[itemValue]
      }
    }

  }
  specInputCalc(rankIndex,itemValue){
    let i = 0;
    let data = this.dataesList;
    let temp;
    for (i=0 ;i < rankIndex.length;i++){
      temp = data[rankIndex[i]];
      data = temp.data;
    }
    if(itemValue=="targetValue"&&JSON.stringify(rankIndex)=='["0","2"]'){
      this.dataesList[0].data[0]["targetValue"] = temp[itemValue]
    }
  }
  ionViewWillUnload(){
    this.events.unsubscribe("focusInput");
    this.events.unsubscribe("blurInput");
    this.events.unsubscribe("showContent");
  }
  hideFooter(){
    this.isFocus=true;
  }
  showFooter(){
    this.isFocus=false;
  }
  forCreateData(data,dataesList){
    for (let j in dataesList) {
      if (data.parentGroupCode == dataesList[j].projectsCode) {
        this.forCreateData(data, dataesList[j].data);
        data["data"] = [];
        data["rankIndex"] = [];
        dataesList[j].data.push(JSON.parse(JSON.stringify(data)))
      }
      if (dataesList[j].data.length>0){
        this.forCreateData(data,dataesList[j].data);
      }
    }
  }
  forRankData(dataesList,rank1CallBack,callBack){
    for(let i in dataesList){
      if (dataesList[i].parentGroupCode===null){
        dataesList[i].level = 1;
        rank1CallBack(dataesList[i]);
        dataesList[i].rankIndex.push(i);
      }
      if(dataesList[i].data.length>0){
        for(let j in dataesList[i].data){
          dataesList[i].data[j].rankIndex = JSON.parse(JSON.stringify(dataesList[i].rankIndex));
          dataesList[i].data[j].rankIndex.push(j);
          dataesList[i].data[j].level = dataesList[i].level + 1;
          callBack(dataesList[i].data[j])
          if(dataesList[i].data[j].data.length>0){
            this.forRankData(dataesList[i].data,rank1CallBack,callBack)
          }
        }
      }
    }
  }
  forMothedData(data){
    let itemData = ["difference"];
    for (let y in itemData) {
      data = this.addProp(data, itemData[y], "label")
    }
    itemData = ["targetValue"]
    for (let y in itemData) {
      data = this.addProp(data, itemData[y], "input-number")
    }
  }
  addProp(data,item,type){
    data[item+'ShowType'] = type;
    return data;
  }
  ionViewDidEnter(){
  }
  returnDate() {
    console.log(this.dateValue)
  }
  showDepart(){
    let data1 = this.departList;
    let content = {
      item:{
        parent:[
          {itemValue:"text"},
        ],
      }
    }
    let body = {data:data1,content:content}
    let modal = this.modalCtrl.create(DayReportSupplementAlertPage,body);
    modal.present();
    modal.onDidDismiss(data=>{
      if(data&&data.selectedData){
        this.departData = data.selectedData;
        this.departText = this.departData.text;
      }
    })
  }
  forReturnData(dataesList){
    for(let i in dataesList){
      if (dataesList[i].parentGroupCode===null){
        this.returnData[dataesList[i].sort-1]=dataesList[i];
      }
      if(dataesList[i].data.length>0){
        for(let j in dataesList[i].data){
          this.returnData[dataesList[i].data[j].sort-1]=dataesList[i].data[j];
          if(dataesList[i].data[j].data.length>0){
            this.forReturnData(dataesList[i].data)
          }
        }
      }
    }
  }
  submitForm(){
    // this.calcMethod();
    let alertCtrl = this.alertCtrl.create({
      title:"提交成功！"
    });
    alertCtrl.present();
    this.forReturnData(this.dataesList)
    console.log(this.dataesList)
    console.log(this.returnData)
  }
}
