/**
 * Created by Administrator on 2017/5/3 0003.
 */
import {Injectable} from '@angular/core';
import {Platform } from 'ionic-angular';
@Injectable()
export class NativeService {

  constructor(private platform: Platform){
    
  }
  
    /**
   * 是否是真机环境
   * @returns {boolean}
   * @memberof NativeService
   */
  isMobile(): boolean
  {
    return this.platform.is("mobile") && !this.platform.is("mobileweb");
  }


  /**
   * 是否android真机环境
   * @returns {boolean}
   * @memberof NativeService
   */
  isAndroid(): boolean
  {
    return this.isMobile() && this.platform.is("android");
  }

}
