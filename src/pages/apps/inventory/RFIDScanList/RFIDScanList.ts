import { Component } from '@angular/core';
import {ActionSheetController, AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {StorageService} from "../../../../services/storageService";
import {BarcodeScanner,} from "@ionic-native/barcode-scanner";
import {File} from "@ionic-native/file";
import {ScanCodePage} from "../scanCode/scanCode";
import {InventoryEntryPage} from "../inventoryEntry/inventoryEntry";

@Component({
  selector: 'page-RFIDScanList',
  templateUrl: 'RFIDScanList.html'
})
export class RFIDScanListPage{
  data;
  constructor(public navCtrl?:NavController,public storageService?:StorageService,public navParams?:NavParams,
              public events?:Events, public file?:File, public actionSheetCtrl?:ActionSheetController,
              public app?:App,public alertCtrl?:AlertController,public barcodeScanner?:BarcodeScanner) {
    this.data = this.navParams.get("data")

  }
}
