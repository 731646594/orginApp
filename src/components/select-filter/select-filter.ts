import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectFilterPage} from "../../pages/commonStyle/selectFilter/selectFilter";
import {ModalController} from "ionic-angular";
/**
 * Generated class for the SelectFilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-filter',
  templateUrl: 'select-filter.html'
})
export class SelectFilterComponent{
  @Input() itemName="";
  @Input() selectData=[];
  @Input() optionValue="";
  @Input() optionName="";
  @Input() selectName = "";
  @Output() backValue = new EventEmitter();
  selectedData;
  constructor(private modalCtrl:ModalController) {
  }
  createSelectPage(){
    let modal = this.modalCtrl.create(SelectFilterPage,{data:this.selectData,optionValue:this.optionValue,optionName:this.optionName},{
    });
    modal.present();
    modal.onDidDismiss(data=>{
      if(data){
        if(data.selectedValue){
          this.selectedData = {selectedValue:data.selectedValue,selectedName:data.selectedName};
          this.backValue.emit(this.selectedData)
        }
      }
    })
  }
}
