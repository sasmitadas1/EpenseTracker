import { Text } from "react-native";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../../store/Expenses-context";
import { getDateMinusDate } from "../utility/date";
import { fetchExpenses } from "../utility/http";
import Loader from "../components/UI/Loader";

function RecentExpenses() {
  const [isloading, setIsLoading] = useState(false);

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      const expenses = await fetchExpenses();
      setIsLoading(false);
      expensesCtx.setExpense(expenses);
    }
    getExpenses();
  }, []);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();

    const date7DayaAgo = getDateMinusDate(today, 7);
    return expense.date > date7DayaAgo;
  });
  if (isloading) {
    return <Loader />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText="No expenses registered for the last 7 days "
    />
  );
}
export default RecentExpenses;
