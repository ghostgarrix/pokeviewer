import { StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";

export const FieldsStyles = StyleSheet.create({
  field: {
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: COLORS.fields
  },
  text: {
    fontSize: 17,
    paddingVertical: 15,
    paddingHorizontal: 10
},
linkText: {
    fontSize: 17,
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: COLORS.link
  }
});
