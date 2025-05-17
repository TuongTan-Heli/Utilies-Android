import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../../styles/global';
import { Button } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import NumericInput from 'react-native-numeric-input';
import { getUserTask, processAddTask } from '../../controllers/taskController';
import { useNavigation } from '@react-navigation/native';
import { getAll } from '../../controllers/currencyController';
import { handleDataFromFireStore } from '../../utils/utils';


const TaskHomeScreen = () => {
  const [addTask, showAddTask] = useState(false);
  const [TaskName, setTaskName] = useState('');
  const [Description, setDescription] = useState('');
  const [Deadline, setDeadline] = useState(new Date());
  const [Type, setType] = useState('To do');
  const [Priority, setPriority] = useState(0);
  const [EnableNoti, setEnableNoti] = useState(false);
  const [NotiOnDeadline, setNotiOnDeadline] = useState(0);
  const [Price, setPrice] = useState(0);
  const [Currency, setCurrency] = useState('');
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [userTask, setUserTask] = useState<any[]>([]);
  const navigation = useNavigation<any>();


  useEffect(() => {

    fetch();

  }, [])
  const fetch = async () => {
    setUserTask(handleDataFromFireStore((await getUserTask()).data));
    setCurrencies(handleDataFromFireStore((await getAll()).data));
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDeadline(currentDate);
  }

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: Deadline,
      onChange,
      mode: 'date',
    });
  }

  const staticStyles = styles();
  const handleAddNewTask = async () => {
    const isValid = validateFields();
    if (isValid) {
      const loginStatus = await processAddTask(TaskName, Description, Type, Deadline, EnableNoti, Priority, NotiOnDeadline, Price, Currency);
      if (loginStatus == 200) {
        fetch();
        showAddTask(false);
      }
    }
  }

  const validateFields = () => {

    return true;
  }
  return (
    <View style={staticStyles.background}>
      <View style={staticStyles.taskDashboard}>
        <View style={staticStyles.taskList}>
          {userTask.map(task => (
            <View key={task.id}>
              <Text>{task.data.Name?.stringValue}</Text>
            </View>
          ))}
          <Pressable
            style={staticStyles.iconSmall}
            onPress={() => showAddTask(true)}>
            <AntDesign name="pluscircleo" color="#787878" size={24} />
          </Pressable>
        </View>
        <View style={staticStyles.taskInfo}>

          {/* //Add task modal */}
          <Modal
            transparent
            visible={addTask}
            animationType='slide'
            onRequestClose={() => showAddTask(false)}>
            <View style={staticStyles.addTaskOverlay}>
              <View style={staticStyles.addTaskContainer}>
                <Pressable style={[staticStyles.iconSmall, staticStyles.iconClose]}
                  onPress={() => showAddTask(false)}>
                  <AntDesign name="close" color="#787878" size={24} />
                </Pressable>
                <View style={staticStyles.addTaskContentContainer}>
                  <Text style={styles('black').title}>Add new task</Text>
                  <TextInput
                    placeholder='Task name'
                    onChangeText={setTaskName}
                    style={staticStyles.input1}></TextInput>
                  <TextInput
                    placeholder='Description'
                    onChangeText={setDescription}
                    style={staticStyles.input1}></TextInput>
                  <TextInput
                    placeholder='Pick a deadline'
                    value={Deadline.toDateString()}
                    onPress={() => showDatePicker()}
                    style={staticStyles.input1}></TextInput>
                  <View style={[staticStyles.numericBox]}>
                    <Text style={staticStyles.smallText}>Priority</Text>
                    <NumericInput type='up-down' minValue={0} onChange={setPriority} />
                  </View>
                  <View style={staticStyles.input1} >
                    <Picker
                      placeholder='Type'
                      selectedValue={Type}
                      onValueChange={setType}>
                      <Picker.Item label="To do" value="To do" />
                      <Picker.Item label="To buy" value="To buy" />
                    </Picker>
                  </View>
                  {Type == 'To do' ?
                    <View>
                      <View style={[staticStyles.checkBox]}>
                        <CheckBox value={EnableNoti} onValueChange={setEnableNoti}></CheckBox>
                        <Text>Enable notification</Text>
                      </View>
                      <View style={staticStyles.numericBox}>
                        <Text style={staticStyles.smallText}>Reminds me before deadline how many days?</Text>
                        <NumericInput type='up-down' minValue={0} onChange={setNotiOnDeadline} />
                      </View>
                    </View>
                    :
                    <View>
                      <View style={staticStyles.numericBox}>
                        <Text style={staticStyles.smallText}>Price</Text>
                        <NumericInput type='up-down' minValue={0} onChange={setPrice} />
                      </View>
                      <View style={staticStyles.input1} >
                        <Picker
                          placeholder='Currency'
                          selectedValue={Currency}
                          onValueChange={setCurrency}>
                          {currencies.map(currency => (
                            <Picker.Item key={currency.id}
                              label={currency.data.Name?.stringValue}
                              value={currency.id} />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  }
                </View>
                <Button title="Add new task" style={staticStyles.button}
                  onPress={() => handleAddNewTask()}>
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default TaskHomeScreen;
