import React from 'react';
import { View, Dimensions, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {
    Container,
    Text,
    Left,
    Right,
    H1,
    ListItem,
    Thumbnail,
    Body
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
// connect to Redux
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

var { height, width } = Dimensions.get('window');

const Cart = (props) => {
    return (
        <>
            {props.cartItems.length ? (
                <Container>
                    <H1 style={{ alignSelf: 'center' }}>Cart</H1>
                    {props.cartItems.map(data => {
                        return(
                            <ListItem
                                style={styles.listItem}
                                key={Math.random()}
                                avatar
                            >
                                <Left>
                                    <Thumbnail 
                                        source={{uri: data.product.image ? data.product.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}/> 
                                </Left>
                                <Body style={styles.body}>
                                    <Left>
                                        <Text>{data.product.name}</Text>
                                    </Left>
                                    <Right>
                                        <Text>$ {data.product.price}</Text>
                                    </Right>
                                </Body>
                            </ListItem>
                        )
                    })}
                </Container>
            ) : (
                <Container style={styles.emptyContainer}>
                    <Text>Looks like your cart is empty!</Text>
                    <Text>Add products to your cart to get started.</Text>
                </Container>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default connect(mapStateToProps, null)(Cart);