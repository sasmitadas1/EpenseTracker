import { Text } from "react-native";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../../store/Expenses-context";
import { getDateMinusDate } from "../utility/date";
import { fetchExpenses } from "../utility/http";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

function RecentExpenses() {
  const [isloading, setIsLoading] = useState(false);

  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpense(expenses);
      } catch (error) {
        setError("could not fetch expenses!");
      }
      setIsLoading(false);
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
  if (error && !isloading) {
    return <Error message={error} />;
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
