import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../../styles/global';
import { Button } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import NumericInput from 'react-native-numeric-input';
import { getUserTask, processAddTask, processDeleteTask, processUpdateTask } from '../../controllers/taskController';
import { getAll } from '../../controllers/currencyController';
import { taskStyles } from '../../styles/task';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import validator from 'validator';


const TaskHomeScreen = () => {
  const [addTask, setAddTask] = useState(false);
  const [isEditTask, setIsEditTask] = useState(false);
  const [TaskId, setTaskId] = useState('')
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
  const [ToBuyTask, setToBuyTask] = useState<any[]>([]);
  const [TodoTask, setToDoTask] = useState<any[]>([]);
  const [ToDoSelected, setToDoSelected] = useState(true);
  const [Done, setDone] = useState(new Date(+0));
  const [ValidateMessage, setValidateMessage] = useState('');
  const [defaultCurrency, SetDefaultCurrency] = useState('');

  useEffect(() => {
    fetch();
  }, [])
  const fetch = async () => {
    const Task = (await getUserTask()).data;
    setToDoTask(Task.filter((x: any) => x.data.Type == 'To do'));
    setToBuyTask(Task.filter((x: any) => x.data.Type == 'To buy'));
    setCurrencies((await getAll()).data);
  }
  useEffect(() => {
    SetDefaultCurrency(currencies.find(x => x.data?.Name == "AUD")?.id || "");
  }, [currencies])
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

  const handleUpdateTask = async (task: any) => {
    let status = 0;
    const isValid = validateFields();
    if (isValid) {
      if (task) {
        status = await processUpdateTask(task.id, task.data.Name, task.data.Description, task.data.Type, task.data.Deadline, task.data.Done, task.data.EnableNoti, task.data.Priority, task.data.NotiOnDeadline, task.data.Price, task.data.Currency);
      }
      else {
        status = await processUpdateTask(TaskId, TaskName, Description, Type, Deadline, Done, EnableNoti, Priority, NotiOnDeadline, Price, Currency);
      }

      if (status == 200) {
        fetch();
        showAddTask(false);
      }
    }
  }

  const showEditTask = (task: any) => {
    console.log(task);
    setAddTask(true);
    setIsEditTask(true);

    setTaskId(task.id);

    setTaskName(task.data.Name);
    setDescription(task.data.Description);
    setDeadline(new Date(task.data.Deadline));
    setType(task.data.Type);
    setEnableNoti(task.data.EnableNoti);
    setDone(task.data.Done);
    setPriority(task.data.Priority);
    setNotiOnDeadline(task.data.NotiOnDeadline);
    setPrice(task.data.Price);
    setCurrency(task.data.Currency?.id);
  }

  const showAddTask = (isOpen: boolean) => {
    setAddTask(isOpen);
    setIsEditTask(false);
    setTaskName('');
    setDescription('');
    setDeadline(new Date());
    setType('To do');
    setPriority(0)
    setEnableNoti(false);
    setNotiOnDeadline(0);
    setPrice(0);
    setCurrency(defaultCurrency);
  }

  const validateFields = () => {
    let message = '';
    if (validator.isEmpty(TaskName)) {
      message += '* Please fill in task name';
    }
    if (Price == 0 && Type == "To buy") {
      message += '\n * Please fill in price';
    }
    setValidateMessage(message);
    return message == '' ? true : false;
  }

  const markTaskDone = async (task: any) => {
    if (task.data.Done) {
      task.data.Done = null;
    }
    else {
      task.data.Done = new Date();
    }
    handleUpdateTask(task);
  }

  const handleDeleteTask = async (taskId: string) => {
    const status = await processDeleteTask(taskId);
    if (status == 200) {
      fetch();
    }
  }
  return (
    <>
      <View style={staticStyles.background}>
        <Text style={staticStyles.title}>MY TASK</Text>
        <View style={taskStyles.taskDashboard}>
          {/* Todo */}
          <View style={taskStyles.taskDashboardTop}>
            <View style={{ flex: 1 }}>
              <Button title="To do" buttonStyle={ToDoSelected ? taskStyles.todoButtonSelected : taskStyles.todoButton}
                onPress={() => setToDoSelected(true)}
                titleStyle={{ color: ToDoSelected ? 'white' : '#dadada' }}>
              </Button>
            </View>

            <View style={{ flex: 1 }}>
              <Button title="To buy" buttonStyle={ToDoSelected ? taskStyles.tobuyButton : taskStyles.tobuyButtonSelected}
                onPress={() => setToDoSelected(false)}
                titleStyle={{ color: ToDoSelected ? '#dadada' : 'white' }}>
              </Button>
            </View>

          </View>
          <View style={taskStyles.taskDashboardContent}>
            {ToDoSelected && TodoTask.map(task => {
              return (
                <Pressable key={task.id} onPress={() => { showEditTask(task) }} style={taskStyles.taskRow}>
                  <Pressable
                    onPress={() => {
                      markTaskDone(task)
                    }}>
                    <SimpleLineIcons name="check" color={task.data.Done ? "#51cf66" : "#495057"} size={24} />
                  </Pressable>
                  <Text style={taskStyles.taskName}>{task.data.Name}</Text>
                  <Pressable style={taskStyles.deleteButton}
                    onPress={() => {
                      handleDeleteTask(task.id)
                    }}>
                    <SimpleLineIcons name="close" color={"red"} size={24} />
                  </Pressable>
                </Pressable>
              )
            })}

            {!ToDoSelected && ToBuyTask.map(task => {
              return (
                <Pressable key={task.id} onPress={() => { showEditTask(task) }} style={taskStyles.taskRow}>
                  <Pressable
                    onPress={() => {
                      markTaskDone(task)
                    }}>
                    <SimpleLineIcons name="check" color={task.data.Done ? "#51cf66" : "#495057"} size={24} />
                  </Pressable>
                  <Text style={taskStyles.taskName}>{task.data.Name} : {task.data.Price}</Text>
                  <Pressable style={taskStyles.deleteButton}
                    onPress={() => {
                      handleDeleteTask(task.id)
                    }}>
                    <SimpleLineIcons name="close" color={"red"} size={24} />
                  </Pressable>
                </Pressable>
              )
            })}

          </View>
          <View style={taskStyles.taskDashboardBottom}>
            <Pressable
              style={staticStyles.iconSmall}
              onPress={() => { showAddTask(true) }}>
              <AntDesign name="pluscircleo" color="#495057" size={24} />
            </Pressable>
            <Text style={taskStyles.taskName}>Add new task</Text>
          </View>
        </View>

      </View>
      {/* //Add task modal */}
      <Modal
        transparent
        visible={addTask}
        animationType='slide'
        onRequestClose={() => showAddTask(false)}>
        <View style={taskStyles.addTaskOverlay}>
          <View style={taskStyles.addTaskContainer}>
            <Pressable style={[staticStyles.iconSmall, staticStyles.iconClose]}
              onPress={() => showAddTask(false)}>
              <AntDesign name="close" color="#787878" size={24} />
            </Pressable>
            <View style={taskStyles.addTaskContentContainer}>
              <Text style={styles('black').title}>{isEditTask ? "Update task" : "Add new task"}</Text>
              <TextInput
                value={TaskName}
                placeholder='Task name'
                onChangeText={setTaskName}
                placeholderTextColor="#888"
                style={staticStyles.input1}></TextInput>
              <TextInput
                value={Description}
                placeholder='Description'
                onChangeText={setDescription}
                placeholderTextColor="#888"
                style={staticStyles.input1}></TextInput>
              <TextInput
                placeholder='Pick a deadline'
                value={Deadline.toDateString()}
                onPress={() => showDatePicker()}
                style={staticStyles.input1}></TextInput>
              <View style={[staticStyles.numericBox]}>
                <Text style={staticStyles.smallText}>Priority</Text>
                <NumericInput value={Priority} type='up-down' minValue={0} onChange={setPriority} />
              </View>
              <View style={staticStyles.input1}>
                <Picker
                  placeholder='Type'
                  selectedValue={Type}
                  onValueChange={setType}
                  style={{ color: 'black' }}>
                  <Picker.Item label="To do" value="To do" />
                  <Picker.Item label="To buy" value="To buy" />
                </Picker>
              </View>
              {Type == 'To do' ?
                <View>
                  <View style={[staticStyles.checkBox]}>
                    <CheckBox tintColors={{ true: '#007AFF', false: '#8E8E93' }} value={EnableNoti} onValueChange={setEnableNoti}></CheckBox>
                    <Text>Enable notification</Text>
                  </View>
                  <View style={staticStyles.numericBox}>
                    <Text style={staticStyles.smallText}>Reminds me before deadline how many days?</Text>
                    <NumericInput value={NotiOnDeadline} type='up-down' minValue={0} onChange={setNotiOnDeadline} />
                  </View>
                </View>
                :
                <View>
                  <View style={staticStyles.numericBox}>
                    <Text style={staticStyles.smallText}>Price</Text>
                    <NumericInput value={Price} type='up-down' minValue={0} onChange={setPrice} />
                  </View>
                  <View style={staticStyles.input1} >
                    <Picker
                      placeholder='Currency'
                      selectedValue={Currency}
                      onValueChange={setCurrency}
                      style={{ color: 'black' }}>
                      {currencies.map(currency => (
                        <Picker.Item key={currency.id}
                          label={currency.data.Name}
                          value={currency.id} />
                      ))}
                    </Picker>
                  </View>
                </View>
              }
            </View>
            <Text style={styles().validateMessaage}>{ValidateMessage || ''}</Text>
            <Button title={isEditTask ? "Update task" : "Add new task"} style={staticStyles.button}
              onPress={() => { isEditTask ? handleUpdateTask(null) : handleAddNewTask() }}>
            </Button>
          </View>
        </View>
      </Modal>
    </>


  );
};

export default TaskHomeScreen;
