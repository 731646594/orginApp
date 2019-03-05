import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {StorageService} from "../../services/storageService";
import {HttpService} from "../../services/httpService";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userName;
  userCode;
  departName;
  departCode;
  inventoryNum=0;
  num1;
  num2;
  num3;
  num4;
  num5;
  constructor(public app:App,public navCtrl: NavController,public storageService:StorageService, public httpService:HttpService) {

  }
  ionViewDidEnter(){
    this.loadData();
  }
  loadData(){
    this.userName = this.storageService.read("loginUserName");
    this.userCode = this.storageService.read("loginUsercode");
    this.departName = this.storageService.read("loginDepartName");
    this.departCode = this.storageService.read("loginDepartCode");
    this.httpService.post(this.httpService.getUrl()+"toDoController.do?tododetailcounts", {userCode:this.userCode,departCode:this.departCode}).subscribe((data)=>{
      let todoList=[];
      if (data.success=="true"){
        for (let key in data.data[0]) {
          todoList.push([key,data.data[0][key]]);
        }
        if (this.storageService.read("willPlanDetailLength")){
          this.inventoryNum=this.storageService.read("willPlanDetailLength");
        }
        this.num1 = todoList[2][1];
        this.num2 = todoList[4][1];
        this.num3 = todoList[0][1];
        this.num4 = todoList[3][1];
        this.num5 = todoList[1][1];
      }
    },err=>{
      console.log(err)
    })
  }
  // formPage(pageIndex){
  //   this.app.getRootNav().push(FormPage,{pageIndex:pageIndex})
  // }
  // planListPage(pageIndex){
  //   this.app.getRootNav().push(PlanListPage,{pageIndex:pageIndex})
  // }
  // censorshipPage(pageIndex){
  //   this.app.getRootNav().push(CensorshipPage,{pageIndex:pageIndex})
  // }
  // searchPage(pageIndex){
  //   this.app.getRootNav().push(SearchPage,{pageIndex:pageIndex})
  // }
}
