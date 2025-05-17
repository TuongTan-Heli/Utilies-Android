import { useNavigation } from '@react-navigation/native';
import { Button, ImageBackground, Text, View } from 'react-native';
import { logout } from '../controllers/userController';
import { styles } from '../styles/global';
import { homeStyles } from '../styles/home';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import IconCard from '../utils/Card';
const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    }
    return (
        <ImageBackground style={styles().background}
            source={require('../styles/IMG_20250515_114503.png')}>
            <View style={styles().backgroundOverlay}></View>
            <View style={homeStyles.header}>
                <Button title="Log out"
                    onPress={handleLogout}></Button>
                <Text style={styles('white').title}>Utilies</Text>
            </View>
            <View style={homeStyles.cardContainer}>
                <IconCard
                    IconComponent={Fontisto}
                    iconName="list-1"
                    iconColor="white"
                    cardTitle="Manage your task"
                    cardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    backgroundColor="#775cce"
                    directPage="TaskHome"
                />
                <IconCard
                    IconComponent={FontAwesome}
                    iconName="money"
                    iconColor="white"
                    cardTitle="View your spending"
                    cardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    backgroundColor="#775cce"
                    directPage="TaskHome"
                />
                <IconCard
                    IconComponent={Ionicons}
                    iconName="fast-food-outline"
                    iconColor="white"
                    cardTitle="What to eat today?"
                    cardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    backgroundColor="#775cce"
                    directPage="TaskHome"
                />
                <IconCard
                    IconComponent={Octicons}
                    iconName="graph"
                    iconColor="white"
                    cardTitle="View stock record"
                    cardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    backgroundColor="#775cce"
                    directPage="TaskHome"
                />
                <IconCard
                    IconComponent={MaterialCommunityIcons}
                    iconName="currency-usd"
                    iconColor="white"
                    cardTitle="Manage currency"
                    cardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    backgroundColor="#775cce"
                    directPage="TaskHome"
                />
            </View>
        </ImageBackground>
    );
};

export default HomeScreen;
