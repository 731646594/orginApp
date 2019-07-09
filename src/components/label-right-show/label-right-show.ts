import {Component, Input} from '@angular/core';

/**
 * Generated class for the LabelRightShowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'label-right-show',
  templateUrl: 'label-right-show.html'
})
export class LabelRightShowComponent {
  @Input() itemName="";
  @Input() labelValue="";
  constructor() {

  }

}
