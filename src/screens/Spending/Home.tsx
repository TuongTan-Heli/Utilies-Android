import { ImageBackground, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/global";
import { spendingStyles } from "../../styles/spending";
import AntDesign from "react-native-vector-icons/AntDesign";

const SpendingHomeScreen = () => {
    const staticStyles = styles();
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={staticStyles.background}>
                <View style={staticStyles.thirtyLightblueBackground}>

                </View>
                {/* <Text style={styles('white').title}>Manage your expense</Text> */}
                <View style={spendingStyles.header}>
                    <Text style={styles('white').title}>Manage your expense</Text>
                    <View style={spendingStyles.remaining}>

                        <Text style={spendingStyles.remainingText}>Balance: .... AUD</Text>
                        {/* <Text style={spendingStyles.viewMoreText}>View more >></Text> */}
                        <Pressable style={spendingStyles.viewMoreButton}>
                            <Text style={spendingStyles.viewMoreText}>View more</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={spendingStyles.contentContainer}>

                    <View style={spendingStyles.addContainer}>
                        <View>
                            <Pressable style={[spendingStyles.addButton, staticStyles.flexDirectionRow]}>
                                <AntDesign name="pluscircleo" color="#495057" size={24} />
                                <Text style={styles('#495057').textColor}>Report remaining</Text>
                            </Pressable>
                        </View>

                        <View>
                            <Pressable style={[spendingStyles.addButton, staticStyles.flexDirectionRow]}>
                                <AntDesign name="pluscircleo" color="#495057" size={24} />
                                <Text style={styles('#495057').textColor}>Add expense</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>




    )
};

export default SpendingHomeScreen;
