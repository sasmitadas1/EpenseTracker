import { Alert, StyleSheet, View } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import { Text } from "react-native";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormatedDate } from "../../utility/date";

function ExpenseForm({ onCancel, submitButtonLabel, onSubmit, defaultValues }) {
  const [inputValue, setInputValue] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? getFormatedDate(defaultValues.date) : "",
    description: defaultValues ? defaultValues.description : "",
  });
  //   function InputChangeHandler(inputIdentifier, enteredValue) {
  //     setInputValue((currInputValue) => {
  //       return { ...currInputValue, [inputIdentifier]: enteredValue };
  //     });
  //   }

  function InputChangeHandler(inputIdentifier) {
    //this is Currying method
    return function (enteredValue) {
      setInputValue((currInputValue) => {
        return { ...currInputValue, [inputIdentifier]: enteredValue };
      });
    };
  }
  //   console.log("inputValue.....>>>", inputValue);

  function submitHandler() {
    const expesnseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };

    const amountIsValid = !isNaN(expesnseData.amount) && expesnseData.amount > 0;
    const dateIsValid = expesnseData.date.toString() !== "Invalid Data";
    const descriptionIsValid = expesnseData.description.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid input, Please check your input values ");
      return;
    }

    onSubmit(expesnseData);
  }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            // onChangeText: InputChangeHandler.bind(this, "amount"),
            onChangeText: InputChangeHandler("amount"),

            value: inputValue.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-DD-MM",
            keyboardType: "decimal-pad",
            maxLength: 10,
            // onChangeText: InputChangeHandler.bind(this, "date"),
            onChangeText: InputChangeHandler("date"),
            value: inputValue.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          //   onChangeText: InputChangeHandler.bind(this, "description"),
          onChangeText: InputChangeHandler("description"),
          value: inputValue.description,
        }}
      />

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 8,
    color: GlobalStyles.colors.primary500,
    paddingBottom: 10,
  },
  inputsRow: {
    flexDirection: "row",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
