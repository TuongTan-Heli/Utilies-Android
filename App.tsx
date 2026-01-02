import React, { useEffect } from 'react';
import { NavigationContainer, createNavigationContainerRef, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DeviceEventEmitter } from 'react-native';

import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import HomeScreen from './src/screens/Home';
import TaskHomeScreen from './src/screens/Task/Home';
import SpendingHomeScreen from './src/screens/Spending/Home';
import SpendingSearchScreen from './src/screens/Spending/Search';
import RemainingAndBudgetScreen from './src/screens/Budget/Home';
import RecipeHomeScreen from './src/screens/Recipe/Home';
import RecipeInfoScreen from './src/screens/Recipe/RecipeInfo';
import AccountScreen from './src/screens/Account';
import QuickAddScreen from './src/screens/QuickAdd';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (props: any) => {
  const isQuickAdd = props.entry === 'quick_add';
  const initialRouteName = isQuickAdd ? 'QuickAddScreen' : 'Login';
  const initialParams = isQuickAdd ? { type: props.type } : undefined;

  // Listen for widget events (warm start)
  useEffect(() => {
  const sub = DeviceEventEmitter.addListener('WIDGET_QUICK_ADD', ({ type }) => {
    if (!navigationRef.isReady()) return;

    const current = navigationRef.getCurrentRoute()?.name;

    if (current === 'QuickAddScreen') {
      // Replace current screen with new type
      navigationRef.dispatch(StackActions.replace('QuickAddScreen', { type }));
    } else {
      // Navigate to QuickAddScreen
      navigationRef.navigate('QuickAddScreen', { type });
    }
  });

  return () => sub.remove();
}, []);


  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="TaskHome" component={TaskHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SpendingHome" component={SpendingHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SpendingSearch" component={SpendingSearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RemainingAndBudget" component={RemainingAndBudgetScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeHome" component={RecipeHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeInfo" component={RecipeInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="QuickAddScreen" component={QuickAddScreen} options={{ headerShown: false }} initialParams={initialParams} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
