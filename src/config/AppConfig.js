/**
 * Created on 2018/8/01.
 * 
 *  @author wangjiahuan
 */

'use strict';

export default class AppConfig {
    static CLIENT_ID = "3516aaad30d6b260fecd";
    static CLIENT_SECRET = "b4854101132a27baf77840249b5caa67e2891123";
    static GITHUB_BASE_URL = "https://github.com/";
    static GITHUB_API_V3_BASE_URL = "https://api.github.com/";
    static GITHUB_API_V4_BASE_URL = "https://api.github.com/graphql/";
    static AUTH_HOME = AppConfig.GITHUB_BASE_URL + "MrWangjiahuan";
    static REDIRECT_URL = AppConfig.AUTH_HOME + "/GitCode/CallBack";
    static OAUTH_AUTHORIZATIONS_API = AppConfig.GITHUB_API_V3_BASE_URL +"/authorizations/";
    static GET_OR_CREATE_AUTHORIZATIONS_API = AppConfig.OAUTH_AUTHORIZATIONS_API + "clients/";
    static GET_USER_INFO_API = AppConfig.GITHUB_API_V3_BASE_URL + "user?access_token=";
}