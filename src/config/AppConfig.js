/**
 * Created on 2018/8/01.
 * 
 *  @author wangjiahuan
 */

'use strict';

export const AppConfig = {
    CLIENT_ID : "3516aaad30d6b260fecd",
    CLIENT_SECRET : "b4854101132a27baf77840249b5caa67e2891123",
    GITHUB_BASE_URL : "https://github.com/",
    GITHUB_API_V3_BASE_URL : "https://api.github.com/",
    GITHUB_API_V4_BASE_URL : "https://api.github.com/graphql/",
    AUTH_HOME : AppConfig.GITHUB_BASE_URL + "MrWangjiahuan",
    REDIRECT_URL : AppConfig.AUTH_HOME + "/GitCode/CallBack",
    OAUTH_AUTHORIZATIONS_API : AppConfig.GITHUB_API_V3_BASE_URL +"/authorizations/",
    GET_OR_CREATE_AUTHORIZATIONS_API : AppConfig.OAUTH_AUTHORIZATIONS_API + "clients/"
}