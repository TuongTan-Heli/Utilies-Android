import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { styles } from '../styles/global';
import { taskStyles } from '../styles/task';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const StringArrayInput = ({ texts, setTexts, placeholder }: { texts: any, setTexts: any, placeholder: string }) => {
    const staticStyles = styles();

    const handleChange = (text: string, index: number) => {
        const newTexts = [...texts];
        newTexts[index] = text;
        setTexts(newTexts);
    };

    const addInput = () => {
        setTexts([...texts, '']);
    };

    const removeInput = (index: number) => {
        if (index === 0) return; // prevent removing first input
        const newTexts = texts.filter((_, i) => i !== index);
        setTexts(newTexts);
    };

    return (
        <View>
            {texts.map((value, index) => (
                <View key={index} style={rowStyles.inputRow}>
                    <TextInput
                        placeholderTextColor="#888"
                        style={[staticStyles.input1, { width: '80%', marginBottom: 0 }]}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={(text) => handleChange(text, index)}
                    />
                    {index !== 0 && (
                        // <Button title="Remove" color="red" onPress={() => removeInput(index)} />

                        <Pressable style={[taskStyles.deleteButton, { width: '20%' }]}
                            onPress={() => {
                                removeInput(index)
                            }}>
                            <SimpleLineIcons name="close" color={"red"} size={24} />
                        </Pressable>
                    )}
                </View>
            ))}

            <Button title="Add Ingredient" onPress={addInput} />
        </View>
    );
}

const rowStyles = StyleSheet.create({
    inputRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // flex: 1,
        gap: 8,
        marginBottom: 10,
    }
});

export default StringArrayInput;
