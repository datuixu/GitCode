'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    selectIndex:0,// 当前选中的语言的index
    languages:[],// 所有语言的数据
    isRenderer:true,// 是否需要重新渲染整列表
    isRendererItem:false // 是否需要单独渲染一行
};

export default function trendigDataState(state = initialState, action) {
  
    switch (action.type) {
        case types.UPDATE_SELECT_INDEX:
            return Object.assign({}, state, {
                ...state,
                selectIndex: action.selectIndex
        });
        case types.UPDATE_TRENDING_LANS:
            return Object.assign({}, state, {
                ...state,
                languages: action.languages
        });
        case types.UPDATE_IS_RENDERER:
            return Object.assign({}, state, {
                ...state,
                isRenderer: action.isRenderer
        });
        case types.UPDATE_IS_RENDERER_ITEM:
            return Object.assign({}, state, {
                ...state,
                isRendererItem: action.isRendererItem
        });
        default: 
            return state;
    }
}