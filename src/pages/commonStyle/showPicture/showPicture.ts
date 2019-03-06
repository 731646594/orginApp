import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-showPicture',
  templateUrl: 'showPicture.html'
})
export class ShowPicturePage {
  picture = "";
  constructor(public navCtrl: NavController,public navParams:NavParams) {
      this.picture = this.navParams.get("picture");
  }
  ionViewDidEnter(){

  }
  returnPage(){
    this.navCtrl.pop();
  }
}
