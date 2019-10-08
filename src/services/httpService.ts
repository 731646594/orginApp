import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./storageService";
import {AlertController, App, LoadingController} from "ionic-angular";

@Injectable()
export class HttpService {

  constructor(public http: Http,public httpClient:HttpClient,public storageService:StorageService,public alertCtrl:AlertController,public app:App,public loadingCtrl:LoadingController){}

  public getUrl(){
    let url=this.storageService.read("serverUrl");
    if (!url){
      // this.setUrl("http","210.12.193.123","9081","plamassets");
      // return "http://210.12.193.123:9081/plamassets/mobile/";
      this.setUrl("http","210.12.193.92","9080","plamassets");
      return "http://210.12.193.92:9080/plamassets/mobile/";
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
      // duration:5000
    });
    if (isLoading){
      loading.present();
    }
    var headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers:headers, withCredentials: true});
    return this.http.post(url,this.transformRequest(body),options).map(res=>res.json()).subscribe(
      (res)=>{
        if (isLoading){
          loading.dismiss();
        }
        if(successCallback){
          if(res["success"]=="true"||res["success"]=="success"){
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
            //
            if (this.storageService.read("loginDepartName")){
              this.postData(this.getUrl()+"appLoginController/login.do",
                {usercode:this.storageService.read("loginUserCode"),password:this.storageService.read("loginPassWord")},(data)=>{
                  this.postData(url,body,successCallback,isLoading,errorCallback)
                },true)
              //PageUtil.pages["mine"].backToLoginPage();
              //
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
