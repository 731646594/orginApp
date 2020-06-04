import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as $ from "jquery";
import {Events} from "ionic-angular";
/**
 * Generated class for the TabTreeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab-tree-merge-cell',
  templateUrl: 'tab-tree-merge-cell.html'
})
export class TabTreeMergeCellComponent {
  @Input() dataesList=[];
  @Input() dataesSum=null;
  @Input() notSum;
  @Input() cellItem=[];
  @Input() cellItem2=[];
  @Output() backValue = new EventEmitter();
  displayDataSort = -1;
  displayDtSort = -1;
  constructor(public events:Events) {
  }
  ngOnInit(){

  }
  showData(sort){
    this.showContent(".dataContent.sort",sort,"displayDataSort");
  }
  showDt(sort){
    this.showContent(".dtContent.sort",sort,"displayDtSort");
  }
  typeIsArray(value){
    return Array.isArray(value)
  }
  showContent(contentName,sort,displaySort){
    let content = $(contentName+sort)[0];
    if (content){
      if (content.style.display=="block"){
        content.style.display="none";
      }else {
        if(this[displaySort]>=0){
          $(contentName+this[displaySort])[0].style.display="none";
        }
        content.style.display="block";
        this[displaySort] = sort;
      }
    }
    let labelHeight = (<HTMLElement>document.getElementById("reportForm").getElementsByClassName("inputItem")[0]).offsetHeight;
    let dataTop = (<HTMLElement>content).offsetTop;
    let formHeaderHeight = (<HTMLElement>document.getElementsByClassName("formHeader")[0]).offsetHeight;
    (<HTMLElement>document.getElementById("reportForm").getElementsByClassName("scroll-content")[0]).scrollTop = dataTop - labelHeight - formHeaderHeight;

  }
  subSum(rankIndex,itemValue,dataName){
    if (dataName=='dataes'){
      this.dataesList[rankIndex[rankIndex.length-1]][itemValue] = parseFloat(this.dataesList[rankIndex[rankIndex.length-1]][itemValue])
    }else if(dataName=='dataesSum'){
      this.dataesSum[itemValue] = parseFloat(this.dataesSum[itemValue])
    }else if(dataName.itemValue){
      this.dataesList[rankIndex[rankIndex.length-1]][itemValue][dataName.index][dataName.itemValue] = parseFloat(this.dataesList[rankIndex[rankIndex.length-1]][itemValue][dataName.index][dataName.itemValue])
      this.events.publish("focusInput",{rankIndex:rankIndex,itemValue:itemValue,dataName:dataName})
      return;
    }
    this.events.publish("focusInput",{rankIndex:rankIndex,itemValue:itemValue})
  }
  addSum(rankIndex,itemValue,dataName){
    if (dataName=='dataes'){
      this.dataesList[rankIndex[rankIndex.length-1]][itemValue] = parseFloat(this.dataesList[rankIndex[rankIndex.length-1]][itemValue])
    }else if(dataName=='dataesSum'){
      this.dataesSum[itemValue] = parseFloat(this.dataesSum[itemValue])
    }else if(dataName.itemValue){
      this.dataesList[rankIndex[rankIndex.length-1]][itemValue][dataName.index][dataName.itemValue] = parseFloat(this.dataesList[rankIndex[rankIndex.length-1]][itemValue][dataName.index][dataName.itemValue])
      this.events.publish("blurInput",{rankIndex:rankIndex,itemValue:itemValue,dataName:dataName})
      return;
    }
    this.events.publish("blurInput",{rankIndex:rankIndex,itemValue:itemValue})
  }
}
