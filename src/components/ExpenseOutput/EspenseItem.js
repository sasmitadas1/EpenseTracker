import { StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormatedDate } from "../../utility/date";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function EspenseItem({ id,description, amount, date }) {
  const navigation = useNavigation();

  function expensesPressHandler() {
    navigation.navigate("ManageExpenses",{
      expenseId:id
    });
  }

  return (
    <Pressable
      android_ripple={{ color: GlobalStyles.colors.primary100 }}
      onPress={expensesPressHandler}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.date}>{getFormatedDate(date)}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            <MaterialCommunityIcons
              name="currency-inr"
              size="14"
              color="black"
            />
            {amount.toFixed()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default EspenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.gray700,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
