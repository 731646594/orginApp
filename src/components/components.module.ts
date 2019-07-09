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
    LabelRightShowComponent],
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
    LabelRightShowComponent]
})
export class ComponentsModule {}
