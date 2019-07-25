import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./storageService";
import {AlertController} from "ionic-angular";

@Injectable()
export class HttpService {

  constructor(public http: Http,public httpClient:HttpClient,public storageService:StorageService,public alertCtrl:AlertController){}

  public getUrl(){
    let url=this.storageService.read("serverUrl");
    if (!url){
      this.setUrl("http","192.168.10.194","8080","plamassets");
      return "http://192.168.10.194:8080/plamassets/mobile/";
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
  public postData (url:string,body:any,successCallback,errorCallback?:any){
    var headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers:headers, withCredentials: true});
    return this.http.post(url,this.transformRequest(body),options).map(res=>res.json()).subscribe(
      (res)=>{
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
        let errMsg = "网络通信异常";
        switch (err.status) {
          case 401:
            errMsg = '无权限访问，或许登录信息已过期，请重新登录';
            //跳转到登陆app
            // this.app.getRootNav().push(HseLoginPage);
            break;
          case 404:
            errMsg = '抱歉，后台服务找不到对应接口';
            break;
          case 0:
            errMsg = '网络无法连接';
          default:
            break;
        }
        this.errorCallback(errMsg)
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
