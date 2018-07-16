import * as types from './actionTypes';

export function updateSelcetKey(selectKey) {
    return { type: types.UPDATE_SELECT_KEY, selectKey:selectKey}
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

export function updateUrl(url) {
    return { type: types.UPDATE_URL, url:url}
}

