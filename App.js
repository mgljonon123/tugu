import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen.js";
import FavoritesScreen from "./screens/FavoritesScreen";
import RemoveFavoriteScreen from "./screens/RemoveFavoriteScreen.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import CreateAccountScreen from "./screens/CreateAccountScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import AllDoctors from "./component/AllDoctors/allDoctors.js";
import BookingScreen from "./component/bookAppointment/BookingScreen.js";
import DoctorDetailsScreen from "./component/doctorDetails/screen.js";
import MainScreen from "./component/main/MainScreen.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerLeft: () =>
            // Display back button only if the screen is not the root screen
            navigation.canGoBack() ? (
              <Ionicons
                name="arrow-back"
                size={24}
                color="black"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
              />
            ) : null,
          headerShown: false, // Show header globally
        })}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="RemoveFavorite" component={RemoveFavoriteScreen} />
        <Stack.Screen name="AllDoctor" component={AllDoctors} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
        <Stack.Screen name="Home" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
