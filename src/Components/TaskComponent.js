import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Image} from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from './ListItem';

const {height, width} = Dimensions.get('screen');

const TaskComponent = ({List}) => {
  const [totalTodo, setTotalTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateList();
  }, [List]);

  const updateList = async () => {
    await AsyncStorage.getItem('hola')
      .then(value => {
        if (value !== null) {
          setTotalTodo(JSON.parse(value));
        }
      })

      .catch(e => alert(e))
      .finally(() => setLoading(false));
  };

  return loading ? (
    <View
      style={{
        flex: 3,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <View style={styles.parentContainer}>
      {totalTodo ? (
        <View style={styles.listItemContainer}>
          <ListItem AsyncList={totalTodo} />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/TodoImage.png')}
            style={styles.imageStyle}
          />
          <Text style={styles.textStyle}>Oh. So. empty.</Text>
        </View>
      )}
    </View>
  );
};

export default TaskComponent;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D4DCCD',
  },

  imageContainer: {
    alignItems: 'center',
  },
  imageStyle: {
    height: height / 5,
    width: height / 5,
  },
  textStyle: {fontSize: 30, color: '#188038', fontWeight: '700'},
});
