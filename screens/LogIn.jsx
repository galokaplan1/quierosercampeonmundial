import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button} from 'react-native';
import {useContextState, ActionTypes } from '../Context'
import {enterLogin} from '../services/axios';
 
const LogIn = ({navigation}) => {
  const { contextState, setContextState } = useContextState();
  const [userState, setUserState] = useState({  
    email: '',
    password: '',
  });
  const [error, setError] = useState("")
  
  const onLogInPress = async () => {
    
    if (!userState.email|| !userState.password){  
      console.log("Por favor ingresar todos los datos")
      Alert.alert("Datos incorrectos")
      setError("datos incorrectos")
    } else {
      console.log("datos completos, entra a loguearse")
      enterLogin(userState).then((token)=>{     
        setContextState({
          type: ActionTypes.SetToken,
          value: token
        })                                      
        console.log("entro")
        navigation.navigate("Home")             
      })
      .catch(() => {
        console.log("Error contraseña o email") 
        Alert.alert("Datos incorrectos")
        setError("datos incorrectos")
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inicio de sesión</Text> 
      <TextInput
        style={styles.input}
        placeholder="Email"                                                  
        value={userState.email}                                          
        onChangeText={text => setUserState({...userState, email: text}) } 
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={userState.password}
        secureTextEntry={true}
        onChangeText={text => setUserState({...userState, password: text})}
      />   
      <Button
        title="Iniciar sesion"
        onPress={onLogInPress}
      ></Button>
    <Text style={styles.colortext}>{error}</Text>
    </View>  
  );
}

export default LogIn;

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex:1,
      backgroundColor:'white',
  },
  input:{
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  colortext:{
    color:'red',
  }
});