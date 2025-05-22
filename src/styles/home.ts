import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    header: {
        // top: 30,
        marginTop: '10%',
        marginBottom: '5%',
        justifyContent: 'center',
        width: '90%',
        height: '10%'
    },
    cardContainer: {
        width: '90%',
        height: '85%',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 15,
        borderRadius: 15,
        padding: 15,
        elevation: 7,
        borderWidth: 3,
        borderColor: '#E0E0E0',
        gap: 10,
    },

    cardContent: {
        justifyContent: 'center',
                flexShrink: 1

    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: '#929db4'
    },
    description: {
        fontSize: 15,
        color: '#929db4',

    },
    cardPressed: {
        opacity: 1,
    },
});