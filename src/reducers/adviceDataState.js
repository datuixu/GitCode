'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    adviceListRefesh:false,
    adviceRefesh:false,
    adviceData:[],
    schedulListRefesh:false
};

export default function adviceDataState(state = initialState, action) {
  
    switch (action.type) {
        case types.UPDATE_ADVICE_LIST_REFSEH:
            return Object.assign({}, state, {
                ...state,
                adviceListRefesh: action.adviceListRefesh
        });
        case types.UPDATE_ADVICE_REFSEH:
            return Object.assign({}, state, {
                ...state,
                adviceRefesh: action.adviceRefesh
        });
        case types.UPDATE_ADVICE_DATA:
            return Object.assign({}, state, {
                ...state,
                adviceData: action.adviceData
        });
        case types.UPDATE_SCHEDUL_LIST_REFESH:
            return Object.assign({}, state, {
                ...state,
                schedulListRefesh: action.schedulListRefesh
        });
        default: 
            return state;
    }
}