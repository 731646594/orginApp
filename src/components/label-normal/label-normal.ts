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
  ngOnInit(){
    let last = document.getElementsByClassName('content').length -1;
    let pageName = document.getElementsByClassName('content')[last].parentElement.tagName;
    if (pageName.indexOf('repair') > 0 || pageName.indexOf('REPAIR') > 0 || pageName.indexOf('maintenance') > 0 || pageName.indexOf('MAINTENANCE') > 0){
      let labelArray = document.getElementsByTagName(pageName)[0].getElementsByClassName('labelNormal');
      for (let i = 0; i < labelArray.length;i++){
        if (labelArray.item(i).className.indexOf('showAllLabel') == -1){
          labelArray.item(i).className += ' showAllLabel'
        }
      }
    }
  }
}
