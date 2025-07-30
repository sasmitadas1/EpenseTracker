import { Text } from "react-native";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../../store/Expenses-context";
import { fetchExpenses } from "../utility/http";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

function AllExpenses() {
  const [isloading, setIsLoading] = useState(false);

  const [error, setError] = useState();

  const expenseCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expenseCtx.setExpense(expenses);
      } catch (error) {
        setError( "could not fetch expenses!");
      }
      setIsLoading(false);
    }

    getExpenses();
  }, []);

  if (isloading) {
    return <Loader />;
  }
  if (error && !isloading) {
    return <Error message={error} />;
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
