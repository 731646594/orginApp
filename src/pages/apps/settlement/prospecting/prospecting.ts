import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";

@Component({
  selector: 'page-prospecting',
  templateUrl: 'prospecting.html'
})
export class ProspectingPage {
  pageName;
  shape = "brief";
  pageData;
  displayIndex;
  briefData = [{},{},{},{},{},{}];
  detailedData = [{}];
  moreData = [{}];
  briefTableData = [{}];
  detailedTableData = [{}];
  sumItem = [];
  sumData = {};
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public navParams:NavParams) {
    this.pageName = this.navParams.get("pageName").replace("审批","详情");
    this.pageData = {
      segmentName:["单据明细", "附件明细", "审批历史记录"],
      pageItem:[
        [
          {itemType:"card",
            card:{
              cardParent:[
                {itemName:"设备编码", itemType:"label",itemValue:"sbbm"},
                {itemName:"设备名称", itemType:"label",itemValue:"sbmc"},
              ],
              cardChild:[
                {itemName:"是否外包", itemType:"label",itemValue:"zfyl10"},
                {itemName:"所属单位", itemType:"label",itemValue:"ssdwmc"},
                {itemName:"资产类型", itemType:"label",itemValue:"sblxmc"},
                {itemName:"资产类别", itemType:"label",itemValue:"zclbmc"},
                {itemName:"特种设备", itemType:"label",itemValue:"tssb"},
                {itemName:"规格型号", itemType:"label",itemValue:"ggxhmc"},
                {itemName:"历史维修信息",itemType:"label", itemValue:"makeFactory"},
                {itemName:"\u00A0\u00A0\u00A0\u00A0设备总维修次数",itemType:"label", itemValue:"wxCount"},
                {itemName:"\u00A0\u00A0\u00A0\u00A0总维修金额",itemType:"label", itemValue:"sumMoney"},
                {itemName:"历史维修信息明细",itemType:"label", itemValue:"makeFactory"},
                {itemType:"table",tableItem:[
                    {colName:"维修日期",colValue:"wxrq"},
                    {colName:"维修金额",colValue:"zfyl1"},
                    {colName:"故障描述",colValue:"zfyl2"},
                  ]
                }
              ]
            }
          }
        ],
        [
          {itemType:"card",
            card:{
              cardParent:[
                {itemName:"设备编码", itemType:"label",itemValue:"sbbm"},
                {itemName:"设备名称", itemType:"label",itemValue:"sbmc"},
              ],
              cardChild:[
                {itemName:"是否外包", itemType:"label",itemValue:"zfyl10"},
                {itemName:"所属单位", itemType:"label",itemValue:"ssdwmc"},
                {itemName:"资产类型", itemType:"label",itemValue:"sblxmc"},
                {itemName:"资产类别", itemType:"label",itemValue:"zclbmc"},
                {itemName:"特种设备", itemType:"label",itemValue:"tssb"},
                {itemName:"规格型号", itemType:"label",itemValue:"ggxhmc"},
                {itemName:"历史维修信息",itemType:"label", itemValue:"makeFactory"},
                {itemName:"\u00A0\u00A0\u00A0\u00A0设备总维修次数",itemType:"label", itemValue:"wxCount"},
                {itemName:"\u00A0\u00A0\u00A0\u00A0总维修金额",itemType:"label", itemValue:"sumMoney"},
                {itemName:"历史维修信息明细",itemType:"label", itemValue:"makeFactory"},
                {itemType:"table",tableItem:[
                    {colName:"维修日期",colValue:"wxrq"},
                    {colName:"维修金额",colValue:"zfyl1"},
                    {colName:"故障描述",colValue:"zfyl2"},
                  ]
                }
              ]
            }
          }
        ],
        [
          {itemType:"card",
            card:{
              cardParent:[
                {itemName:"厂商序号", itemType:"label",itemValue:"csxh"},
                {itemName:"厂商单位", itemType:"label",itemValue:"csdwmc"},
              ],
              cardChild:[
                {itemName:"厂商地址", itemType:"label",itemValue:"csdz"},
                {itemName:"联系电话", itemType:"label",itemValue:"lxdh"},
                {itemName:"手机", itemType:"label",itemValue:"phone"},
                {itemName:"厂商类型", itemType:"label",itemValue:"cslx"},
              ]
            }
          }
        ]
      ],
    }
    this.sumItem = [
      {itemName:"厂商序号", itemType:"label",itemValue:"csxh"},
      {itemName:"厂商单位", itemType:"label",itemValue:"csdwmc"},
      {itemName:"厂商序号", itemType:"label",itemValue:"csxh"},
      {itemName:"厂商单位", itemType:"label",itemValue:"csdwmc"},
    ]
    this.sumData = {
      csxh:11111111111111111,
      csdwmc:48465.494
    }
  }
  displayContent(index){
    let content = document.getElementsByClassName("disContent");
    if (content.length>0) {
      if ((<HTMLElement>content[index]).style.display == "block") {
        (<HTMLElement>content[index]).style.display = "none";
      } else {
        if (this.displayIndex >= 0) {
          (<HTMLElement>content[this.displayIndex]).style.display = "none";
        }
        (<HTMLElement>content[index]).style.display = "block";
        this.displayIndex = index;
      }
    }
  }
}
