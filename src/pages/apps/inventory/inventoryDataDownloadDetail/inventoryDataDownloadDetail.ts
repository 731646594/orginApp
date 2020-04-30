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
  isDownloaded;
  isOnfocus=false;
  displayArray = [];
  searchValue;
  base64DecodeChars = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
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
    this.isDownloaded = this.navParams.get("isDownloaded");
    this.planDate = JSON.parse(JSON.stringify(this.plan));
    this.departments = JSON.parse(JSON.stringify(this.planDate.departments));
    this.storageService.getUserTable().executeSql(this.storageService.getSSS("localPlan",this.userCode),[]).then(res=>{
      if (res.rows.length>0){
        let planDate = JSON.parse(res.rows.item(0).stringData);
        if (planDate["planNumber"]==this.plan["planNumber"]){
          for(let i in this.departments){
            for (let j in planDate.departments){
              if (planDate.departments[j].departCode == this.departments[i].departCode){
                this.departments[i]["isDownLoad"] = true;
              }
            }
          }
        }
      }

    })
  }
  downloadPlan1(item){
    //读取进度条
    let loading = this.loadingCtrl.create({
      content:"下载进度：0%",
      dismissOnPageChange:false,
    });
    loading.present();
    let params ={};
    params = {userCode:this.userCode,departCode:this.departCode,planNumber:this.plan.planNumber,startDate:this.plan.startDate,stopDate:this.plan.stopDate,departCodeList:item};
    this.httpService.postData(this.httpService.getUrl()+"cellPhoneControllerOffline/phonecheckplandetail.do",params,data=>{
      if (data.success=="true"){
        let url = data.data;
        const fileTransferNow: FileTransferObject = this.fileTransfer.create();
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
          var reader = new FileReader();
          entry.file((file)=>{
            reader.onloadend=(e)=>{
              let str = e.target['result'].replace("data:text/plain;base64,","");
              let letterStr = this.utf8To16(this.base64Toutf8(str));
              let data=JSON.parse(letterStr).data;
              let departments = JSON.parse(JSON.stringify(this.plan.departments));
              this.planDate.departments = [];
              for (let i in this.departments){
                if(this.departments[i].checked){
                  departments[i]["isDownLoad"] = true;
                  this.planDate.departments.push(this.departments[i]);
                  this.checkedOne(i);
                }
              }
              this.departments = JSON.parse(JSON.stringify(departments));
              for(let i in data){
                data[i]["checkResult"] = "";
              }
              this.storageService.sqliteInsert("localPlan",this.userCode,JSON.stringify(this.planDate));
              this.storageService.sqliteInsert("localPlanDetail",this.userCode,JSON.stringify(data));
              this.storageService.sqliteInsert("willPlanDetail",this.userCode,JSON.stringify(data));
              this.storageService.deleteUserTable("existPlanDetail",this.userCode);
              this.storageService.deleteUserTable("newPlanDetail",this.userCode);
              PageUtil.pages["home"].inventoryNum = data.length;
            };
            reader.readAsDataURL(file);
          })

        },(error)=>{
          let  alertCtrl = this.alertCtrl.create({
            title:"下载失败,error："+JSON.stringify(error)
          });
          alertCtrl.present();
          loading.dismiss();
        })
      }

    },false, (err)=> {
      let  alertCtrl = this.alertCtrl.create({
        title:"下载失败,"+JSON.stringify(err).substring(1,JSON.stringify(err).length-1)
      });
      alertCtrl.present();
      loading.dismiss();
    })
  }
  base64Toutf8(str){
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
      /* c1 */
      do {
        c1 = this.base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while(i < len && c1 == -1);
      if(c1 == -1)
        break;

      /* c2 */
      do {
        c2 = this.base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while(i < len && c2 == -1);
      if(c2 == -1)
        break;

      out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

      /* c3 */
      do {
        c3 = str.charCodeAt(i++) & 0xff;
        if(c3 == 61)
          return out;
        c3 = this.base64DecodeChars[c3];
      } while(i < len && c3 == -1);
      if(c3 == -1)
        break;

      out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

      /* c4 */
      do {
        c4 = str.charCodeAt(i++) & 0xff;
        if(c4 == 61)
          return out;
        c4 = this.base64DecodeChars[c4];
      } while(i < len && c4 == -1);
      if(c4 == -1)
        break;
      out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
  }
  utf8To16(str){
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
      c = str.charCodeAt(i++);
      switch(c >> 4)
      {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += str.charAt(i-1);
        break;
        case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }

    return out;
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
    }else if(this.isDownloaded){
      let alertCtrl = this.alertCtrl.create({
        title:"已下载过盘点计划，再次下载会覆盖，是否继续？",
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
    }
    else {
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
  searchDepart(){
    if (this.searchValue){
      for (let i in this.departments){
        this.displayArray[i] = true;
        if (this.departments[i].departName.indexOf(this.searchValue)>-1){
          this.displayArray[i] = false;
        }
      }
    }else {
      for (let i in this.departments){
        this.displayArray[i] = false;
      }
    }

  }
  inputOnfocus(){
    this.isOnfocus=true;
  }
  inputOnblur(){
    this.isOnfocus=false;
  }
}
