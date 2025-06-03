
import { Dimensions, StyleSheet } from "react-native";

export const spendingStyles = StyleSheet.create({
    header: {
        height: Dimensions.get('window').height * (3 / 10),
        gap: 8,
    },
    searchHeader: {
        gap: 8,
        marginBottom: 8
    },

    remaining: {
        // marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexShrink: 1,
        padding: 8,
        flexWrap: 'wrap',
        gap: 10,
    },
    addButton: {
        alignItems: 'center',
        gap: 8,
        flexShrink: 1,
        // flex: 1,
        backgroundColor: '#99d9ea',
        padding: 8,
        borderRadius: 25
    },
    viewMoreButton: {
        alignItems: 'center',
        gap: 5,
        backgroundColor: 'rgba(203, 229, 236, 0.5)',
        padding: 15,
        borderRadius: 25,
        alignSelf: 'center',
    },
    remainingText: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    viewMoreText: {
        fontSize: 12,
        color: 'white',
    },
    contentContainer: {
        padding: 8
        // marginBottom: 16
    },
    addContainer: {
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
        // flexShrink: 1
    },
    dateRangePickerContainer: {
        flex: 1
    },
    dateRangePickerToday: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 100
    },
    dateRangePickerSelected: {
        backgroundColor: '#8040ee',
        borderRadius: 5,
    },
    dateRangePickerSelectedLabel: {
        color: 'white'
    },
    searchButton: {
        alignItems: 'center',
        gap: 5,
        flexShrink: 1,
        padding: 15,
        borderRadius: 25,
        backgroundColor: '#8040ee',
        alignSelf: 'center'
    },
    spendingContainer: {
        // flex: 1,
        height: '30%',
        maxHeight: Dimensions.get('window').height * (3 / 10),

        borderColor: 'black',
        borderWidth: 1,
        width: '90%',
        borderRadius: 5,
    },
    spendingHeaderRow: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        padding: 8,
        backgroundColor: '#8040ee',
    },
    spendingRow: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        padding: 8,
        borderBottomColor: 'rgba(216, 222, 233, 0.4)',
        borderWidth: 0.2,
        flexWrap:'wrap'
    },
    tableItem: {
        flex: 1,
        fontSize: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        flexShrink: 1,
        minWidth:0
    },
    headerPicker: {
        flex: 1
    },
    dropDownOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20
    },
    dropDownContainer: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        gap: 8
    },
    dropDownItem: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgb(216, 222, 233)',
        flex: 1,
        padding: 8,
        marginBottom: 4,
    },
    closeDropdownButton: {
        alignItems: 'center',
        gap: 5,
        flexShrink: 1,
        padding: 8,
        borderRadius: 25,
        backgroundColor: '#dadada',
        alignSelf: 'center'
    },
    actionRow: {
        flexDirection: 'row',
        gap: 8,
        borderLeftWidth: 1,
        borderLeftColor: 'black',
        padding: 8,
        flexWrap: 'wrap'
    },
    
    xsSmallIcon: {
        alignSelf: 'center',
        flexShrink: 1,
        minWidth: 0
    },

});