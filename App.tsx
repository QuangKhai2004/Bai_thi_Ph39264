import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import CartScreen from './CartScreen';
import UpdateScreen from './UpdateScreen';
import Add from './AddScreen';
import { Provider } from 'react-redux';
import store from './redux/store';
import AddScreen from './AddScreen';

const Stack = createStackNavigator();

const SplashScreen = () => {
  return (
    <View style={styles.container}>
            <Text style={{fontStyle:"italic",fontSize:30,color:"red"}}>Wellcome to My Restaurent</Text>

      <Text>Loading...</Text>
    </View>
  );
}

const TabNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {showSplash ? (
          <SplashScreen />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Update" component={UpdateScreen} />
            <Stack.Screen name="Add" component={Add} />


          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default TabNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
