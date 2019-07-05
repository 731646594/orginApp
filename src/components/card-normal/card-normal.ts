import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the CardNormalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'card-normal',
  templateUrl: 'card-normal.html'
})
export class CardNormalComponent {
  @Input() cardData=[];
  @Input() data=[];
  @Output() backValue = new EventEmitter();
  displayIndex;
  constructor() {

  }
  displayContent(index){
    let content = document.getElementsByClassName("disContent");
    if ((<HTMLElement>content[index]).style.display=="block"){
      (<HTMLElement>content[index]).style.display="none";
    }else {
      if(this.displayIndex>=0){
        (<HTMLElement>content[this.displayIndex]).style.display="none";
      }
      (<HTMLElement>content[index]).style.display="block";
      this.displayIndex = index;
    }
  }

}
