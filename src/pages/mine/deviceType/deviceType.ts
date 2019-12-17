import { Component } from '@angular/core';
import {AlertController, App, NavController} from 'ionic-angular';
import {StorageService} from "../../../services/storageService";
import {HttpService} from "../../../services/httpService";

@Component({
  selector: 'page-deviceType',
  templateUrl: 'deviceType.html'
})
export class DeviceTypePage {
  selectedType = "phone";
  typeData = [
    {itemName:"手机",itemValue:"phone"},
    {itemName:"盘点枪CX900",itemValue:"CX900"},
  ];
  constructor(public navCtrl: NavController,public httpService:HttpService,public storageService:StorageService,
              public alertCtrl:AlertController,public app:App) {
    if (this.storageService.read("deviceType")){
      this.selectedType = this.storageService.read("deviceType")
    }
  }
  saveType(){
    this.storageService.write("deviceType",this.selectedType);
    let alertCtrl = this.alertCtrl.create({
      title:"请重启APP或重新登录以加载配置"
    });
    alertCtrl.present();
    this.app.getRootNav().pop()
  }
}
