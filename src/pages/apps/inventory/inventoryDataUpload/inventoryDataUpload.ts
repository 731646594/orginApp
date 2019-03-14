import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";

@Component({
  selector: 'page-inventoryDataUpload',
  templateUrl: 'inventoryDataUpload.html'
})
export class InventoryDataUploadPage {
  planDetailList=[];
  userCode;
  departName;
  departCode;
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
    let newPlanDetail = [];
    let existPlanDetail = [];
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        newPlanDetail = JSON.parse(res.rows.item(0).stringData);
        for (let i in newPlanDetail){
          newPlanDetail[i]["planStatus"] = "new";
          this.planDetailList.push(newPlanDetail[i]);
        }
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        existPlanDetail = JSON.parse(res.rows.item(0).stringData);
        for (let i in existPlanDetail){
          existPlanDetail[i]["planStatus"] = "exist";
          this.planDetailList.push(existPlanDetail[i]);
        }
      }
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
  }
  uploadList(){
    let loadingCtrl = this.loadingCtrl.create({
      content:"正在加载"
    });
    loadingCtrl.present();
    this.httpService.post(this.httpService.getUrl()+"cellPhoneController.do?uploadcheckplan",{userCode:this.userCode,departCode:this.departCode,uploadType:"",uploadFile:[],keyCode:"",data:""}).subscribe(data=>{
      loadingCtrl.dismiss();
      if (data.success=="true"){
        let alert = this.alertCtrl.create({
          title:data.msg
        });
        alert.present();
      }else {
        alert(data.msg)
      }
    })
  }
}
