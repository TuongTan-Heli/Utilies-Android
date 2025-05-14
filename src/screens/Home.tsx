import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { logout } from '../controllers/userController';


const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>testst home</Text>
            <Button title="Log out"
                onPress={handleLogout}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 20 },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
    }
});

export default HomeScreen;
