import {Component, Input} from '@angular/core';

/**
 * Generated class for the LabelNewlineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'label-newline',
  templateUrl: 'label-newline.html'
})
export class LabelNewlineComponent {
  @Input() itemName="";
  @Input() labelValue="";
  constructor() {

  }

}
