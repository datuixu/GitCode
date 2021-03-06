'use strict';

import * as types from '../actions/actionTypes';
import {ThemeFactory} from '../res/styles/ThemeFactory';

const initialState = {
    theme:ThemeFactory.Original,// 默认主题
    locale:'en', // 当前默认语言为英文
    user:{} // 当前登录用户信息
};

export default function globalDataState(state = initialState, action) {
  
    switch (action.type) {
        case types.UPDATE_THEME_FACTORY:
            return Object.assign({}, state, {
                ...state,
                theme: action.theme
        });
        case types.UPDATE_LOCALE:
            return Object.assign({}, state, {
                ...state,
                locale: action.locale
        });
        case types.UPDATE_USER:
            return Object.assign({}, state, {
                ...state,
                user: action.user
        });
        default: 
            return state;
    }
}