import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the SelectNormalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-normal',
  templateUrl: 'select-normal.html'
})
export class SelectNormalComponent {
  @Input() itemName="";
  @Input() selectData=[];
  @Input() optionValue="";
  @Input() optionName="";
  @Input() selectValue="";
  @Input() nec = -1;
  @Output() backValue = new EventEmitter();
  selectedData;
  constructor() {

  }
  returnSelect(value,name){
    this.selectedData = {selectedValue:value,selectedName:name};
    this.backValue.emit(this.selectedData)
  }
}
