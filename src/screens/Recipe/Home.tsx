import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { styles } from '../../styles/global';
import { processAddRecipe, search } from "../../controllers/recipeController";
import { Button, Text } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StringArrayInput from '../../utils/StringArrayInput';
import { Step, defaultStep } from '../../models/Step';
import StepArrayInput from '../../utils/StepArrayInput';
const RecipeHomeScreen = () => {
    const [searchKey, setSearchKey] = useState('');
    const [recipes, setRecipes] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState<Step[]>([]);

    useEffect(() => {
        fetch();
    }, [])
    const fetch = async () => {

    }
    const handleSearch = async () => {
        const result = await search(searchKey);
        if (result) {
            setRecipes(result.data);
        }
    }
    const handleAddRecipe = async () => {
        //add validation
        const status = await processAddRecipe(name, description, ingredients, steps, null);
    }
    const staticStyles = styles();

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={staticStyles.background}>
                <Text>{JSON.stringify(recipes)}</Text>
                <TextInput
                    value={searchKey}
                    placeholder='Enter recipe'
                    onChangeText={setSearchKey}
                    placeholderTextColor="#888"
                    style={staticStyles.input1}></TextInput>
                <Pressable
                    onPress={() => handleSearch()}>
                    <AntDesign name="search1" color="#787878" size={24} />
                </Pressable>
                <TextInput
                    value={name}
                    placeholder='Enter Name'
                    onChangeText={setName}
                    placeholderTextColor="#888"
                    style={staticStyles.input1}></TextInput>
                <TextInput
                    value={description}
                    placeholder='Enter Description'
                    onChangeText={setDescription}
                    placeholderTextColor="#888"
                    style={staticStyles.input1}></TextInput>
                <StringArrayInput
                    texts={ingredients}
                    setTexts={setIngredients}
                    placeholder='Enter ingredient'
                ></StringArrayInput>
                <StepArrayInput
                    value={steps}
                    onChange={setSteps}
                ></StepArrayInput>
                <Button title="Add new recipe" style={staticStyles.button}
                    onPress={() => {handleAddRecipe()}}>
                </Button>
                <Text>{name} {description} {JSON.stringify(ingredients)} {JSON.stringify(steps)}</Text>
            </View>
        </ScrollView>


    );
};

export default RecipeHomeScreen;
