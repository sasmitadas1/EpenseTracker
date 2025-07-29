import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    const amount = Number(expense.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>
        <MaterialCommunityIcons name="currency-inr" size="14" color="black" />
        {!isNaN(expensesSum) ? expensesSum.toFixed(2) : "0.00"}
      </Text>
    </View>
  );
}
export default ExpensesSummary;
const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.accent500,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 16,
    color: GlobalStyles.colors.gray700,
    fontWeight: "bold",
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.gray700,
    marginRight: 8,
  },
});
