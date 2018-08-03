import * as types from './actionTypes';

export function updateThemeFactory(theme) {
    return { type: types.UPDATE_THEME_FACTORY, theme:theme}
}

export function updateLocale(locale) {
    return { type: types.UPDATE_LOCALE, locale:locale}
}

export function updateUser(user) {
    return { type: types.UPDATE_USER, user:user}
}




