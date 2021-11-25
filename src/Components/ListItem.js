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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('screen');

const ListItem = ({AsyncList}) => {
  const [Filter, setFilter] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState(null);
  const [List, setList] = useState(AsyncList);

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

    setList(tasks.sort().reverse());
    console.log(tasks);
  };

  {
    console.log(List);
  }

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
                setEdit(items.item.id);
                console.log(items.item.id);
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
                        }}>
                        {items.item.data}
                        {items.item.id}
                      </Text>
                      <View>
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
                    <View style={{marginTop: 10}}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: '#000',
                          fontStyle: 'italic',
                        }}>
                        {items.item.time.substr(0, 25)}
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
                  <Input placeholder={items.item.data} />
                  <TouchableOpacity
                    style={{alignItems: 'flex-end'}}
                    onPress={() => {
                      setEdit(null);
                      console.log(edit);
                    }}>
                    <Ionicons name="checkmark-done" size={25} color="#000" />
                  </TouchableOpacity>
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
