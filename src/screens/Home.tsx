import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ImageBackground, Modal, Pressable, ScrollView, Text, TextInput, ToastAndroid, View } from 'react-native';
import { handleChangePassword, logout } from '../controllers/userController';
import { styles } from '../styles/global';
import { homeStyles } from '../styles/home';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import IconCard from '../utils/Card';
import React, { useCallback, useState } from 'react';
import { Button } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimatedView from '../utils/AnimatedView';
import LoadingBackground from '../utils/LoadingBackground';
const HomeScreen = () => {
    const staticStyles = styles();
    return (
        <ImageBackground style={staticStyles.background}
            source={require('../styles/IMG_20250515_114503.png')}>
            <View style={staticStyles.backgroundOverlay}></View>
            <AccountNavigation />
            <Text style={styles('white').title}>Welcome to Utilies</Text>
            <ScrollView style={homeStyles.cardContainer}>
                <IconCard
                    IconComponent={MaterialCommunityIcons}
                    iconName="format-list-numbered"
                    iconColor="white"
                    cardTitle="Manage your task"
                    backgroundColor="#775cce"
                    directPage="TaskHome"
                />
                <IconCard
                    IconComponent={FontAwesome}
                    iconName="money"
                    iconColor="white"
                    cardTitle="View your spending"
                    cardDescription="View your record on spending"
                    backgroundColor="#775cce"
                    directPage="SpendingHome"
                />
                <IconCard
                    IconComponent={Ionicons}
                    iconName="fast-food-outline"
                    iconColor="white"
                    cardTitle="What to eat today?"
                    backgroundColor="#775cce"
                    directPage="RecipeHome"
                />
                <IconCard
                    IconComponent={Octicons}
                    iconName="graph"
                    iconColor="white"
                    cardTitle="View stock record"
                    backgroundColor="#775cce"
                    directPage="TaskHome"
                />
                <IconCard
                    IconComponent={MaterialCommunityIcons}
                    iconName="currency-usd"
                    iconColor="white"
                    cardTitle="Manage currency"
                    backgroundColor="#775cce"
                    directPage="TaskHome"
                />
            </ScrollView>
        </ImageBackground>
    );
};

const AccountNavigation = () => {
    const staticStyles = styles();
    const navigation = useNavigation<any>();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);
    const [isloading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setIsDropdownVisible(false);
                setIsPasswordChangeVisible(false);
            };
        }, [])
    );

    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    }
    const [CurrentPassword, setCurrentPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [RePassword, setRePassword] = useState('');

    const [ValidateMessage, setValidateMessage] = useState('');
    const changePassword = async () => {
        if (NewPassword !== RePassword) {
            setValidateMessage('New passwords do not match');
            return;
        }
        else {
            setLoading(true);
            const status = await handleChangePassword(CurrentPassword, NewPassword);
            if (status === 200) {
                setIsPasswordChangeVisible(false);
                setValidateMessage('');
                ToastAndroid.show('Password changed successfully. Please log in again.', ToastAndroid.LONG);
                handleLogout();
                setLoading(false);
            } else if (status === 401) {
                setValidateMessage('Current password is incorrect');
            } else {
                setValidateMessage('An error occurred. Please try again.');
            }
        }
    }
    return (
        <View style={staticStyles.accountButton}>
            <Pressable style={{ alignSelf: 'flex-end' }}
                onPress={() => {
                    setIsDropdownVisible(!isDropdownVisible);
                }}>
                <MaterialCommunityIcons name="account-circle" color="white" size={24} />
            </Pressable>

            <AnimatedView
                visible={isDropdownVisible}
                animation="fade-slide"
                duration={300}
                style={homeStyles.accountDropdown}>
                <Pressable onPress={() => {
                    setIsDropdownVisible(false);
                    navigation.navigate('Account');
                }}>
                    <Text style={homeStyles.description}>Account Settings</Text>
                </Pressable>
                <Pressable onPress={() => {
                    setIsPasswordChangeVisible(true);
                }}>
                    <Text style={homeStyles.description}>Change Password</Text>

                </Pressable>
                <Pressable onPress={() => {
                    handleLogout();
                    setIsDropdownVisible(false);
                }}>
                    <Text style={homeStyles.description}>Logout</Text>
                </Pressable>
            </AnimatedView>

            {isPasswordChangeVisible && (
                <Modal animationType="slide"
                    transparent={true}
                    visible={isPasswordChangeVisible}
                    onRequestClose={() => setIsPasswordChangeVisible(false)}>
                    <View style={staticStyles.modalOverlay}>
                        <View style={staticStyles.modalContainer}>
                            <Pressable style={[staticStyles.iconSmall, staticStyles.iconClose]}
                                onPress={() => { setIsPasswordChangeVisible(false) }}>
                                <AntDesign name="close" color="#787878" size={24} />
                            </Pressable>
                            <View style={staticStyles.modalContentContainer}>
                                <Text style={styles('black').title}>Change Password</Text>
                                <TextInput
                                    placeholderTextColor="#888"
                                    placeholder='Current Password'
                                    secureTextEntry={true}
                                    onChangeText={setCurrentPassword}
                                    style={staticStyles.input1}></TextInput>
                                <TextInput
                                    placeholderTextColor="#888"
                                    placeholder='Enter new Password'
                                    secureTextEntry={true}
                                    onChangeText={setNewPassword}
                                    style={staticStyles.input1}></TextInput>
                                <TextInput
                                    placeholderTextColor="#888"
                                    placeholder='Re-enter new Password'
                                    secureTextEntry={true}
                                    onChangeText={setRePassword}
                                    style={staticStyles.input1}></TextInput>
                                <Text style={staticStyles.validateMessaage}>{ValidateMessage || ''}</Text>
                                <Button title="Save"
                                    onPress={changePassword}></Button>
                            </View>

                        </View>
                    </View>
                </Modal>
            )}
            <LoadingBackground visible={isloading}></LoadingBackground>
        </View >
    )
};

export default HomeScreen;
