import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import {GetPlatos} from '../services/axios';
import { useContextState } from '../Context';

const Item = ({ title, image, navigation, id}) => (
  <TouchableOpacity
    onPress={ () =>{ navigation.navigate('Detalle',{id})}}
  >
   
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={image}></Image>
    </View>

  </TouchableOpacity>
);

const Home=({navigation})=>{
  const [platos, setPlatos] = useState([]); 
  const {contextState, setContextState} = useContextState();

  useEffect(() => {
    if(!contextState.token){ 
      console.log('No hay token');
      navigation.navigate("logIn")  
    }
    else{
      console.log("HAY TOKEN")
    }
  })
  
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscador</Text>

        <TextInput   
          style={styles.input}
          placeholder="Buscar"
          onChangeText={text => {
            if(text.length > 2){
                GetPlatos(text).then((data) => {  
                setPlatos(data) 
            })
            .catch(() => {
              console.log("error")   
          });
            }
          }}
      />      
      <TouchableOpacity>
      <FlatList
        data={platos}
        renderItem={({ item }) => <Item navigation={navigation} title={item.title} image={item.image} id={item.id} />} 
        keyExtractor={item => item.id}
        
      />
      </TouchableOpacity>  
      <Text style={styles.titulo}>MENU</Text>
      <Text>PRECIO: ${contextState.platos.length===0? 0 :contextState.preciototal}</Text>
      <Text>PROMEDIO HEALTHSCORE: { contextState.platos.length>0?  contextState.healthScore/contextState.platos.length :0}  </Text>
      <TouchableOpacity>
      <FlatList
        data={contextState.platos}
        renderItem={({ item }) => <Item navigation={navigation} title={item.title} image={item.image} id={item.id} />} 
        keyExtractor={item => item.id}
        
      />
      </TouchableOpacity>  
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
    container:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'white',
    },
    titulo: {
      fontSize: 45,
      marginRight: 'auto',
      marginLeft: 'auto',
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
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 12,
      justifyContent:'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 15,
    },
    image: {
      width: 70,
      height:70,
    },
  });