import React from 'react';
import MainStack from './navigation/MainStack';
import { ContextProvider } from './Context';

export default function App() {
  
  return ( 
         <ContextProvider>
          <MainStack/>
         </ContextProvider>  
  );

}