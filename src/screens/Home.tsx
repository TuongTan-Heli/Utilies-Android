import { useNavigation } from '@react-navigation/native';
import { ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { logout } from '../controllers/userController';
import { styles } from '../styles/global';
import { homeStyles } from '../styles/home';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import IconCard from '../utils/Card';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const HomeScreen = () => {
    const staticStyles = styles();
    const navigation = useNavigation<any>();
    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    }
    return (
        <ImageBackground style={staticStyles.background}
            source={require('../styles/IMG_20250515_114503.png')}>
            <View style={staticStyles.backgroundOverlay}></View>
            <View style={[homeStyles.header, staticStyles.flexDirectionRow]}>
                <Pressable style={staticStyles.logoutButton}
                    onPress={() => {
                        handleLogout()
                    }}>
                    <SimpleLineIcons name="logout" color={"red"} size={24} />
                </Pressable>
                <Text style={staticStyles.title}>Title</Text>
            </View>
            <ScrollView style={homeStyles.cardContainer}
                >
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
                    directPage="TaskHome"
                />
                <IconCard
                    IconComponent={Ionicons}
                    iconName="fast-food-outline"
                    iconColor="white"
                    cardTitle="What to eat today?"
                    backgroundColor="#775cce"
                    directPage="TaskHome"
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

export default HomeScreen;
