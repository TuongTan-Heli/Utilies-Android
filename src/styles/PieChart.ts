import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  pieChartContainer: {
    gap: 8,
    flex: 1,
    marginBottom: 8,
  },
  pieChart: {
    height: 400,
  },
  summaryContainer: {
    flex: 1,
    alignSelf:'center',
    textAlign:'center',
    width:'100%',
    padding:8,
    minHeight: 200
  }, 
  summaryLabel: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#495057'
  },
  text: {
    fontSize: 18,
    color: '#495057'
  }
});