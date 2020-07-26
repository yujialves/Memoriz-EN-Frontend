import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import Chart from "react-apexcharts";
import options from "../../options/chartOption";

const DetailScreen: React.FC = () => {
  const series = [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];
  return (
    <View style={styles.screen}>
      <View style={styles.chartContainer}>
        <Chart
          options={options}
          series={series}
          type="bar"
          width="100%"
          height={Dimensions.get("window").width}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  chartContainer: {
    paddingRight: 20,
  },
});

export default DetailScreen;
