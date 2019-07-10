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
  newPlanDetail=[];
  existPlanDetail=[];
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
    this.planDetailList = [];
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("newPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.newPlanDetail = JSON.parse(res.rows.item(0).stringData);
        for (let i in this.newPlanDetail){
          this.newPlanDetail[i]["planStatus"] = "new";
          this.planDetailList.push(this.newPlanDetail[i]);
        }
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.existPlanDetail = JSON.parse(res.rows.item(0).stringData);
        for (let i in this.existPlanDetail){
          this.existPlanDetail[i]["planStatus"] = "exist";
          this.planDetailList.push(this.existPlanDetail[i]);
        }
      }
    }).catch(e =>alert("erro2_2:"+JSON.stringify(e)));
  }
  uploadList(){
    let loadingCtrl = this.loadingCtrl.create({
      content:"正在加载",
      duration:5000
    });
    loadingCtrl.present();
    this.httpService.post(this.httpService.getUrl()+"cellPhoneController.do?uploadcheckplan",{userCode:this.userCode,departCode:this.departCode,uploadType:"",uploadFile:[],keyCode:"",data:""}).subscribe(data=>{
      loadingCtrl.dismiss();
      if (data.success=="true"){
        let alert = this.alertCtrl.create({
          title:data.msg
        });
        alert.present();
        this.storageService.deleteUserTable("newPlanDetail",this.userCode);
        this.storageService.deleteUserTable("existPlanDetail",this.userCode);
      }else {
        alert(data.msg)
      }
    })
  }
  testDelete(index){
    let alertCtrl = this.alertCtrl.create({
      title:"是否删除该条数据？",
      buttons:[
        {
          text:"是",
          handler:()=>{
            let l = index-this.newPlanDetail.length;
            if(l>0){
              this.existPlanDetail.splice(l,1);
              this.storageService.updateUserTable("existPlanDetail",this.userCode,JSON.stringify(this.existPlanDetail));
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
