import { StyleSheet } from "react-native";

export const taskStyles = StyleSheet.create({
    //Task style
    taskDashboard: {
        width: '90%',
        flex: 1,
        marginBottom: 50
    },
    taskDashboardTop: {
        flexDirection: 'row',
        width: '100%',
        gap: 0.5
    },
    taskDashboardContent: {
        flex: 1,
        backgroundColor: 'white',

        borderBottomLeftRadius: 20,
        borderBottomEndRadius: 20,
    },
    taskDashboardBottom: {
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        gap: 10,
        justifyContent: 'center'
    },
    todoButton: {
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        // flex: 1,
        backgroundColor: 'white',
    },
    tobuyButton: {
        borderRadius: 20,
        borderBottomEndRadius: 0,
        borderBottomLeftRadius: 0,
        // flex: 1,
        backgroundColor: 'white',
    },
    tobuyButtonSelected: {
        borderRadius: 20,
        backgroundColor: "#4150b5",
        // flex: 1,
        borderBottomEndRadius: 0,
        borderBottomLeftRadius: 0,
    },
    todoButtonSelected: {
        borderRadius: 20,
        backgroundColor: "#4150b5",
        // flex: 1,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    taskList: {
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 10
    },
    addTaskOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
        zIndex: 3
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
        width: '100%',
    },
    taskRow: {
        flexDirection: 'row',
        borderBottomColor: '#dadada',
        borderBottomWidth: 2,
        alignItems:'center',
        padding: 10,
        gap: 10,

    },
    taskName: {
        color: '#495057',
        fontSize: 20,     
        flexShrink: 1
    },
    deleteButton: {
        marginLeft: 'auto'
    }

});