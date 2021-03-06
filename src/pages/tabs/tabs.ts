import { Component } from '@angular/core';

import { MenuPage } from '../commonStyle/menu/menu';
import { HomePage } from '../home/home';
// import {PageUtil} from "../../services/storageService";
import {MinePage} from "../mine/mine/mine";
import {StorageService} from "../../services/storageService";
import {NativeService} from "../../services/NativeService";

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
  jianweixiu;
  shebeibaoyang;
  danjujiesuanguanli;
  kuaijibaobiaoguanli;
  amiba;
  isShowHome = true;
  isShowOther = true;
  constructor(public storageService:StorageService,public nativeService:NativeService) {

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
    //17:RFID
    //18:数据同步
    //19:RFID特殊
    //20:上传查询
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
    //61:维修申请
    //62:维修申请补录//去除
    //63:维修审批
    //64:维修验收/检维修确认
    //65:维修验收审批/检维修确认审批
    //66:维修单据查询
    //67:外委派单
    //68:外委开始维修
    //69:外委办结
    //71:外委派单
    //72:开始保养
    //73:保养办结
    //74:保养验收
    //75:保养提醒
    //76:保养单据查询
    //81:勘探部项目款审批
    //82:工程竣工决算款审批
    //83:进度款审批
    //84:一厂/三厂进度款审批
    //85:储气库投资表审批
    //91:加油站日报录入
    //92:加油站日报补录
    //93:加油站日报查询
    //101:日简表
    //102:月检表
    //103:油站录入情况查询
    this.pandian = {
      pageName:"资产盘点",
      pageData:[
        [
          [11,"","saoyisao.png","快速扫码","1"],[12,"","pandianchaxun.png","盘点查询","1"],[13,"","xiazai.png","数据下载","1"]
        ],
        [
          [14,"","chaxun.png","本地下载查询","1"],[15,"","shangchuan.png","数据上传","1"],[16,"","luruzhong.png","盘盈录入","1"]
        ],
        [
          [18,"","xiazai.png","数据同步","1"],[20,"","diaobochaxun.png","上传查询","1"],[]
        ]
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
    this.jianweixiu = {
      pageName:"检维修管理",
      pageData:[
        [
          [61,"","luruzhong.png","维修申请","1"],[62,"","diaoboshengqing.png","维修申请补录","1"],[63,"","diaoboshenpi.png","维修审批","1"]
        ],
        [
          [64,"","shangchuan.png","维修验收","1"],[65,"","diaobochaxun.png","维修验收审批","1"],[66,"","zichanchaxun.png","维修单据查询","1"]
        ],
        [
          [67,"","shujushangchuan.png","维修外委派单","1"],[68,"","baofeishengqing.png","开始维修","1"],[69,"","baofeishenpi.png","维修办结","1"]
        ]
      ]
    };
    this.shebeibaoyang = {
      pageName:"设备保养管理",
      pageData:[
        [
          [71,"","diaochu.png","保养外委派单","1"],[72,"","taizhangchaxun.png","开始保养","1"],[73,"","chaxun.png","保养办结","1"]
        ],
        [
          [75,"","shangchuan.png","保养提醒","1"],[74,"","zichanchaxun.png","保养验收","1"],[76,"","zichanchaxun.png","保养单据查询","1"]
        ]
      ]
    };
    this.danjujiesuanguanli = {
      pageName:"结算单据管理",
      pageData:[
        [
          [81,"","baofeishenpi.png","勘探部项目款审批","1"],[82,"","diaobochaxun.png","工程竣工决算款审批","1"],[83,"","chaxun.png","进度款审批","1"]
        ],
        [
          [84,"","luruzhong.png","一厂/三厂进度款审批","1"], [85,"","zichanchaxun.png","储气库投资表审批","1"], []
        ]
      ]
    };
    this.kuaijibaobiaoguanli = {
      pageName:"经营会计报表管理",
      pageData:[
        [
          [91,"","diaochu.png","加油站日报录入","1"],[92,"","diaoboshengqing.png","加油站日报补录","1"],[93,"","diaobochaxun.png","加油站日报查询","1"]
        ],
      ]
    };
    this.amiba = {
      pageName:"阿米巴报表查询",
      pageData:[
        [
          [101,"","zichanchaxun.png","日简表","1"],[102,"","taizhangchaxun.png","月简表","1"],[103,"","huizongchaxun.png","油站录入情况查询","1"]
        ],
      ]
    };
    this.pageData1 = {
      pageName:"应用",
      pageData:[
        [1,this.pandian,"","资产盘点"],[1,this.baofei,"","报废管理"],[1,this.diaobo,"","调拨管理"],
        [1,this.tongji,"","统计查询"],[1,this.jiayouzhan,"","加油站管理"],[1,this.jianweixiu,"","检维修管理"],
        [1,this.shebeibaoyang,"","设备保养管理"],[1,this.danjujiesuanguanli,"","结算单据管理"],[1,this.kuaijibaobiaoguanli,"","经营会计报表管理"],
        [1,this.amiba,"","阿米巴报表查询"]
      ]
    };
    if(this.storageService.read("applyPageData")){
      this.pageData1 = JSON.parse(this.storageService.read("applyPageData"));
      if (this.pageData1.pageData.length<=2){
        this.isShowHome = false
      }
    }
    if (this.storageService.read("deviceType")&&this.storageService.read("deviceType")!="phone"){
      let lastIndex = this.pageData1.pageData[0][1].pageData.length-1;
      if(this.pageData1.pageData[0][1].pageData[lastIndex][2].length>0){
        this.pageData1.pageData[0][1].pageData.push(
          [
            [17,"","saoyisao.png","RFID标签盘点","1"],[19,"","luruzhong.png","RFID特殊盘点","1"],[]
          ]
        )
      }else if (this.pageData1.pageData[0][1].pageData[lastIndex][1].length == 0){
        this.pageData1.pageData[0][1].pageData[lastIndex][1] = [17,"","saoyisao.png","RFID标签盘点","1"];
        this.pageData1.pageData[0][1].pageData[lastIndex][2] = [19,"","luruzhong.png","RFID特殊盘点","1"];
      }else if (this.pageData1.pageData[0][1].pageData[lastIndex][2].length == 0){
        this.pageData1.pageData[0][1].pageData[lastIndex][2] = [17,"","saoyisao.png","RFID标签盘点","1"];
        this.pageData1.pageData[0][1].pageData.push(
          [
            [19,"","luruzhong.png","RFID特殊盘点","1"],[],[]
          ]
        )
      }
    }
    this.pageData2 = {
      pageName:"我的",
      pageData:[
        [
          [2,"","shezhi.png","服务器设置"],[3,"","xiugai.png","修改密码"],[4,"","qiehuan.png","切换单位"]
        ],
        [
          [6,"","qingchu.png","清除数据"],[7,"","gengxin.png","更新字典"],[8,"","shezhi.png","设备类型"],
        ],
        [
          [5,"","tuichu.png","退出登陆"],
        ]
      ]
    };
    if (!this.nativeService.isAndroid()){
      this.pageData2 = {
        pageName:"我的",
        pageData:[
          [
            [2,"","shezhi.png","服务器设置"],[3,"","xiugai.png","修改密码"],[4,"","qiehuan.png","切换单位"]
          ],
          [
            [6,"","qingchu.png","清除数据"],[7,"","gengxin.png","更新字典"],[5,"","tuichu.png","退出登陆"],
          ]
        ]
      }
    }
  }
}
