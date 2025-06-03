import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Text as SvgText } from 'react-native-svg';
import { styles } from '../styles/PieChart';

const Labels = ({ slices }: { slices: any[] }) => {
  return slices.map((slice, index) => {
    const { pieCentroid, data } = slice;
    return (
      <G key={index}>
        <SvgText
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="black"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={12}
          stroke="black"
          strokeWidth={0.2}
        >
          {data.label}
        </SvgText>
      </G >

    );
  });
};

const PieChartComponent = ({ pieChartData, title, currency }: { pieChartData: any[], title: string, currency: string }) => {
  const total = pieChartData.reduce((sum, item) => sum + item.value, 0);

  return ( pieChartData.length !=0 && (
    <View style={styles.pieChartContainer}>
      <PieChart
        style={styles.pieChart}
        data={pieChartData}
        innerRadius={'70%'}
        outerRadius={'95%'}
        padAngle={0.02}
      >
        <Labels slices={pieChartData.map((d, i) => ({ pieCentroid: [0, 0], data: d }))} />
        <SvgText
          x="0%"
          y="0%"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={18}
          fill="black">{title}</SvgText>
      </PieChart>
      <ScrollView style={styles.summaryContainer}>
        <Text style={styles.summaryLabel}>Sumary</Text>
        {pieChartData.map(type => (
          <Text style={styles.text} key={type.label}>{type.label} : {type.value} {currency} ({Math.round((type.value / total) * 100)}%)</Text>
        ))}
        <Text style={styles.text}>
          Total: {total} {currency}
        </Text>
      </ScrollView>

    </View>
  ));
};
export default PieChartComponent; 