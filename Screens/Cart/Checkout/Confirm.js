import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {
    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body
} from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/cartActions';
import { useLinkProps } from '@react-navigation/native';

var { height } = Dimensions.get('window');

const Confirm = (props) => {

    const confirm = props.rout.params;
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 20 , fontWeight: 'bold' }}>Confirm Order</Text>
                {useLinkProps.route.params ? 
                <View style={{ borderWidth: 1, borderColor: 'orange' }}>
                    <Text style={styles.shipping}>Shipping to:</Text>
                    <View style={{ padding; 8 }}>
                        <Text>Address: {confirm.order.order.shippingAddress1}</Text>
                        <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
                        <Text>City: {confirm.order.order.city}</Text>
                        <Text>Zip Code: {confirm.order.order.zip}</Text>
                        <Text>Country: {confirm.order.order.country}</Text>
                    </View>
                </View>
                : null }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    shipping: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default Confirm;