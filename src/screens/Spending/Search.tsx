
import { styles } from "../../styles/global";
import { spendingStyles } from "../../styles/spending";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Modal, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import AntDesign from "react-native-vector-icons/AntDesign";
import { processDeleteSpending, processSearchSpending, processUpdateSpending } from "../../controllers/spendingController";
import dayjs, { Dayjs } from 'dayjs';
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import NumericInput from "react-native-numeric-input";
import CheckBox from "@react-native-community/checkbox";
import { Button } from "react-native-elements";
import { getToken } from "../../utils/EncStorage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import PieChartComponent from "../../utils/PieChart";
import { getUserDefaultCurrency, groupBy } from "../../utils/utils";

const SpendingSearchScreen = () => {
    const staticStyles = styles();
    const defaultStyles = useDefaultStyles('light');
    const [FromDate, setFromDate] = useState<DateType>();
    const [ToDate, setToDate] = useState<DateType>();

    const [Spendings, setSpendings] = useState<any[]>([]);
    const [SpendingInMonthCooked, setSpendingInMonthCooked] = useState<any[]>([]);
    const originalSpendings = useRef<any[]>([]);
    const [IsAscending, setIsAscending] = useState(false);
    const [sortedType, setSortedType] = useState('');
    const [FilterType, setFilterType] = useState('');
    const [FilteredValue, setFilteredValue] = useState('');
    const [FilterValues, setFilterValues] = useState<any[]>([]);
    const [IsDropDownOpen, setIsDropDownOpen] = useState(false);
    const [IsUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const [SpendingId, setSpendingId] = useState('');
    const [Type, setType] = useState('');
    const knownTypes = ['Daily', 'Bills', 'Habit', 'Gifts', 'Shopping', 'Pet'];
    const [Note, setNote] = useState('');
    const [Amount, setAmount] = useState(0);

    const [currencies, setCurrencies] = useState<any[]>([]);
    const [Currency, setCurrency] = useState('');
    const [DefaultCurrency, setDefaultCurrency] = useState({});

    const [CustomType, setCustomType] = useState('');
    const [IsSpecial, setIsSpecial] = useState(false);
    const [ValidateMessage, setValidateMessage] = useState('');
    const [SelectedDate, setSelectedDate] = useState(new Date())

    const [PieChartTitle, setPieChartTitle] = useState('');

    useEffect(() => {
        fetch();
    }, [])
    const fetch = async () => {
        setDefaultCurrency(await getUserDefaultCurrency());
        const allCurencies = await getToken('ALL_CURRENCIES');
        setCurrencies(JSON.parse(allCurencies ?? ''));
    }
    const handleSearchSpending = async () => {
        if(!ToDate) {
            setToDate(dayjs.isDayjs(FromDate) ? FromDate.toDate() : FromDate)
        }
        const nativeFromDate = dayjs.isDayjs(FromDate) ? FromDate.toDate() : FromDate;
        const nativeToDate = dayjs.isDayjs(ToDate) ? ToDate.toDate() : (ToDate || dayjs(nativeFromDate).add(1, 'day').toDate());

        const formattedFrom = dayjs(nativeFromDate).format('DD/MM/YYYY');
        const formattedTo = dayjs(nativeToDate).format('DD/MM/YYYY');

        setPieChartTitle(formattedFrom + ' - ' + formattedTo)
        if (nativeFromDate instanceof Date && nativeToDate instanceof Date) {
            const response = await processSearchSpending(nativeFromDate, nativeToDate);
            if (response.status = 200) {
                console.log(response.data);
                setSpendings(response.data);
                originalSpendings.current = response.data;
            }
        }
    }
    const sortSpending = (type) => {
        setSortedType(type);
        setIsAscending(!IsAscending);
        const sorted = [...Spendings].sort((a, b) => {
            let aValue = a[type];
            let bValue = b[type];

            if (type === 'Date' && aValue && bValue && aValue._seconds !== undefined) {
                aValue = aValue._seconds;
                bValue = bValue._seconds;
            }

            if (typeof aValue === 'string') {
                return IsAscending
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (typeof aValue === 'boolean') {
                aValue = aValue ? 1 : 0;
                bValue = bValue ? 1 : 0;
            }

            if (typeof aValue === 'number') {
                return IsAscending
                    ? aValue - bValue
                    : bValue - aValue
            }

            return 0;

        })
        setSpendings(sorted);
    }
    const resetFilter = () => {
        setSpendings(originalSpendings.current);
        setSortedType('');
        setFilteredValue('');
    }
    const openDropdown = (type) => {
        setFilterType(type);
        setFilterValues([...new Set(originalSpendings.current.map(s => s[type]))]);
        setFilteredValue('');
        setIsDropDownOpen(true);
    }
    const dropDownItemOnClick = (item) => {
        setFilteredValue(item);
        setIsDropDownOpen(false)
        if (item) {
            setSpendings(originalSpendings.current.filter(x => x[FilterType] == item));
        }
    }
    const openUpdateModal = (item) => {
        setSpendingId(item.id)
        setAmount(item.Amount);
        setCurrency(item.Currency.id);
        if (!knownTypes.includes(item.Type)) {
            setCustomType(item.Type)
            setType('Others');
        }
        else {
            setType(item.Type)
        }
        setIsSpecial(item.Special);
        setNote(item.Note);
        setIsUpdateModalOpen(true);
        setSelectedDate(new Date(item.Date._seconds * 1000));
    }
    const handleDeleteSpending = async (itemId) => {
        const response = await processDeleteSpending(itemId);
        if (response.status == 200) {
            handleSearchSpending();
        }

    }
    const handleUpdateSpending = async () => {
        const isValid = validateFields();
        if (isValid) {
            const response = await processUpdateSpending(SpendingId, Amount, Currency, Type == 'Others' ? CustomType : Type, Note, IsSpecial, SelectedDate);
            if (response.status == 200) {
                handleSearchSpending();
            }
        }

        setIsUpdateModalOpen(false);
    }
    const validateFields = () => {
        let message = "";
        if (Amount == 0) {
            message += "* Please specify amount"
        }
        if (Type == "Others" && CustomType == "") {
            message += "\n* Please fill in spending type"
        }

        setValidateMessage(message);
        if (message == "") {
            return true;
        }
        return false;
    }
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
    useEffect(() => {
        const grouped = Object.entries(groupBy(Spendings, "Type", knownTypes)).map(([key, items]: [any, any], index: number) => {
            const totalAmount = items.reduce((sum: any, item: any) => sum + item.Amount, 0);

            return {
                label: key,
                value: totalAmount,
                key: index + 1,
                svg: { fill: `rgb(${Math.floor(180 + Math.random() * 75)},${Math.floor(180 + Math.random() * 75)}, ${Math.floor(180 + Math.random() * 75)})` }
            };
        })
        setSpendingInMonthCooked(grouped);
    }, [Spendings])

    const tableItem = ({ item }: { item: any }) => {
        return (
            <View style={spendingStyles.spendingRow} key={item.id}>
                <Text style={spendingStyles.tableItem}>{dayjs(item.Date._seconds * 1000).format('DD/MM/YYYY')}</Text>
                <Text style={spendingStyles.tableItem}>{knownTypes.includes(item.Type) ? item.Type : 'Others'}</Text>
                <Text style={spendingStyles.tableItem}>{item.Amount} {item.Currency.Name}</Text>
                <Text style={spendingStyles.tableItem}>{item.Special ? 'Yes' : 'No'}</Text>
                <View style={spendingStyles.tableItem}>
                    <View style={spendingStyles.actionRow}>

                        <Pressable style={spendingStyles.xsSmallIcon}
                            onPress={() => { openUpdateModal(item) }}>
                            <AntDesign name='edit'
                                color='black' size={24} style={{flexShrink: 1}}/>
                        </Pressable>
                        <Pressable style={spendingStyles.xsSmallIcon}
                            onPress={() => { handleDeleteSpending(item.id) }}>
                            <AntDesign name='close'
                                color='red' size={24}  style={{flexShrink: 1}}/>
                        </Pressable>
                    </View>

                </View>
            </View>
        )
    }
    const dropdownItem = ({ item }: { item: any }) => {
        return (
            <Pressable
                style={spendingStyles.dropDownItem}
                key={item}
                onPress={() => dropDownItemOnClick(item)}>
                <Text>{item}</Text>
            </Pressable>

        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={staticStyles.background}>
                <ScrollView nestedScrollEnabled={true}
                    contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={spendingStyles.searchHeader}>
                        {/* <View style={spendingStyles.dateRangePickerContainer}>  */}
                        <DateTimePicker
                            mode="range"
                            startDate={FromDate}
                            endDate={ToDate}
                            onChange={({ startDate, endDate }) => { setFromDate(startDate); setToDate(endDate) }}
                            maxDate={new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())}
                            minDate={new Date(new Date().getFullYear() - 2, new Date().getMonth(), new Date().getDate())}

                            styles={{
                                ...defaultStyles,
                                today: spendingStyles.dateRangePickerToday,
                                selected: spendingStyles.dateRangePickerSelected,
                                selected_label: spendingStyles.dateRangePickerSelectedLabel,
                                range_fill: { backgroundColor: '#c6b7fd' },
                            }
                            }
                            max={1000}
                            calendar="gregory"
                            showOutsideDays={true} />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                            <Pressable style={[spendingStyles.searchButton, staticStyles.flexDirectionRow]}
                                onPress={() => { handleSearchSpending() }}>
                                <AntDesign name="search1" color="white" size={24} />
                                <Text style={styles('white').textColor}>Search</Text>
                            </Pressable>{Spendings.length != 0 && (
                                <Pressable style={[spendingStyles.searchButton, staticStyles.flexDirectionRow]}
                                    onPress={() => { resetFilter() }}>
                                    <AntDesign name="reload1" color="white" size={24} />
                                    <Text style={styles('white').textColor}>Reset filter</Text>
                                </Pressable>

                            )}
                        </View>
                    </View>
                    {Spendings.length != 0 && (
                        <>
                            <ScrollView nestedScrollEnabled={true} style={spendingStyles.spendingContainer}>

                                <View style={spendingStyles.spendingHeaderRow} >
                                    <View style={spendingStyles.tableItem}>
                                        <Pressable>
                                            <Text>Date</Text>
                                        </Pressable>
                                        <Pressable style={spendingStyles.xsSmallIcon}
                                            onPress={() => { sortSpending('Date') }}>
                                            <AntDesign name={(sortedType == "Date" && !IsAscending) ? "caretup" : "caretdown"}
                                                color={sortedType == "Date" ? "#51cf66" : 'black'} size={10} />
                                        </Pressable>
                                    </View>
                                    <View style={spendingStyles.tableItem}>
                                        <Pressable onPress={() => (openDropdown('Type'))}>
                                            <Text>Type</Text>
                                        </Pressable>
                                        <Pressable style={spendingStyles.xsSmallIcon}
                                            onPress={() => { sortSpending('Type') }}>
                                            <AntDesign name={(sortedType == "Type" && !IsAscending) ? "caretup" : "caretdown"}
                                                color={sortedType == "Type" ? "#51cf66" : 'black'} size={10} />
                                        </Pressable>
                                    </View>
                                    <View style={spendingStyles.tableItem}>
                                        <Pressable>
                                            <Text>Price</Text>
                                        </Pressable>
                                        <Pressable style={spendingStyles.xsSmallIcon}
                                            onPress={() => { sortSpending('Amount') }}>
                                            <AntDesign name={(sortedType == "Amount" && !IsAscending) ? "caretup" : "caretdown"}
                                                color={sortedType == "Amount" ? "#51cf66" : 'black'} size={10} />
                                        </Pressable>
                                    </View>
                                    <View style={spendingStyles.tableItem}>
                                        <Pressable>
                                            <Text>Special</Text>
                                        </Pressable>
                                        <Pressable style={spendingStyles.xsSmallIcon}
                                            onPress={() => { sortSpending('Special') }}>
                                            <AntDesign name={(sortedType == "Special" && !IsAscending) ? "caretup" : "caretdown"}
                                                color={sortedType == "Special" ? "#51cf66" : 'black'} size={10} />
                                        </Pressable>
                                    </View>
                                    <View style={spendingStyles.tableItem}>
                                        <Text>Action</Text>
                                    </View>
                                </View>
                                <FlatList data={Spendings}
                                    keyExtractor={item => item.id}
                                    renderItem={tableItem}
                                    scrollEnabled={false}
                                    // horizontal= {true}
                                    nestedScrollEnabled={true}>
                                </FlatList>
                            </ScrollView>
                        </>)
                    }
                    <View style={{ flex: 1, width: '100%' }}>
                        <PieChartComponent pieChartData={SpendingInMonthCooked}
                            title={PieChartTitle}
                            currency={DefaultCurrency.Name ?? ''} />
                    </View>
                </ScrollView>
            </View>
            <Modal
                transparent
                visible={IsDropDownOpen}
                animationType='slide'
                onRequestClose={() => setIsDropDownOpen(false)}>
                <View style={spendingStyles.dropDownOverlay}>
                    <View style={spendingStyles.dropDownContainer}>

                        <FlatList data={FilterValues}
                            style={{ width: '100%' }}
                            keyExtractor={item => item}
                            renderItem={dropdownItem}
                        ></FlatList>
                        <Pressable style={[spendingStyles.closeDropdownButton, staticStyles.flexDirectionRow]}
                            onPress={() => { setIsDropDownOpen(false) }}>
                            <AntDesign name="close" color="white" size={24} />
                        </Pressable>
                    </View>
                </View>


            </Modal>
            <Modal
                transparent
                visible={IsUpdateModalOpen}
                animationType='slide'
                onRequestClose={() => {
                    setIsUpdateModalOpen(false)
                }}>
                <View style={staticStyles.addTaskOverlay}>
                    <View style={staticStyles.addTaskContainer}>
                        <Pressable style={[staticStyles.iconSmall, staticStyles.iconClose]}
                            onPress={() => { setIsUpdateModalOpen(false) }}>
                            <AntDesign name="close" color="#787878" size={24} />
                        </Pressable>
                        <View style={staticStyles.modalContentContainer}>
                            <Text style={styles('black').title}>Update spending</Text>

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
                                        {knownTypes.map(item => (
                                            <Picker.Item key={item} label={item} value={item} />
                                        ))
                                        }
                                        <Picker.Item label='Others' value='Others' />
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
                                <TextInput
                                    placeholder='Pick a deadline'
                                    value={SelectedDate.toDateString()}
                                    onPress={() => showDatePicker()}
                                    style={staticStyles.input1}></TextInput>
                            </View>


                        </View>
                        <Text style={styles().validateMessaage}>{ValidateMessage || ''}</Text>
                        <Button title="Update" style={staticStyles.button}
                            onPress={() => { handleUpdateSpending() }}>
                        </Button>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>

    )
};

export default SpendingSearchScreen;

