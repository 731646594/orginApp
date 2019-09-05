import { Component } from '@angular/core';
import {Events, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-selectFilter',
  templateUrl: 'selectFilter.html'
})
export class SelectFilterPage {
  data;
  optionValue;
  optionName;
  filterData;
  showData=[];
  page=0;
  isScrollWork = false;
  inputValue;
  placeholderString="请输入要筛选的字符"
  constructor(public navCtrl: NavController,public navParams:NavParams,public viewCtrl:ViewController,
              public toastCtrl:ToastController,public events:Events) {
    this.data = this.navParams.get('data');
    this.optionValue = this.navParams.get('optionValue');
    this.optionName = this.navParams.get('optionName');
    if(this.optionName == "complexname"){
      this.placeholderString="请输入要筛选或输入的字符"
    }
    this.filterData = JSON.parse(JSON.stringify(this.data));
    this.initializeItems()
  }
  ionViewDidEnter(){

  }
  initializeItems() {
    let item = this.filterData;
    if(item.length>20){
      this.isScrollWork = true;
    }else {
      this.isScrollWork = false;
    }
    let i = this.page*20;
    for (i;i<(this.page*20+20);i++){
      if(item[i]){
        this.showData.push(item[i]);
      }
      else {
        this.page=-1
      }
    }
    if (this.page!=-1){
      this.page++;
    }
  }
  getItems(ev) {
    var val = ev.target.value;
    if(this.optionName == "complexname"){
      this.inputValue = val
    }
    if (val && val.trim() != '') {
      this.filterData = this.data.filter((item) => {
        return (item[this.optionName].indexOf(val) > -1);
      })
    }else {
      this.filterData = this.data;
    }
    this.showData=[];
    this.page = 0;
    this.initializeItems();
  }
  back(){
    let modelData;
    if(this.optionName == "complexname"){
      modelData = {selectedValue:this.inputValue,selectedName:this.inputValue}
    }else {
      modelData = '-1';
    }
    this.viewCtrl.dismiss(modelData);
  }

  returnSelect(value,name){
    let modelData = {selectedValue:value,selectedName:name}
    this.viewCtrl.dismiss(modelData);
  }
  getMore(infiniteScroll){
    if (this.page==-1){
      // infiniteScroll.enable(false);
      this.isScrollWork = false;
      let toast = this.toastCtrl.create({
        message: "这已经是最后一页了",
        duration: 1500,
      });
      toast.present();
    }else {
      this.initializeItems();
    }
    infiniteScroll.complete();

  }
  showFooter(){
    this.events.publish("showFooter");
  }
  hideFooter(){
    this.events.publish("hideFooter")
  }
}
