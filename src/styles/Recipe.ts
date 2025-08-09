import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-screens";
export const styles = StyleSheet.create({
    searchContainer: {
        padding: 12
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        gap: 5,
        marginBottom: 8
    },
    scrollviewContainer: {
        width: '100%',
    },
    recipeContainer: {

    },
    recipeCard: {
        marginTop: 8,
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: 'center'
    },
    ingredientInfoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        backgroundColor: '#f1ecf7',
        borderRadius: 8,
        padding: 8
    },
    ingredient: {
        width: '50%'
    },
    addContainer: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    addContentContainer: {
        paddingBottom: 40
    },
    addOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
})


