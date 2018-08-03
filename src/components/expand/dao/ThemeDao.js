/**
 * ThemeDao
 * @author wangjiahuan
 */
'use strict';


import {
  AsyncStorage,
} from 'react-native'
const THEME_KEY='theme_key'

export default class ThemeDao{
  /**
   * 获取当前的主题
   * @returns {Promise}
   */
  getTheme(){
   return new Promise((resolve,reject)=>{
     AsyncStorage.getItem(THEME_KEY,(error,result)=>{
       if(error){
         reject(error);
         return;
       }
       if(!result){
         this.save('Original');
         result='Original';
       }
       resolve(result)
     })
   })
  }
  /**
   * 保存主题标识
   * @param themeFlag
   */
  save(themeFlag){
    AsyncStorage.setItem(THEME_KEY,themeFlag,(error=>{}))
  }
}

