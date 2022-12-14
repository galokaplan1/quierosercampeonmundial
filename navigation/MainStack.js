import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import LogIn from '../screens/LogIn'
import Home from '../screens/Home'
import Detalle from '../screens/Detalle'

const Stack = createNativeStackNavigator()

const MainStack = ()=>{
  
return(
<NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen
            name='Home'
            component={ Home }
            options={{
                headerShown:false
            }}
        />
        <Stack.Screen
            name='logIn'
            component={ LogIn }
            options={{
                headerShown:false
            }}
        />
        <Stack.Screen
            name='Detalle'
            component={ Detalle }
        />
    </Stack.Navigator>
</NavigationContainer>

)}

export default MainStack

const style = StyleSheet.create({
    buttonContainer:{
        backgroundColor: 'green',
        marginBottom: 10,
        paddingHorizontal:20,
        paddingHorizontal:10
    },
    buttonText:{
    color:'white'
    }
})