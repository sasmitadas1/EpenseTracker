import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, invalid, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig?.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={[style, styles.inputContainer]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
}
export default Input;
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.gray500,
    marginBottom: 4,
  },
  input: {
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    backgroundColor: GlobalStyles.colors.primary50,
    borderColor: GlobalStyles.colors.primary200,
    borderWidth: 1,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
