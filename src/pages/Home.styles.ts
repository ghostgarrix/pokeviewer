import { COLORS } from "@src/utils/colors";
import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  searchfeild: {
    flex: 2,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    borderRadius: 8,
    textAlign: "center",
    marginRight: 10,
  },
  dropDownPicker: {
    flex: 1,
  },
  list: {
    paddingTop: 10,
    zIndex: -5,
  },
  imageBackground: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 180,
    height: 180
  },
  card: {
    flex: 1,
    margin: 5,
    paddingVertical: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  textContainer: {
    borderRadius: 15,
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 17,
    color: COLORS.secondary,
    fontWeight: "normal",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  placeholder: {
    color: "#C7C7CD",
  },
});
