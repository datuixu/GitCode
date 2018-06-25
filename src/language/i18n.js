import I18n from 'react-native-i18n';
import en from './en';
import zh from './zh';

// I18n.locale = 'en'; // 默认显示的语言如果不写则默认显示手机的当前语言
I18n.fallbacks = true;
console.log(I18n.currentLocale())
I18n.translations = {
    zh,
    en
};

export {I18n};