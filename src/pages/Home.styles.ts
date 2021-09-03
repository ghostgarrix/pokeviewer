import { COLORS } from "../utils//colors";
import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
  searchfeild: {
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    textAlign: 'center',
    marginHorizontal: 60,
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 50
  },
  image: {
    width: 150,
    height: 150
  },
  card: {
    flex: 1,
    margin: 5,
    paddingVertical: 5,
    alignItems: 'center',
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
    backgroundColor: COLORS.primary
  },
  text: {
    fontSize: 17,
    color: COLORS.secondary,
    fontWeight: 'normal',
    marginHorizontal: 10,
    marginVertical: 5
  }
});
