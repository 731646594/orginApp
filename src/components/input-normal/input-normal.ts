import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the InputNormalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'input-normal',
  templateUrl: 'input-normal.html'
})
export class InputNormalComponent {
  @Input() itemName="";
  @Input() inputType="";
  @Input() inputValue="";
  @Output() hideFooter = new EventEmitter();
  @Output() backValue = new EventEmitter();
  constructor() {

  }
  inputFocus(){
    this.hideFooter.emit()
  }
  inputBlur(){
    this.backValue.emit(this.inputValue)
  }
}
