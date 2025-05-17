import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/global';
import { Button } from 'react-native-elements';
import validator from 'validator';
import { processRegisterRequest } from '../controllers/userController';
import { useNavigation } from '@react-navigation/native';


const RegisterScreen = () => {
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [RePassword, setRePassword] = useState('');
    const [Email, setEmail] = useState('');
    const [ValidateMessage, setValidateMessage] = useState('');
    const navigation = useNavigation<any>();


    const handleRegister = async () => {
        const isValid = validateFields();
        if (isValid) {
            const registerStatus = await processRegisterRequest(UserName, Password, Email);
            if (registerStatus == 200) { 
                navigation.navigate('Login');
            }
        }
    }

    const validateFields = () => {
        let validateMes = '';
        if (validator.isEmpty(UserName) ||
            validator.isEmpty(Password) ||
            validator.isEmpty(RePassword) ||
            validator.isEmpty(Email)) {
            validateMes = '* ' + [validator.isEmpty(UserName) ? 'Username' : null,
            validator.isEmpty(Password) ? 'Password' : null,
            validator.isEmpty(RePassword) ? 'Re-enter password' : null,
            validator.isEmpty(Email) ? 'Email' : null,
            ]
                .filter(string => string != null)
                .join(', ')
                + ' field is required';
        }
        if (!validator.isEmail(Email) && !validator.isEmpty(Email)) {
            validateMes += ('\n* ' + Email + ' is not a valid email');
        }
        if (Password != RePassword && !validator.isEmpty(Password) && !validator.isEmpty(RePassword)) {
            validateMes += ('\n* passwords do not match');
        }
        setValidateMessage(validateMes);
        if (validator.isEmpty(validateMes.trim())) {
            return true;
        }
        return false;
    }
    return (
        <ImageBackground style={styles().background}
            source={require('../styles/IMG_20250515_114503.png')}>
            <View style={styles().backgroundOverlay}></View>
            <View style={styles().innerContainner}>
                <Text style={styles().title}>Register new user</Text>
                <TextInput
                    placeholder='Email'
                    onChangeText={setEmail}
                    style={styles().input}></TextInput>
                <TextInput
                    placeholder='Username'
                    onChangeText={setUserName}
                    style={styles().input}></TextInput>
                <TextInput
                    placeholder='Password'
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={styles().input}></TextInput>
                <TextInput
                    placeholder='Enter password again'
                    onChangeText={setRePassword}
                    secureTextEntry={true}
                    style={styles().input}></TextInput>
                <Text style={styles().validateMessaage}>{ValidateMessage || ''}</Text>
                <Button title="Register" buttonStyle={styles().button}
                    onPress={handleRegister}></Button>
            </View>
            <Text style={[styles().orText, styles().footer]}>@{new Date().getFullYear()} Utilies</Text>

        </ImageBackground>
    );
};

export default RegisterScreen;
