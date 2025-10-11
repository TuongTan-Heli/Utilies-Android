
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingBackground from '../utils/LoadingBackground';
import { getToken } from '../utils/EncStorage';
import CheckBox from '@react-native-community/checkbox';
import validator from 'validator';
import { processUpdateAccount } from '../controllers/userController';
import { styles } from "../styles/global";
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { getUserDefaultCurrency } from '../utils/utils';


const AccountScreen = () => {
    const [currencies, setCurrencies] = useState<any[]>([]);
    const [ValidateMessage, setValidateMessage] = useState('');
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);
    const staticStyles = styles();
    const [userId, setUserId] = useState('');

    const [Email, setEmail] = useState('');
    const [UserName, setUserName] = useState('');
    const [taskNotiMessage, setTaskNotiMessage] = useState('');
    const [defaultCurrency, setDefaultCurrency] = useState('');

    const [enableUpdateNoti, setEnableUpdateNoti] = useState(true);
    const [updateNotiMessage, setUpdateNotiMessage] = useState('');
    const [notification, setNotification] = useState(true);

    const fetch = async () => {
        const [userData, defaultCurr, allCurrenciesStr] = await Promise.all([
            getToken('userInfo').catch(() => null),
            getUserDefaultCurrency().catch(() => null),
            getToken('ALL_CURRENCIES').catch(() => null),
        ]);
        if (userData) {
            const user = JSON.parse(userData);
            setUserId(user.id || '');
            setUserName(user.UserName || '');
            setEmail(user.Email || '');
            setDefaultCurrency(defaultCurr.id || '');
            // setNotification(user.Notification || true);
            setTaskNotiMessage(user.TaskNotiMessage || '');
            setEnableUpdateNoti(user.EnableUpdateNoti || true);
            setUpdateNotiMessage(user.UpdateNotiMes || '');
        }


        try {
            setCurrencies(JSON.parse(allCurrenciesStr ?? '[]'));
        } catch {
            console.warn("Failed to parse ALL_CURRENCIES");
            return [];
        }
    }

    const UpdateAccountInfo = async () => {
        const isValid = validateFields();
        if (isValid) {
            setLoading(true);
            const updateStatus = await processUpdateAccount(userId, UserName, Email, defaultCurrency,
                taskNotiMessage,
                enableUpdateNoti,
                updateNotiMessage);
            if (updateStatus == 200) {
                navigation.navigate('Home');
            }
            else {
                ToastAndroid.show(`Update failed (${updateStatus})`, ToastAndroid.SHORT);
            }
            setLoading(false);
        }
    }

    const validateFields = () => {
        let validateMes = '';
        if (validator.isEmpty(UserName)) {
            validateMes += '*Username cannot be empty.\n';
        }
        if (validator.isEmpty(Email) || !validator.isEmail(Email)) {
            validateMes += '*Invalid email.\n';

        }
        setValidateMessage(validateMes);
        if (validateMes !== '') return false;
        return true;

    }
    useEffect(() => {
        fetch();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles().modalContainer}>
                <View style={styles().modalContentContainer}>
                    <Text style={[styles().title, { textAlign: 'center' }]}>Update account information</Text>
                    <TextInput
                        placeholderTextColor="#888"
                        placeholder='Email'
                        onChangeText={setEmail}
                        value={Email}
                        style={styles().input1}
                    ></TextInput>
                    <TextInput
                        placeholderTextColor="#888"
                        placeholder='Username'
                        onChangeText={setUserName}
                        value={UserName}
                        style={styles().input1}
                    ></TextInput>

                    <View style={staticStyles.input1} >
                        <Picker
                            placeholder='Currency'
                            selectedValue={defaultCurrency}
                            onValueChange={setDefaultCurrency}
                            style={{ color: 'black' }}>
                            {currencies.map(currency => (
                                <Picker.Item key={currency.id}
                                    label={currency.Name}
                                    value={currency.id} />
                            ))}
                        </Picker>
                    </View>

                    <TextInput
                        placeholderTextColor="#888"
                        placeholder='Task notification message'
                        onChangeText={setTaskNotiMessage}
                        value={taskNotiMessage}
                        style={styles().input1}
                    ></TextInput>
                    <View style={[staticStyles.checkBox]}>
                        <CheckBox tintColors={{ true: '#007AFF', false: '#8E8E93' }} value={enableUpdateNoti} onValueChange={setEnableUpdateNoti}></CheckBox>
                        <Text>Enable update notification</Text>
                    </View>
                    <TextInput
                        placeholderTextColor="#888"
                        placeholder='Update notification message'
                        onChangeText={setUpdateNotiMessage}
                        value={updateNotiMessage}
                        style={styles().input1}
                    ></TextInput>
                    <Text style={styles().validateMessaage}>{ValidateMessage || ''}</Text>

                    <Button title="Save"
                        onPress={UpdateAccountInfo}></Button>
                </View>
            </View>
            <LoadingBackground visible={loading}></LoadingBackground>
        </SafeAreaView>

    );
};

export default AccountScreen;
