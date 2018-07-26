/**
 * I18nDao
 * @flow
 */
'use strict';


import {
  AsyncStorage,
} from 'react-native'

const I18N_KEY='i18n_key'

export default class I18nDao{
  /**
   * 获取当前的语言
   * @returns {Promise}
   */
  getI18n(){
   return new Promise((resolve,reject)=>{
     AsyncStorage.getItem(I18N_KEY,(error,result)=>{
       if(error){
         reject(error);
         return;
       }
       if(!result){
         this.save('en');
         result='en';
       }
       resolve(result)
     })
   })
  }
  /**
   * 保存国际化语言
   * @param lan
   */
  save(lan){
    AsyncStorage.setItem(I18N_KEY,lan,(error=>{}))
  }
}

