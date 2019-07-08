import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the DateNormalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'date-normal',
  templateUrl: 'date-normal.html'
})
export class DateNormalComponent {
  @Input() itemName="";
  @Input() maxDate="";
  @Input() dateValue="";
  @Input() displayFormat="";
  @Output() backValue = new EventEmitter();
  constructor() {

  }
  returnDate(){
    this.backValue.emit(this.dateValue)
  }
}
