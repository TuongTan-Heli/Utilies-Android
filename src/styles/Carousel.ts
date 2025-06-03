import { StyleSheet } from "react-native";

 export const styles = StyleSheet.create({
    card: {
        // backgroundColor: 'red',
        // borderRadius: 20,
        // height: '70%',
        paddingBottom: 16,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    carousel: {
        flex: 1
    }
});