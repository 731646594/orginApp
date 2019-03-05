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

    //1:commonStyle/apps通用样式
    //2:mine/serverSetting服务器设置
    //3:mine/modifyPassword修改密码
    //4:mine/login切换单位
    //5:mine/login重新登录
    //6:清除数据
    //7:更新字典

    let pandian = {
      pageName:"资产盘点",
      pageData:[
        [
          [[],[],["qr-scanner"],["资产盘点"]],[[],[],["sync"],["盘点查询"]],[[],[],["cloud-download"],["数据下载"]]
        ],
        [
          [[],[],["search"],["本地下载查询"]],[[],[],["cloud-upload"],["数据上传"]],[[],[],["create"],["盘盈录入"]]
        ],
      ]
    };
    let baofei = {
      pageName:"报废管理",
      pageData:[
        [
          [[],[],["trash"],["报废申请"]],[[],[],["paper"],["报废审批"]],[[],[],["search"],["报废查询"]]
        ]
      ]
    };
    let diaobo = {
      pageName:"调拨管理",
      pageData:[
        [
          [[],[],["open"],["调拨申请"]],[[],[],["paper"],["调拨审批"]],[[],[],["search"],["调拨查询"]]
        ],
        [
          [[],[],["arrow-round-up"],["调出确认"]],[[],[],["arrow-round-down"],["调入确认"]]
        ]
      ]
    };
    let tongji = {
      pageName:"统计查询",
      pageData:[
        [
          [[],[],["search"],["资产查询"]],[[],[],["search"],["台账查询"]],[[],[],["search"],["汇总查询"]]
        ]
      ]
    };
    let jiayouzhan = {
      pageName:"加油站管理",
      pageData:[
        [
          [[],[],["create"],["周检表录入"]],[[],[],["create"],["交接班录入"]],[[],[],["cloud-upload"],["数据上传"]]
        ]
      ]
    };

    this.pageData1 = {
      pageName:"应用",
      pageData:[
        [
          [[1],[pandian],["qr-scanner"],["资产盘点"]],[[1],[baofei],["trash"],["报废管理"]],[[1],[diaobo],["open"],["调拨管理"]]
        ],
        [
          [[1],[tongji],["search"],["统计查询"]],[[1],[jiayouzhan],["water"],["加油站管理"]]
        ]
      ]
    };

    this.pageData2 = {
      pageName:"我的",
      pageData:[
        [
          [[2],[],["settings"],["服务器设置"]],[[3],[],["create"],["修改密码"]],[[4],[],["repeat"],["切换单位"]]
        ],
        [
          [[5],[],["refresh-circle"],["重新登陆"]],[[6],[],["trash"],["清除数据"]],[[7],[],["cloud-download"],["更新字典"]]
        ]
      ]
    }

  }
}
