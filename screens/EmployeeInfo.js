import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Component } from 'react';

export default function EmployeeInfo() {
    return (
      <View>
        <Text>test</Text>

        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Phone</Text>
          <Text style={styles.textInput}></Text>
        </View>

      </View>
  
      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    inputArea: {
      marginBottom: 5,
      height: 85,
    },

    textInput: {
      borderColor: 'black',
      borderWidth: 1,
      flex:1,
      textAlign: 'center',
      paddingLeft: 5,
      paddingRight: 5,
      height: 50,
    },

    inputLabel:{
      height: 50,
      fontSize: 15,
      textAlign: 'center',
      justifyContent: 'center',
      textAlignVertical: 'center',
      textDecorationLine: "underline",
    },

  });
