import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Share,
  TouchableOpacity,
} from "react-native";
import { AppStackParamList, AppStackRoutes } from "../router/routes";

import { DetailsStyles } from "./Details.styles";
import { PokeInfo } from "./types";
import { PokemonDetailsField as Fields } from "../components/PokemonDetailsField";
import { Entypo } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

type DetailsPageProps = {
  navigation: StackNavigationProp<AppStackParamList, AppStackRoutes.Details>;
  route: RouteProp<AppStackParamList, AppStackRoutes.Details>;
};

export const DetailsPage = (
  props: DetailsPageProps
): React.ReactElement | null => {
  const {
    route: {
      params: { pokeName },
    },
  } = props;

  const [pokeInfo, setPokeInfo] = useState<PokeInfo>();

  const fetchPokemonDetails = (): void => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .then((res) => res.json())
      .then((details) => setPokeInfo(details));
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  if (pokeInfo === undefined) return null;

  const link = `https://en.wikipedia.org/wiki/${pokeInfo.name}`;

  const share = async (link: string) => {
    try {
      const result = await Share.share({
        message: link,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={DetailsStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        style={DetailsStyles.image}
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokeInfo.name}.png`,
        }}
      />
      <TouchableOpacity
        onPress={(): Promise<any> => share(link)}
        style={DetailsStyles.shareIconContainer}
      >
        <Entypo
          name="share"
          size={DetailsStyles.icon.fontSize}
          color={DetailsStyles.icon.color}
        />
      </TouchableOpacity>
      <Fields title={"name"} value={pokeInfo.name} />
      <Fields title={"height"} value={pokeInfo.height} />
      <Fields title={"weight"} value={pokeInfo.weight} />
      <Fields title={"abilities"} value={pokeInfo.abilities[0].ability.name} />
      <Fields title={"types"} value={pokeInfo.types[0].type.name} />
      <Fields title={"wikipedia"} value={link} wiki={true} />
    </ScrollView>
  );
};
