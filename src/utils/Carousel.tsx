import React, { useRef } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { styles } from '../styles/Carousel';

const { width: screenWidth } = Dimensions.get('window');

type CarouselItem = {
  title: string;
  text?: string;
  element?: React.ReactNode;
};

type Props = {
  carouselItems: CarouselItem[];
};


const CarouselComponent: React.FC<Props> = ({ carouselItems }) => {

    const carouselRef = useRef(null);

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            {item.element || <Text>No element</Text>}
        </View>
    );


    return (
        <Carousel
            ref={carouselRef}
            data={carouselItems}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.8}
            layout="default"
        />
    );

};

export default CarouselComponent; 
