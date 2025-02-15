import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";
import CongratulationsScreen from "./screen/CongratulationScreen";
import FillProfileScreen from "./screen/FIllProfileScreen";
import CreateAccountScreen from "./screen/CreateAccountScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="FillProfile" component={FillProfileScreen} />
        <Stack.Screen
          name="Congratulations"
          component={CongratulationsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
