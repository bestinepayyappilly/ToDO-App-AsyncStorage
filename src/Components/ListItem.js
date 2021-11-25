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

  var time = new Date();

  const updateList = async () => {
    await AsyncStorage.getItem('hola')
      .then(value => {
        if (value !== null) {
          setList(JSON.parse(value));
        }
      })

      .catch(e => alert(e));
  };

  useEffect(() => {
    updateList();
  }, [AsyncList]);

  const handleDeleteTodo = async id => {
    let NewList = List.filter(e => e.id !== id);
    await AsyncStorage.setItem('hola', JSON.stringify(NewList)).catch(e =>
      alert(e),
    );
    updateList();
  };

  const Completed = async (index, value) => {
    let NewList = List;
    NewList.splice(index, 1, value);
    await AsyncStorage.setItem('hola', JSON.stringify(NewList)).catch(e =>
      alert(e),
    );
    updateList();
  };

  const EditText = async (index, value) => {
    let NewList = List;
    NewList.splice(index, 1, value);
    await AsyncStorage.setItem('hola', JSON.stringify(NewList)).catch(e =>
      alert(e),
    );
    setEdit(null);
  };

  return List !== [] ? (
    <View style={styles.MainContainer}>
      <Text style={styles.headingContainer}>To Do's</Text>
      <FlatList
        contentContainerStyle={styles.flatListContentContainer}
        showsVerticalScrollIndicator={false}
        data={List}
        keyExtractor={items => items.time}
        renderItem={items => {
          var swipeoutBtns = [
            {
              text: 'Edit',
              backgroundColor: '#405DE6',
              onPress: () => {
                setText(items.item.data);
                setEdit(items.item.id);
              },
            },
          ];
          return (
            <View key={items.item.time} style={{width: '100%'}}>
              {items.item.id !== edit ? (
                <Swipeout right={swipeoutBtns} autoClose={true}>
                  <View style={styles.listItemContainer}>
                    <View style={styles.listHeaderContainer}>
                      <Text style={styles.textStyleMain}>
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
                          style={styles.mainDeleteTodo}
                          onPress={() => {
                            handleDeleteTodo(items.item.id);
                          }}>
                          <Ionicons name="trash" size={25} color="#519872" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.textContainer1}>
                      <Text style={styles.textStyle1}>
                        Created on : {items.item.time.substr(0, 25)}
                      </Text>
                    </View>
                    <View style={styles.textContainer1}>
                      <Text style={styles.textStyle1}>
                        {items.item.completed ? 'Completed' : 'In Progress'}
                      </Text>
                    </View>
                  </View>
                </Swipeout>
              ) : (
                <View style={styles.editContainer}>
                  <Input
                    multiline={true}
                    value={text}
                    onChangeText={e => {
                      setText(e);
                    }}
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.editTodo}
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
                      style={styles.deleteTodo}
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
  ) : (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>seems lonely</Text>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  MainContainer: {flex: 1, justifyContent: 'center'},
  headingContainer: {
    fontSize: 30,
    fontWeight: '700',
    color: '#188038',
    marginHorizontal: 10,
    marginTop: 20,
  },
  flatListContentContainer: {paddingBottom: 100},
  deleteTodo: {
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
  },
  editTodo: {
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  editContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#F77737',
    padding: 10,
  },
  textStyle1: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  textContainer1: {
    marginTop: 10,
    backgroundColor: '#f8f8f8',
    padding: 5,
    borderRadius: 5,
  },
  mainDeleteTodo: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  textStyleMain: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
    maxWidth: width / 1.5,
  },
  listHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  listItemContainer: {
    flex: 1,
    backgroundColor: '#D4DCCD',
    padding: 10,
  },
});
