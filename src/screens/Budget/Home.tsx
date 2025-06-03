import React, { useEffect, useState } from 'react';
import { ImageBackground, Modal, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from '../../styles/global';
import { Button } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import NumericInput from 'react-native-numeric-input';
import { taskStyles as Styles } from '../../styles/task';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getToken } from '../../utils/EncStorage';
import { getUserDefaultCurrency } from '../../utils/utils';
import { processAddBudget, processDeleteBudget, processGetAllBudget, processUpdateBudget } from '../../controllers/budgetController';
import { processAddRemaining, processDeleteRemaining, processGetAllRemaining, processUpdateRemaining } from '../../controllers/remainingController';
import dayjs from 'dayjs';


const RemainingAndBudgetScreen = () => {
    const [IsModalOpen, setIsModalOpen] = useState(false);
    const [IsEdit, setIsEdit] = useState(false);
    const [IsRemaining, setIsRemaining] = useState(true);

    const [UpdateId, setUpdateId] = useState('');
    const [Day, setDay] = useState(new Date());
    const [Amount, setAmount] = useState(0);
    const [Currency, setCurrency] = useState('');
    const [currencies, setCurrencies] = useState<any[]>([]);
    const [DefaultCurrency, setDefaultCurrency] = useState<any>({});


    const [Budget, setBudget] = useState<any[]>([]);
    const [Remaining, setRemaining] = useState<any[]>([]);

    const [ValidateMessage, setValidateMessage] = useState('');

    useEffect(() => {
        fetch();
    }, [])
    const fetch = async () => {
        try {
            const budget = await processGetAllBudget(); // returns 404? will be caught
            if (budget.status === "Success") {
                setBudget(budget.data);
            }
        } catch (err) {
            console.warn("Budget fetch failed:", err.message);
        }

        try {
            const remaining = await processGetAllRemaining();
            if (remaining.status === "Success") {
                setRemaining(remaining.data);
            }
        } catch (err) {
            console.warn("Remaining fetch failed:", err.message);
        }
        setDefaultCurrency(await getUserDefaultCurrency());
        const allCurencies = await getToken('ALL_CURRENCIES');
        setCurrencies(JSON.parse(allCurencies ?? ''));
    }
    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDay(currentDate);
    }

    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: Day,
            onChange,
            mode: 'date',
        });
    }

    const staticStyles = styles();
    const handleAddNew = async () => {
        const isValid = validateFields();
        if (isValid) {

            const response = IsRemaining ? await processAddRemaining(Amount, Currency) : await processAddBudget(Amount, Currency, Day);
            if (response.status == "Success") {
                fetch();
                showModal(false);
            }
        }
    }

    const handleUpdate = async () => {
        let status = 0;
        const isValid = validateFields();
        if (isValid) {
            status = IsRemaining ? await processUpdateRemaining(UpdateId, Amount, Currency, Day) : await processUpdateBudget(UpdateId, Amount, Currency, Day);

            if (status == 200) {
                fetch();
                showModal(false);
            }
        }
    }

    const showEdit = (object: any) => {
        showModal(true);
        setIsEdit(true);
        setUpdateId(object.id)
        setDay(new Date(IsRemaining ? object.Date._seconds * 1000 : object.To._seconds * 1000));
        setAmount(object.Amount);
        setCurrency(object.Currency?.id);
    }

    const showModal = (isOpen: boolean) => {
        setIsModalOpen(isOpen);
        setIsEdit(false);
        setAmount(0);
        setDay(new Date())
        setCurrency(DefaultCurrency.id);
    }

    const validateFields = () => {

        let message = '';
        if (Amount == 0) {
            message += '* Please specify amount';
        }

        setValidateMessage(message);
        return message == '' ? true : false;
    }

    const handleDelete = async (Id: string) => {
        const status = IsRemaining ? await processDeleteRemaining(Id) : await processDeleteBudget(Id);
        if (status == 200) {
            fetch();
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={staticStyles.background}>
                <View style={staticStyles.thirtyLightblueBackground}>
                </View>
                <Text style={[styles('white').title]}>MY REMAINING AND BUDGET</Text>
                <View style={Styles.taskDashboard}>
                    {/* Todo */}
                    <View style={Styles.taskDashboardTop}>
                        <View style={{ flex: 1 }}>
                            <Button title="Remaining" buttonStyle={IsRemaining ? Styles.todoButtonSelected : Styles.todoButton}
                                onPress={() => setIsRemaining(true)}
                                titleStyle={{ color: IsRemaining ? 'white' : '#dadada' }}>
                            </Button>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Button title="Budget" buttonStyle={IsRemaining ? Styles.tobuyButton : Styles.tobuyButtonSelected}
                                onPress={() => setIsRemaining(false)}
                                titleStyle={{ color: IsRemaining ? '#dadada' : 'white' }}>
                            </Button>
                        </View>

                    </View>
                    <ScrollView style={Styles.taskDashboardContent}>
                        {IsRemaining && Remaining.map(remaining => {
                            return (
                                <Pressable key={remaining.id} onPress={() => { showEdit(remaining) }} style={Styles.taskRow}>
                                    <Text style={Styles.taskName}>{remaining.Amount} {remaining.Currency?.Name} </Text>
                                    <Text style={Styles.taskName}>{dayjs(remaining.Date?._seconds * 1000).format('DD/MM/YYYY')} {remaining.Currency?.Name} </Text>
                                    <Pressable style={Styles.deleteButton}
                                        onPress={() => {
                                            handleDelete(remaining.id)
                                        }}>
                                        <SimpleLineIcons name="close" color={"red"} size={24} />
                                    </Pressable>
                                </Pressable>
                            )
                        })}

                        {!IsRemaining && !IsEdit && Budget.map(budget => {
                            return (
                                <Pressable key={budget.id} onPress={() => { showEdit(budget) }} style={Styles.taskRow}>
                                    <Text style={Styles.taskName}>{budget.Amount} {budget.Currency?.Name} </Text>
                                    <Text style={Styles.taskName}>{dayjs(budget.To?._seconds * 1000).format('DD/MM/YYYY')} {budget.Currency?.Name} </Text>
                                    <Pressable style={Styles.deleteButton}
                                        onPress={() => {
                                            handleDelete(budget.id)
                                        }}>
                                        <SimpleLineIcons name="close" color={"red"} size={24} />
                                    </Pressable>
                                </Pressable>
                            )
                        })}

                    </ScrollView>

                </View>
                <View style={[Styles.taskDashboardBottom, { marginBottom: 20 }]}>
                    <Pressable
                        style={staticStyles.iconSmall}
                        onPress={() => { showModal(true) }}>
                        <AntDesign name="pluscircleo" color="#495057" size={24} />
                    </Pressable>
                    <Text style={Styles.taskName}>{IsRemaining ? 'Report remaining' : 'Set new budget'}</Text>
                </View>
            </View>
            {/* //Add task modal */}
            <Modal
                transparent
                visible={IsModalOpen}
                animationType='slide'
                onRequestClose={() => showModal(false)}>
                <View style={staticStyles.addTaskOverlay}>
                    <View style={staticStyles.addTaskContainer}>
                        <Pressable style={[staticStyles.iconSmall, staticStyles.iconClose]}
                            onPress={() => showModal(false)}>
                            <AntDesign name="close" color="#787878" size={24} />
                        </Pressable>
                        <View style={staticStyles.modalContentContainer}>
                            <Text style={styles('black').title}>{
                                (!IsEdit && IsRemaining) ? 'Report remaining' :
                                    (!IsEdit && !IsRemaining) ? 'Set new budget' :
                                        (IsEdit && IsRemaining) ? 'Update remaining' : 'Update budget'
                            }
                            </Text>
                            <View style={[staticStyles.numericBox]}>
                                <Text style={staticStyles.smallText}>Amount</Text>
                                <NumericInput value={Amount} type='up-down' minValue={0} onChange={setAmount} />
                            </View>
                            <View>
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
                            </View>
                            {!IsRemaining &&
                                <TextInput
                                    placeholder='Pick a deadline'
                                    value={Day.toDateString()}
                                    onPress={() => showDatePicker()}
                                    style={staticStyles.input1}></TextInput>
                            }
                        </View>
                        <Text style={styles().validateMessaage}>{ValidateMessage || ''}</Text>
                        <Button title={IsEdit ? "Update" : "Add"} style={staticStyles.button}
                            onPress={() => { IsEdit ? handleUpdate() : handleAddNew() }}>
                        </Button>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>


    );
};

export default RemainingAndBudgetScreen;
