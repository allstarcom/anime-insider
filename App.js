import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { store } from './src/redux/store';
import Apploader from './src/components/Apploader';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegistrationScreen';
import { AnimeScreen, Summary } from './src/Screens';
import AnimeDetail from './src/components/AnimeDetail/AnimeDetail';
import { logout } from './src/redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Alert } from 'react-native';
import WatchLaterScreen from './src/Screens/WatchLaterScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const renderLogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('user');
              dispatch(logout());
            } catch (error) {
              console.error('Error logging out:', error.message);
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <TouchableOpacity style={{ marginRight: 20 }} onPress={handleLogout}>
      <FontAwesome name="sign-out" size={24} color="#a0a0a0" />
    </TouchableOpacity>
  );
}



export default function App() {
  return (
    <Provider store={store}>
      <Apploader />
      <NavigationContainer>
        <NavigatorLogic />
      </NavigationContainer>
    </Provider>
  );
}

function NavigatorLogic() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="Anime"
          component={AnimeTabNavigator}
          options={{
            headerRight: () => renderLogoutButton()
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const AnimeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Browse Anime"
        component={AnimeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="angellist" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Watch Later"
        component={WatchLaterScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="tags" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

function AnimeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Anime"
        component={AnimeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Anime Detail"
        component={AnimeDetail}
      />
    </Stack.Navigator>
  );
}
