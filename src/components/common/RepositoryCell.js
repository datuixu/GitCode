
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import GlobalStyles from '../../res/styles/GlobalStyles'
export default class RepositoryCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {data,theme} = this.props
        const img = data.owner.avatar_url ? <Image 
                        style={{height:50,width:50,borderRadius:50}}
                        source={{uri:data.owner.avatar_url}}
                    /> :
                    <Image 
                        style={{height:50,width:50,borderRadius:50}}
                        source={require('../../res/images/lazy.png')}
                    />
        const description='<p>'+data.description+'</p>';
        return (
             <TouchableOpacity
                onPress={this.props.onSelect}
                activeOpacity={1}
             >
                <View style={GlobalStyles.cell_container}>
                    <View style={{width:50,marginRight:10}}>
                      {img}
                    </View>
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.title,{color:theme.cellTitleColor}]}>{data.full_name}</Text>
                        </View>
                        <HTMLView
                            value={description}
                            onLinkPress={(url) => {
                            }}
                            stylesheet={{
                                p:styles.description,
                                a:styles.description
                            }}
                        />
                        <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                            <Text style={{fontSize:12}}>{data.watchers_count}</Text>
                            <Text style={{fontSize:12}}>{data.stargazers_count}</Text>
                            <Text style={{fontSize:12}}>{data.forks_count}</Text>
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
        marginBottom: 5
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
        color: '#212121'
    }
})
