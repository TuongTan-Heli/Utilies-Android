import { StyleSheet } from "react-native";
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
    recipeCard: {
        marginTop: 8,
        padding: 8,
        backgroundColor: '#ececec',
        borderRadius: 8,
        alignItems: 'center',
        
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
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    addContentContainer: {
        paddingBottom: 40,
    },
    addOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
})


