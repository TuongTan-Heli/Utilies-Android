
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { getToken } from '../utils/EncStorage';
import { processLoginRequest } from '../controllers/userController';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const navigation = useNavigation<any>();

    let sessionToken: string | null = null;
    useEffect(() => {
        const fetch = async () => {
            sessionToken = await getToken('SESSION_TOKEN');
            if (sessionToken) {
                await handleLogin();
            }
        }
        fetch();
    }, [])

    const handleLogin = async () => {
        const loginStatus = await processLoginRequest(UserName, Password, sessionToken || '');
        if (loginStatus == 200) { //handle different status message to popup for user
            navigation.navigate('Home');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Username</Text>
            <TextInput
                placeholder='Username or Email'
                onChangeText={setUserName}
                style={styles.input}></TextInput>

            <Text style={styles.text}>Password</Text>
            <TextInput
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={setPassword}
                style={styles.input}></TextInput>

            <Button title="Login"
                onPress={handleLogin}></Button>
            <Button title="Register"
            onPress={() => {navigation.navigate('Register')}}></Button>

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

export default LoginScreen;
