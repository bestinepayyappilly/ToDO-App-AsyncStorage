import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, View, Dimensions} from 'react-native';

import AddTodo from '../Components/AddTodo';
import TaskComponent from '../Components/TaskComponent';

const {width, height} = Dimensions.get('screen');
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [List, setList] = useState(null);
  const pullList = (...data) => {
    if ([...data]) {
      setList([...data]);
      // console.log(List.map(e => e.data));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f8f8f8" barStyle="dark-content" />
      <AddTodo List={pullList} />
      <TaskComponent List={List} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: 'transparent',
  },
  headingContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
