import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import { StorageService} from "../../../../services/storageService";

@Component({
  selector: 'page-inventoryDataUpload',
  templateUrl: 'inventoryDataUpload.html'
})
export class InventoryDataUploadPage {
  planDetailList=[];
  userCode;
  departName;
  departCode;
  newPlanDetail=[];
  existPlanDetail=[];
  willPlanDetail=[];
  planData=[];
  uploadFiles=[];
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController,public navParams:NavParams,public app:App) {
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.newPlanDetail = [];
    this.existPlanDetail=[];
    this.willPlanDetail=[];
    this.planDetailList = [];
    let planDetailList = [];
    this.uploadFiles = [];
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.newPlanDetail = JSON.parse(res.rows.item(0).stringData);
        planDetailList = planDetailList.concat(this.newPlanDetail);
      }
      this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
        if (res.rows.length>0){
          this.existPlanDetail = JSON.parse(res.rows.item(0).stringData);
          planDetailList = planDetailList.concat(this.existPlanDetail);
        }
        this.planDetailList = planDetailList.filter((item)=>{
          this.uploadFiles.push(item["uploadFile"]);
          delete item["uploadFile"];
          return !item["Uploaded"]
        })
      }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("willPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.willPlanDetail = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_3:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.planData = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
  }
  uploadList(){
    if(this.planDetailList.length==0){
      let alertCtrl = this.alertCtrl.create({
        title: "没有可上传的数据！"
      });
      alertCtrl.present();
      return false;
    }
    let loading = this.loadingCtrl.create({
      content:"上传进度：0%",
      dismissOnPageChange:false,
    });
    loading.present();
    let failLen=0;
    let now: number = 0;
    let index=0;
    let i=0;
    for(i=0;i<this.planDetailList.length;i++){
      let uploadType = 0;
      let uploadFile = [];
      uploadFile = this.uploadFiles[i];
      if(uploadFile.length>0){
        uploadType = 2;
      }
      this.httpService.post(this.httpService.getUrl()+"cellPhoneController/uploadcheckplan.do",{userCode:this.userCode,departCode:this.departCode,uploadType:uploadType,uploadFile:uploadFile,data:JSON.stringify(this.planDetailList[i])}).subscribe(data=>{
        if (data.success=="true"){
          let l = index-this.newPlanDetail.length;
          if(l>=0){
            this.existPlanDetail[l]["Uploaded"]=true;
            this.storageService.updateUserTable("existPlanDetail",this.userCode,JSON.stringify(this.existPlanDetail));
          }
          else {
            this.newPlanDetail[l]["Uploaded"]=true;
            this.storageService.updateUserTable("newPlanDetail",this.userCode,JSON.stringify(this.newPlanDetail));
          }
        }else {
          failLen++;
        }
        now = (index+1)/this.planDetailList.length*100;
        index++;
        loading.setContent("上传进度："+Math.floor(now)+"%");
        if (now == 100){
          loading.dismiss();
          let alertCtrl = this.alertCtrl.create({
            title: "上传完成，失败" + failLen + "条！"
          });
          if(failLen == 0){
            alertCtrl.setTitle("上传成功！");
          }
          alertCtrl.present();
          this.loadData();
        }
      });
    }
  }
  testDelete(index){
    let alertCtrl = this.alertCtrl.create({
      title:"是否删除该条数据？",
      buttons:[
        {
          text:"是",
          handler:()=>{
            let l = index-this.newPlanDetail.length;
            if(l>=0){
              this.willPlanDetail.push(this.existPlanDetail[l]);
              this.existPlanDetail.splice(l,1);
              this.storageService.updateUserTable("existPlanDetail",this.userCode,JSON.stringify(this.existPlanDetail));
              this.storageService.updateUserTable("willPlanDetail",this.userCode,JSON.stringify(this.willPlanDetail));
            }
            else {
              this.newPlanDetail.splice(index,1);
              this.storageService.updateUserTable("newPlanDetail",this.userCode,JSON.stringify(this.newPlanDetail));
            }
            this.loadData();
          }
        },
        {
          text:"否"
        }
      ]
    });
    alertCtrl.present();

  }
}
