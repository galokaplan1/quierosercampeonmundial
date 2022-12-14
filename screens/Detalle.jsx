import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { getPlatoByID } from '../services/axios';
import {useContextState, ActionTypes } from '../Context'


const DetallePlato = ({ route, navigation }) => {
  const { id } = route.params;           
  const [plato, setPlato] = useState([]); 
  const {contextState, setContextState} = useContextState() 

  useEffect(() => {
    if(!contextState.token){
      navigation.navigate("logIn") 
    }
    getPlatoByID(id).then((data) => {   
      setPlato(data) 
      console.log(data)
    })
      .catch(() => {
        console.log("ingreso malo de datos")
      })
  }, [])

  let existePlato = contextState.platos.find(item => item.id === plato.id)   

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plato.title}</Text>
      <Image style={styles.image} source={ plato.image }></Image>         
      <Text>Health Score: {plato.healthScore}</Text>
      <Text>${plato.pricePerServing}</Text>
      {
        plato.vegan ? 
            <Text>Vegano: Sí</Text>
        :
            <Text>Vegano: No</Text>
      }
      { plato.vegetarian ?
          <Text>Vegetariano: Sí</Text>
      :
          <Text>Vegetariano: No</Text>
      }
      {
        existePlato
          ?
          <>
            <Button style={{ fontSize: 38 }}
              title="ELIMINAR"
              onPress={async () => {
                console.log("Eliminando del menu")
                setContextState({
                  type: ActionTypes.SetEliminarId,         
                  value: plato,                                    
                });
                navigation.navigate('Home')
              }}
            />
          </>
          :
          <>
            <Button
              title="AGREGAR"
              onPress={async () => {
                let cuentaVegano = 0;
                let cuentaNoVegano = 0;

                for (let i = 0; i < contextState.platos.length; i++) {
                  if(contextState.platos[i].vegan){
                    cuentaVegano++;
                  }else{
                    cuentaNoVegano++;
                  }
                }
                if(cuentaVegano==2 && cuentaNoVegano==2){
                  console.log("No se pueden agregar más platos")
                }
                else{
                  if(plato.vegan){
                    if(cuentaVegano==2){
                      console.log("No se pueden agregar más platos veganos")
                    }
                    else{
                      console.log("Agregando al menu")
                      setContextState({
                        type: ActionTypes.SetPlatos,        
                        value: plato,                                   
                      });
                      navigation.navigate('Home')
                    }
                  }
                  else{
                    if(cuentaNoVegano==2){
                      console.log("No se pueden agregar más platos no veganos")
                    }else{
                      console.log("Agregando al menu")
                      setContextState({
                        type: ActionTypes.SetPlatos,         
                        value: plato,                                    
                      });
                      navigation.navigate('Home')
                    }
                  }
                }
              }}
            />
          </>
      }
    </View>

  );
}
export default DetallePlato

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  image: {
    width: 300,
    height: 300,
  },
  title:{
    fontSize: 45,
    marginRight: 'auto',
    marginLeft: 'auto',
  }
});