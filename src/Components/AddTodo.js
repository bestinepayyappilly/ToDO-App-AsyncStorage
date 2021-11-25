import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('screen');
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Input} from 'react-native-elements';

const AddTodo = ({List}) => {
  const [input, setInput] = useState(null);
  const [list, setList] = useState(null);
  const [prevTodo, setPrevTodo] = useState(null);
  var time = new Date();

  useEffect(() => {
    List(prevTodo);
    getTasks();
    updateList();
  }, [input]);

  const getTasks = () => {
    AsyncStorage.getItem('hola')
      .then(e => {
        setPrevTodo(e);
        console.log(list);
      })
      .catch(e => console.log(e));
  };

  const updateList = async () => {
    let response = await AsyncStorage.getItem('hola');
    let tasks = (await JSON.parse(response)) || [];

    setList(tasks);
    console.log(tasks);
  };

  const storeTasks = (key, value) => {
    const taskList = [...list, value];
    if (value !== null) {
      AsyncStorage.setItem(key, JSON.stringify(taskList));
      console.log(value);
    }
    updateList();
  };

  const handleAddTodo = input => {
    if (input) {
      storeTasks('hola', {
        data: input,
        time: time.toString(),
        id: Math.floor(Math.random() * 100),
        completed: false,
      });
      updateList();

      setInput(null);
    } else {
      alert('Please Enter a Task');
    }
  };
  return (
    <View style={styles.headingContainer}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#f8f8f8',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={[
            {
              fontSize: 30,
              fontWeight: '700',
              color: '#3c4043',
              margin: 10,

              textAlignVertical: 'center',
              opacity: 0.9,
            },
          ]}>
          Todo's <Text style={{color: '#188038'}}>App</Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: width,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            maxHeight: height / 8,
          }}>
          <Input
            onChangeText={e => {
              setInput(e);
            }}
            placeholderTextColor="#000"
            value={input}
            placeholder="Add a Task"
            multiline={true}
            containerStyle={{
              borderRadius: 5,
              flex: 2,
              height: '100%',
              marginHorizontal: 5,
              backgroundColor: '#ccf9',
            }}
            inputStyle={{fontSize: 20, fontWeight: '700'}}
            inputContainerStyle={{borderBottomWidth: 0}}
          />

          <TouchableOpacity
            onPress={() => {
              handleAddTodo(input);
            }}
            style={{
              height: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              backgroundColor: '#212527',
              maxWidth: 40,
              alignSelf: 'center',
            }}>
            <Ionicons name="add" color="#87FF65" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  headingContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
