import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./storageService";

@Injectable()
export class HttpService {

  constructor(public http: Http,public httpClient:HttpClient,public storageService:StorageService){}

  public getUrl(){
    let url=this.storageService.read("serverUrl");
    if (!url){
      this.setUrl("http","210.12.194.218","9080","AssetsDataPhone");
      return "http://210.12.194.218:9080/AssetsDataPhone/mobile/";
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
    let options = new RequestOptions({ headers:headers});
    return this.http.post(url,this.transformRequest(body),options).map(res=>res.json(),err=>console.log("error:"+err));
  }

  private transformRequest(obj){
    var str=[];
    for (var s in obj){
      str.push(encodeURIComponent(s)+"="+encodeURIComponent(obj[s]))
    }
    return str.join("&");
  }
}
