import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet 
} from 'react-native';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

var { width } = Dimensions.get('window');

const Item = (props) => {
    return(
        <View style={styles.item}>
            <Text>{props.item.name}</Text>
            <EasyButton
                danger
                medium
                // onPress to do
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
            </EasyButton>
        </View>
    )
}

const Categories = (props) => {

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        // get Authentication token
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));
        
        // get category list from server
        axios
        .get(`${baseURL}categories`)
        .then((res) => setCategories(res.data))
        .catch((error) => alert('Error loading categories'))

        return () => {
            setCategories();
            setToken();
        }
    }, [])

    return (
        <View style={{ position: 'relative', height: '100%' }}>
            <View style={{ marginBottom: 60 }}>
                <FlatList 
                    data={categories}
                    renderItem={({ item, index}) => (
                        <Item item={item} index={index} />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.bottomBar}>
                <View>
                    <Text>Add Category</Text>
                </View>
                <View style={{ width: width / 2.5 }}>
                    <TextInput 
                        value={categoryName}
                        style={styles.input}
                        onChangeText={(text) => setCategoryName(text)}
                    />
                </View>
                <View>
                    <EasyButton
                        medium
                        primary
                        // onPress to do
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
                    </EasyButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: 'white',
        width: width,
        height: 60,
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    input: {
        height: 40, 
        borderColor: 'gray',
        borderWidth: 1
    },
    item: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 5,
        margin: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5
    }
})

export default Categories;