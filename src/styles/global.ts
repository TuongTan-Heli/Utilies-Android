import { Dimensions, StyleSheet } from "react-native";
export const styles = (color?: string) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        zIndex:0,
        alignItems: 'center',
        backgroundColor: '#f2f6fd',
        paddingTop: '5%'
    },
     backgroundScrollView: {
        flex: 1,
        zIndex:0,
        // alignItems: 'center',
        backgroundColor: '#f2f6fd',
        // paddingTop: '5%'
    },
    backgroundOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        ...StyleSheet.absoluteFillObject,
        // zIndex: 0,
    },
    thirtyLightblueBackground: {
        backgroundColor: '#99d9ea',
        width: '100%',
        height: Dimensions.get('window').height * (3/10),
        borderBottomRightRadius: 70,
        borderBottomLeftRadius: 70,
        position: 'absolute',
        top: 0,
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
    textColor: {
        color: color
    },
    smallText: {
        fontSize: 14,
        marginBottom: 10
    },
    input: {
        backgroundColor: '#FFFFFF',
        // borderWidth: 1,
        color: 'black',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    input1: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#efefef',
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
        color: '#FFFFFF',
        textAlign: 'center'
    },
    validateMessaage: {
        color: 'rgb(218, 32, 32)',
        paddingBottom: 10,
        fontWeight: 'bold',
        fontSize: 12
    },
    iconBig: {
        borderRadius: 50,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSmall: {
        width: 30,
        height: 30,
        backgroundColor: '#eaf0f6',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: color,
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 8,
        marginTop: 8
    },
    //Task style
    taskDashboard: {
        width: '90%',
        height: '50%',
        // flexDirection: 'row',
        gap: 10
    },
    taskList: {
        borderRadius: 20,
        backgroundColor: 'white',
        flex: 1,
        padding: 10
    },
    taskInfo: {
        borderRadius: 20,
        backgroundColor: 'white',
        flex: 1
    },
    addTaskOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20
    },
    addTaskContainer: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    addTaskContentContainer: {
        paddingTop: 40,
        width: '100%'
    },
    iconClose: {
        top: 20,
        right: 20,
        position: 'absolute',
        zIndex: 1
    },
    checkBox: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#efefef',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%'
    },
    numericBox: {
        width: '100%',
        marginBottom: 10,
    },
    flexDirectionRow: {
        flexDirection: 'row'
    },

    logoutButton: {
        right: 20,
        top: 20,
        position: 'absolute',
        zIndex: 1
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
        zIndex: 3
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalContentContainer: {
        paddingTop: 40,
        width: '100%',
    },
})


