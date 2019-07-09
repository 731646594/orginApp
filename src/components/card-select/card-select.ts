import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the CardSelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'card-select',
  templateUrl: 'card-select.html'
})
export class CardSelectComponent {
  @Input() cardData=[];
  @Input() data=[];
  @Output() backValue = new EventEmitter();
  @Output() goNextPage = new EventEmitter();
  displayIndex;
  constructor() {

  }
  displayContent(index){
    let content = document.getElementsByClassName("disContent");
    if (content.length>0) {
      if ((<HTMLElement>content[index]).style.display == "block") {
        (<HTMLElement>content[index]).style.display = "none";
      } else {
        if (this.displayIndex >= 0) {
          (<HTMLElement>content[this.displayIndex]).style.display = "none";
        }
        (<HTMLElement>content[index]).style.display = "block";
        this.displayIndex = index;
      }
    }else {
      this.goNextPage.emit(index)
    }
  }
  checkedItem(index){
    this.data[index]["checkedIcon"] = !this.data[index]["checkedIcon"];
    this.backValue.emit(index)
  }
}
