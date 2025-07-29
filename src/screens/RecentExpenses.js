import { Text } from "react-native";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput"
import { useContext } from "react";
import { ExpensesContext } from "../../store/Expenses-context";
import { getDateMinusDate } from "../utility/date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();

    const date7DayaAgo = getDateMinusDate(today, 7);
    return expense.date > date7DayaAgo;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText="No expenses registered for the last 7 days "
    />
  );
}
export default RecentExpenses;
