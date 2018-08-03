/**
 * LoginDao
 * @flow
 * @author wangjiahuan
 */
'use strict';


import {
  AsyncStorage,
} from 'react-native'

const TOKEN='token'

export default class LoginDao{
  /**
   * 获取当前登录的用户token
   * @returns {Promise}
   */
  getToken(){
   return new Promise((resolve,reject)=>{
     AsyncStorage.getItem(TOKEN,(error,result)=>{
       if(error){
         reject(error);
         return;
       }
       if(!result){
         this.save('');
         result='';
       }
       resolve(result)
     })
   })
  }
  /**
   * 保存token
   * @param token
   */
  save(token){
    AsyncStorage.setItem(TOKEN,token,(error=>{}))
  }
}

