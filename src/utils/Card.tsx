// IconCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ColorValue, ScrollView, Pressable } from 'react-native';
import { homeStyles } from '../styles/home';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/global';

const IconCard = ({ IconComponent, iconName, iconColor, cardTitle, cardDescription, backgroundColor, directPage }
    : { IconComponent: any, iconName: string, iconColor: string, cardTitle: string, cardDescription: string, backgroundColor: string, directPage: string }
) => {
    const navigation = useNavigation<any>();
    return (
        <Pressable
            onPress={() =>{navigation.navigate('TaskHome')}}
            // style={({ pressed }) => [homeStyles.card,
            // pressed && homeStyles.cardPressed,]}
            >
            <View style={homeStyles.card}>
                <View style={[styles().iconBig, { backgroundColor }]}>
                    <IconComponent name={iconName} color={iconColor} size={50} />
                </View>
                <ScrollView style={{ height: 120 }} contentContainerStyle={homeStyles.cardContent}>
                    <Text style={homeStyles.title}>{cardTitle}</Text>
                    <Text style={homeStyles.description}>{cardDescription}</Text>
                </ScrollView>
            </View>
        </Pressable>

    );
};


export default IconCard;
