import React, {useEffect, useState} from 'react';
import {
  ScrollViewBase,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {Image} from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from './ListItem';

const {height, width} = Dimensions.get('screen');

const TaskComponent = ({List}) => {
  console.log('This is the List:', List);

  const [AsyncList, setAsyncList] = useState(null);
  const [keys, setKeys] = useState(null);
  // const [items, setItems] = useState(AsyncList);
  const [prevTodo, setPrevTodo] = useState(null);
  const [totalTodo, setTotalTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks();
    // console.log(items);
    updateList();
  }, [List]);

  const updateList = async () => {
    let response = await AsyncStorage.getItem('hola');
    let tasks = (await JSON.parse(response)) || [];

    console.log(tasks);
  };

  const getTasks = async () => {
    await AsyncStorage.getItem('hola')
      .then(value => {
        if (value !== null) {
          setAsyncList(JSON.parse(value)), console.log('get', AsyncList);
          setTotalTodo(JSON.parse(value));
          console.log('total', value);
        }
        // {
        //   if (List || AsyncList) {

        //     console.log('total', totalTodo);
        //   }
        // }
      })

      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  };

  return loading && totalTodo ? (
    <View style={{flex: 1}}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <View
      style={{
        flex: 3,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {totalTodo === [] ? (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/TodoImage.png')}
            style={{
              height: height / 5,
              width: height / 5,
            }}
          />
          <Text style={{fontSize: 30, color: '#188038', fontWeight: '700'}}>
            Oh. So. empty.
          </Text>
        </View>
      ) : (
        <View
          style={{width: '100%', height: '100%', backgroundColor: '#D4DCCD'}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '700',
              color: '#188038',
              marginHorizontal: 10,
              marginTop: 20,
            }}>
            To Do's
            {/* {totalTodo.map(e => e.date)} */}
          </Text>
          {totalTodo ? console.log(totalTodo[8]) : null}

          <ListItem AsyncList={totalTodo} />
        </View>
      )}
    </View>
  );
};

export default TaskComponent;

const styles = StyleSheet.create({});
