import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';


const RegisterScreen = () => {
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [RePassword, setRePassword] = useState('');
    const [Email, setEmail] = useState('');

    const handleRegister = async () => {
        console.log (UserName + Password + RePassword + Email);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register new user</Text>
            <Text style={styles.text}>Email</Text>
            <TextInput
                placeholder='Email'
                onChangeText={setEmail}
                style={styles.input}></TextInput>
            <Text style={styles.text}>Username</Text>
            <TextInput
                placeholder='Username'
                onChangeText={setUserName}
                style={styles.input}></TextInput>
            <Text style={styles.text}>Password</Text>
            <TextInput
                placeholder='Password'
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.input}></TextInput>
            <Text style={styles.text}>Password</Text>
            <TextInput
                placeholder='Enter password again'
                onChangeText={setRePassword}
                secureTextEntry={true}
                style={styles.input}></TextInput>
            <Button title="Register"
                onPress={handleRegister}></Button>

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

export default RegisterScreen;
