import React from 'react';
import { View, ActivityIndicator, Modal, StyleSheet } from 'react-native';

type LoadingBackgroundProps = {
  visible: boolean;
};

const LoadingBackground: React.FC<LoadingBackgroundProps> = ({ visible }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    padding: 20,
  },
});

export default LoadingBackground;
