import { Component } from '@angular/core';

import { MenuPage } from '../commonStyle/menu/menu';
import { HomePage } from '../home/home';
// import {PageUtil} from "../../services/storageService";
import {MinePage} from "../mine/mine/mine";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MenuPage;
  tab3Root = MinePage;

  pageData1;
  pageData2;

  pandian;
  baofei;
  diaobo;
  tongji;
  jiayouzhan;
  constructor() {

    // PageUtil.pages["tabs"]=this;

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
    //31:调拨申请
    //32:调拨审批
    //33:调拨查询
    //34:调出确认
    //35:调入确认
    //41:资产查询
    //42:台账查询
    //43:汇总查询
    //51:周检表录入
    //52:交接班录入
    //53:数据上传
    this.pandian = {
      pageName:"资产盘点",
      pageData:[
        [
          [11,"","saoyisao.png","快速扫码","1"],[12,"","pandianchaxun.png","盘点查询","1"],[13,"","xiazai.png","数据下载","1"]
        ],
        [
          [14,"","chaxun.png","本地下载查询","1"],[15,"","shangchuan.png","数据上传","1"],[16,"","luruzhong.png","盘盈录入","1"]
        ],
      ]
    };
    this.baofei = {
      pageName:"报废管理",
      pageData:[
        [
          [21,"","baofeishengqing.png","报废申请","1"],[22,"","baofeishenpi.png","报废审批","1"],[23,"","baofeichaxun.png","报废查询","1"]
        ]
      ]
    };
    this.diaobo = {
      pageName:"调拨管理",
      pageData:[
        [
          [31,"","diaoboshengqing.png","调拨申请","1"],[32,"","diaoboshenpi.png","调拨审批","1"],[33,"","diaobochaxun.png","调拨查询","1"]
        ],
        [
          [34,"","diaochu.png","调出确认","1"],
          [35,"","diaoru.png","调入确认","1"],
          []
        ]
      ]
    };
    this.tongji = {
      pageName:"统计查询",
      pageData:[
        [
          [41,"","zichanchaxun.png","资产查询","1"],[42,"","taizhangchaxun.png","台账查询","1"],[43,"","huizongchaxun.png","汇总查询","1"]
        ]
      ]
    };
    this.jiayouzhan = {
      pageName:"加油站管理",
      pageData:[
        [
          [51,"","zhoujian.png","周检表录入","1"],[52,"","jiaojie.png","交接班录入","1"],[53,"","shujushangchuan.png","数据上传","1"]
        ]
      ]
    };

    this.pageData1 = {
      pageName:"应用",
      pageData:[
        [1,this.pandian,"","资产盘点"],[1,this.baofei,"","报废管理"],[1,this.diaobo,"","调拨管理"],
        [1,this.tongji,"","统计查询"],[1,this.jiayouzhan,"","加油站管理"]
      ]
    };
    this.pageData2 = {
      pageName:"我的",
      pageData:[
        [
          [2,null,"shezhi.png","服务器设置"],[3,null,"xiugai.png","修改密码"],[4,null,"qiehuan.png","切换单位"]
        ],
        [
          [6,null,"qingchu.png","清除数据"],[7,null,"gengxin.png","更新字典"],[5,null,"tuichu.png","退出登陆"]
        ]
      ]
    }

  }
}
