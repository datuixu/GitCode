/**
 * LoginDao
 * @flow
 * @author wangjiahuan
 */
'use strict';


import {
  AsyncStorage,
} from 'react-native'

const USER_NAME='userNmae'

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
         this.saveToken('');
         result='';
       }
       resolve(result)
     })
   })
  }
    /**
   * 获取当前登录的用户名
   * @returns {Promise}
   */
  // getUserName(){
  //   return new Promise((resolve,reject)=>{
  //     AsyncStorage.getItem(TOKEN,(error,result)=>{
  //       if(error){
  //         reject(error);
  //         return;
  //       }
  //       if(!result){
  //         this.save('');
  //         result='';
  //       }
  //       resolve(result)
  //     })
  //   })
  // }
  /**
   * 保存token
   * @param token
   */
  saveToken(token){
    AsyncStorage.setItem(TOKEN,token,(error=>{}))
  }

  /**
   * 保存 userName 用于获取token
   * @param userName
   */
  // saveUserName(userName){
  //   AsyncStorage.setItem(USER_NAME,userName,(error=>{}))
  // }
}

