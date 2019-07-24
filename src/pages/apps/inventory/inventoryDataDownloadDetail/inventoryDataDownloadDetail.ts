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
          let planDate = JSON.parse(res.rows.item(0).stringData);
          for(let i in planDate.departments){
            if (planDate.departments[i].departCode == this.planDate.departments[i].departCode){
              this.planDate.departments[i]["isDownLoad"] = true;
            }
          }
        }
      }
      this.departments = this.planDate.departments;
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
  }
  downloadPlan1(item){
    let loading = this.loadingCtrl.create({
      content:"正在加载",
      duration:5000
    });
    loading.present();
    let params ={};
    params = {userCode:this.userCode,departCode:this.departCode,planNumber:this.plan.planNumber,startDate:this.plan.startDate,stopDate:this.plan.stopDate,departCodeList:item};
    this.httpService.postData(this.httpService.getUrl()+"cellPhoneController/phonecheckplandetail.do",params,data=>{
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
    let serverUrl=this.storageService.read("serverUrl");
    let strUrl=serverUrl["agreement"]+"://"+serverUrl["address"]+":"+serverUrl["port"]+"/"
    fileTransferNow.download(strUrl+url,
      this.file.dataDirectory+"file.txt").then((entry)=>{
      if (timer) clearInterval(timer);
      loading.dismiss();
      this.storageService.write("JsonUrl",entry);
      let alertCtrl = this.alertCtrl.create({
        title:"下载成功！"
      });
      alertCtrl.present();
      entry.file((file)=>{
        var reader = new FileReader();
        reader.onloadend=(e)=>{
          let data=JSON.parse(e.target['result']).data;
          let departments = this.plan.departments;
          this.plan.departments = [];
          for (let i in this.departments){
            if(this.departments[i].checked){
              departments[i]["isDownLoad"] = true;
              this.plan.departments.push(this.departments[i]);
              this.checkedOne(i);
            }
          }
          this.departments = departments;
          this.storageService.sqliteInsert("localPlan",this.userCode,JSON.stringify(this.plan));
          this.storageService.sqliteInsert("localPlanDetail",this.userCode,JSON.stringify(data));
          this.storageService.sqliteInsert("willPlanDetail",this.userCode,JSON.stringify(data));
          this.storageService.deleteUserTable("existPlanDetail",this.userCode);
          this.storageService.deleteUserTable("newPlanDetail",this.userCode);
          PageUtil.pages["home"].inventoryNum = data.length;
        };
        reader.readAsText(file);
      })

    },(error)=>{
        let  alertCtrl = this.alertCtrl.create({
          title:"下载失败,error："+JSON.stringify(error)
        });
        alertCtrl.present();
        loading.dismiss();
    })
  }
  downloadPlan(){
    let item=[];
    let isAlertOnce = true;
    for (let i in this.departments){
      if(this.departments[i].checked){
        if(this.departments[i]["isDownLoad"]&&isAlertOnce){
          isAlertOnce = false;
        }
        item.push(this.departments[i].departCode);
      }
    }
    if(!item.length){
      let alertCtrl = this.alertCtrl.create({
        title:"请选择单位！",
      });
      alertCtrl.present();
      return false;
    }
    if(!isAlertOnce){
      let alertCtrl = this.alertCtrl.create({
        title:"重新下载将清除已盘点、已盘盈和已下载的数据！",
        buttons:[
          {
            text:"否",
          },
          {
            text:"是",
            handler:data=>{
              this.downloadPlan1(item)
            }
          }
        ]
      });
      alertCtrl.present();
    }else {
      this.downloadPlan1(item);
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
