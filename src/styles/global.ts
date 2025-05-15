import { StyleSheet } from "react-native";
import { color } from "react-native-elements/dist/helpers";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    innerContainner: {
        opacity: 1,
        width: '80%',
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 20,
        marginBottom: 10
    },
    label: {},
    title: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingBottom: 50,
    },
    input: {
        backgroundColor: '#FFFFFF',
        // borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    button: {
        marginBottom: 10,
        borderRadius: 50,
        width: '100%',
        alignSelf: 'center'
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    line: {
        flex: 1,
        height: 2,
        backgroundColor: '#ccc',
    },
    orText: {
        fontSize: 15,
        marginHorizontal: 10,
        color: '#FFFFFF',
        // fontWeight: 'bold',
        marginBottom: 10
    },
    footer: {
        position: 'absolute',
        bottom: 15
    },
    typingText: {
        paddingBottom: 50,
        fontSize: 50,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    validateMessaage: {
        color:'rgb(218, 32, 32)',
        paddingBottom: 10,
        fontWeight: 'bold',
        fontSize: 12
    }
});