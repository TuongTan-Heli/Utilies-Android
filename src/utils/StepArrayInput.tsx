import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { Step, defaultStep } from "../models/Step";
import StringArrayInput from "./StringArrayInput";
import { styles } from '../styles/global';
import CarouselComponent from "./Carousel";


interface StepArrayInputProps {
    value?: Step[];
    onChange?: (steps: Step[]) => void;
}

const StepArrayInput: React.FC<StepArrayInputProps> = ({ value, onChange }) => {
    const staticStyles = styles();
    const [steps, setSteps] = useState<Step[]>(value ?? [defaultStep]);

    // Handle change in a specific step property
    const updateStep = (index: number, key: keyof Step, val: any) => {
        const updated = [...steps];
        updated[index][key] = val;
        setSteps(updated);
        onChange?.(updated);
    };
    useEffect(() => {
        setSteps(value ?? [defaultStep]);
    }, [value]);


    // Add a new empty step
    const addStep = () => {
        const updated = [...steps, { ...defaultStep }];
        setSteps(updated);
        onChange?.(updated);
    };

    // Remove step (minimum 1)
    const removeStep = (index: number) => {
        if (steps.length === 1) return; // do not allow removing the last one
        const updated = steps.filter((_, i) => i !== index);
        setSteps(updated);
        onChange?.(updated);
    };

    return (
        <ScrollView style={stepStyles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <CarouselComponent
                carouselItems={steps.map((step, index) => ({
                    text: step.Action,
                    title: `Step ${index + 1}`,
                    element: (
                        <View key={index} style={stepStyles.stepContainer}>
                            <Text>Step {index + 1}</Text>
                            <TextInput
                                placeholderTextColor="#888"
                                style={staticStyles.input1}
                                placeholder="Enter what to do here"
                                value={step.Action}
                                onChangeText={(text) => updateStep(index, "Action", text)}
                            />
                            <StringArrayInput
                                placeholder="Enter ingredient"
                                texts={step.Ingredients}
                                setTexts={(ingredients: string[]) => { updateStep(index, "Ingredients", ingredients) }}
                            >
                            </StringArrayInput>

                            <TextInput
                                placeholderTextColor="#888"
                                style={staticStyles.input1}
                                placeholder="Note"
                                value={step.Note}
                                onChangeText={(text) => updateStep(index, "Note", text)}
                            />
                            {steps.length > 1 && (
                                <Button title="Remove" onPress={() => removeStep(index)} />
                            )}
                        </View>
                    ),
                }))}
            />

            <Button title="Add Step" onPress={addStep} />
        </ScrollView>
    );
};

export default StepArrayInput;

const stepStyles = StyleSheet.create({
    container: {
        marginBottom: 8,
        marginTop: 8
    },
    stepContainer: {
        gap: 8,
        padding: 24,
        backgroundColor: "#d4cfcfff",
        borderRadius: 10,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
    },
});
