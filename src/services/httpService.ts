import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./storageService";
import {AlertController, App, LoadingController, Platform} from "ionic-angular";
import {HTTP} from "@ionic-native/http";
import * as $ from "jquery";

@Injectable()
export class HttpService {

  constructor(public http: Http,public httpClient:HttpClient,public storageService:StorageService,public alertCtrl:AlertController,public app:App,public loadingCtrl:LoadingController,private nativeHttp: HTTP,public platform:Platform){}

  public getUrl2(){
    let url=this.getUrl();
    let urlHead = url.split(":")[0]+"://"+url.split("/")[2]+'/'+url.split("/")[3]+'/';
    return this.getUrl()
  }
  public getUrl3(){
    let url=this.storageService.read("systemUrl");
    return url
  }
  public getUrl4(){
    let url=this.getUrl();
    let urlHead = url.split(":")[0]+"://"+url.split("/")[2]+'/'+url.split("/")[3]+'/';
    return urlHead
  }
  public getUrl(){
    let url=this.storageService.read("serverUrl");
    if (!url){
      //智慧实物
      // this.setUrl("http","swapp.0731ctny.com","","plamassets");
      // return "http://swapp.0731ctny.com/plamassets/mobile/";
      //宁夏petrochina.nxxs.zcpd
      // this.setUrl("http","127.0.0.1","10901","plamassets");
      // return "http://127.0.0.1:10901/plamassets/mobile/";
      //98
      // this.setUrl("http","lhsm.vip","8088","plamassets");
      // return "http://lhsm.vip:8088/plamassets/mobile/";
      //外网98渤钻井下
      // this.setUrl("http","lhsm.vip","8086","plamassets");
      // return "http://lhsm.vip:8086/plamassets/mobile/";
      //井下
      // this.setUrl("http","210.12.194.18","9080","plamassets");
      // return "http://210.12.194.18:9080/plamassets/mobile/";
      //湖北petrochina.hbxs.zcpd
      // this.setUrl("http","210.12.193.123","9081","plamassets");
      // return "http://210.12.193.123:9081/plamassets/mobile/";
      //福建
      // this.setUrl("http","210.12.193.92","9080","plamassets");
      // return "http://210.12.193.92:9080/plamassets/mobile/";
      //辽宁
      // this.setUrl("http","210.12.193.94","9081","plamassets");
      // return "http://210.12.193.94:9081/plamassets/mobile/";
      //西藏
      // this.setUrl("http","210.12.193.171","9080","plamassets");
      // return "http://210.12.193.171:9080/plamassets/mobile/";
      //广西
      // this.setUrl("http","210.12.193.61","9081","plamassets");
      // return "http://210.12.193.61:9081/plamassets/mobile/";
      //广西9082
      this.setUrl("http","210.12.193.61","9082","plamassets");
      return "http://210.12.193.61:9082/plamassets/mobile/";
      //冀东petrochina.jdyt.zcpd
      // this.setUrl("http","127.0.0.1","10401","plamassets");
      // return "http://127.0.0.1:10401/plamassets/mobile/";
      //天津
      // this.setUrl("http","210.12.194.121","9080","plamassets");
      // return "http://210.12.194.121:9080/plamassets/mobile/"
      //浙江油田petrochina.zjytcwc.jxkh
      // this.setUrl("http","127.0.0.1","10610","plamassets");
      // return "http://127.0.0.1:10610/plamassets/mobile/"
      //黑龙江销售
      // this.setUrl("http","210.12.194.210","9080","plamassets");
      // return "http://210.12.194.210:9080/plamassets/mobile/"
      //润滑油
      // this.setUrl("http","10.215.9.57","8081","plamassets");
      // return "http://10.215.9.57:8081/plamassets/mobile/"
      //浙江
      // this.setUrl("http","210.12.193.212","9080","plamassets");
      // return "http://210.12.193.212:9080/plamassets/mobile/"
      //青海油田petrochina.qhyt.zcpd
      // this.setUrl("http","218.205.135.168","7000","plamassets");
      // return "http://218.205.135.168:7000/plamassets/mobile/"
      //华北油田
      // this.setUrl("http","210.12.194.113","7000","plamassets");
      // return "http://210.12.194.113:7000/plamassets/mobile/"
      //云南
      // this.setUrl("http","210.12.193.144","9204","plamassets");
      // return "http://210.12.193.144:9204/plamassets/mobile/"
    }
    if (this.storageService.getDevice()==2){
      this.setUrl("http","114.116.135.83","8080","plamassets");
      return "http://114.116.135.83:8080/plamassets/mobile/";
    }
    let strUrl=url["agreement"]+"://"+url["address"]+":"+url["port"]+"/"+url["serviceName"]+"/mobile/";
    return strUrl;
  }

