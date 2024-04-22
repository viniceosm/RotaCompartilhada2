// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Rotas from './src/pages/Rotas';
import NovaRota from './src/pages/NovaRota';
import DetalheRota from './src/pages/DetalheRota';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Rotas'>
        <Stack.Screen
        name='Rotas'
        component={Rotas}>
        </Stack.Screen>
        <Stack.Screen
        name='Nova Rota'
        component={NovaRota}>
        </Stack.Screen>
        <Stack.Screen
        name='Detalhe Rota'
        component={DetalheRota}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}