import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { styles } from '../styles/global';
import { taskStyles } from '../styles/task';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const StringArrayInput = ({ texts, setTexts }: { texts: any, setTexts: any }) => {
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
        <ScrollView>
            {texts.map((value, index) => (
                <View key={index} style={rowStyles.inputRow}>
                    <TextInput
                        style={staticStyles.input1}
                        placeholder='Enter ingredient'
                        value={value}
                        onChangeText={(text) => handleChange(text, index)}
                    />
                    {index !== 0 && (
                        // <Button title="Remove" color="red" onPress={() => removeInput(index)} />

                        <Pressable style={taskStyles.deleteButton}
                            onPress={() => {
                                removeInput(index)
                            }}>
                            <SimpleLineIcons name="close" color={"red"} size={24} />
                        </Pressable>
                    )}
                </View>
            ))}

            <Button title="Add Text" onPress={addInput} />
            <Text>Texts: {JSON.stringify(texts)}</Text>
        </ScrollView>
    );
}

const rowStyles = StyleSheet.create({
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginRight: 8,
        borderRadius: 4,
    },
});

export default StringArrayInput;
