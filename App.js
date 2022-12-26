import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { dummyData } from './dummyData'

const App = () => {
  const [mseconds, setMSeconds] = useState(0);
  var SharedPreferences = require('react-native-shared-preferences');

  const saveDataToSharedPref = async (key, val) => {
    try {
      await SharedPreferences.setItem(`${key}`, JSON.stringify(val));
    } catch (e) {
      console.log(e);
    } finally {
      console.log(`Saved ${key} to shared preferences value: ${val}`);
    }
  }

  const buttonClicked = () => {
    SharedPreferences.clear();

    console.log('Execution started');
    const startTime = Date.now();

    dummyData.forEach(e => {
      saveDataToSharedPref(e, e);
    });

    console.log('Execution ended');
    const endTime = Date.now();
    var executionTime = endTime - startTime;
    console.log(executionTime);
    setMSeconds(executionTime);

    SharedPreferences.clear();
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollStyle}>
        <Text style={styles.centeredItem}>Press button to start execution.</Text>
        <Text style={styles.centeredItem}>Your last execution took {mseconds} ms.</Text>
      </ScrollView>
      <TouchableOpacity onPress={buttonClicked}>
        <View style={styles.circleFloatingButton}>
          <Text style={styles.textFloatingButton}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleFloatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#2196f3',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textFloatingButton: {
    color: '#fff',
    fontSize: 30,
  },
  scrollStyle: {
    flex: 1,
  },
  centeredItem: {
    textAlign: 'center',
    alignSelf: 'center',
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
  }
})