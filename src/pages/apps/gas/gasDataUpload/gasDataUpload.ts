import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import {StorageService} from "../../../../services/storageService";
import {GasDataUploadDetailPage} from "../gasDataUploadDetail/gasDataUploadDetail";

@Component({
  selector: 'page-gasDataUpload',
  templateUrl: 'gasDataUpload.html'
})
export class GasDataUploadPage {
  userName;
  userCode;
  departName;
  departCode;
  zjb=[];
  jjb=[];
  item=[];
  colItem=[];
  itemName;
  checkedArray=[false,false];
  colsItemName=[];
  photoArrary=[];
  photoShowArrary=[];
  signatureImage1;
  signatureImage2;
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public navParams:NavParams,public app:App,public loadingCtrl:LoadingController,) {
    this.userCode = this.storageService.read("loginUserCode");
    this.userName = this.storageService.read("loginUserName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.departName = this.storageService.read("loginDepartName");
    this.itemName = null;
    this.photoArrary = [];
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("zjb",this.userCode),[]).then(res =>{
      if (res.rows.length>0){
        this.zjb = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro21:"+JSON.stringify(e))  );
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("jjb",this.userCode),[]).then(res =>{
      if (res.rows.length>0){
        this.jjb = JSON.parse(res.rows.item(0).stringData);
      }
    }).catch(e =>alert("erro22:"+JSON.stringify(e))  )
  }

  ionViewDidEnter(){

  }
  checkedItem(index){
    if (this.checkedArray[index]==false){
      document.getElementsByClassName("uploadIcon")[index].setAttribute("style","color: #0091d2;");
      this.checkedArray[index]=true;
    }else {
      document.getElementsByClassName("uploadIcon")[index].setAttribute("style","color: #dedede;");
      this.checkedArray[index]=false;
    }
  }
  detailPage(data,name){
    if(data.length!=0){
      this.app.getRootNav().push(GasDataUploadDetailPage,{data:data,name:name})
    }
  }
  uploadGasInfo(){
    if (this.checkedArray[0]){
      this.uploading("devWeeklyCheckController.do?saveCheckForm",this.zjb,"zjb")
    }
    if (this.checkedArray[1]){
      this.uploading("devHandOverController.do?saveCheckForm",this.jjb,"jjb")
    }
    let alertCtrl = this.alertCtrl.create({
      title:"上传成功！"
    });
    alertCtrl.present();
  }
  uploading(url,data,name){
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:10000
    });
    loading.present();
    this.httpService.post(this.httpService.getUrl()+url,{userCode:this.userCode,userName:this.userName,userDepart:this.departCode,userDepartName:this.departName,data:data,uploadFile:data["uploadFile"]}).subscribe(data=>{
      if (data.success=="true"){
        if(name=="zjb"){
          this.zjb=null;
          this.storageService.deleteUserTable("zjb",this.userCode);
        }else {
          this.jjb=null;
          this.storageService.deleteUserTable("jjb",this.userCode);
        }
      }else{
        alert(data.msg)
      }
      loading.dismiss()
    })
  }
}
