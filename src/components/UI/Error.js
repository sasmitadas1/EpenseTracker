import { Text, StyleSheet, View } from "react-native";
import Button from "./Button";

function Error({ onConfirm, message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "black",
    fontSize: 24,
  },
});
