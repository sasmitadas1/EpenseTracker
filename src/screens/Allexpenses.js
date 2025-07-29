import { Text } from "react-native";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../../store/Expenses-context";
import { fetchExpenses } from "../utility/http";
import Loader from "../components/UI/Loader";

function AllExpenses() {
  const [isloading, setIsLoading] = useState(false);

  const expenseCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expenseCtx.setExpense(expenses);
      } catch (error) {
        console.log("Fetching expenses failed:", error);
      }
      setIsLoading(false);
    }

    getExpenses();
  }, []);

  if (isloading) {
    return <Loader />;
  }
  return (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      expensesPeriod="Total"
      fallBackText="No Registered Data Found "
    />
  );
}
export default AllExpenses;
