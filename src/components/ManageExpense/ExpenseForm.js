import { Alert, StyleSheet, View } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import { Text } from "react-native";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormatedDate } from "../../utility/date";

function ExpenseForm({ onCancel, submitButtonLabel, onSubmit, defaultValues }) {
  const [inputValue, setInputValue] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value:
        defaultValues && defaultValues.date
          ? getFormatedDate(defaultValues.date)
          : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
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
        return {
          ...currInputValue,
          [inputIdentifier]: { value: enteredValue, isValid: true },
        };
      });
    };
  }


  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount.value,
      date: new Date(inputValue.date.value),
      description: inputValue.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid input, Please check your input values ");

      setInputValue((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
   
    onSubmit(expenseData);
  }
  const formIsInvalid =
    !inputValue.amount.isValid ||
    !inputValue.date.isValid ||
    !inputValue.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValue.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            // onChangeText: InputChangeHandler.bind(this, "amount"),
            onChangeText: InputChangeHandler("amount"),
            value: inputValue.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputValue.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            keyboardType: "decimal-pad",
            maxLength: 10,
            // onChangeText: InputChangeHandler.bind(this, "date"),
            onChangeText: InputChangeHandler("date"),
            value: inputValue.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValue.description.isValid}
        textInputConfig={{
          multiline: true,
          //   onChangeText: InputChangeHandler.bind(this, "description"),
          onChangeText: InputChangeHandler("description"),
          value: inputValue.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
