import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {PageUtil, StorageService} from "../../../../services/storageService";
import {FileTransfer,FileTransferObject} from "@ionic-native/file-transfer";
import {File} from "@ionic-native/file";

@Component({
  selector: 'page-inventoryDataDownloadDetail',
  templateUrl: 'inventoryDataDownloadDetail.html'
})
export class InventoryDataDownloadDetailPage {
  userCode;
  departCode;
  plan;
  planDate;
  departments=[];
  isOldPlan = false;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController,public file:File,
              public fileTransfer:FileTransfer,public navParams:NavParams,public app:App) {
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.plan = this.navParams.get("plan");
    this.planDate = JSON.parse(JSON.stringify(this.plan));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        if (JSON.parse(res.rows.item(0).stringData)["planNumber"]==this.plan["planNumber"]){
          this.planDate = JSON.parse(res.rows.item(0).stringData);
          this.isOldPlan = true;
        }
      }
      this.departments = this.planDate.departments;
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
  }
  downloadPlan1(item){
    let loading = this.loadingCtrl.create({
      content:"正在加载",
      duration:10000
    });
    loading.present();
    this.httpService.post(this.httpService.getUrl()+"cellPhoneController.do?phonecheckplandetail",{userCode:this.userCode,departCode:this.departCode,planNumber:this.plan.planNumber,departCodeList:item}).subscribe(data=>{
      if (data.success=="true"){

        this.downloadPlan2(data.data);
        loading.dismiss();
      }
      else {
        alert(data.msg);
        loading.dismiss();
      }
    })
  }
  downloadPlan2(url){
    const fileTransferNow: FileTransferObject = this.fileTransfer.create();
    //读取进度条
    let loading = this.loadingCtrl.create({
      content:"下载进度：0%",
      dismissOnPageChange:false,
    });
    loading.present();

    let  now: number = 0;

    fileTransferNow.onProgress(progressEvent=>{
      // alert(progressEvent.lengthComputable);
      if (progressEvent.lengthComputable){
        now = progressEvent.loaded/progressEvent.total*100;
      }
    });
    let timer = setInterval(()=>{
      loading.setContent("下载进度："+Math.floor(now)+"%");
      if (now >= 99){
        clearInterval(timer);
      }
    },300);
    //android 存储externalDataDirectory,通用沙盒存储dataDirectory
    fileTransferNow.download(url,
      this.file.dataDirectory+"file").then((entry)=>{
      if (timer) clearInterval(timer);
      loading.dismiss();
      this.storageService.write("JsonUrl",entry);
      alert("下载成功");
      entry.file((file)=>{
        var reader = new FileReader();
        reader.onloadend=(e)=>{
          let data=JSON.parse(e.target['result']);
          for (let i in this.departments){
            if(this.departments[i].checked){
              this.departments[i].isDownLoad = true;
              this.checkedOne(i);
            }
          }
          this.storageService.sqliteInsert("localPlan",this.userCode,JSON.stringify(this.planDate));
          this.storageService.sqliteInsert("localPlanDetail",this.userCode,JSON.stringify(data));
          this.storageService.sqliteInsert("willPlanDetail",this.userCode,JSON.stringify(data));
          PageUtil.pages["home"].inventoryNum = data.length;
        };
        reader.readAsText(file);
      })

    },(error)=>{
      alert("下载失败,error："+JSON.stringify(error));
      loading.dismiss();
    })
  }
  downloadPlan(){
    let item=[];
    let isDownload = true;
    let isAlertOnce = true;
    for (let i in this.departments){
      if(this.departments[i].checked){
        if(this.departments[i].isDownLoad&&isAlertOnce){
          isAlertOnce = false;
          let alertCtrl = this.alertCtrl.create({
            title:"重新下载将清除已盘点的数据！",
            buttons:[
              {
                text:"否",
                handler:data=>{
                  isDownload = false;
                }
              },
              {
                text:"是",
              }
            ]
          });
          alertCtrl.present();
        }
        if (isDownload){
          item.push(this.departments[i].departCode);
        }
      }

    }
    if(isDownload&&!item.length){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择单位！",
      });
      alertCtrl.present();
    }
    if (isDownload&&item.length){
      if(!this.isOldPlan||!isAlertOnce){
        this.storageService.sqliteDrop("existPlanDetail",this.userCode);
        this.storageService.sqliteDrop("newPlanDetail",this.userCode);
      }
      this.downloadPlan1(item)
    }
  }
  checkedOne(index){
    if(this.departments[index].checked){
      this.departments[index].checked = false;
    }else {
      this.departments[index].checked = true;
    }
  }
  checkAll(){
    for (let i in this.departments){
      this.departments[i].checked = true;
    }
  }
  checkInverse(){
    for (let i in this.departments){
      if(this.departments[i].checked){
        this.departments[i].checked = false;
      }else {
        this.departments[i].checked = true;
      }
    }
  }
}
