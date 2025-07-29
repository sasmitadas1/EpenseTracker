import { Text } from "react-native";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../../store/Expenses-context";

function AllExpenses() {
  const expenseCtx=  useContext(ExpensesContext)
  return <ExpensesOutput expenses={expenseCtx.expenses} 
  expensesPeriod="Total"
  fallBackText="No Registered Data Found "/>
}
export default AllExpenses;
