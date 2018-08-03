/**
 * UserInfoDao
 * @flow
 * @author wangjiahuan
 */
'use strict';


import {
  AsyncStorage,
} from 'react-native'
import AppConfig from '../../../config/AppConfig'


export default class UserInfoDao{
  /**
   * 获取当前登录的用户token
   * @returns {Promise}
   */
  getUserInfo(token){
   let url = AppConfig.GET_USER_INFO_API + token
   return new Promise((resolve,reject)=>{
        fetch(url)
        .then((response)=>response.json())
        .catch((error)=> {
            reject(error);
        }).then((responseData)=> {
            console.log(responseData)
            resolve(responseData)
        })
   })
  }
}
  /**
   * 保存user
   * @param user
   */
//   save(user){
//     AsyncStorage.setItem(TOKEN,user,(error=>{}))
//   }
// }

