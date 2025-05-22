// IconCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ColorValue, ScrollView, Pressable } from 'react-native';
import { homeStyles } from '../styles/home';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/global';

const IconCard = ({ IconComponent, iconName, iconColor, cardTitle, cardDescription, backgroundColor, directPage }
    : { IconComponent: any, iconName: string, iconColor: string, cardTitle: string, cardDescription?: string, backgroundColor: string, directPage: string }
) => {
    const navigation = useNavigation<any>();
    return (
        <Pressable onPress={() => navigation.navigate(directPage)}>
            <View style={homeStyles.card}>
                <View style={[styles().iconBig, { backgroundColor }]} >
                    <IconComponent name={iconName} color={iconColor} size={50} />
                </View>
                <View style={homeStyles.cardContent} >
                    <Text style={homeStyles.title}>{cardTitle}</Text>
                    {cardDescription &&
                        <Text style={homeStyles.description}>{cardDescription}</Text>
                    }
                </View>
            </View>
        </Pressable>
    );
};


export default IconCard;
