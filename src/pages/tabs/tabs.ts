import { Component } from '@angular/core';

import { AppsPage } from '../commonStyle/apps/apps';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AppsPage;

  pageData1;
  pageData2;

  constructor() {

    //1:commonStyle/apps通用菜单样式
    //2:mine/serverSetting服务器设置
    //3:mine/modifyPassword修改密码
    //4:mine/login切换单位
    //5:mine/login重新登录
    //6:清除数据
    //7:更新字典
    //8:commmonStyle/insertForm通用表单录入样式
    //9:离线盘点
    let kuaisusaoma = {
      pageName:"快速扫码",
      pageData:{
        htmlData:{
          contentData:[
            ["","资产条码：",1,false,"条形码输入",""],
            ["","盘点单位：",0,true,""],
            ["","资产编码：",0,true,""],
            ["formSelectLabel","使用状态：",2,false,""],
            ["","资产名称：",0,true,""],
            ["","规格型号：",0,false,""],
            ["","车牌井号：",0,false,""],
            ["formSelectLabel","存放地点：",3,false,""],
            ["","保管人：",0,false,"",""],
            ["formSelectLabel","贴码状态：",2,false,""],
            ["formSelectLabel","技术状况：",2,false,""],
          ],
          footerData:{
            isShow:true,
            footerContentData:[
              ["camera","照片"],
              ["qr-scanner","扫码"],
              ["checkmark-circle","保存"],
            ]
          }
        },
        tsData:{
          inputData:[
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          selectedData:[
            "",
            "",
            "",
            "010101",
            "",
            "",
            "",
            "",
            "",
            "0",
            "01",
          ],
          selectData:[
            [],
            [],
            [],
            [
              ["010101","生产经营用-科研"],
              ["010102","生产经营用-其他"],
              ["0102","非生产经营用"],
              ["0201","季节性经营停用"],
              ["0202","其他原因停用"],
              ["0203","经营场所备用"],
              ["0204","闲置"],
              ["03","租出"],
              ["04","借出"],
            ],
            [],
            [],
            [],
            ["formSelectLabel","存放地点："],
            [],
            [
              ["0","相符"],
              ["1","不符"],
            ],
            [
              ["01","完好"],
              ["02","带病运行"],
              ["03","在修"],
              ["04","待修"],
              ["05","待报废"],
              ["06","损毁"],
              ["07","待处置"],
              ["08","已处置"],
            ],
          ]

        }
      }
    };
    let panyingluru = {
      pageName:"盘盈录入",
      pageData:{
        htmlData:{
          contentData:[
            ["formSelectLabel","盘点单位：",2,false,""],
            ["","资产条码：",0,false,""],
            ["","资产名称：",0,false,""],
            ["","规格型号：",0,false,""],
            ["formSelectLabel","盘盈原因：",2,false,""],
            ["formSelectLabel","存放地点：",2,false,""],
            ["","保管人：",0,false,"",""],
            ["formSelectLabel","使用状态：",2,false,""],
            ["formSelectLabel","技术状况：",2,false,""],
            ["","备注：",0,false,""],
          ],
          footerData:{
            isShow:true,
            footerContentData:[
              ["camera","照片"],
              ["qr-scanner","扫码"],
              ["checkmark-circle","保存"],
            ]
          }
        },
        tsData:[
          ["formSelectLabel","盘点单位：",2,false],
          ["","资产条码：",0,false],
          ["","资产名称：",0,false],
          ["","规格型号：",0,false],
          ["formSelectLabel","盘盈原因：",2,false],
          ["formSelectLabel","存放地点：",2,false],
          ["","保管人：",0,false],
          ["formSelectLabel","使用状态：",2,false],
          ["formSelectLabel","技术状况：",2,false],
          ["","备注：",0,false],
        ]
      }
    };
    let pandian = {
      pageName:"资产盘点",
      pageData:[
        [
          [8,kuaisusaoma,"qr-scanner","快速扫码"],[,,"sync","盘点查询"],[,,"cloud-download","数据下载"]
        ],
        [
          [,,"search","本地下载查询"],[,,"cloud-upload","数据上传"],[8,panyingluru,"create","盘盈录入"]
        ],
      ]
    };
    let baofei = {
      pageName:"报废管理",
      pageData:[
        [
          [,,"trash","报废申请"],[,,"paper","报废审批"],[,,"search","报废查询"]
        ]
      ]
    };
    let diaobo = {
      pageName:"调拨管理",
      pageData:[
        [
          [,,"open","调拨申请"],[,,"paper","调拨审批"],[,,"search","调拨查询"]
        ],
        [
          [,,"arrow-round-up","调出确认"],[,,"arrow-round-down","调入确认"]
        ]
      ]
    };
    let tongji = {
      pageName:"统计查询",
      pageData:[
        [
          [,,"search","资产查询"],[,,"search","台账查询"],[,,"search","汇总查询"]
        ]
      ]
    };
    let jiayouzhan = {
      pageName:"加油站管理",
      pageData:[
        [
          [,,"create","周检表录入"],[,,"create","交接班录入"],[,,"cloud-upload","数据上传"]
        ]
      ]
    };

    this.pageData1 = {
      pageName:"应用",
      pageData:[
        [
          [9,pandian,"qr-scanner","资产盘点"],[1,baofei,"trash","报废管理"],[1,diaobo,"open","调拨管理"]
        ],
        [
          [1,tongji,"search","统计查询"],[1,jiayouzhan,"water","加油站管理"]
        ]
      ]
    };

    this.pageData2 = {
      pageName:"我的",
      pageData:[
        [
          [2,null,"settings","服务器设置"],[3,null,"create","修改密码"],[4,null,"repeat","切换单位"]
        ],
        [
          [5,null,"refresh-circle","重新登陆"],[6,null,"trash","清除数据"],[7,null,"cloud-download","更新字典"]
        ]
      ]
    }

  }
}
