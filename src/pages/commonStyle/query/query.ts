import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-query',
  templateUrl: 'query.html'
})
export class QueryPage {
  data={
    pageName:"报废查询",
    pageData:{
      pageItem:[
        {itemName:"单据编号", itemType:"input",inputType:"text",itemValue:"invoiceNumber"},
        {itemName:"审批进度", itemType:"select", itemValue:"invoiceStatus",optionValueString:"optionValue",optionNameString:"optionName",
          option:[
            {optionName:"全部",optionValue:"0"},
            {optionName:"新建",optionValue:"1"},
            {optionName:"驳回",optionValue:"2"},
            {optionName:"待审批",optionValue:"3"},
            {optionName:"审批中",optionValue:"4"},
            {optionName:"审批完成",optionValue:"5"},
          ],
        },
        {itemName:"查询月份", itemType:"date",itemValue:"invoiceYM"},
      ]
    }
  };
  pageName = "11111111";
  pageData = {};
  isFocus;
  invoice=[];
  constructor(public navCtrl: NavController,public navParams:NavParams) {
    this.pageName = this.data.pageName;
    this.pageData = this.data.pageData;
  }
  ionViewDidEnter(){

  }
  hideFooter(){
    this.isFocus=true;
  }
  showFooter(){
    this.isFocus=false;
  }
  getInputValue(value,key){
    this.showFooter();
    this.invoice[key] = value;
  }
  getSelectValue(value,key){
    this.invoice[key[0]] = value["selectedValue"];
    this.invoice[key[1]] = value["selectedName"];
  }
  getDateValue(value,key){
    this.invoice[key] = value;
  }
}
