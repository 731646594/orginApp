import { Component } from '@angular/core';
import {AlertController, App, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {HttpService} from "../../../../services/httpService";

/**
 * Generated class for the InventoryDataUploadQueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inventoryDataUploadQuery',
  templateUrl: 'inventoryDataUploadQuery.html',
})
export class InventoryDataUploadQueryPage {
  planDetailList=[];
  userCode;
  departName;
  departCode;
  existPlanDetail=[];
  planData=[];
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController,
              public navParams:NavParams,public app:App,public events:Events) {
    this.loadData();
  }
  ionViewDidEnter(){
    // this.loadData();
  }
  loadData(){
    this.userCode = this.storageService.read("loginUserCode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.existPlanDetail=[];
    this.planDetailList = [];
    let planDetailList = [];
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("existPlanDetail",this.userCode),[]).then(res=>{
        if (res.rows.length>0){
          this.existPlanDetail = JSON.parse(res.rows.item(0).stringData);
          planDetailList = planDetailList.concat(this.existPlanDetail);
        }
        this.planDetailList = planDetailList.filter((item,i)=>{
          return item["Uploaded"]
        })
      });
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        this.planData = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro2_1:"+JSON.stringify(e)));
  }
}
