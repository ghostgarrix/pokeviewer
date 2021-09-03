import { StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";

const IMAGE_WIDTH = 200;
const IMAGE_HEIGHT = 200;

export const DetailsStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: COLORS.tertiary,
    borderRadius: IMAGE_WIDTH / 2,
    marginBottom: 20,
    backgroundColor: COLORS.fields,
  },
  shareIconContainer: {
    alignSelf: 'center'
  },
  icon: {
    color: COLORS.primary,
    fontSize: 32
  }
});
