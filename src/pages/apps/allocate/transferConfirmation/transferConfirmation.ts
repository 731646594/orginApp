import {Component} from '@angular/core';
import {AlertController, App, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {TransferConfirmationDetailPage} from "../transferConfirmationDetail/transferConfirmationDetail";

@Component({
  selector: 'page-transferConfirmation',
  templateUrl: 'transferConfirmation.html'
})
export class TransferConfirmationPage {
  pageName;
  pageIndex;
  postUrl;
  childPostUrl;
  censorshipList = [];
  checkedIndex = null;
  isHave = 0;
  userName;
  userCode;
  departCode;

  constructor(public navCtrl: NavController, public httpService: HttpService, public storageService: StorageService,
              public app: App, public alertCtrl: AlertController, public navParams: NavParams,
              public loadingCtrl: LoadingController,public events: Events) {
    this.loadData();
    this.events.subscribe("TransferConfirmationPage:refresh",(data)=>{
      this.loadData()
    })
  }

  ionViewDidEnter() {
    // this.loadData();
  }

  loadData() {
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.pageName = this.navParams.get("pageName");
    this.postUrl = this.navParams.get("postUrl");
    this.childPostUrl = this.navParams.get("childPostUrl");
    let loading = this.loadingCtrl.create({
      content: "正在加载",
      duration: 10000
    });
    loading.present();
    this.httpService.postData(this.httpService.getUrl() + this.postUrl, {
      departCode: this.departCode,
      userCode: this.userCode
    },data => {
      if (data.success == "true") {
        this.censorshipList = data.data;
        if (this.censorshipList.length) {
          this.isHave = 1;
        }

        this.censorshipList.forEach(item => {
          item["checked"] = false;
        });
      } else {
        alert(data.msg);
      }
      loading.dismiss();
    })
  }

  checkedItem(index) {
    this.censorshipList[index]["checked"] = !this.censorshipList[index]["checked"];

    if (this.censorshipList[index]["checked"]) {
      document.getElementsByClassName("censorshipIcon")[index].setAttribute("style", "color: #4389e8;");

    } else {
      document.getElementsByClassName("censorshipIcon")[index].setAttribute("style", "color: #dedede;");

    }

    // if ((this.checkedIndex||this.checkedIndex==0)&&this.checkedIndex!=index){
    //   document.getElementsByClassName("censorshipIcon")[index].setAttribute("style","color: #4389e8;");
    //   this.censorshipList[index]["checked"] = true;
    //   document.getElementsByClassName("censorshipIcon")[this.checkedIndex].setAttribute("style","color: #dedede;");
    //   this.censorshipList[this.checkedIndex]["checked"] = false;
    //   this.checkedIndex = index;
    // }else {
    //   document.getElementsByClassName("censorshipIcon")[index].setAttribute("style","color: #4389e8;");
    //   this.censorshipList[index]["checked"] = true;
    //   this.checkedIndex = index;
    // }
  }

  censorshipDetailPage(invoice) {
    this.app.getRootNav().push(TransferConfirmationDetailPage, {
      pageName: this.navParams.get("childPageName"),
      postUrl: this.navParams.get("childPostUrl"),
      childPostUrl: this.navParams.get("childPostUrl"),
      invoice: invoice
    });
  }

  uploadData() {
    if(!this.checkTransferCOnfirmation()){
        return;
    }
    let loadingCtrl = this.loadingCtrl.create({
      content: "请等待...",
      duration: 10000
    });
    loadingCtrl.present();
    let invoiceDatas = new Array();
    this.censorshipList.forEach(item => {
      if (item["checked"]) {
        invoiceDatas.push(item);
      }
    })
    // this.httpService.postData(this.httpService.getUrl() + this.childPostUrl, {
    //   departCode: this.departCode,
    //   userCode: this.userCode,
    //   userName: this.userName,
    //   invoiceDatas: JSON.stringify(invoiceDatas)
    // },data => {
    //   this.loadData()
    //   if (data.success == "true") {
    //     let alertCtrl = this.alertCtrl.create({
    //       title: data.msg
    //     });
    //
    //     alertCtrl.present()
    //   } else {
    //     alert(data.msg)
    //   }
    //   loadingCtrl.dismiss()
    // })

    this.httpService.postData(this.httpService.getUrl() + this.childPostUrl, {
      departCode: this.departCode,
      userCode: this.userCode,
      userName: this.userName,
      invoiceDatas: JSON.stringify(invoiceDatas)
    },data => {
      this.loadData()
      if (data.success == "true") {
        let alertCtrl = this.alertCtrl.create({
          title: data.msg
        });

        alertCtrl.present()
      }
      loadingCtrl.dismiss()
    })
  }

  ionViewWillUnload() {
    this.events.unsubscribe('TransferConfirmationPage:refresh');
  }

   checkTransferCOnfirmation():any{
      if(this.pageName=="调出确认"){

        let isExist = false;
        for(let i = 0;i<this.censorshipList.length;i++){
          let item = this.censorshipList[i];
          if (item["checked"]) {
            isExist = true;
            return isExist;
           }
        }
        if(!isExist){
          let alertCtrl = this.alertCtrl.create({
            title:"请选择调出确认的单据！"
          });
          alertCtrl.present();
        }
        return isExist;
      }else{
        return true;
      }
   }

}
