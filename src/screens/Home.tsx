import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import { logout } from '../controllers/userController';
import { styles } from '../styles/global';


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



export default HomeScreen;
