/**
 * 全局样式
 * @flow
 */
import {
    Dimensions
}from 'react-native'
const {height, width} = Dimensions.get('window');
module.exports ={
    line: {
        height: 0.4,
        opacity:0.5,
        backgroundColor: 'darkgray',
    },
    root_container:{
        flex: 1,
        backgroundColor: '#f3f3f4',
    },
    backgroundColor: '#f3f3f4',
    nav_bar_height_ios:44,
    nav_bar_height_android:50,
    window_height:height,
    cell_container:{
        flexDirection:'row',
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderWidth:0.5,
        borderRadius:2,
        borderColor:'#dddddd',
        shadowColor:'gray', // ios
        shadowOffset:{width:0.5,hight:0.5},// ios
        shadowOpacity:0.4,// ios
        shadowRadius:1,// ios
        elevation:2 // android
    },
    cell_select_lan:{
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderWidth:0.5,
        borderRadius:2,
        borderColor:'#dddddd',
        shadowColor:'gray', // ios
        shadowOffset:{width:0.5,hight:0.5},// ios
        shadowOpacity:0.4,// ios
        shadowRadius:1,// ios
        elevation:2, // android
    },
    cell_custom_theme:{
        height: 150,
        margin:3,
        borderRadius:2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical:3,
        borderWidth:0.5,
        borderRadius:2,
        borderColor:'#dddddd',
        shadowColor:'gray', // ios
        shadowOffset:{width:0.5,hight:0.5},// ios
        shadowOpacity:0.4,// ios
        shadowRadius:1,// ios
        elevation:2, // android
    },
    cell_setting:{
        height: 40,
        margin:3,
        borderRadius:2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical:3,
        borderWidth:0.5,
        borderRadius:2,
        borderColor:'#dddddd',
        shadowColor:'gray', // ios
        shadowOffset:{width:0.5,hight:0.5},// ios
        shadowOpacity:0.4,// ios
        shadowRadius:1,// ios
        elevation:2, // android
    }
};