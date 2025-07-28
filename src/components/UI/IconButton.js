import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={(pressed) => pressed && StyleSheet.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}
export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 6,
    borderRadius:24,
    marginHorizontal:10,
    marginVertical:2

  },
  pressed: {
    opacity: 0.75,
  },
});
