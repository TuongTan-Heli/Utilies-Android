import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import HomeScreen from './src/screens/Home';
import TaskHomeScreen from './src/screens/Task/Home';
import SpendingHomeScreen from './src/screens/Spending/Home';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="TaskHome" component={TaskHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SpendingHome" component={SpendingHomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
