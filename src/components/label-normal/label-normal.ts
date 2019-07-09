import {Component, Input} from '@angular/core';

/**
 * Generated class for the LabelNormalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'label-normal',
  templateUrl: 'label-normal.html'
})
export class LabelNormalComponent {
  @Input() itemName="";
  @Input() labelValue="";
  @Input() nec = -1;
  constructor() {

  }

}
