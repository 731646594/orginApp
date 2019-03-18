import { Component } from '@angular/core';

import { MenuPage } from '../commonStyle/menu/menu';
import { HomePage } from '../home/home';
import {PageUtil} from "../../services/storageService";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MenuPage;

  pageData1;
  pageData2;

  pandian;
  baofei;
  diaobo;
  tongji;
  jiayouzhan;
  constructor() {
    PageUtil.pages["tabs"]=this;
    //1:commonStyle/apps通用菜单样式
    //2:mine/serverSetting服务器设置
    //3:mine/modifyPassword修改密码
    //4:mine/login切换单位
    //5:mine/login重新登录
    //6:清除数据
    //7:更新字典
    //11:快速扫码
    //12:盘点查询
    //13:数据下载
    //14:本地下载查询
    //15:数据上传
    //16:盘盈录入
    //21:报废申请
    //22:报废审批
    //23:报废查询

    //51:周检表录入
    //52:交接班录入
    //53:数据上传
    this.pandian = {
      pageName:"资产盘点",
      pageData:[
        [
          [11,"","qr-scanner","快速扫码"],[12,"","sync","盘点查询"],[13,"","cloud-download","数据下载"]
        ],
        [
          [14,"","search","本地下载查询"],[15,"","cloud-upload","数据上传"],[16,"","create","盘盈录入"]
        ],
      ]
    };
    this.baofei = {
      pageName:"报废管理",
      pageData:[
        [
          [21,"","trash","报废申请"],[22,"","paper","报废审批"],[23,"","search","报废查询"]
        ]
      ]
    };
    this.diaobo = {
      pageName:"调拨管理",
      pageData:[
        [
          ["","","open","调拨申请"],["","","paper","调拨审批"],["","","search","调拨查询"]
        ],
        [
          ["","","arrow-round-up","调出确认"],["","","arrow-round-down","调入确认"]
        ]
      ]
    };
    this.tongji = {
      pageName:"统计查询",
      pageData:[
        [
          ["","","search","资产查询"],["","","search","台账查询"],["","","search","汇总查询"]
        ]
      ]
    };
    this.jiayouzhan = {
      pageName:"加油站管理",
      pageData:[
        [
          [51,"","create","周检表录入"],[52,"","create","交接班录入"],[53,"","cloud-upload","数据上传"]
        ]
      ]
    };

    this.pageData1 = {
      pageName:"应用",
      pageData:[
        [
          [1,this.pandian,"qr-scanner","资产盘点"],[1,this.baofei,"trash","报废管理"],[1,this.diaobo,"open","调拨管理"]
        ],
        [
          [1,this.tongji,"search","统计查询"],[1,this.jiayouzhan,"water","加油站管理"]
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
