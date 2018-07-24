/**
 * 主题工厂 created by wangjiahuan 2018-7-24
 * @flow
 */
import React, {Component} from 'react'
import {
    StyleSheet,
} from 'react-native';
import {I18n} from '../../language/i18n'

export const ThemeFactory = {
    Original:{
        key:'Original',
        title:I18n.t('theme.original_title'),
        isLinearGradient:true,
        themeColor:['#4f8dfe', '#31b7fe', '#37bafe'],
        barStyle:{backgroundColor: "#FFFFFF", borderTopWidth: 0.5, borderTopColor: "#d6dadd"},
        textColor:'#FFFFFF',
        cellTitleColor:'#31b7fe',
        drawerBackgroundColor:'#FFFFFF',
        selectedTitleColor:'#31b7fe',
        selectedIconColor:'#31b7fe',
        iconColor:'#FFFFFF'
    },
    Golden:{
        key:'Golden',
        title:I18n.t('theme.golden_title'),
        isLinearGradient:false,
        themeColor:'#212123',
        barStyle:{backgroundColor: "#FFFFFF", borderTopWidth: 0.5, borderTopColor: "#d6dadd"},
        textColor:'#dcb86c',
        cellTitleColor:'#dcb86c',
        drawerBackgroundColor:'#171717',
        selectedTitleColor:'#dcb86c',
        selectedIconColor:'#dcb86c',
        iconColor:'#dcb86c'
    },
    Yellow:{
        key:'Yellow',
        title:I18n.t('theme.yellow_title'),
        isLinearGradient:false,
        themeColor:'#feba33',
        barStyle:{backgroundColor: "#FFFFFF", borderTopWidth: 0.5, borderTopColor: "#d6dadd"},
        textColor:'#FFFFFF',
        cellTitleColor:'#feba33',
        drawerBackgroundColor:'#4c4c4c',
        selectedTitleColor:'#feba33',
        selectedIconColor:'#feba33',
        iconColor:'#FFFFFF'
    },
    White:{
        key:'White',
        title:I18n.t('theme.white_title'),
        isLinearGradient:false,
        themeColor:'#FFFFFF',
        barStyle:{backgroundColor: "#FFFFFF", borderTopWidth: 0.5, borderTopColor: "#d6dadd"},
        textColor:'#4f8dfe',
        cellTitleColor:'#4f8dfe',
        drawerBackgroundColor:['#4f8dfe', '#31b7fe', '#37bafe'],
        selectedTitleColor:'#12b8f4',
        selectedIconColor:'#12b8f4',
        iconColor:'#12b8f4'
    },
    Pink:{
        key:'Pink',
        title:I18n.t('theme.pink_title'),
        isLinearGradient:false,
        themeColor:'#fb6b8f',
        barStyle:{backgroundColor: "#FFFFFF", borderTopWidth: 0.5, borderTopColor: "#d6dadd"},
        textColor:'#FFFFFF',
        cellTitleColor:'#fb6b8f',
        drawerBackgroundColor:'#f0587e',
        selectedTitleColor:'#fb6b8f',
        selectedIconColor:'#fb6b8f',
        iconColor:'#FFFFFF'
    },
    Brown:{
        key:'Brown',
        title:I18n.t('theme.brown_title'),
        isLinearGradient:false,
        themeColor:'#6e564a',
        barStyle:{backgroundColor: "#FFFFFF", borderTopWidth: 0.5, borderTopColor: "#d6dadd"},
        textColor:'#FFFFFF',
        cellTitleColor:'#6e564a',
        drawerBackgroundColor:'#513d34',
        selectedTitleColor:'#6e564a',
        selectedIconColor:'#6e564a',
        iconColor:'#FFFFFF'
    },
    Black:{
        key:'Black',
        title:I18n.t('theme.black_title'),
        isLinearGradient:false,
        themeColor:'#212123',
        barStyle:{backgroundColor: "#FFFFFF", borderTopWidth: 0.5, borderTopColor: "#d6dadd"},
        textColor:'#FFFFFF',
        cellTitleColor:'#212123',
        drawerBackgroundColor:'#171717',
        selectedTitleColor:'#dcb86c',
        selectedIconColor:'#dcb86c',
        iconColor:'#dcb86c'
    },
    StarryNight:{
        key:'StarryNight',
        title:I18n.t('theme.starryNight_title'),
        isLinearGradient:false,
        themeColor:'#212123',
        barStyle:{backgroundColor: "#FFFFFF", borderTopWidth: 0.5, borderTopColor: "#d6dadd"},
        textColor:'#FFFFFF',
        cellTitleColor:'#212123',
        drawerBackgroundColor:'#171717',
        selectedTitleColor:'#dcb86c',
        selectedIconColor:'#dcb86c',
        iconColor:'#dcb86c'
    }
}
