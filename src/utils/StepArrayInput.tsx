import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Step, defaultStep } from "../models/Step";
import StringArrayInput from "./StringArrayInput";
import { styles } from '../styles/global';


interface StepArrayInputProps {
    value?: Step[]; // initial value from parent (optional)
    onChange?: (steps: Step[]) => void; // callback to send updated steps back to parent
}

const StepArrayInput: React.FC<StepArrayInputProps> = ({ value, onChange }) => {
    // const [ingredients, setIngredients] = useState(['']);
    const staticStyles = styles();
    const [steps, setSteps] = useState<Step[]>(value ?? [defaultStep]);

    // useEffect(() => {
    //        console.log(ingredients);
    //     }, [ingredients])

    // Handle change in a specific step property
    const updateStep = (index: number, key: keyof Step, val: any) => {
        const updated = [...steps];
        updated[index][key] = val;
        setSteps(updated);
        onChange?.(updated);
    };

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
        <View style={stepStyles.container}>
            {steps.map((step, index) => (
                <View key={index} style={stepStyles.stepContainer}>
                    <Text style={stepStyles.label}>Step {index + 1}</Text>
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
            ))}

            <Button title="Add Step" onPress={addStep} />
        </View>
    );
};

export default StepArrayInput;

const stepStyles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'blue'
    },
    stepContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: "#f2f2f2",
        borderRadius: 8,
    },
    // label: {
    //     fontWeight: "bold",
    //     marginBottom: 5,
    // },
    // input: {
    //     borderWidth: 1,
    //     borderColor: "#ccc",
    //     padding: 8,
    //     marginBottom: 5,
    //     borderRadius: 4,
    // },
});
