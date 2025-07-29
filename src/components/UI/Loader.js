import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Loader(){
    return(
        <View style={styles.container}>
          <ActivityIndicator size="large" color={GlobalStyles.colors.primary500}
           />
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent:'center'
  },
 
});
