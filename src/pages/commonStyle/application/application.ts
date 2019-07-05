import { Component } from '@angular/core';
import {AlertController, App, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";

@Component({
  selector: 'page-application',
  templateUrl: 'application.html'
})
export class ApplicationPage {
  pageName;
  pageData;
  invoice=[];
  shape = "brief";
  data={
    pageName:"调拨申请",
    pageData:{
      segmentName:["单据", "明细"],
      pageItem:[
        [
          {itemName:"单据类型", itemType:"select", itemValue:"invoiceType",
            option:[
              {optionName:"有形",optionValue:"1401"},
              {optionName:"无形",optionValue:"1402"},
              {optionName:"长(待)摊费用",optionValue:"1403"},
              {optionName:"整体",optionValue:"1404"},
            ],
          },
          {itemName:"调出单位",itemType:"selectFilter",dataName:"out",itemValue:["outDepartcode","outDepartname"]},
          {itemName:"调入单位",itemType:"selectFilter",dataName:"in",itemValue:["inDepartcode","inDepartname"]},
          {itemName:"调拨原因", itemType:"input",inputType:"text",itemValue:"reason"},
          {itemName:"备注", itemType:"input",inputType:"text",itemValue:"remark"},
          {itemName:"数量", itemType:"input",inputType:"number",itemValue:"allotAmount"},
          {itemName:"原值", itemType:"input",inputType:"number",itemValue:"originalValue"},
          {itemName:"净值", itemType:"input",inputType:"number",itemValue:"nowValue"},
          {itemName:"累计折旧", itemType:"input",inputType:"number",itemValue:"addDepreciate"},
          {itemName:"制单人", itemType:"label",itemValue:"createUserName"},
          {itemName:"制单时间", itemType:"label",itemValue:"createTime"},
          {itemName:"申请单位", itemType:"label",itemValue:"createDepart"},

        ],
        [
          {itemType:"radioInput",
            radio:[
              {radioName:"资产条码",radioValue:"barCode"},
              {radioName:"资产编码",radioValue:"assetsCode"},
            ]
          },
          {itemType:"card",
            card:{
              cardParent:[
                {itemName:"资产编码", itemType:"label",itemValue:"assetsCode"},
                {itemName:"资产名称", itemType:"label",itemValue:"assetsName"},
              ],
              cardChild:[
                {itemName:"资产编码", itemType:"label",itemValue:"assetsCode"},
                {itemName:"资产名称", itemType:"label",itemValue:"assetsName"},
                {itemName:"所属单位", itemType:"label",itemValue:"departName"},
                {itemName:"备注", itemType:"label",itemValue:"remark"},
                {itemName:"存放地点", itemType:"label",itemValue:"storePlace"},
                {itemName:"规格型号", itemType:"label",itemValue:"assetsStandard"},
                {itemName:"车牌井号", itemType:"label",itemValue:"licenceNumber"},
                {itemName:"制造厂家", itemType:"label",itemValue:"makeFactory"},
                {itemName:"所属单位编码", itemType:"label",itemValue:"departCode"},
                {itemName:"保管人", itemType:"label",itemValue:"userPerson"},
                {itemName:"编码", itemType:"label",itemValue:"barCode"},
                {itemName:"出厂编号", itemType:"label",itemValue:"productId"},
                {itemName:"原值", itemType:"label",itemValue:"originalValue"},
                {itemName:"净值", itemType:"label",itemValue:"nowValue"},
                {itemName:"累计折旧", itemType:"label",itemValue:"addDepreciate"},
                {itemName:"减值准备", itemType:"label",itemValue:"devalueValue"},
                {itemName:"使用状态编码", itemType:"label",itemValue:"usedState"},
                {itemName:"使用状态", itemType:"label",itemValue:"usedStateName"},
              ]
            }
          }
        ]
      ],
    }
  };
  testDepart=[
    {
      departName:"沈阳大东分公司分公司分公司分公司分公司分公司分公司分公司分公司",
      departCode:"0010011"
    },{
      departName:"沈阳分公司",
      departCode:"001"
    },{
      departName:"北京办公室",
      departCode:"002001001"
    },{
      departName:"重庆加油站",
      departCode:"003001001001"
    },{
      departName:"天津人事部",
      departCode:"004002"
    }, {
      departName:"沈阳大东分公司",
      departCode:"001001"
    },{
      departName:"沈阳分公司",
      departCode:"001"
    },{
      departName:"北京办公室",
      departCode:"002001001"
    },{
      departName:"重庆加油站",
      departCode:"003001001001"
    },{
      departName:"天津人事部",
      departCode:"004002"
    },{
      departName:"沈阳大东分公司",
      departCode:"001001"
    },{
      departName:"沈阳分公司",
      departCode:"001"
    },{
      departName:"北京办公室",
      departCode:"002001001"
    },{
      departName:"重庆加油站",
      departCode:"003001001001"
    },{
      departName:"天津人事部",
      departCode:"004002"
    }, {
      departName:"沈阳大东分公司",
      departCode:"001001"
    },{
      departName:"沈阳分公司",
      departCode:"001"
    },{
      departName:"北京办公室",
      departCode:"002001001"
    },{
      departName:"重庆加油站",
      departCode:"003001001001"
    },{
      departName:"天津人事部",
      departCode:"004002"
    },{
      departName:"沈阳大东分公司",
      departCode:"001001"
    },{
      departName:"沈阳分公司",
      departCode:"001"
    },{
      departName:"北京办公室",
      departCode:"002001001"
    },{
      departName:"重庆加油站",
      departCode:"003001001001"
    },{
      departName:"天津人事部",
      departCode:"004002"
    }, {
      departName:"沈阳大东分公司",
      departCode:"001001"
    },{
      departName:"沈阳分公司",
      departCode:"001"
    },{
      departName:"北京办公室",
      departCode:"002001001"
    },{
      departName:"重庆加油站",
      departCode:"003001001001"
    },{
      departName:"天津人事部",
      departCode:"004002"
    }
  ];
  isFocus = false;
  searchDatas=[];
  radioValue;
  radioInput="";
  radioInputPostUrl;
  userName;
  userCode;
  departName;
  departCode;
  selectFilterData=[];
  constructor(public navCtrl: NavController,public navParams:NavParams,public alertCtrl:AlertController,
              public storageService:StorageService,public events:Events,public app:App,public loadingCtrl:LoadingController,
              public httpService:HttpService) {
    // PageUtil.pages["application"]=this;
    this.invoice=JSON.parse("{}");
    this.pageName=this.data.pageName;
    this.pageData=this.data.pageData;
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    let date = new Date();
    this.invoice["invoiceType"]="1401";
    this.invoice["inDepartcode"]="";
    this.invoice["allotAmount"]=0;
    this.invoice["originalValue"]="0.00";
    this.invoice["nowValue"]="0.00";
    this.invoice["addDepreciate"]="0.00";
    this.invoice["createUserName"]=this.userName;
    this.invoice["createTime"]=date.toLocaleDateString();
    this.invoice["createDepart"]=this.departName;
    this.selectFilterData["in"]=[];
    this.selectFilterData["out"]=[];
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("departListData",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.selectFilterData["in"] = JSON.parse(res.rows.item(0).stringData);
        for(let i in this.selectFilterData["in"]){
          if(this.selectFilterData["in"][i]["departcode"].lastIndexOf(this.departCode)>-1&&this.selectFilterData["in"][i]["marktail"] == "1"){
            this.selectFilterData["out"].push(this.selectFilterData["in"][i]);
          }
        }
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));;
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("allotInvoice",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.invoice = JSON.parse(res.rows.item(0).stringData)
      }
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("allotDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.searchDatas = JSON.parse(res.rows.item(0).stringData)
      }
    }).catch(e =>alert("erro2_3:"+JSON.stringify(e)));
    this.events.subscribe("showFooter",(res) => {
      this.showFooter()
    });
    this.events.subscribe("hideFooter",(res) => {
      this.hideFooter();
    });
    this.radioInputPostUrl="discardController.do?queryByCodeOrBar";
  }
  ionViewWillUnload(){
    this.events.unsubscribe("showFooter");
    this.events.unsubscribe("hideFooter")
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
  getRadioValue(value){
    this.radioValue = value.radioValue;
  }
  getRadioInputValue(value){
    console.log(this.searchDatas.indexOf(value));
    for(let i in this.searchDatas){
      if (this.searchDatas[i].assetsCode == value.assetsCode){
        let alertCtrl = this.alertCtrl.create({
          title:"该条明细已被搜出！"
        });
        alertCtrl.present();
        return false;
      }
    }
    this.searchDatas.push(value)
  }
  getCardSelectValue(index){
    // this.searchDatas[index]["checkedIcon"] = !this.searchDatas[index]["checkedIcon"];
    this.invoice["allotAmount"] = this.invoice["allotAmount"]?<any>this.invoice["allotAmount"]*1:0;
    this.invoice["originalValue"] = this.invoice["originalValue"]?<any>this.invoice["originalValue"]*1:0;
    this.invoice["nowValue"] = this.invoice["nowValue"]?<any>this.invoice["nowValue"]*1:0;
    this.invoice["addDepreciate"] = this.invoice["addDepreciate"]?<any>this.invoice["addDepreciate"]*1:0;
    this.invoice["devalueValue"] = this.invoice["devalueValue"]?<any>this.invoice["devalueValue"]*1:0;
    if (this.searchDatas[index]["checkedIcon"]){
      this.invoice["allotAmount"]++;
      this.invoice["originalValue"] += <any>this.searchDatas[index]["originalValue"]*1;
      this.invoice["nowValue"] += <any>this.searchDatas[index]["nowValue"]*1;
      this.invoice["addDepreciate"] += <any>this.searchDatas[index]["addDepreciate"]*1;
      this.invoice["devalueValue"] += <any>this.searchDatas[index]["devalueValue"]*1;
    }else {
      this.invoice["allotAmount"]--;
      this.invoice["originalValue"] -= <any>this.searchDatas[index]["originalValue"]*1;
      this.invoice["nowValue"] -= <any>this.searchDatas[index]["nowValue"]*1;
      this.invoice["addDepreciate"] -= <any>this.searchDatas[index]["addDepreciate"]*1;
      this.invoice["devalueValue"] -= <any>this.searchDatas[index]["devalueValue"]*1;
    }
    this.invoice["originalValue"] = this.invoice["originalValue"].toFixed(2)
    this.invoice["nowValue"] = this.invoice["nowValue"].toFixed(2)
    this.invoice["addDepreciate"] = this.invoice["addDepreciate"].toFixed(2)
    this.invoice["devalueValue"] = this.invoice["devalueValue"].toFixed(2)
  }
  getScannerValue(value){
    this.radioInput = value;
  }
  confirmChecked(){
    for(let index in this.searchDatas){
      if(this.searchDatas[index]["checkedIcon"]){
        return true;
      }
    }
    let alertCtrl = this.alertCtrl.create({
      title:"请选择明细！"
    });
    alertCtrl.present();
    return false;
  }
  formatDateToString(date){
    if(!date){
      date = new Date();
    }
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if(month<10) month = "0"+month;
    if(day<10) day = "0"+day;
    return year+""+month+""+day;
  }
  formatDateAndTimeToString(date) {
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    if(hours<10) hours = "0"+hours;
    if(mins<10) mins = "0"+mins;
    if(secs<10) secs = "0"+secs;
    return this.formatDateToString(date)+""+hours+""+mins+""+secs;
  }
  censorship(){
    if (!this.confirmChecked()){
      return false;
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:5000
    });
    loading.present();
    let url;
    url = "allotController.do?sendAllot";
    let phoneInvoiceNumber = this.userCode+this.departCode+this.formatDateAndTimeToString(new Date());
    this.httpService.post(this.httpService.getUrl()+url,{departCode:this.departCode,userCode:this.userCode,phoneInvoiceNumber:phoneInvoiceNumber}).subscribe(data=>{
      if (data.success == "true"){
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present()
      }
      else {
        alert(data.msg)
      }
      loading.dismiss();
    })
  }
  saveInfo(){
    if (!this.confirmChecked()){
      return false;
    }
    this.storageService.sqliteInsert("allotInvoice",this.userCode,JSON.stringify(this.invoice));
    let list=[];
    for(let index in this.searchDatas){
      if(this.searchDatas[index]["checkedIcon"]){
        list.push(this.searchDatas[index]);
      }
    }
    this.searchDatas = list;
    this.storageService.sqliteInsert("allotDetail",this.userCode,JSON.stringify(this.searchDatas));
    let alertCtrl = this.alertCtrl.create({
      title:"保存成功！"
    });
    alertCtrl.present();
  }
  uploadData(){
    if (!this.confirmChecked()){
      return false;
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:5000
    });
    loading.present();
    let url;
    url = "allotController.do?add";
    this.httpService.post(this.httpService.getUrl()+url,{departCode:this.departCode,departName:this.departName,userCode:this.userCode,userName:this.userName,
      allotInvoiceDTO:this.invoice,eamDiscardInvoices:this.invoice,eamAllotDetal:this.searchDatas,eamDiscardDetails:this.searchDatas}).subscribe(data=>{
      if (data.success == "true"){
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present()
      }
      else {
        alert(data.msg)
      }
      loading.dismiss();
    })
  }
  uploadDataToEAM(){
    if (!this.confirmChecked()){
      return false;
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:5000
    });
    loading.present();
    let url;
    url = "allotController.do?confirm";
    let phoneInvoiceNumber = this.userCode+this.departCode+this.formatDateAndTimeToString(new Date());
    this.httpService.post(this.httpService.getUrl()+url,{departCode:this.departCode,phoneInvoiceNumber:phoneInvoiceNumber}).subscribe(data=>{
      if (data.success=="true"){
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present()
      }
      else {
        alert(data.msg)
      }
      loading.dismiss();
    })
  }
}
