import { Text } from "react-native";
import { FlatList, View } from "react-native";
import EspenseItem from "./EspenseItem";

function renderExpenseItem(itemData) {
  return <EspenseItem {...itemData.item} />;
}
function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}
export default ExpensesList;
