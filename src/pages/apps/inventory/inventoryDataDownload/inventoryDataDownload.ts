import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {PageUtil, StorageService} from "../../../../services/storageService";
import {FileTransfer,FileTransferObject} from "@ionic-native/file-transfer";
import {File} from "@ionic-native/file";

@Component({
  selector: 'page-inventoryDataDownload',
  templateUrl: 'inventoryDataDownload.html'
})
export class InventoryDataDownloadPage {
  planList;
  lastIndex;
  userCode;
  departCode;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController,public file:File,
              public fileTransfer:FileTransfer,public navParams:NavParams,public app:App) {
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    let loading = this.loadingCtrl.create({
      content:"正在加载",
      duration:10000
    });
    loading.present();
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    this.httpService.post(this.httpService.getUrl()+"cellPhoneController.do?phonecheckplandownload",{userCode:this.userCode,departCode:this.departCode}).subscribe(data=>{
      console.log(data)
      if (data.success == "true"){
        this.planList=data.data;
        this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
          if (res.rows.length>0){
            for (let i=0;i<=this.planList.length;i++){
              let plan = [];
              plan = this.planList[i];
              try {
                if (res.rows.item(0).stringData["planNumber"]==plan["planNumber"]){
                  this.planList[i].isDownLoad=true;
                  this.lastIndex = i;
                }
              }catch {}
            }
          }
        }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
      }else {
        alert(data.msg)
      }
      loading.dismiss();
    });

  }
  isHaveLocalPlan(index){
    if (this.lastIndex){
      let alertCtrl = this.alertCtrl.create({
        title:"已存在盘点数据，再次下载会覆盖该数据，是否继续下载？",
        buttons:[
          {
            text:"是",
            handler:()=>{
              this.downLoadPlan1(index)
            }
          },
          {
            text:"否",
          }
        ]
      });
      alertCtrl.present();
    }else {
      this.downLoadPlan1(index)
    }
  }
  downLoadPlan1(index){
    let loading = this.loadingCtrl.create({
      content:"正在加载"
    });
    loading.present();
    this.storageService.sqliteInsert("localPlan",this.userCode,JSON.stringify(this.planList[index]));
    this.httpService.post(this.httpService.getUrl()+"cellPhoneController.do?phonecheckplandetail",{userCode:this.userCode,departCode:this.departCode,planNumber:this.planList[index].planNumber,departCodeList:this.departCode+","}).subscribe(data=>{
      if (data.success=="true"){
        this.storageService.dropUserTable("existPlanDetail");
        this.storageService.dropUserTable("newPlanDetail");
        this.storageService.sqliteInsert("localPlanDetail",this.userCode,JSON.stringify(data.data));
        this.storageService.sqliteInsert("willPlanDetail",this.userCode,JSON.stringify(data.data));
        PageUtil.pages["home"].inventoryNum = data.data.length;
        if(this.lastIndex){
          this.planList[this.lastIndex].isDownLoad=false;
        }
        this.planList[index].isDownLoad=true;
        this.lastIndex = index;
        loading.dismiss();
      }
      else {
        alert(data.msg);
        loading.dismiss();
      }
    })
  }
  downLoadPlan(index){
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
    fileTransferNow.download(this.httpService.getUrl()+"",
      this.file.dataDirectory+this.planList[index].planNumber).then((entry)=>{
      if (timer) clearInterval(timer);
      loading.dismiss();
      this.storageService.write("JsonUrl",entry);
      this.planList[index].isDownLoad = true;
      alert("下载成功");
      // entry.file((file)=>{
      //   var reader = new FileReader();
      //   reader.onloadend=(e)=>{
      //     this.fileContent=e.target['result'];
      //     this.planList=JSON.parse(this.fileContent);
      //   };
      //   reader.readAsText(file);
      // })

    },(error)=>{
      alert("下载失败,error："+JSON.stringify(error));
      loading.dismiss();
    })
  }
}
