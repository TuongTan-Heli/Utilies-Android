import React, { useEffect, useState } from 'react';
import { Modal, Pressable, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { styles } from '../../styles/global';
import { processAddRecipe, processGetAllRecipe, search } from "../../controllers/recipeController";
import { Button, Text } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StringArrayInput from '../../utils/StringArrayInput';
import { Step, defaultStep } from '../../models/Step';
import StepArrayInput from '../../utils/StepArrayInput';
import { styles as recipeStyles } from '../../styles/Recipe';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllRecipe } from '../../api/recipeApi';
import { useNavigation } from '@react-navigation/native';
import RecipeInfoScreen from './RecipeInfo';


const RecipeHomeScreen = () => {
    const navigation = useNavigation<any>();
    const [searchKey, setSearchKey] = useState('');
    const [recipes, setRecipes] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState<Step[]>([]);
    const [isAddingRecipe, setIsAddingRecipe] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    useEffect(() => {
        setName('');
        setDescription('');
        setIngredients(['']);
        setSteps([]);
    }, [isAddingRecipe])
    const fetch = async () => {
        const response = await processGetAllRecipe();
        if (response?.status == 200) {
            setRecipes(response.data);
        }
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
        <SafeAreaView style={{ flex: 1 }}>
            <View style={staticStyles.background}>
                <ScrollView style={recipeStyles.scrollviewContainer}>
                    <Text style={styles().title}>Cooking recipe</Text>
                    <View style={recipeStyles.searchContainer}>
                        <View style={recipeStyles.searchBar}>
                            <TextInput
                                value={searchKey}
                                placeholder='Enter Ingredient to search'
                                onChangeText={setSearchKey}
                                placeholderTextColor="#888"
                                style={[staticStyles.input1, { flex: 1, marginBottom: 0 }]}></TextInput>
                            <Pressable
                                onPress={() => handleSearch()}>
                                <AntDesign name="search1" color="#787878" size={24} />
                            </Pressable>
                        </View>
                        <Button title="Add new" style={[staticStyles.button]}
                            onPress={() => { setIsAddingRecipe(true) }}>
                        </Button>
                        <View style={recipeStyles.recipeContainer}>
                            {
                                recipes.map(recipe => {
                                    return (
                                        <Pressable style={recipeStyles.recipeCard} key={recipe.objectID} onPress={() => {
                                            navigation.navigate('RecipeInfo', { recipeId: recipe.objectID })
                                        }}>
                                            <Text h3>{recipe.Name}</Text>
                                            <Text h4>{recipe.Description}</Text>
                                            <View style={recipeStyles.ingredientInfoContainer}>
                                                <View style={{ width: '100%', alignItems: 'center' }}>
                                                    <MaterialCommunityIcons name="food-variant" color="#000" size={24} />
                                                </View>

                                                {recipe.Ingredients.map(ingredient => {
                                                    return (
                                                        <Text key={ingredient} style={[recipeStyles.ingredient, { fontSize: 16 }]}>{ingredient}</Text>
                                                    )
                                                })}
                                            </View>
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                    </View>
                    {/* add recipe form */}
                    <Modal
                        transparent
                        visible={isAddingRecipe}
                        animationType='slide'
                        onRequestClose={() => setIsAddingRecipe(true)}>
                        <View style={recipeStyles.addOverlay}>
                            <ScrollView style={recipeStyles.addContainer}>
                                {/* <View style={recipeStyles.addContentContainer}> */}
                                <Pressable style={[staticStyles.iconSmall, staticStyles.iconClose, { top: 0, right: 0 }]}
                                    onPress={() => setIsAddingRecipe(false)}>
                                    <AntDesign name="close" color="#787878" size={24} />
                                </Pressable>
                                <View style={recipeStyles.addContentContainer}>
                                    <Text style={styles().title}>Add new recipe</Text>
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
                                    <StringArrayInput
                                        texts={ingredients}
                                        setTexts={setIngredients}
                                        placeholder='Ingredient'
                                    ></StringArrayInput>
                                        <StepArrayInput
                                            value={steps}
                                            onChange={setSteps}
                                        ></StepArrayInput>

                                    <Button title="Add new recipe" style={[staticStyles.button]}
                                        onPress={() => { handleAddRecipe() }}>
                                    </Button>
                                </View>

                                {/* </View> */}

                            </ScrollView>

                        </View>

                    </Modal>
                </ScrollView>
            </View>
        </SafeAreaView>


    );
};

export default RecipeHomeScreen;
