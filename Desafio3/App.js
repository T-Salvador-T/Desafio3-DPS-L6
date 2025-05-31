import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AgregarScreen from './screens/AgregarScreen';
import EditarScreen from './screens/EditarScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1f1f1f',
          },
          headerTitleStyle: {
            color: '#fff',
            fontWeight: 'bold',
          },
          headerTintColor: '#9c27b0', 
          contentStyle: {
            backgroundColor: '#121212', 
          },
        }}
      >
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Agregar" component={AgregarScreen} />
        <Stack.Screen name="Editar" component={EditarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
