import * as types from './actionTypes';

export function updateThemeFactory(theme) {
    return { type: types.UPDATE_THEME_FACTORY, theme:theme}
}


