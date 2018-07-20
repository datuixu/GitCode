/**
 * ThemeDao
 * @flow
 */
'use strict';


import {
  AsyncStorage,
} from 'react-native'
import {ThemeFactory} from '../../../res/styles/ThemeFactory'
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
         this.save(ThemeFactory.Original);
        //  result=ThemeFlags.Default;
       }
       console.log(ThemeFactory.Original)
       resolve(ThemeFactory.Original)
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

