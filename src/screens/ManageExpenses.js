import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../../store/Expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpenses, storeExpenses, updateExpenses } from "../utility/http";
import Loader from "../components/UI/Loader";

function ManageExpenses({ route, navigation }) {
  const [isloading, setIsLoading] = useState(false);

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

  async function deleteExpenseHandler() {
    setIsLoading(true);

    try {
      await deleteExpenses(editExpenseId);
      expenseCtx.deleteExpense(editExpenseId);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Network Error", "Failed to delete the expense.");
    }
  }

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editExpenseId
  );

  async function confirmHandler(expesnseData) {
    setIsLoading(true);
    if (isEditing) {
      expenseCtx.updateExpense(editExpenseId, expesnseData);
      await updateExpenses(editExpenseId, expesnseData);
    } else {
      try {
        const id = await storeExpenses(expesnseData);
        expenseCtx.addExpense({ ...expesnseData, id });
      } catch (error) {
        Alert.alert("Network Error", "Failed to store the expense.");
        return;
      }
    }
    navigation.goBack();
  }
  if (isloading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
