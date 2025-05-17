import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    header: {
        top: 15,
    },
    cardContainer: {
        width: '90%',
    },
    card: {
        opacity: 1,
        backgroundColor: 'white',
        marginBottom: 15,
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
        elevation: 200,
        borderWidth: 3,
        borderColor: '#E0E0E0'
    },

    cardContent: {
        alignSelf: 'stretch',
        flexGrow: 1, 
        marginLeft: 15,
        padding: 10,
        alignContent: 'flex-end',
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: '#929db4'
    },
    description: {
        fontSize: 15,
        fontFamily: 'sans-serif-condensed',
                color: '#929db4'

    },
    cardPressed: {
        // backgroundColor: '#2980b9',
        opacity: 1,
    },
});