
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'

export default class RepositoryCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={styles.container}>
                <View style={styles.cell_container}>
                    <Image 
                        style={{height:50,width:50,borderRadius:50}}
                        source={{uri:this.props.data.owner.avatar_url}}
                    />
                    <View style={{margin:5}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.title}>{this.props.data.full_name}</Text>
                            <Text>{this.props.data.language}</Text>
                        </View>
                        
                        <Text style={styles.description}>{this.props.data.description}</Text>

                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text>{this.props.data.watchers_count}</Text>
                            <Text>{this.props.data.stargazers_count}</Text>
                            <Text>{this.props.data.forks_count}</Text>
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
        flex: 1
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    cell_container: {
        margin:10,
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
    }
})
