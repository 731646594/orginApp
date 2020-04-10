import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../services/httpService";
import { StorageService} from "../../../../services/storageService";
import {File} from "@ionic-native/file";
let that;
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
  planIndex = 0;
  failLen = 0;
  imgIndex = 0;
  uploadFile = []
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public file:File,public loadingCtrl:LoadingController,public navParams:NavParams,public app:App) {
    this.loadData();
  }
  ionViewDidEnter(){
    that = this;
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
    this.planIndex = 0;
    this.failLen = 0;
    let planDetailList = [];
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
        this.planDetailList = planDetailList.filter((item,i)=>{
          item["realIndex"] = i;
          return !item["Uploaded"]
        })
      });
    });
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
      dismissOnPageChange:true,
    });
    loading.present();
    this.uploadSinglePlan(loading);
  }
  uploadSinglePlan(loading){
    let now: number = 0;
    let uploadType = 0;
    this.uploadFile=[];
    this.imgIndex = 0;
    if (this.planDetailList[this.planIndex].uploadFile.length>0){
      uploadType = 2;
      this.getBase64Pics(this.planDetailList[this.planIndex].uploadFile,now,loading,uploadType);
    }else {
      this.postPlan(now,loading,uploadType)
    }

  }
  postPlan(now,loading,uploadType){
    let data = Object.assign({},this.planDetailList[this.planIndex]);
    // delete data.uploadFile;
    let data2 = {};
    for(let i in data){
      if (i != "uploadFile"){
        data2[i] = data[i]
      }
    }
    let dataString = JSON.stringify(data2);
    this.httpService.postData(this.httpService.getUrl()+"cellPhoneControllerOffline/uploadcheckplan.do",{userCode:this.userCode,departCode:this.departCode,uploadType:uploadType,uploadFile: this.uploadFile,data:dataString},(data)=>{
      if (data.success=="true"){
        let l = this.planDetailList[this.planIndex].realIndex-this.newPlanDetail.length;
        if(l>-1){
          this.existPlanDetail[l]["Uploaded"]=true;
          this.storageService.updateUserTable("existPlanDetail",this.userCode,JSON.stringify(this.existPlanDetail));
        }
        else {
          this.newPlanDetail[this.planDetailList[this.planIndex].realIndex]["Uploaded"]=true;
          this.storageService.updateUserTable("newPlanDetail",this.userCode,JSON.stringify(this.newPlanDetail));
        }
      }else {
        this.failLen++;
      }
      now = (this.planIndex+1)/this.planDetailList.length*100;
      this.planIndex++;
      document.getElementsByClassName("loading-content")[0].innerHTML = "上传进度："+Math.floor(now)+"%";
      if (now == 100){
        loading.dismiss();
        let alertCtrl = this.alertCtrl.create({
          title: "上传完成，失败" + this.failLen + "条！"
        });
        if(this.failLen == 0){
          alertCtrl.setTitle("上传成功！");
        }
        alertCtrl.present();
        this.loadData();
      }else {
        this.uploadSinglePlan(loading)
      }
    },false,(err)=>{
      loading.dismiss();
      let alertCtrl = this.alertCtrl.create({
        title:err
      });
      alertCtrl.present();
    });
  }
  getBase64Pics(base64Images,now,loading,uploadType){
      let imageData = base64Images[this.imgIndex]
      this.resolveUri(imageData).then(url=> {
        url.file((file)=> {
          let reader = new FileReader();
          reader.onloadend=(e)=>{
            let base64 = e.target['result'];
            var newImage = new Image();
            var quality = 1;    //压缩系数0-1之间
            newImage.src = base64;
            newImage.setAttribute("crossOrigin", 'Anonymous');  //url为外域时需要
            var imgWidth, imgHeight;
            newImage.onload =  (ev:any)=> {
              let img = ev.target;
              imgWidth = img.width;
              imgHeight = img.height;
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              let w = 500;
              if (Math.max(imgWidth, imgHeight) > w) {
                if (imgWidth > imgHeight) {
                  canvas.width = w;
                  canvas.height = w * imgHeight / imgWidth;
                } else {
                  canvas.height = w;
                  canvas.width = w * imgWidth / imgHeight;
                }
              } else {
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                quality = 1;
              }
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              var base64Image = canvas.toDataURL("image/jpeg", quality); //压缩语句
              that.uploadFile.push(base64Image);
              that.imgIndex++;
              if (base64Images.length==that.uploadFile.length){
                that.postPlan(now,loading,uploadType)
              }else {
                that.getBase64Pics(base64Images,now,loading,uploadType)
              }
            }
          };
          reader.readAsDataURL(file);
        }, err => {
          alert(JSON.stringify(err));
          loading.dismiss();
        });
      },err=>{
        if (err.message=="NOT_FOUND_ERR"){
          let alertCtrl = this.alertCtrl.create({
            title:"第一条数据的图片已被删除，请重新录入"
          });
          alertCtrl.present();
          loading.dismiss();
          return false;
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
            let l = this.planDetailList[index].realIndex-this.newPlanDetail.length;
            if(l>-1){
              this.existPlanDetail[l]["checkResult"]='';
              this.willPlanDetail.push(this.existPlanDetail[l]);
              this.existPlanDetail.splice(l,1);
              this.storageService.updateUserTable("existPlanDetail",this.userCode,JSON.stringify(this.existPlanDetail));
              this.storageService.updateUserTable("willPlanDetail",this.userCode,JSON.stringify(this.willPlanDetail));
            }
            else {
              this.newPlanDetail.splice(this.planDetailList[index].realIndex,1);
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
  //转换url
  resolveUri(uri:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.file.resolveLocalFilesystemUrl(uri).then(filePath =>{
        resolve(filePath);
      }).catch(err =>{
        reject(err);
      });
    })
  }
}
