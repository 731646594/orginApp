import {Component} from '@angular/core';
import {AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";

@Component({
  selector: 'page-transferConfirmationDetail',
  templateUrl: 'transferConfirmationDetail.html'
})
export class TransferConfirmationDetailPage {
  pageName;
  invoice;
  postUrl;
  childPostUrl;
  detailList = [];
  isOnfocus = false;
  userName;
  userCode;
  departCode;
  displayIndex;


  storePlaceOption= [
    {optionValue:"待确定"  ,optionName:"待确定"                 },
    {optionValue:"02"  ,optionName:"炼化装置"                 },
    {optionValue:"0201",optionName:"烷基化车间烷基化装置"     },
    {optionValue:"0202",optionName:"延迟焦化车间延迟焦化装置" },
    {optionValue:"0203",optionName:"PSA装置" 		       },
    {optionValue:"0204",optionName:"烷基化车间" 	       },
    {optionValue:"03"  ,optionName:"办公场所" 		       },
    {optionValue:"0301",optionName:"办公场所-办公区" 	       },
    {optionValue:"0302",optionName:"办公场所-餐厅" 	       },
    {optionValue:"0303",optionName:"办公场所-活动室" 	       },
    {optionValue:"0304",optionName:"办公场所-库房"            },
    {optionValue:"0305",optionName:"办公场所-车库" 	       },
    {optionValue:"04"  ,optionName:"加油(气)站" 	       },
    {optionValue:"0401",optionName:"加油(气)站-加油现场"      },
    {optionValue:"0402",optionName:"加油(气)站-便利店"        },
    {optionValue:"0403",optionName:"加油(气)站-办公区"        },
    {optionValue:"0404",optionName:"加油(气)站-配电房"        },
    {optionValue:"0405",optionName:"加油(气)站-宿舍" 	       },
    {optionValue:"0406",optionName:"加油(气)站-厨房" 	       },
    {optionValue:"0407",optionName:"加油(气)站-餐厅" 	       },
    {optionValue:"0408",optionName:"加油(气)站-生活区"        },
    {optionValue:"0409",optionName:"加油(气)站-油罐区"        },
    {optionValue:"0410",optionName:"加油(气)站-库房" 	       },
    {optionValue:"0411",optionName:"加油(气)站-卫生间"        },
    {optionValue:"05"  ,optionName:"油(气)库" 		       },
    {optionValue:"0501",optionName:"油(气)库-库区" 	       },
    {optionValue:"0502",optionName:"油(气)库-办公区" 	       },
    {optionValue:"0503",optionName:"油(气)库-配电房" 	       },
    {optionValue:"0504",optionName:"油(气)库-宿舍" 	       },
    {optionValue:"0505",optionName:"油(气)库-厨房" 	       },
    {optionValue:"0506",optionName:"油(气)库-餐厅" 	       },
    {optionValue:"0507",optionName:"油(气)库-库房" 	       },
    {optionValue:"0508",optionName:"油(气)库-油码头作业区"    },
    {optionValue:"0509",optionName:"油(气)库-收发油区"        },
    {optionValue:"0510",optionName:"油(气)库-化验室" 	       },
    {optionValue:"0511",optionName:"油(气)库-计量室" 	       },
    {optionValue:"0512",optionName:"油(气)库-收发油泵房"      },
    {optionValue:"0513",optionName:"油(气)库-消防泵房"        },
    {optionValue:"0514",optionName:"油(气)库-锅炉房" 	       },
    {optionValue:"0515",optionName:"油(气)库-空压机房"        },
    {optionValue:"0516",optionName:"油(气)库-铁路作业区"      },
    {optionValue:"0517",optionName:"油(气)库-门卫" 	       },
    {optionValue:"0518",optionName:"油(气)库-卫生间" 	       },
    {optionValue:"06"  ,optionName:"水上加油站" 	       },
    {optionValue:"0601",optionName:"水上加油站-加油船"        },
    {optionValue:"07"  ,optionName:"管理站" 		       },
    {optionValue:"0701",optionName:"管理站-操作间" 	       },
    {optionValue:"0702",optionName:"管理站-泵房" 	       },
    {optionValue:"99"  ,optionName:"其他" 		       },]

  technicalConditionOption = [ {optionValue:"01",optionName:"完好"},
    {optionValue:"02",optionName:"带病运行"},
    {optionValue:"03",optionName:"在修"},
    {optionValue:"04",optionName:"待修"},
    {optionValue:"05",optionName:"待报废"},
    {optionValue:"06",optionName:"损毁"},
    {optionValue:"07",optionName:"待处置"},
    {optionValue:"08",optionName:"已处置"},]

  entityCodeOption =[{optionValue:"099000000050004",optionName:"重庆销售公司本部"},
    {optionValue:"099000000050005",optionName:"重庆销售渝中公司"},
    {optionValue:"099000000050006",optionName:"重庆销售江南公司"},
    {optionValue:"099000000050007",optionName:"重庆销售江北公司"},
    {optionValue:"099000000050008",optionName:"重庆销售永川公司"},
    {optionValue:"099000000050009",optionName:"重庆销售万州公司"},
    {optionValue:"099000000050010",optionName:"重庆销售涪陵公司"},
    {optionValue:"099000000050011",optionName:"重庆销售黔江公司"},
    {optionValue:"099000000050012",optionName:"重庆销售非油公司"},
    {optionValue:"099000000050013",optionName:"重庆销售燃料公司"},
    {optionValue:"099000000050014",optionName:"重庆销售中油现代交通油料有限责任公司"},
    {optionValue:"099000000050015",optionName:"重庆销售中油迅发实业有限责任公司"},
    {optionValue:"099000000050016",optionName:"重庆销售重庆市石油总公司华岩加油站"},
    {optionValue:"099000000050017",optionName:"重庆销售中油重庆小泉加油站"},
    {optionValue:"099000000050018",optionName:"重庆销售荣昌县中油川荣石油有限责任公司"},
    {optionValue:"099000000050019",optionName:"重庆销售荣昌县昌州石油有限责任公司"},
    {optionValue:"099000000050020",optionName:"重庆销售中油芙武有限责任公司"},
    {optionValue:"099000000050021",optionName:"重庆销售中油铁发渝遂有限责任公司"},
    {optionValue:"099000000050022",optionName:"重庆销售重庆中油诚源发展有限公司"},
    {optionValue:"099000000050023",optionName:"重庆销售仓储公司"},]

  constructor(public navCtrl: NavController, public httpService: HttpService, public storageService: StorageService,
              public app: App, public alertCtrl: AlertController, public navParams: NavParams,public events: Events) {
    this.loadData();
  }

  ionViewDidEnter() {
    // this.loadData();
  }

  loadData() {
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.pageName = this.navParams.get("pageName");
    this.invoice = this.navParams.get("invoice");
    this.postUrl = this.navParams.get("postUrl");
    this.childPostUrl = this.navParams.get("childPostUrl");
    console.log(this.childPostUrl)
    // let url = "allotController.do?getByPhoneInvoiceNumber";
    let url = "allotController/getByInvoiceNumber.do";
    this.httpService.postData(this.httpService.getUrl() + url, {
      departCode: this.departCode,
      phoneInvoiceNumber: this.invoice.invoiceNumber,
      invoiceNumber: this.invoice.invoiceNumber
    },data => {
      if (data.success == "true") {
        this.detailList = data.data;

      } else {
        alert(data.msg);
      }
    },true)
  }

  inputOnfocus() {
    this.isOnfocus = true;
  }

  inputOnblur() {
    this.isOnfocus = false;
  }

  displayContent(index) {
    let content = document.getElementsByClassName("disContent");
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

  /**
   * 上传数据
   */
  uploadData() {
    console.log(this.detailList)
    if(!this.check()){
      return;
    }

    let invoiceDatas = new Array();
    invoiceDatas.push(this.invoice)
    // this.httpService.postData(this.httpService.getUrl() + this.childPostUrl, {
    //   departCode: this.departCode,
    //   userCode: this.userCode,
    //   userName: this.userName,
    //   phoneInvoiceNumber: this.invoice.invoiceNumber,
    //   invoiceDatas: JSON.stringify(invoiceDatas),
    //   detailList:JSON.stringify(this.detailList)
    // },data => {
    //   if (data.success == "true") {
    //     let alertCtrl = this.alertCtrl.create({
    //       title: data.msg
    //     });
    //     alertCtrl.present()
    //     this.events.publish("TransferConfirmationPage:refresh");
    //   } else {
    //     alert(data.msg)
    //   }
    //   loadingCtrl.dismiss();
    // })

    this.httpService.postData(this.httpService.getUrl() + this.childPostUrl, {
      departCode: this.departCode,
      userCode: this.userCode,
      userName: this.userName,
      phoneInvoiceNumber: this.invoice.invoiceNumber,
      invoiceDatas: JSON.stringify(invoiceDatas),
      detailList:JSON.stringify(this.detailList)
    },data => {
      if (data.success == "true") {
        let alertCtrl = this.alertCtrl.create({
          title: data.msg
        });
        alertCtrl.present()
        this.events.publish("TransferConfirmationPage:refresh");
      } else {
        alert(data.msg)
      }
    },true)
  }

  /**
   * 校验
   */
  check():any{
    if(this.pageName == "调入确认详情"){
       //判断资产组,保管人
       if(!this.checkTransferIn()){
          return false;
       }
      // 获取字典对应名称
      this.detailList.forEach(item =>{
          item["storePlaceName"] = this.getName(item["storePlace"],this.storePlaceOption);
          item["technicalConditionName"] = this.getName(item["technicalCondition"],this.technicalConditionOption);
          item["entityCodeName"] = this.getName(item["entityCode"],this.entityCodeOption);

      })
      return true;
    }else{
      return true;
    }
   }
  technicalConditionOptionSelect(value,name,i){
     this.detailList[i]["technicalConditionName"] = name;
     this.detailList[i]["technicalCondition"] = value;
  }
  entityCodeOptionSelect(value,name,i){
    this.detailList[i]["entityCodeName"] = name;
    this.detailList[i]["entityCode"] = value;
  }
  storePlaceOptionSelect(value,name,i){
    this.detailList[i]["storePlaceName"] = name;
    this.detailList[i]["storePlace"] = value;
  }

  /**
   * 获取字典name
   * @param value
   * @param options
   */
  getName(value,options):any{
    for(let i = 0;i<options.length;i++){
         let item = options[i];
         if(item.optionValue == value){
              return item.optionName;
         }
    }
    return "";
  }


  checkTransferIn():any{
     for(let i=0;i<this.detailList.length;i++){
        let item  = this.detailList[i];
       if(!item["storePlace"]){
         let alertCtrl = this.alertCtrl.create({
           title: "请选择存放地点！"
         });
         alertCtrl.present();
         return false;
       }

       if(!item["technicalCondition"]){
         let alertCtrl = this.alertCtrl.create({
           title: "请选择技术状况！"
         });
         alertCtrl.present();
         return false;
       }

       if(!item["entityCode"]){
         let alertCtrl = this.alertCtrl.create({
           title: "请选择资产组！"
         });
         alertCtrl.present();
         return false;
       }

       if(!item["userPerson"]){
         let alertCtrl = this.alertCtrl.create({
           title: "请输入保管人！"
         });
         alertCtrl.present();
         return false;
       }
     }
     return true;
  }
}
