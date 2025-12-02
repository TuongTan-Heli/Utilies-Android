import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { styles } from '../../styles/global';
import { Button, Text } from 'react-native-elements';
import StringArrayInput from '../../utils/StringArrayInput';
import { Step } from '../../models/Step';
import StepArrayInput from '../../utils/StepArrayInput';
import { styles as recipeStyles } from '../../styles/Recipe';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { processDeleteRecipe, processGetRecipe, processUpdateRecipe } from '../../controllers/recipeController';
import LoadingBackground from '../../utils/LoadingBackground';

type RootStackParamList = {
    RecipeInfo: { recipeId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeInfo'>;
const RecipeInfoScreen = ({ route, navigation }: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState<Step[]>([]);
    const { recipeId } = route.params;
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        const response = await processGetRecipe(recipeId);
        if (response.status == 200) {
            const recipeData = response.data.data;
            setName(recipeData.Name);
            setDescription(recipeData.Description);
            setIngredients(recipeData.Ingredients);
            setSteps(recipeData.Steps);
        }
    }

    const handleUpdateRecipe = async () => {
        setLoading(true);
        const status = await processUpdateRecipe(recipeId, name, description, ingredients, steps, null);
        setLoading(false);
    }
    const handleDeleteRecipe = async () => {
        setLoading(true);
        const response = await processDeleteRecipe(recipeId);
        if (response == 200) {
            navigation.goBack();
        }
        setLoading(false);
    }

    const staticStyles = styles();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LoadingBackground visible={loading}></LoadingBackground>
            <View style={staticStyles.background}>
                <ScrollView style={recipeStyles.scrollviewContainer}>
                    <View style={recipeStyles.searchContainer}>
                        <View style={recipeStyles.recipeCard}>
                            <TextInput
                                value={name}
                                placeholder='Recipe name'
                                onChangeText={setName}
                                placeholderTextColor="#888"
                                style={staticStyles.input1}></TextInput>
                            <TextInput
                                value={description}
                                placeholder='Description'
                                onChangeText={setDescription}
                                placeholderTextColor="#888"
                                style={staticStyles.input1}></TextInput>
                            <Text h4>Ingredients</Text>
                            <StringArrayInput
                                texts={ingredients}
                                setTexts={setIngredients}
                                placeholder='Ingredient'
                            ></StringArrayInput>
                            <Text h4>Steps</Text>
                            <View>
                                <StepArrayInput
                                    value={steps}
                                    onChange={setSteps}
                                ></StepArrayInput>

                            </View>

                            <View style={[staticStyles.flexDirectionRow, { gap: 10 }]}>
                                <Button title="Update recipe" style={[staticStyles.button]}
                                    onPress={() => { handleUpdateRecipe() }}>
                                </Button>
                                <Button title="Delete recipe" style={[staticStyles.button]} buttonStyle={{ backgroundColor: '#f32121ff' }}
                                    onPress={() => { handleDeleteRecipe() }}>
                                </Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>


    );
};

export default RecipeInfoScreen;
