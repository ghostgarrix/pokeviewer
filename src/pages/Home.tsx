import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  View,
  TextInput,
} from "react-native";
import { AppStackParamList, AppStackRoutes } from "../router/routes";

import { HomeStyles } from "./Home.styles";
import { Pokemon, Type, TypeFilter } from "./types";

type HomePageProps = {
  navigation: StackNavigationProp<AppStackParamList, AppStackRoutes.Home>;
  route: RouteProp<AppStackParamList, AppStackRoutes.Home>;
};

const FETCH_LIMIT = 1118;

export const HomePage = (props: HomePageProps): React.ReactElement | null => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchFeild, setSearchFeild] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string | null>(null);
  const [items, setItems] = useState<TypeFilter[]>([
    { value: "all", label: "All" },
  ]);

  const fetchAllPokemons = (): void => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${FETCH_LIMIT}`)
      .then((response) => response.json())
      .then((reponse) => setPokemons(reponse.results))
      .catch((error) => console.log(error));
  };

  const fetchPokemonsByType = (): void => {
    if (type === "all") {
      fetchAllPokemons();
    } else {
      fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then((response) => response.json())
        .then((response) => {
          setPokemons(
            response.pokemon.map((value: any) => {
              return {
                name: value.pokemon.name,
                url: value.pokemon.url,
              };
            })
          );
        })
        .catch((error) => console.log(error));
    }
  };

  const fetchTypes = (): void => {
    fetch(`https://pokeapi.co/api/v2/type`)
      .then((response) => response.json())
      .then((response): void => {
        const tmpTypes: TypeFilter[] = response.results.map((value: Type) => {
          return {
            value: value.name,
            label: value.name.charAt(0).toUpperCase() + value.name.slice(1),
          };
        });
        tmpTypes.unshift({
          value: "all",
          label: "All",
        });
        setItems(tmpTypes);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAllPokemons();
    fetchTypes();
  }, []);

  const redirectToDetails = (pokeName: string): void => {
    Haptics.selectionAsync();
    props.navigation.navigate(AppStackRoutes.Details, {
      pokeName,
    });
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchFeild.toLowerCase())
  );

  const renderPokemon = ({
    item,
    index,
  }: {
    item: Pokemon;
    index: number;
  }): React.ReactElement | null => (
    <TouchableOpacity
      style={HomeStyles.card}
      onPress={(): void => redirectToDetails(item.name)}
    >
      <ImageBackground
        source={require("../assets/pokeball.png")}
        style={HomeStyles.imageBackground}
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
    <View style={HomeStyles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={HomeStyles.searchfeild}
          placeholder="Search Pokemons"
          clearButtonMode="always"
          onChangeText={(value) => setSearchFeild(value)}
          value={searchFeild}
        />
        <DropDownPicker
          open={open}
          value={type}
          items={items}
          placeholder={"All"}
          placeholderStyle={HomeStyles.placeholder}
          setOpen={setOpen}
          setValue={setType}
          onChangeValue={fetchPokemonsByType}
          containerStyle={HomeStyles.dropDownPicker}
        />
      </View>
      <FlatList
        style={HomeStyles.list}
        data={filteredPokemons}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={renderPokemon}
      />
    </View>
  );
};
