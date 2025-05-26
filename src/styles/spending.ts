
import { Dimensions, StyleSheet } from "react-native";

export const spendingStyles = StyleSheet.create({
    header: {
        height: '33%'
    },

    remaining: {
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexShrink: 1,
        flexWrap: 'wrap',
        gap: 10,
        // width: '100%'
    },
    addButton: {
        alignItems: 'center',
        gap: 5,
        flexShrink: 1,
        backgroundColor: '#99d9ea',
        padding: 15,
        borderRadius: 25
    },
    remainingText: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    viewMoreButton: {
        // alignSelf: 'flex-end',
        color: '#495057',
        borderRadius: 15,
        backgroundColor: 'rgba(203, 229, 236,0.5)',
        justifyContent: 'center',
        flexShrink: 1,
        padding: 7
    },
    viewMoreText: {
        fontSize: 12,
        color: 'white',
    },
    contentContainer: {
        flex: 2
    },
    addContainer: {
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});