/**
 * Created by wangjh on 2018/6/26.
 */

import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import {TrendingNavigator} from './AppNavigator'
import PopularPage from '../components/page/popular/PopularPage'
import HomePage from '../components/page/home/HomePage'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import {I18n} from '../language/i18n'
import Icon from '../components/common/Icon'

class BottomTabNavigator extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        console.log(this.props)
        const BottomTabNavigator = createMaterialBottomTabNavigator({
            HomePage: { 
                screen: HomePage,
                navigationOptions: {
                    tabBarLabel: I18n.t('home.tab_name'),
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon
                            name='home'
                            size={24}
                            style={{color: focused ? '#2196F3' : '#808394'}}
                        />
                    )
                }
            },
            TrendingNavigator: { 
                screen: TrendingNavigator,
                navigationOptions: {
                    tabBarLabel: I18n.t('trending.tab_name'),
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon
                            name='trending'
                            size={20}
                            style={{color: focused ? '#2196F3' : '#808394'}}
                        />
                    )
                }
            },
            PopularPage: { 
                screen: PopularPage,
                navigationOptions: {
                    tabBarLabel: I18n.t('popular.tab_name'),
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon
                            name='hot'
                            size={24}
                            style={{color: focused ? '#2196F3' : '#808394'}}
                        />
                    )
                }
            }
          }, {
            initialRouteName: 'HomePage',
            shifting:true,
            activeTintColor: '#2196F3',
            animationEnabled:true,
            backBehavior:'none',
            barStyle: { 
                backgroundColor: '#FFFFFF',
                borderTopWidth:0.5,
                borderTopColor:'#d6dadd',
            }
        });
        return <BottomTabNavigator />
    }
}

const mapStateToProps = state => ({
    theme: state.globalDataState.theme
})

export default connect(mapStateToProps)(BottomTabNavigator)