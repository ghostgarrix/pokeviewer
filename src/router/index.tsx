import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AppStackParamList, AppStackRoutes } from "./routes";
import { registerRootComponent } from "expo";
import { HomePage } from "@src/pages/Home";
import { DetailsPage } from "@src/pages/Details";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createStackNavigator<AppStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={AppStackRoutes.Home}
          screenOptions={{
            cardStyle: { backgroundColor: "#fff" },
          }}
        >
          <Stack.Screen
            name={AppStackRoutes.Home}
            component={HomePage}
            options={{ title: "Pokemons" }}
          />
          <Stack.Screen
            name={AppStackRoutes.Details}
            component={DetailsPage}
            options={({ route }) => ({
              title:
                route.params.pokemon.name.charAt(0).toUpperCase() +
                route.params.pokemon.name.slice(1),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

registerRootComponent(App);
