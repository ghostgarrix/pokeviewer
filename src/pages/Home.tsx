import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  View,
} from "react-native";
import { AppStackParamList, AppStackRoutes } from "../router/routes";
import * as Haptics from 'expo-haptics';

import { HomeStyles } from "./Home.styles";
import { Pokemon } from "./types";

type HomePageProps = {
  navigation: StackNavigationProp<AppStackParamList, AppStackRoutes.Home>;
  route: RouteProp<AppStackParamList, AppStackRoutes.Home>;
};

export const HomePage = (props: HomePageProps): React.ReactElement | null => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const fetchPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => response.json())
      .then((pokemons) => setPokemons(pokemons.results));
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const redirectToDetails = (pokeName: string): void => {
    Haptics.selectionAsync();
    props.navigation.navigate(AppStackRoutes.Details, {
      pokeName,
    });
  };

  const renderPokemon = ({
    item,
  }: {
    item: Pokemon;
  }): React.ReactElement | null => (
    <TouchableOpacity
      style={HomeStyles.card}
      onPress={(): void => redirectToDetails(item.name)}
    >
      <ImageBackground
        source={require("../assets/pokeball.png")}
        style={HomeStyles.image}
        resizeMode="contain"
      >
        <Image
          style={HomeStyles.image}
          source={{
            uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item.name}.png`,
          }}
        />
      </ImageBackground>
      <View style={HomeStyles.textContainer}>
        <Text style={HomeStyles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={{ paddingTop: 10 }}
      data={pokemons}
      numColumns={2}
      renderItem={renderPokemon}
    />
  );
};
