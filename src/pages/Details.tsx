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
import { fetchPokemonDetails, getLink } from "@src/utils/api";

type DetailsPageProps = {
  navigation: StackNavigationProp<AppStackParamList, AppStackRoutes.Details>;
  route: RouteProp<AppStackParamList, AppStackRoutes.Details>;
};

export const DetailsPage = (
  props: DetailsPageProps
): React.ReactElement | null => {
  const {
    route: {
      params: { pokemon },
    },
  } = props;

  const [pokeInfo, setPokeInfo] = useState<PokeInfo>();

  useEffect(() => {
    fetchPokemonDetails(pokemon.name).then((response) => setPokeInfo(response));
  }, []);

  const getPokemonId = (): number => {
    let tmpName = pokemon.url;
    tmpName = tmpName.slice(0, -1);
    let id: number = parseInt(
      tmpName.substring(tmpName.lastIndexOf("/") + 1, tmpName.length),
      10
    );
    return id;
  };

  if (pokeInfo === undefined) return null;

  const link = getLink(pokeInfo.name);

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
  const id = getPokemonId();

  return (
    <ScrollView
      contentContainerStyle={DetailsStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        style={DetailsStyles.image}
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
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
      <Fields title={"name"} values={[pokeInfo.name]} />
      <Fields title={"height"} values={[pokeInfo.height]} />
      <Fields title={"weight"} values={[pokeInfo.weight]} />
      <Fields
        title={"abilities"}
        values={pokeInfo.abilities.map((abilities) => abilities.ability.name)}
      />
      <Fields
        title={"types"}
        values={pokeInfo.types.map((types) => types.type.name)}
      />
      <Fields title={"wikipedia"} values={[link]} wiki={true} />
    </ScrollView>
  );
};
