import * as types from './actionTypes';

export function adviceRefesh(adviceRefesh) {
    return { type: types.UPDATE_ADVICE_REFSEH, adviceRefesh:adviceRefesh}
}

export function adviceListRefesh(adviceListRefesh) {
    return { type: types.UPDATE_ADVICE_LIST_REFSEH, adviceListRefesh:adviceListRefesh}
}

export function updateAdviceData(adviceData) {
    return { type: types.UPDATE_ADVICE_DATA, adviceData:adviceData}
}

export function schedulListRefesh(schedulListRefesh) {
    return { type: types.UPDATE_SCHEDUL_LIST_REFESH, schedulListRefesh:schedulListRefesh}
}