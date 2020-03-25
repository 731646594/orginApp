import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'page-menuHelp',
  templateUrl: 'menuHelp.html'
})
export class MenuHelpPage{
  item;
  SpUrl;
  constructor(
    public navParams?: NavParams,
    public viewCtrl?:ViewController,
    private sanitizer?: DomSanitizer,
  ) {
    let mUrl = this.navParams.get('url');
    this.SpUrl=this.sanitizer.bypassSecurityTrustResourceUrl(mUrl);
  }
  ionViewDidEnter(){

  }
  back(){
    let modelData: string = '-1';
    this.viewCtrl.dismiss(modelData);
  }
}
