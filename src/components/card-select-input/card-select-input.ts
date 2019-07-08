import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the CardSelectInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'card-select-input',
  templateUrl: 'card-select-input.html'
})
export class CardSelectInputComponent {
  @Input() cardData=[];
  @Input() data=[];
  @Output() backValue = new EventEmitter();
  @Output() hideFooter = new EventEmitter();
  @Output() showFooter = new EventEmitter();
  displayIndex;
  maxDate
  constructor() {

  }
  displayContent(index){
    console.log(this.cardData)
    let content = document.getElementsByClassName("disContent");
    if ((<HTMLElement>content[index]).style.display=="block"){
      (<HTMLElement>content[index]).style.display="none";
    }else {
      if(this.displayIndex>=0){
        (<HTMLElement>content[this.displayIndex]).style.display="none";
        if(!this.data[index]["stopDate"]){
          this.data[index]["stopDate"] = this.data[this.displayIndex]["stopDate"];
        }
        if(!this.data[index]["discardReasonCode"]){
          this.data[index]["discardReasonCode"] = this.data[this.displayIndex]["discardReasonCode"];
        }
        if(!this.data[index]["discardMark"]){
          this.data[index]["discardMark"] = this.data[this.displayIndex]["discardMark"];
        }
      }
      (<HTMLElement>content[index]).style.display="block";
      this.displayIndex = index;
      let date = new Date();
      this.maxDate = date.toISOString();
    }
  }
  checkedItem(index){
    this.data[index]["checkedIcon"] = !this.data[index]["checkedIcon"];
    this.backValue.emit(index)
  }
  getDateValue(value,key,index){
    this.data[index][key] = value;
  }
  getSelectValue(value,key,index){
    this.data[index][key] = value["selectedValue"];
  }
  inputFocus(){
    this.hideFooter.emit()
  }
  inputBlur(value,key,index){
    this.data[index][key] = value.target.value;
    this.showFooter.emit();
  }
}
