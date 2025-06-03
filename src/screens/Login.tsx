
import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, Text, TextInput, ToastAndroid, View } from 'react-native';
import { getToken, saveToken } from '../utils/EncStorage';
import { processLoginRequest } from '../controllers/userController';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/global';
import { Button } from 'react-native-elements';
import TypingText from '../utils/TypingText';
import validator from 'validator';
import { getAll } from '../controllers/currencyController';

const LoginScreen = () => {
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [ValidateMessage, setValidateMessage] = useState('');
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
        const isValid = validateFields();
        if (isValid || !validator.isEmpty(sessionToken || '')) {
            const loginStatus = await processLoginRequest(UserName, Password, sessionToken || '');
            if (loginStatus == 200) { //handle different status message to popup for user
                const currencies = (await getAll()).data;
                saveToken('ALL_CURRENCIES', JSON.stringify(currencies));
                navigation.navigate('Home');
            }
        }

    }

    const validateFields = () => {
        if (validator.isEmpty(UserName) || validator.isEmpty(Password)) {
            setValidateMessage('* Please fill in enough field');
            return false;
        }
        return true;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground style={styles().background}
                source={require('../styles/IMG_20250515_114503.png')}>
                <View style={styles().backgroundOverlay}></View>
                <TypingText text="Welcome to Utilies"></TypingText>
                <View style={styles().innerContainner}>
                    <Text style={styles('white').title}>Login</Text>
                    <TextInput
                        placeholder='Username or Email'
                        onChangeText={setUserName}
                        placeholderTextColor="#888"
                        style={styles().input}></TextInput>
                    <TextInput
                        placeholderTextColor="#888"
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        style={styles().input}></TextInput>
                    <Text style={styles().validateMessaage}>{ValidateMessage || ''}</Text>

                    <Button buttonStyle={styles().button} title="Login"
                        onPress={handleLogin}></Button>
                    <View style={styles().separatorContainer}>
                        <View style={styles().line} />
                        <Text style={styles().orText}>or</Text>
                        <View style={styles().line} />
                    </View>
                    <Button buttonStyle={styles().button} title="Register"
                        onPress={() => { navigation.navigate('Register') }}></Button>
                </View>
                <Text style={[styles().orText, styles().footer]}>@{new Date().getFullYear()} Utilies</Text>

            </ImageBackground>
        </SafeAreaView>

    );
};

export default LoginScreen;
