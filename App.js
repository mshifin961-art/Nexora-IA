import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import CreateBillScreen from "./screens/CreateBillScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0F172A",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: "#0F172A",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "BillNova AI",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CreateBill"
          component={CreateBillScreen}
          options={{
            title: "Create Bill",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
