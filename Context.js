import React, { useContext } from "react";

export const initialState = {
    token: false,   
    platos:[],
    preciototal: 0,
    healthScore: 0,
    };
/*
 for (let i = 0; i < contextState.platos.length; i++) { 
      precio += contextState.platos[i].pricePerServing
      sumaHealth += contextState.platos[i].healthScore
  }
  if(sumaHealth > 0){
    healthscore = sumaHealth / contextState.platos.length 
  }
*/
export const ActionTypes = {
    SetToken: 'SET_TOKEN',                         
    SetPlatos: 'SET_PLATOS',
    SetEliminarId: 'SET_ELIMINAR_ID'
    
};

export const reducer = (state = {}, action) => {
    switch (action.type) {
      case ActionTypes.SetToken:
        return ({
            ...state,
            token: action.value,                
        });
    case ActionTypes.SetPlatos:
        console.log(state.preciototal);
        /*
         let precio = 0;
        let healthscore= 0;
        for (let i = 0; i < state.platos.length; i++) { 
            precio += state.platos[i].pricePerServing
            sumaHealth += state.platos[i].healthScore
        }
        precio += action.value.pricePerServing
        sumaHealth += action.value.healthScore
        if(sumaHealth > 0){
          healthscore = sumaHealth / state.platos.length;
        }*/
        return ({
            ...state,
            platos: [...state.platos, action.value],
            preciototal: state.preciototal + action.value.pricePerServing ,
            healthScore: state.healthScore + action.value.healthScore ,
        });
    case ActionTypes.SetEliminarId:
        console.log(action.value.pricePerServing);
        return ({
            ...state,
            platos: state.platos.filter((item) => item.id !== action.value.id), 
            preciototal: state.preciototal - action.value.pricePerServing ,
            healthScore: state.healthScore - action.value.healthScore , 
        });
default:
    return state;
    
}
};

export const initialContext = {
    contextState: initialState,
    setContextState: () => {},
};

const Cont = React.createContext(initialContext);


export function ContextProvider({children, initial = initialState}) {
    const [state, dispatch] = React.useReducer(reducer, initial);


const contextState = state;
const setContextState = dispatch;

return <Cont.Provider value={{contextState, setContextState }}>{children}</Cont.Provider>   

}

export const useContextState = () => useContext(Cont);