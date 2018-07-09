
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'
import GlobalStyles from '../../res/styles/GlobalStyles'
export default class TrendingCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const img = this.props.data.owner.avatar_url ? <Image 
                        style={{height:50,width:50,borderRadius:50}}
                        source={{uri:this.props.data.owner.avatar_url}}
                    /> :
                    <Image 
                        style={{height:50,width:50,borderRadius:50}}
                        source={require('../../res/images/lazy.png')}
                    />
        return (
             <TouchableOpacity
                onPress={this.props.onSelect}
             >
                <View style={GlobalStyles.cell_container}>
                    <View style={{width:50,marginRight:10}}>
                      {img}
                    </View>
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.title}>{this.props.data.fullName}</Text>
                        </View>
                        <View>
                          <Text style={styles.description}>{this.props.data.description}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                            <Text >{this.props.data.watchers_count}</Text>
                            <Text >{this.props.data.stargazers_count}</Text>
                            <Text >{this.props.data.forks_count}</Text>
                        </View>
                    </View>
                </View>
             </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    }
})
