import React from 'react';
import { createStackNavigator, creatStackNavigator } from '@react-navigation/stack';

import ProductContainer from '../Screens/Products/ProductContainer';

const Stack = createStackNavigator();

function MyStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='Home'
                component={ProductContainer}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />
}