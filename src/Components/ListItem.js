import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Dimensions,
} from 'react-native';
import {Input} from 'react-native-elements/dist/input/Input';
import {CheckBox} from 'react-native-elements/dist/checkbox/CheckBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('screen');

const ListItem = ({AsyncList}) => {
  const [text, setText] = useState(null);
  const [edit, setEdit] = useState(null);
  const [List, setList] = useState(AsyncList);
  const [checked, setChecked] = useState(false);

  var time = new Date();

  useEffect(() => {
    // console.log('this is the asynclist:', AsyncList.sort().reverse());
    updateList();
  }, [AsyncList]);

  const handleDeleteTodo = async id => {
    let NewList = List.filter(e => e.id !== id);
    console.log('newList:', NewList);
    await AsyncStorage.setItem('hola', JSON.stringify(NewList)).catch(e =>
      console.log(e),
    );

    updateList();
  };
  const updateList = async () => {
    let response = await AsyncStorage.getItem('hola');
    let tasks = (await JSON.parse(response)) || [];

    setList(tasks);
    console.log(tasks);
  };

  const Completed = async (index, value) => {
    let NewList = List;
    NewList.splice(index, 1, value);
    await AsyncStorage.setItem('hola', JSON.stringify(NewList)).catch(e =>
      console.log(e),
    );
    console.log(index);
    console.log(NewList.length);
    console.log(NewList);

    updateList();
  };

  const EditText = async (index, value) => {
    let NewList = List;
    NewList.splice(index, 1, value);
    await AsyncStorage.setItem('hola', JSON.stringify(NewList)).catch(e =>
      console.log(e),
    );
    console.log(index);
    console.log(NewList.length);
    console.log(NewList);

    setEdit(null);
  };

  return List ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <FlatList
        // style={{marginBottom: 100}}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        data={List}
        keyExtractor={items => items.time}
        renderItem={items => {
          var swipeoutBtns = [
            {
              text: 'Edit',
              backgroundColor: '#405DE6',

              onPress: () => {
                setText(null);
                setEdit(items.item.id);
              },
            },
          ];
          return (
            <View key={items.item.time} style={{width: '100%'}}>
              {items.item.id !== edit ? (
                <Swipeout right={swipeoutBtns} autoClose={true}>
                  <View
                    style={{
                      // width: '100%',
                      // height: height / 15,
                      flex: 1,
                      backgroundColor: '#D4DCCD',

                      padding: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '700',
                          fontSize: 18,
                          maxWidth: width / 1.5,
                        }}>
                        {items.item.data}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity>
                          <CheckBox
                            checked={items.item.completed ? true : false}
                            uncheckedIcon={
                              <Text style={{fontSize: 25}}>👎🏿</Text>
                            }
                            checkedIcon={<Text style={{fontSize: 25}}>👍🏿</Text>}
                            onPress={() => {
                              Completed(items.index, {
                                data: items.item.data,
                                time: items.item.time,
                                id: Math.floor(Math.random() * 100),
                                completed: items.item.completed ? false : true,
                              });
                            }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            backgroundColor: '#fff',
                            padding: 5,
                            borderRadius: 5,
                          }}
                          onPress={() => {
                            handleDeleteTodo(items.item.id);
                          }}>
                          <Ionicons name="trash" size={25} color="#519872" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 10,
                        backgroundColor: '#f8f8f8',
                        padding: 5,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: '#000',
                        }}>
                        Created on : {items.item.time.substr(0, 25)}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 10,
                        backgroundColor: '#f8f8f8',
                        padding: 5,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: '#000',
                        }}>
                        {items.item.completed ? 'Completed' : 'In Progress'}
                      </Text>
                    </View>
                  </View>
                </Swipeout>
              ) : (
                <View
                  style={{
                    width: '100%',
                    flex: 1,
                    backgroundColor: '#F77737',
                    padding: 10,
                  }}>
                  <Input
                    multiline={true}
                    value={null}
                    onChangeText={e => {
                      setText(e);
                      console.log(e);
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                      borderRadius: 5,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        padding: 5,
                        borderRadius: 5,
                      }}
                      onPress={() => {
                        if (text) {
                          EditText(items.index, {
                            data: text,
                            time: time.toString(),
                            id: Math.floor(Math.random() * 100),
                          });
                        } else {
                          alert('Please Enter Text to Edit');
                        }
                      }}>
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={30}
                        color="#FF220C"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        padding: 5,
                        borderRadius: 5,
                      }}
                      onPress={() => {
                        handleDeleteTodo(items.item.id);
                      }}>
                      <Ionicons name="trash" size={25} color="#519872" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  ) : null;
};

export default ListItem;

const styles = StyleSheet.create({});
