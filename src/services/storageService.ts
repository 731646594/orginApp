import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
export class PageUtil{
  public static pages={};
}
@Injectable()
export class StorageService {

  AssetInventoryDatabase:SQLiteObject;

  constructor(public sqlite:SQLite) { }
  getDevice(){
    return 1;//手机
    // return 2;//防爆手持机
  }
  initDatabase(){
    this.sqlite.create({
      name:'AssetInventory.db',
      location:'default'
    }).then((database:SQLiteObject)=>{
      this.AssetInventoryDatabase = database;
    })
    PageUtil.pages["storage"]=this;
  }

  createUserTable(tableName){
    this.AssetInventoryDatabase.executeSql('CREATE TABLE IF NOT EXISTS '+ tableName +' (userCode VARCHAR(20),stringData VARCHAR(255));',[]).then().catch(e => alert("erro1:"+JSON.stringify(e)));
  }

  getUserTable(){
    return this.AssetInventoryDatabase;
  }

  insertIntoUserTable(tableName,userCode,stringData) {
    this.AssetInventoryDatabase.executeSql('INSERT INTO '+tableName+' VALUES (?, ?);', [userCode, stringData]).then().catch(e => alert("erro3:"+JSON.stringify(e)));
  }

  updateUserTable(tableName,userCode,stringData) {
    this.AssetInventoryDatabase.executeSql('UPDATE '+tableName+' SET stringData=? WHERE userCode=?;', [stringData, userCode]).then().catch(e => alert("erro4:"+JSON.stringify(e)));
  }

  deleteUserTable(tableName,userCode){
    this.createUserTable(tableName)
    this.AssetInventoryDatabase.executeSql('DELETE FROM '+tableName+' WHERE userCode=?;', [userCode]).then().catch(e => alert("erro5:"+JSON.stringify(e)));
  }

  dropUserTable(tableName){
    this.AssetInventoryDatabase.executeSql('DROP TABLE '+tableName+';', []).then().catch(e => alert("erro6:"+JSON.stringify(e)));
  }

  getSSS(tableName,userCode){
    this.createUserTable(tableName);
    return 'SELECT * FROM '+tableName+' WHERE userCode=\''+userCode+'\';';
  }

  sqliteInsert(tableName,userCode,stringData){
    this.createUserTable(tableName);
    this.getUserTable().executeSql('SELECT * FROM '+tableName+' WHERE userCode=\''+userCode+'\';',[]).then(res =>{
      if (res.rows.length>0){
        this.updateUserTable(tableName,userCode,stringData);
      }else {
        this.insertIntoUserTable(tableName,userCode,stringData);
      }
    }).catch(e =>alert("erro7:"+JSON.stringify(e)));
  }
  sqliteInsert2(tableName,userCode,stringData,callBack){
    this.createUserTable(tableName);
    this.getUserTable().executeSql('SELECT * FROM '+tableName+' WHERE userCode=\''+userCode+'\';',[]).then(res =>{
      if (res.rows.length>0){
        this.updateUserTable2(tableName,userCode,stringData,callBack);
      }else {
        this.insertIntoUserTable2(tableName,userCode,stringData,callBack);
      }
    }).catch(e =>alert("erro7:"+JSON.stringify(e)));
  }
  updateUserTable2(tableName,userCode,stringData,callBack){
    this.AssetInventoryDatabase.executeSql('UPDATE '+tableName+' SET stringData=? WHERE userCode=?;', [stringData, userCode]).then(res=>{
      callBack(res)
    }).catch(e => alert("erro4:"+JSON.stringify(e)));

  }
  insertIntoUserTable2(tableName,userCode,stringData,callBack){
    this.AssetInventoryDatabase.executeSql('INSERT INTO '+tableName+' VALUES (?, ?);', [userCode, stringData]).then(res=>{
      callBack(res)
    }).catch(e => alert("erro3:"+JSON.stringify(e)));

  }
  sqliteDrop(tableName,userCode){
    this.createUserTable(tableName);
    this.getUserTable().executeSql('SELECT * FROM '+tableName+' WHERE userCode=\''+userCode+'\';',[]).then(res =>{
      if (res.rows.length>0){
        this.dropUserTable(tableName);
      }
    }).catch(e =>alert("erro8:"+JSON.stringify(e)));
  }
  write(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  read<T>(key: string): T {
    let value: string = localStorage.getItem(key);
    if (value && value != "undefined" && value != "null") {
      return <T>JSON.parse(value);
    }
    return null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
