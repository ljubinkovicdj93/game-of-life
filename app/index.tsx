import { Text, View, StyleSheet } from "react-native";
import Grid from './grid';

export default function Index() {
  return (
    <View style={styles.container}>
      <Grid />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: `#fff`
  }
});
