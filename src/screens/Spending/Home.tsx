import { Modal, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { styles } from "../../styles/global";
import { spendingStyles } from "../../styles/spending";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { getToken } from "../../utils/EncStorage";
import NumericInput from "react-native-numeric-input";
import { Picker } from "@react-native-picker/picker";
import CheckBox from "@react-native-community/checkbox";
import { Button } from "react-native-elements";
import { getSpendingInMonth, getSpendingInWeek, processAddSpending } from "../../controllers/spendingController";
import { processAddBudget, processGetLatestBudget } from "../../controllers/budgetController";
import { processAddRemaining, processGetLatestRemaining } from "../../controllers/remainingController";
import CarouselComponent from "../../utils/Carousel";
import PieChartComponent from "../../utils/PieChart";
import { getUserDefaultCurrency, groupBy } from "../../utils/utils";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

const SpendingHomeScreen = () => {
    const staticStyles = styles();
    const navigation = useNavigation<any>();

    const [ShowAddModal, setShowAddModal] = useState(false);
    const [AddType, setAddType] = useState('');
    const [ValidateMessage, setValidateMessage] = useState('');



    const [Amount, setAmount] = useState(0);
    const [currencies, setCurrencies] = useState<any[]>([]);
    const [DefaultCurrency, setDefaultCurrency] = useState({});
    const [Currency, setCurrency] = useState('');

    const [SelectedDate, setSelectedDate] = useState(new Date());

    const [Note, setNote] = useState('');
    const [IsSpecial, setIsSpecial] = useState(false);
    const [Type, setType] = useState('');
    const knownTypes = ['Daily', 'Bills', 'Habit', 'Gifts', 'Shopping', 'Pet'];

    const [CustomType, setCustomType] = useState('');

    const [spendingInMonth, setSpendingInMonth] = useState<any[]>([]);
    const [spendingInWeek, setSpendingInWeek] = useState<any[]>([]);
    const [spendingInMonthCooked, setSpendingInMonthCooked] = useState<Record<string, any>>({});
    const [spendingInWeekCooked, setSpendingInWeekCooked] = useState<Record<string, any>>({});

    const [LatestBudget, setLatestBudget] = useState<any>({});
    const [LatestRemaining, setLatestRemaining] = useState<any>({});

    useEffect(() => {
        fetch();
    }, [])
    const fetch = async () => {
        const allCurencies = await getToken('ALL_CURRENCIES');
        setCurrencies(JSON.parse(allCurencies ?? ''));
        setDefaultCurrency(await getUserDefaultCurrency());
        try {
            const budgetResponse = await processGetLatestBudget();
            if (budgetResponse?.status == "Success") {
                setLatestBudget(budgetResponse.data);
            }
        }
        catch (err) {}

        try {
            const remainingResponse = await processGetLatestRemaining();
            if (remainingResponse?.status == "Success") {
                setLatestRemaining(remainingResponse.data);
            }
        }
        catch (err) {}
        //getspending in week and analyze
        const monthSpending = await getSpendingInMonth();
        const weekSpending = await getSpendingInWeek();
        if (monthSpending.status = 200) {
            setSpendingInMonth(monthSpending.data);
        }
        if (weekSpending.status = 200) {
            setSpendingInWeek(weekSpending.data);
        }
    }
    useEffect(() => {
        const grouped = Object.entries(groupBy(spendingInWeek, "Type", knownTypes)).map(([key, items]: [any, any], index: number) => {
            const totalAmount = items.reduce((sum: any, item: any) => sum + item.Amount, 0);

            return {
                label: key,
                value: totalAmount,
                key: index + 1,
                svg: { fill: `rgb(${Math.floor(180 + Math.random() * 75)},${Math.floor(180 + Math.random() * 75)}, ${Math.floor(180 + Math.random() * 75)})` }
            };
        })
        setSpendingInWeekCooked(grouped);
    }, [spendingInWeek])
    useEffect(() => {
        const grouped = Object.entries(groupBy(spendingInMonth, "Type", knownTypes)).map(([key, items]: [any, any], index: number) => {
            const totalAmount = items.reduce((sum: any, item: any) => sum + item.Amount, 0);

            return {
                label: key,
                value: totalAmount,
                key: index + 1,
                svg: { fill: `rgb(${Math.floor(180 + Math.random() * 75)},${Math.floor(180 + Math.random() * 75)}, ${Math.floor(180 + Math.random() * 75)})` }
            };
        })
        setSpendingInMonthCooked(grouped);
    }, [spendingInMonth])
    const onChange = (event: any, selectedDate: any) => {
        setSelectedDate(selectedDate);
    }
    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: SelectedDate,
            onChange,
            mode: 'date',
        });
    }
    const handleAdd = async () => {
        const isValid = validateFields();
        if (isValid) {
            let status = 0;
            if (AddType == "Remaining") {
                status = await processAddRemaining(Amount, Currency);
            }
            else if (AddType == "Spending") {
                status = await processAddSpending(Amount, Currency, Type == 'Others' ? CustomType : Type, Note, IsSpecial, SelectedDate);
            }
            else {
                status = await processAddBudget(Amount, Currency, SelectedDate);
            }
            openModal(false);
        }
    }
    const validateFields = () => {
        let message = "";
        if (Amount == 0) {
            message += "* Please specify amount"
        }
        if (AddType == "Budget" && SelectedDate <= new Date()) {
            message += "\n* Please specify a valid budget end date"
        }
        if (AddType == "Spending" && Type == "Others" && CustomType == "") {
            message += "\n* Please fill in spending type"
        }

        setValidateMessage(message);
        if (message == "") {
            return true;
        }
        return false;
    }
    const openModal = (isOpen: boolean) => {
        setShowAddModal(isOpen);
        setAmount(0);
        setNote('');
        setSelectedDate(new Date());
        setIsSpecial(false)
        setCurrency(DefaultCurrency.id);
        setType('Daily');
        setCustomType('');
        setValidateMessage('');
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={staticStyles.backgroundScrollView} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={staticStyles.thirtyLightblueBackground}>
                </View>
                <ScrollView style={spendingStyles.header}>
                    <Text style={styles('white').title}>Manage your expense</Text>

                    <View style={spendingStyles.remaining}>
                        <View>
                            {LatestRemaining && Object.keys(LatestRemaining).length > 0 && <Text style={spendingStyles.remainingText}>Balance: {LatestRemaining.Amount} {LatestRemaining.Currency?.Name} on {dayjs(LatestRemaining.Date?._seconds * 1000).format('DD/MM/YYYY')}</Text>}
                            {LatestBudget && Object.keys(LatestBudget).length > 0 && <Text style={spendingStyles.remainingText}>Budget: {LatestBudget.Amount} {LatestBudget.Currency?.Name} till {dayjs(LatestBudget.To?._seconds * 1000).format('DD/MM/YYYY')} </Text>}
                        </View>
                    </View>
                    <Pressable style={spendingStyles.viewMoreButton} onPress={() => { navigation.navigate('RemainingAndBudget') }}>
                        <Text style={spendingStyles.viewMoreText}>View more</Text>
                    </Pressable>
                </ScrollView>
                <View style={spendingStyles.contentContainer}>
                    <View style={spendingStyles.addContainer}>
                        {/* <View> */}
                        <Pressable style={[spendingStyles.addButton, staticStyles.flexDirectionRow]}
                            onPress={() => { openModal(true); setAddType('Remaining') }}>
                            <AntDesign name="pluscircleo" color="#495057" size={24} />
                            <Text style={[styles('#495057').textColor, { flexShrink: 1 }]}>Report remaining</Text>
                        </Pressable>
                        {/* </View> */}

                        {/* <View> */}
                        <Pressable style={[spendingStyles.addButton, staticStyles.flexDirectionRow]}
                            onPress={() => { openModal(true); setAddType('Spending') }}>
                            <AntDesign name="pluscircleo" color="#495057" size={24} />
                            <Text style={[styles('#495057').textColor, { flexShrink: 1 }]}>Add expense</Text>
                        </Pressable>
                        {/* </View> */}
                        {/* <View> */}
                        <Pressable style={[spendingStyles.addButton, staticStyles.flexDirectionRow]}
                            onPress={() => { openModal(true); setAddType('Budget') }}>
                            <AntDesign name="pluscircleo" color="#495057" size={24} />
                            <Text style={[styles('#495057').textColor, { flexShrink: 1 }]}>Set budget</Text>
                        </Pressable>
                        {/* </View> */}
                    </View>
                </View>
                <CarouselComponent
                    carouselItems={[
                        {
                            title: 'Item 1',
                            text: 'Description 1',
                            element:
                                spendingInMonthCooked.length != 0 ? (<View style={{ flex: 1 }}>
                                    <PieChartComponent pieChartData={spendingInMonthCooked}
                                        title="Monthly spending"
                                        currency={DefaultCurrency.Name ?? ''} />
                                    <Pressable style={[spendingStyles.viewMoreButton, staticStyles.flexDirectionRow]}
                                        onPress={() => { navigation.navigate('SpendingSearch') }}>
                                        <AntDesign name="pluscircleo" color="#495057" size={24} />
                                        <Text style={styles('#495057').textColor}>View more</Text>
                                    </Pressable>
                                </View>) : <></>
                        },
                        {
                            title: 'Item 2',
                            text: 'Description 2',
                            element:
                                spendingInWeekCooked.length != 0 ? (<View style={{ flex: 1 }}>
                                    <PieChartComponent pieChartData={spendingInWeekCooked}
                                        title="Weekly spending"
                                        currency={DefaultCurrency.Name ?? ''} />
                                    <Pressable style={[spendingStyles.viewMoreButton, staticStyles.flexDirectionRow]}
                                        onPress={() => { navigation.navigate('SpendingSearch') }}>
                                        <AntDesign name="pluscircleo" color="#495057" size={24} />
                                        <Text style={styles('#495057').textColor}>View more</Text>
                                    </Pressable>
                                </View>) : <></>
                        }
                    ]}
                />
                {/* </ScrollView> */}
            </ScrollView>
            <Modal
                transparent
                visible={ShowAddModal}
                animationType='slide'
                onRequestClose={() => { openModal(false) }}>
                <View style={staticStyles.addTaskOverlay}>
                    <View style={staticStyles.addTaskContainer}>
                        <Pressable style={[staticStyles.iconSmall, staticStyles.iconClose]}
                            onPress={() => { openModal(false) }}>
                            <AntDesign name="close" color="#787878" size={24} />
                        </Pressable>
                        <View style={staticStyles.modalContentContainer}>
                            <Text style={styles('black').title}>Add New {AddType == "Spending" ? "Expense" : AddType}</Text>

                            <View style={[staticStyles.numericBox]}>
                                <Text style={staticStyles.smallText}>Amount</Text>

                                <NumericInput value={Amount} type='up-down' minValue={0} onChange={setAmount} />
                            </View>
                            <Text style={staticStyles.smallText}>Currency</Text>

                            <View style={staticStyles.input1} >
                                <Picker
                                    placeholder='Currency'
                                    selectedValue={Currency}
                                    onValueChange={setCurrency}
                                    style={{ color: 'black' }}>
                                    {currencies.map(currency => (
                                        <Picker.Item key={currency.id}
                                            label={currency.Name}
                                            value={currency.id} />
                                    ))}
                                </Picker>
                            </View>

                            {AddType == 'Spending' &&
                                <View>
                                    <TextInput
                                        value={Note}
                                        placeholder='Note'
                                        onChangeText={setNote}
                                        placeholderTextColor="#888"
                                        style={staticStyles.input1}></TextInput>
                                    <View style={staticStyles.input1}>
                                        <Picker
                                            placeholder='Type'
                                            selectedValue={Type}
                                            onValueChange={setType}
                                            style={{ color: 'black' }}>
                                            <Picker.Item label="Daily" value="Daily" />
                                            <Picker.Item label="Habit" value="Habit" />
                                            <Picker.Item label="Gifts" value="Gifts" />
                                            <Picker.Item label="Shopping" value="Shopping" />
                                            <Picker.Item label="Bills" value="Bills" />
                                            <Picker.Item label="Pet" value="Pet" />
                                            <Picker.Item label="Others" value="Others" />
                                        </Picker>
                                    </View>
                                    {
                                        Type == 'Others' &&
                                        <TextInput
                                            value={CustomType}
                                            placeholder='Spending type'
                                            onChangeText={setCustomType}
                                            placeholderTextColor="#888"
                                            style={staticStyles.input1}></TextInput>
                                    }
                                    <View>
                                        <View style={[staticStyles.checkBox]}>
                                            <CheckBox tintColors={{ true: '#007AFF', false: '#8E8E93' }} value={IsSpecial} onValueChange={setIsSpecial}></CheckBox>
                                            <Text>Special spending?</Text>
                                        </View>
                                    </View>
                                </View>
                            }

                            {(AddType != 'Remaining') &&
                                <TextInput
                                    placeholder='Pick a deadline'
                                    value={SelectedDate.toDateString()}
                                    onPress={() => showDatePicker()}
                                    style={staticStyles.input1}></TextInput>
                            }

                        </View>
                        <Text style={styles().validateMessaage}>{ValidateMessage || ''}</Text>
                        <Button title="Add" style={staticStyles.button}
                            onPress={() => { handleAdd() }}>
                        </Button>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>




    )
};

export default SpendingHomeScreen;
