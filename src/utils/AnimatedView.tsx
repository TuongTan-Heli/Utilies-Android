import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';

interface AnimatedViewProps {
  visible: boolean;
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'fade-slide';
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  visible,
  children,
  animation = 'fade-slide',
  duration = 250,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        ...(animation !== 'fade'
          ? [
              Animated.timing(translateY, {
                toValue: 0,
                duration,
                useNativeDriver: true,
              }),
            ]
          : []),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
        ...(animation !== 'fade'
          ? [
              Animated.timing(translateY, {
                toValue: -10,
                duration,
                useNativeDriver: true,
              }),
            ]
          : []),
      ]).start();
    }
  }, [visible]);

  if (!visible && opacity.__getValue() === 0) {
    return null; // avoid rendering hidden component
  }

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: animation === 'fade' ? [] : [{ translateY }],
        },
      ]}>
      {children}
    </Animated.View>
  );
};
export default AnimatedView;