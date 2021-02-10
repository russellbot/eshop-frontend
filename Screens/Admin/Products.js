import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button
} from "react-native";
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-community/async-storage';

var { height, width } = Dimensions.get('window');

const Products = (props) => {

    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(
            () => {
                // get token from local storage
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => console.log(error))

                // get products from server
                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProductList(res.data);
                        setProductFilter(res.data);
                        setLoading(false);
                    })
                
                // cleanup
                return () => {
                    setProductList();
                    setProductFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )

  return (
      <View>
          <View>
              <Header searchBar rounded>
                <Item style={{ padding: 5 }}>
                    <Icon name="search" />
                    <Input 
                        placeholder="Search"
                        // onChange to do
                    />
                </Item>
              </Header>
          </View>

        {loading ? (
            <View>
                <ActivityIndicator size="large" color="blue" />
            </View>
        ) : (
            <FlatList 
                data={productFilter}
                renderItem={({ item, index }) => (
                    <Text>{item.name}</Text>
                )}
                keyExtractor={(item) => item.id}
            />
        )}
      </View>
    
  );
};

export default Products;
