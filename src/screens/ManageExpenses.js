import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../../store/Expenses-context";

function ManageExpenses({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);

  const editExpenseId = route?.params?.expenseId;
  const isEditing = !!editExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expenses" : " Add Expenses",
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editExpenseId);
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expenseCtx.updateExpense(editExpenseId, {
        description: "Update Test",
        amount: 500,
        date: new Date("18-07-2025"),
      });
    } else {
      expenseCtx.addExpense({
        description: "Test",
        amount: 300,
        date: new Date("20-07-2025"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}
export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