  public setUrl(agreement:string,address:string,port:string,serviceName:string){
    let url = {};
    url["agreement"] = agreement;
    url["address"] = address;
    url["port"] = port;
    url["serviceName"] = serviceName;
    this.storageService.write("serverUrl",url);
  }

  public get (url:string,body:any){
    var item="?";
    for (var i in body){
      item+=i+"="+body[i]+"&";
    }
    item=item.substr(0,item.length-1);
    return this.http.get(url+item).map(res=>res.json(),err=>console.log("error:"+err));//.toPromise().then(res=>res.json()).catch(err=>console.log("error:"+err))
  }

  public post (url:string,body:any){
    var headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers:headers, withCredentials: true});
    return this.http.post(url,this.transformRequest(body),options).map(res=>res.json(),err=>console.log("error:"+err));
  }
  public postData (url:string,body:any,successCallback,isLoading?:any,errorCallback?:any){
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      dismissOnPageChange:true
      // duration:5000
    });
    if (isLoading){
      loading.present();
    }
    var headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers:headers, withCredentials: true});
    if (!this.platform.is("mobileweb")){
      this.nativeHttp.setDataSerializer('urlencoded');
      for(let i in body){
        if($.isArray(body[i])&&i!="uploadFile"){
          let str = "";
          for (let j in body[i]){
            str += ""+body[i][j]+",";
          }
          str = str.substring(0,str.length-1);
          body[i] = str;
        }
      }
      this.nativeHttp.setRequestTimeout(180)
      this.nativeHttp.post(url, body, {type:"app"})
        .then(data => {
          let res = JSON.parse(data.data);
          if (isLoading){
            loading.dismiss();
          }
          if(successCallback){
            if(res["success"]=="true"||res["success"]=="success"||res["success"]==true){
              successCallback(res);
            }else{
              if (errorCallback){
                errorCallback(res['msg']);
              }
              else {
                this.errorCallback(res['msg']);
              }
            }
          }
        })
        .catch(error => {
          if (isLoading){
            loading.dismiss();
          }
          let errMsg = "网络通信异常";
          switch (error.status) {
            case 401:
              errMsg = "";
              if (this.storageService.read("loginDepartName")){
                this.postData(this.getUrl()+"appLoginController/login.do",
                  {usercode:this.storageService.read("loginUserCode"),password:this.storageService.read("loginPassWord")},(data)=>{
                    this.postData(url,body,successCallback,isLoading,errorCallback)
                  },true)
                //PageUtil.pages["mine"].backToLoginPage();
              }
              break;
            case 404:
              errMsg = '抱歉，后台服务找不到对应接口';
              break;
            case 0:
              errMsg = '网络无法连接';
            default:
              break;
          }
          if (errMsg!=""){
            if (errorCallback){
              errorCallback(errMsg);
            }
            else {
              this.errorCallback(errMsg);
            }
          }
        })
    }
    else {
      return this.http.post(url,this.transformRequest(body),options).map(res=>res.json()).subscribe(
        (res)=>{
          if (isLoading){
            loading.dismiss();
          }
          if(successCallback){
            if(res["success"]=="true"||res["success"]=="success"||res["success"]==true){
              successCallback(res);
            }else{
              if (errorCallback){
                errorCallback(res['msg']);
              }
              else {
                this.errorCallback(res['msg']);
              }
            }
          }
        },(err)=>{
          if (isLoading){
            loading.dismiss();
          }
          let errMsg = "网络通信异常";
          switch (err.status) {
            case 401:
              errMsg = "";
              if (this.storageService.read("loginDepartName")){
                this.postData(this.getUrl()+"appLoginController/login.do",
                  {usercode:this.storageService.read("loginUserCode"),password:this.storageService.read("loginPassWord")},(data)=>{
                    this.postData(url,body,successCallback,isLoading,errorCallback)
                  },true)
                //PageUtil.pages["mine"].backToLoginPage();
              }
              break;
            case 404:
              errMsg = '抱歉，后台服务找不到对应接口';
              break;
            case 0:
              errMsg = '网络无法连接';
            default:
              break;
          }
          if (errMsg!=""){
            if (errorCallback){
              errorCallback(errMsg);
            }
            else {
              this.errorCallback(errMsg);
            }
          }
        }
      );
    }
  };
  public postJson (url:string,Json:any,successCallback,isLoading?:any,errorCallback?:any){
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      dismissOnPageChange:true
      // duration:5000
    });
    if (isLoading){
      loading.present();
    }
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({ headers:headers, withCredentials: true});
    if (!this.platform.is("mobileweb")){
      this.nativeHttp.setDataSerializer('json');
      for(let i in Json){
        if($.isArray(Json[i])&&i!="uploadFile"){
          let str = "";
          for (let j in Json[i]){
            str += ""+Json[i][j]+",";
          }
          str = str.substring(0,str.length-1);
          Json[i] = str;
        }
      }
      this.nativeHttp.post(url, Json, {type:"app"})
        .then(data => {
          let res = JSON.parse(data.data);
          if (isLoading){
            loading.dismiss();
          }
          if(successCallback){
            if(res["success"]=="true"||res["success"]=="success"||res["success"]==true){
              successCallback(res);
            }else{
              if (errorCallback){
                errorCallback(res['msg']);
              }
              else {
                this.errorCallback(res['msg']);
              }
            }
          }
        })
        .catch(error => {
          if (isLoading){
            loading.dismiss();
          }
          let errMsg = "网络通信异常";
          switch (error.status) {
            case 401:
              errMsg = "请重新登录";
              break;
            case 404:
              errMsg = '抱歉，后台服务找不到对应接口';
              break;
            case 0:
              errMsg = '网络无法连接';
            default:
              break;
          }
          if (errMsg!=""){
            if (errorCallback){
              errorCallback(errMsg);
            }
            else {
              this.errorCallback(errMsg);
            }
          }
        })
    }
    else {
      return this.http.post(url,Json,options).map(res=>res.json()).subscribe(
        (res)=>{
          if (isLoading){
            loading.dismiss();
          }
          if(successCallback){
            if(res["success"]=="true"||res["success"]=="success"||res["success"]==true){
              successCallback(res);
            }else{
              if (errorCallback){
                errorCallback(res['msg']);
              }
              else {
                this.errorCallback(res['msg']);
              }
            }
          }
        },(err)=>{
          if (isLoading){
            loading.dismiss();
          }
          let errMsg = "网络通信异常";
          switch (err.status) {
            case 401:
              errMsg = "请重新登录";
              break;
            case 404:
              errMsg = '抱歉，后台服务找不到对应接口';
              break;
            case 0:
              errMsg = '网络无法连接';
            default:
              break;
          }
          if (errMsg!=""){
            if (errorCallback){
              errorCallback(errMsg);
            }
            else {
              this.errorCallback(errMsg);
            }
          }
        }
      );
    }
  };
  public postData2 (url:string,body:any,successCallback,isLoading?:any,errorCallback?:any){
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      dismissOnPageChange:true
      // duration:5000
    });
    if (isLoading){
      loading.present();
    }
    var headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers:headers, withCredentials: true});
    if (this.storageService.read("token"))
      body.token = this.storageService.read("token");
    if (this.storageService.read("loginDepartCode"))
      body.departCode = this.storageService.read("loginDepartCode");
    if (!this.platform.is("mobileweb")){
      this.nativeHttp.setDataSerializer('urlencoded');
      this.nativeHttp.setRequestTimeout(120);
      this.nativeHttp.post(url, body, {type:"app"})
        .then(data => {
          let res = JSON.parse(data.data);
          if (isLoading){
            setTimeout((e)=>{loading.dismiss()},1000);
          }
          if(successCallback){
            if(res["success"]=="true"||res["success"]=="success"||res["success"]==true){
              successCallback(res);
            }else{
              if (errorCallback){
                errorCallback(res['msg']);
              }
              else {
                this.errorCallback(res['msg']);
              }
            }
          }
        })
        .catch(error => {
          if (isLoading){
            setTimeout((e)=>{loading.dismiss()},1000);
          }
          let errMsg = "网络通信异常";
          switch (error.status) {
            case 401:
              errMsg = "";
              if (this.storageService.read("loginDepartName")){
                this.postData(this.getUrl()+"appLoginController/login.do",
                  {usercode:this.storageService.read("loginUserCode"),password:this.storageService.read("loginPassWord")},(data)=>{
                    this.postData(url,body,successCallback,isLoading,errorCallback)
                  },true)
                //PageUtil.pages["mine"].backToLoginPage();
              }
              break;
            case 404:
              errMsg = '抱歉，后台服务找不到对应接口';
              break;
            case 0:
              errMsg = '网络无法连接';
            default:
              break;
          }
          if (errMsg!=""){
            if (errorCallback){
              errorCallback(errMsg);
            }
            else {
              this.errorCallback(errMsg);
            }
          }
        })
    }
    else {
      return this.http.post(url,this.transformRequest(body),options).map(res=>res.json()).subscribe(
        (res)=>{
          if (isLoading){
            setTimeout((e)=>{loading.dismiss()},1000);
          }
          if(successCallback){
            if(res["success"]=="true"||res["success"]=="success"||res["success"]==true){
              successCallback(res);
            }else{
              if (errorCallback){
                errorCallback(res['msg']);
              }
              else {
                this.errorCallback(res['msg']);
              }
            }
          }
        },(err)=>{
          if (isLoading){
            setTimeout((e)=>{loading.dismiss()},1000);
          }
          let errMsg = "网络通信异常";
          switch (err.status) {
            case 401:
              errMsg = "";
              if (this.storageService.read("loginDepartName")){
                this.postData(this.getUrl()+"appLoginController/login.do",
                  {usercode:this.storageService.read("loginUserCode"),password:this.storageService.read("loginPassWord")},(data)=>{
                    this.postData(url,body,successCallback,isLoading,errorCallback)
                  },true)
                //PageUtil.pages["mine"].backToLoginPage();
              }
              break;
            case 404:
              errMsg = '抱歉，后台服务找不到对应接口';
              break;
            case 0:
              errMsg = '网络无法连接';
            default:
              break;
          }
          if (errMsg!=""){
            if (errorCallback){
              errorCallback(errMsg);
            }
            else {
              this.errorCallback(errMsg);
            }
          }
        }
      );
    }
  };
  public postJson2 (url:string,Json:any,successCallback,isLoading?:any,errorCallback?:any){
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      dismissOnPageChange:true
      // duration:5000
    });
    if (isLoading){
      loading.present();
    }
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    // headers.append('type','app');
    let options = new RequestOptions({ headers:headers, withCredentials: true});
    if (this.storageService.read("token"))
      Json.token = this.storageService.read("token");
    if (this.storageService.read("loginDepartCode"))
      Json.departCode = this.storageService.read("loginDepartCode");
    if (!this.platform.is("mobileweb")){
      this.nativeHttp.setDataSerializer('json');
      // for(let i in Json){
      //   if($.isArray(Json[i])&&i!="uploadFile"){
      //     let str = "";
      //     for (let j in Json[i]){
      //       str += ""+Json[i][j]+",";
      //     }
      //     str = str.substring(0,str.length-1);
      //     Json[i] = str;
      //   }
      // }
      this.nativeHttp.post(url, Json, {type:"app"})
        .then(data => {
          let res = JSON.parse(data.data);
          if (isLoading){
            loading.dismiss();
          }
          if(successCallback){
            if(res["success"]=="true"||res["success"]=="success"||res["success"]==true){
              successCallback(res);
            }else{
              if (errorCallback){
                errorCallback(res['msg']);
              }
              else {
                this.errorCallback(res['msg']);
              }
            }
          }
        })
        .catch(error => {
          if (isLoading){
            loading.dismiss();
          }
          let errMsg = "网络通信异常";
          switch (error.status) {
            case 401:
              errMsg = "请重新登录";
              break;
            case 404:
              errMsg = '抱歉，后台服务找不到对应接口';
              break;
            case 0:
              errMsg = '网络无法连接';
            default:
              break;
          }
          if (errMsg!=""){
            if (errorCallback){
              errorCallback(errMsg);
            }
            else {
              this.errorCallback(errMsg);
            }
          }
        })
    }
    else {
      return this.http.post(url,Json,options).map(res=>res.json()).subscribe(
        (res)=>{
          if (isLoading){
            loading.dismiss();
          }
          if(successCallback){
            if(res["success"]=="true"||res["success"]=="success"||res["success"]==true){
              successCallback(res);
            }else{
              if (errorCallback){
                errorCallback(res['msg']);
              }
              else {
                this.errorCallback(res['msg']);
              }
            }
          }
        },(err)=>{
          if (isLoading){
            loading.dismiss();
          }
          let errMsg = "网络通信异常";
          switch (err.status) {
            case 401:
              errMsg = "请重新登录";
              break;
            case 404:
              errMsg = '抱歉，后台服务找不到对应接口';
              break;
            case 0:
              errMsg = '网络无法连接';
            default:
              break;
          }
          if (errMsg!=""){
            if (errorCallback){
              errorCallback(errMsg);
            }
            else {
              this.errorCallback(errMsg);
            }
          }
        }
      );
    }
  };
  private transformRequest(obj){
    var str=[];
    for (var s in obj){
      str.push(encodeURIComponent(s)+"="+encodeURIComponent(obj[s]))
    }
    return str.join("&");
  }
  private errorCallback(msg){
    let alertCtrl = this.alertCtrl.create({
      title:msg
    });
    alertCtrl.present();
  }
}
