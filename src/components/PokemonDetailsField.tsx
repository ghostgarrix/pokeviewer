import React from "react";
import { Linking, Text, TouchableOpacity } from "react-native";
import { FieldsStyles } from "./PokemonDetailsField.styles";
import * as Haptics from "expo-haptics";

type FieldsProps = {
  title: string;
  value: string;
  wiki?: boolean;
};

export const PokemonDetailsField = (
  props: FieldsProps
): React.ReactElement | null => {
  const { title, value, wiki } = props;
  const onPressWiki = (value: string): Promise<any> => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    return Linking.openURL(value);
  };

  return (
    <TouchableOpacity
      style={FieldsStyles.field}
      disabled={!wiki}
      onPress={(): Promise<any> => onPressWiki(value)}
    >
      <Text style={FieldsStyles.text}>
        <Text style={[FieldsStyles.text, { fontWeight: "bold" }]}>
          {`${title.charAt(0).toUpperCase() + title.slice(1)}: `}
        </Text>
        <Text style={wiki ? FieldsStyles.linkText : FieldsStyles.text}>
          {`${value}`}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};
