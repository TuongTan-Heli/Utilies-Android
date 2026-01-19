import React, { useEffect, useState } from 'react';
import { TextInput, ToastAndroid, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { styles } from '../styles/global';
import { Picker } from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input';
import { HandleQuickAdd } from '../controllers/widgetController';
import { getToken } from '../utils/EncStorage';
import LoadingBackground from '../utils/LoadingBackground';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const QuickAddScreen = ({ route }: any) => {
  const type =
    {
      task: 'To do',
      tobuy: 'To buy',
      expense: 'Expense',
    }[route.params?.type as 'task' | 'tobuy' | 'expense'];

  const staticStyles = styles();
  const [Type, setType] = useState(type);
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState(0);
  const [Note, setNote] = useState('');
  const knownTypes = ['Daily', 'Bills', 'Habit', 'Gifts', 'Shopping', 'Pet'];
  const [CustomType, setCustomType] = useState('');
  const [ExpenseType, setExpenseType] = useState(knownTypes[0]);
  const [loading, setLoading] = useState(false);
  const [SelectedDate, setSelectedDate] = useState(new Date());

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
  async function handleAdd() {
    const expenseType = ExpenseType === 'Others' ? CustomType : ExpenseType;
    const session = await getToken('SESSION_TOKEN');
    if (!session) {
      ToastAndroid.show('User not authenticated', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    const status = await HandleQuickAdd(Name, Type, Price, expenseType, session, SelectedDate, Note);
    if (status === 200) {
      ToastAndroid.show('Added successfully', ToastAndroid.SHORT);
      refresh();
    } else {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
    setLoading(false);
  }

  function refresh() {
    setName('');
    setPrice(0);
    setCustomType('');
  }

  useEffect(() => {
    console.log(Type);
    refresh();
  }, [Type]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <LoadingBackground visible={loading}></LoadingBackground>

      <View style={staticStyles.input1}>
        <Text style={[styles('black').title]}>Add item</Text>
        <Picker
          placeholder='Type'
          selectedValue={Type}
          onValueChange={setType}
          style={{ color: 'black' }}>
          <Picker.Item label="To do" value="To do" />
          <Picker.Item label="To buy" value="To buy" />
          <Picker.Item label="Expense" value="Expense" />
        </Picker>
        {Type != 'Expense' && (
          <TextInput
            value={Name}
            placeholder='Name'
            onChangeText={setName}
            placeholderTextColor="#888"
            style={staticStyles.input1}></TextInput>
        )}

        {(Type === "To buy" || Type === "Expense") && (
          <View style={staticStyles.numericBox}>
            <Text style={staticStyles.smallText}>Price</Text>
            <NumericInput value={Price} type='up-down' minValue={0} onChange={setPrice} />
          </View>
        )}

        {Type === "Expense" && (
          <>
            <TextInput
              value={Note}
              placeholder="Note"
              onChangeText={setNote}
              placeholderTextColor="#888"
              style={staticStyles.input1}
            />
            <View style={staticStyles.input1}>
              <Picker
                placeholder="Type"
                selectedValue={ExpenseType}
                onValueChange={setExpenseType}
                style={{ color: 'black' }}>
                {knownTypes.map((t) => (
                  <Picker.Item key={t} label={t} value={t} />
                ))}
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>

            {ExpenseType === 'Others' && (
              <TextInput
                value={CustomType}
                placeholder="Spending type"
                onChangeText={setCustomType}
                placeholderTextColor="#888"
                style={staticStyles.input1}
              />
            )}
            <TextInput
              placeholder='Date'
              value={SelectedDate.toDateString()}
              onPress={() => showDatePicker()}
              style={staticStyles.input1}></TextInput>
          </>
        )}




        <Button title="Add" style={staticStyles.button}
          onPress={() => { handleAdd() }}>
        </Button>
      </View>
    </View>
  );
};

export default QuickAddScreen;


