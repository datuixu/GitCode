/**
 * 更多菜单
 * @flow
 */
'use strict';
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Modal, 
    TouchableOpacity, 
    StyleSheet, 
    Image, 
    DeviceInfo, 
    View, 
    Text,
    Animated,
    Easing
} 
from 'react-native'

export default class MenuDialog extends Component {
    
    state = {
        visible: false,
        menu: new Animated.Value(0)
    };

    show() {
        this.setState({
            visible: true
        })
        this.startAnimated()
    }

    dismiss() {
        this.stopAnimated()
    }
     
    startAnimated() {  
        Animated.timing(this.state.menu, {  
            toValue: 1,  
            duration: 300,  
            easing: Easing.out(Easing.back())  
        }).start();  
    }  
  
    stopAnimated() {  
        Animated.timing(this.state.menu, {  
            toValue: 0,  
            duration: 300,  
            easing: Easing.inOut(Easing.quad)
        }).start(() => {  
            this.setState({
                visible: false
            })
        });  
    } 

    render() {
        const {onClose, menus, onSelect, theme} = this.props
        const mWidth = this.state.menu.interpolate({  
            inputRange: [0, 1],  
            outputRange: [0, 165]  
        })
        const mHeight = this.state.menu.interpolate({  
            inputRange: [0, 1],  
            outputRange: [0, 300]  
        }) 
        const mOpacity = this.state.menu.interpolate({  
            inputRange: [0, 1],  
            outputRange: [0, 1]  
        })
        return (<Modal
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => onClose()}
            // animationType={'fade'}
        >
            <TouchableOpacity
                style={styles.container}
                onPress={() => this.dismiss()}
            >
            <Animated.View style={[styles.arrow,  
                {opacity: mOpacity  
                }]}>  
            </Animated.View> 
            <Animated.View  
                style={[styles.menu,  
                    {  
                        width: mWidth,  
                        height: mHeight, 
                        opacity: mOpacity  
                    }]}  
            > 
                <View
                    style={styles.content}
                >
                    {menus.map((result, i, arr) => {
                        let menu = arr[i];
                        return <TouchableOpacity
                            key={i}
                            onPress={() => {
                                onSelect(arr[i])
                            }}
                            underlayColor={'transparent'}
                        >
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Image source={menu.icon}
                                       resizeMode={'stretch'}
                                       style={[styles.icon, theme.styles.tabBarSelectedIcon]}
                                />
                                <Text
                                    style={styles.text}
                                >{menu.name}</Text>
                                {
                                    i !== menus.length - 1 ? <View
                                        style={styles.line}
                                    /> : null
                                }
                            </View>
                        </TouchableOpacity>
                    })}
                </View>
                </Animated.View> 
              </TouchableOpacity>
          
        </Modal>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.08)',
        alignItems: 'flex-end'
    },
    arrow: {
        marginTop: 30 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
        marginRight: 16,
        width:0,  
        height:0,  
        borderWidth:10,  
        borderColor:'transparent',  
        borderBottomColor:'white'
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 3
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        paddingRight: 15
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray'
    },
    icon: {
        width: 16,
        height: 16,
        margin: 10,
        marginLeft: 15
    }
});

MenuDialog.propTypes = {
    menus: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    theme: PropTypes.object,
    onClose: PropTypes.func
};
MenuDialog.defaultProps = {
    menus: []
};
