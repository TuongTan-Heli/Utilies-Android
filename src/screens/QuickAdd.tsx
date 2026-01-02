import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const QuickAddScreen = ({ route }: any) => {
  const { type } = route.params || {};

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text h1>Quick Add Screen</Text>
      <Text h2>{type || 'No type'}</Text>
    </View>
  );
};

export default QuickAddScreen;
