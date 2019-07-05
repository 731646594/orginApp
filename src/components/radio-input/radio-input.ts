import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertController, LoadingController} from "ionic-angular";
import {StorageService} from "../../services/storageService";
import {HttpService} from "../../services/httpService";
/**
 * Generated class for the RadioInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'radio-input',
  templateUrl: 'radio-input.html'
})
export class RadioInputComponent implements OnInit{
  @Input() radioData=[];
  @Input() radioInput="";
  @Input() postUrl="";
  @Output() hideFooter = new EventEmitter();
  @Output() showFooter = new EventEmitter();
  @Output() backSelect = new EventEmitter();
  @Output() backValue = new EventEmitter();
  radioValue="";
  placeholder="";
  userCode = "";
  departCode = "";
  constructor(private loadingCtrl:LoadingController,private storageService:StorageService,
              private httpService:HttpService,private alertCtrl:AlertController) {

  }
  ngOnInit() {
    this.radioValue = this.radioData[0].radioValue;
    this.placeholder = '请输入'+this.radioData[0].radioName;
  }
  searchDetail(){
    if(!this.radioInput || this.radioInput.trim() == ''){
      let alertCtrl = this.alertCtrl.create({
        title:this.placeholder
      });
      alertCtrl.present();
      return false;
    }
    let loading = this.loadingCtrl.create({
      content:"请等待...",
      duration:5000
    });
    loading.present();
    this.userCode = this.storageService.read("loginUserCode");
    this.departCode = this.storageService.read("loginDepartCode");
    let params = "{\"userCode\":\""+this.userCode+"\",\"departCode\":\""+this.departCode+"\",\""+this.radioValue+"\":\""+this.radioInput+"\"}";
    let paramsJson = JSON.parse(params);
    this.httpService.post(this.httpService.getUrl()+this.postUrl,paramsJson).subscribe(data=>{
      if (data.success=="true"){
        this.backValue.emit(data.data);
      }
      else {
        let alertCtrl = this.alertCtrl.create({
          title:data.msg
        });
        alertCtrl.present();
      }
      loading.dismiss();
    })
  }
  selectRadio(){
    if (this.radioValue && this.radioValue.trim() != '') {
      let j = this.radioData.filter((item) => {
        return (item.radioValue==this.radioValue);
      });
      this.placeholder = '请输入'+j[0].radioName;
      return this.backSelect.emit(j[0]);
    }
  }
  inputFocus(){
    this.hideFooter.emit()
  }
  inputBlur(){
    this.showFooter.emit()
  }
}
