import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToastController} from 'ionic-angular';
import {HttpService} from '../../services/httpService';

@Component({
  selector: 'up-refresh-rows',
  templateUrl: 'up-refresh-rows.html'
})
export class UpRefreshRowsComponent {
  @Input() isNewSearch = true;
  @Input() url = "";
  @Input() body = {};
  @Input() pageKey = "";
  @Output() backValue = new EventEmitter();
  page = 0;

  constructor(public toastCtrl: ToastController, public httpService: HttpService) {

  }

  resetPage() {
    this.page = 0;
    this.isNewSearch = true;
  }

  setParam(body) {
    this.body = body;
  }

  public getMore(infiniteScroll, loading?: boolean) {
    this.page++;
    this.body[this.pageKey] = this.page;
    this.httpService.postData2(this.httpService.getUrl2() + this.url, this.body, data => {
      if (!data.obj.rows[0]) {
        this.isNewSearch = false;
        if (this.page > 1) {
          let toast = this.toastCtrl.create({
            message: "这已经是最后一页了",
            duration: 2000,
          });
          toast.present();
        }
        return false;

      } else {
        this.backValue.emit(data.obj.rows);
      }
      if (infiniteScroll != null) {
        infiniteScroll.complete();
      }
    }, loading)
  }
}
