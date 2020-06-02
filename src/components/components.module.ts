import { NgModule } from '@angular/core';
import { SelectFilterComponent } from './select-filter/select-filter';
import {IonicModule} from "ionic-angular";
import { InputNormalComponent } from './input-normal/input-normal';
import { LabelNormalComponent } from './label-normal/label-normal';
import { SelectNormalComponent } from './select-normal/select-normal';
import { RadioInputComponent } from './radio-input/radio-input';
import { CardNormalComponent } from './card-normal/card-normal';
import { LabelNewlineComponent } from './label-newline/label-newline';
import { CardSelectComponent } from './card-select/card-select';
import { ScannerComponent } from './scanner/scanner';
import { DateNormalComponent } from './date-normal/date-normal';
import { CardSelectInputComponent } from './card-select-input/card-select-input';
import { LabelRightShowComponent } from './label-right-show/label-right-show';
import { SelectFilterNecComponent } from './select-filter-nec/select-filter-nec';
import {UpRefreshRowsComponent} from "./up-refresh-rows/up-refresh-rows";
import {TabTreeComponent} from "./tab-tree/tab-tree";
@NgModule({
	declarations: [SelectFilterComponent,
    InputNormalComponent,
    LabelNormalComponent,
    SelectNormalComponent,
    RadioInputComponent,
    CardNormalComponent,
    LabelNewlineComponent,
    CardSelectComponent,
    ScannerComponent,
    DateNormalComponent,
    CardSelectInputComponent,
    LabelRightShowComponent,
    SelectFilterNecComponent,
    UpRefreshRowsComponent,
    TabTreeComponent
  ],
	imports: [IonicModule],
	exports: [SelectFilterComponent,
    InputNormalComponent,
    LabelNormalComponent,
    SelectNormalComponent,
    RadioInputComponent,
    CardNormalComponent,
    LabelNewlineComponent,
    CardSelectComponent,
    ScannerComponent,
    DateNormalComponent,
    CardSelectInputComponent,
    LabelRightShowComponent,
    SelectFilterNecComponent,
    UpRefreshRowsComponent,
    TabTreeComponent
  ]
})
export class ComponentsModule {}
