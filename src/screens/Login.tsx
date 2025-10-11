
import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, Text, TextInput, ToastAndroid, View } from 'react-native';
import { getToken, saveToken } from '../utils/EncStorage';
import { processLoginRequest } from '../controllers/userController';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/global';
import { Button } from 'react-native-elements';
import TypingText from '../utils/TypingText';
import validator from 'validator';
import { getAll } from '../controllers/currencyController';
import LoadingBackground from '../utils/LoadingBackground';

const LoginScreen = () => {
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [ValidateMessage, setValidateMessage] = useState('');
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);

    let sessionToken: string | null = null;

    const handleAutoLogin = useCallback(async () => {
        try {
            sessionToken = await getToken('SESSION_TOKEN');
            if (sessionToken) {
                await handleLogin();
            }
        } catch (err) {
            console.log('Auto login failed:', err);
        }
    }, []);

    useEffect(() => {
        handleAutoLogin();
    }, [handleAutoLogin]);

    const handleLogin = async () => {
        if (!validateFields()) return;

        setLoading(true);
        try {
            const response = await processLoginRequest(UserName, Password, sessionToken || '');

            if (response.status === 200) {
                // Navigate first for better UX
                navigation.navigate('Home');
                ToastAndroid.show('Login successful', ToastAndroid.SHORT);

                // Background save / preload
                (async () => {
                    const existingCurrencies = await getToken('ALL_CURRENCIES');
                    if (!existingCurrencies) {
                        const currencies = (await getAll())?.data || [];
                        await saveToken('ALL_CURRENCIES', JSON.stringify(currencies));
                    }
                })();
            } 
        } catch (err: any) {
            ToastAndroid.show(`Error`, ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    };

    const validateFields = () => {
        if (!validator.isEmpty(sessionToken || '')) {
            return true;
        }

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
            <LoadingBackground visible={loading}></LoadingBackground>
        </SafeAreaView>

    );
};

export default LoginScreen;
