import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomePage } from "../pages/Home";
import { DetailsPage } from "../pages/Details";
import { AppStackRoutes } from "./routes";
import { registerRootComponent } from 'expo';

const Stack = createStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          cardStyle: { backgroundColor: "#fff" },
        }}
      >
        <Stack.Screen name={AppStackRoutes.Home} component={HomePage} />
        <Stack.Screen
          name={AppStackRoutes.Details}
          component={DetailsPage}
          options={({ route }) => ({
            title:
              route.params !== undefined &&
              route.params.pokeName.charAt(0).toUpperCase() +
                route.params.pokeName.slice(1),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);