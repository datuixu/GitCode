/**
 * 主题
 * @flow
 */
import React, {Component} from 'react'
import {
    StyleSheet,
} from 'react-native';
import {I18n} from '../../language/i18n'

export const ThemeFactory = {
    Original:{
        title:I18n.t('theme.original_title'),
        isLinearGradient:true,
        themeColor:['#4f8dfe', '#31b7fe', '#37bafe'],
        textColor:'#FFFFFF',
        drawerBackgroundColor:'#FFFFFF',
        selectedTitleColor:'#4f8dfe',
        selectedIconColor:'#4f8dfe',
        iconColor:'#FFFFFF'
    },
    Golden:{
        title:I18n.t('theme.golden_title'),
        isLinearGradient:false,
        themeColor:'#212123',
        textColor:'#dcb86c',
        drawerBackgroundColor:'#171717',
        selectedTitleColor:'#dcb86c',
        selectedIconColor:'#dcb86c',
        iconColor:'#dcb86c'
    },
    Yellow:{
        title:I18n.t('theme.yellow_title'),
        isLinearGradient:false,
        themeColor:'#feba33',
        textColor:'#FFFFFF',
        drawerBackgroundColor:'#4c4c4c',
        selectedTitleColor:'#feba33',
        selectedIconColor:'#feba33',
        iconColor:'#FFFFFF'
    },
    White:{
        title:I18n.t('theme.white_title'),
        isLinearGradient:false,
        themeColor:'#FFFFFF',
        textColor:'#4f8dfe',
        drawerBackgroundColor:['#4f8dfe', '#31b7fe', '#37bafe'],
        selectedTitleColor:'#12b8f4',
        selectedIconColor:'#12b8f4',
        iconColor:'#12b8f4'
    },
    Pink:{
        title:I18n.t('theme.pink_title'),
        isLinearGradient:false,
        themeColor:'#fb6b8f',
        textColor:'#FFFFFF',
        drawerBackgroundColor:'#f0587e',
        selectedTitleColor:'#fb6b8f',
        selectedIconColor:'#fb6b8f',
        iconColor:'#FFFFFF'
    },
    Brown:{
        title:I18n.t('theme.brown_title'),
        isLinearGradient:false,
        themeColor:'#6e564a',
        textColor:'#FFFFFF',
        drawerBackgroundColor:'#513d34',
        selectedTitleColor:'#6e564a',
        selectedIconColor:'#6e564a',
        iconColor:'#FFFFFF'
    },
    Black:{
        title:I18n.t('theme.black_title'),
        isLinearGradient:false,
        themeColor:'#212123',
        textColor:'#FFFFFF',
        drawerBackgroundColor:'#171717',
        selectedTitleColor:'#dcb86c',
        selectedIconColor:'#dcb86c',
        iconColor:'#dcb86c'
    },
    StarryNight:{
        title:I18n.t('theme.starryNight_title'),
        isLinearGradient:false,
        themeColor:'#212123',
        textColor:'#FFFFFF',
        drawerBackgroundColor:'#171717',
        selectedTitleColor:'#dcb86c',
        selectedIconColor:'#dcb86c',
        iconColor:'#dcb86c'
    }
}

// export default class ThemeFactory{
//     /**
//      * 创建一个主题样式
//      * @param themeFlag 主题标识
//      * @returns {{themeColor: *, styles: *}}
//      */
//     static createTheme(themeFlag){
//         return themeFlag
//     }
// }
