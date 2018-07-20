'use strict';

import * as types from '../actions/actionTypes';
import {ThemeFactory} from '../res/styles/ThemeFactory';

const initialState = {
    theme:ThemeFactory.Original,// 默认主题
};

export default function globalDataState(state = initialState, action) {
  
    switch (action.type) {
        case types.UPDATE_THEME_FACTORY:
            return Object.assign({}, state, {
                ...state,
                theme: action.theme
        });
        default: 
            return state;
    }
}