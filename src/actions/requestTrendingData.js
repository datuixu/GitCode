import * as types from './actionTypes';

export function updateSelcetIndex(selectIndex) {
    return { type: types.UPDATE_SELECT_INDEX, selectIndex:selectIndex}
}

export function updateTrendingLans(languages) {
    return { type: types.UPDATE_TRENDING_LANS, languages:languages}
}

export function updateIsRenderer(isRenderer) {
    return { type: types.UPDATE_IS_RENDERER, isRenderer:isRenderer}
}

export function updateIsRendererItem(isRendererItem) {
    return { type: types.UPDATE_IS_RENDERER_ITEM, isRendererItem:isRendererItem}
}

