import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function EmployeeContact() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Name</Text>

        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Phone</Text>
          <Text style={styles.textInput}>402-111-2222</Text>
        </View>
        <Pressable>
          <Icon name='phone' style={styles.findButton} size={25}></Icon>
        </Pressable>

        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Email</Text>
          <Text style={styles.textInput}>example@gmail.com</Text>
        </View>
        <Pressable>
        <Icon name='mail' style={styles.findButton} size={25}></Icon>
          
        </Pressable>
      </ScrollView>
  
      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: '7.5%',
      paddingRight: '7.5%'
      
    },

    header: {
      fontSize: 50,
      fontWeight: 'bold',
      alignSelf: 'center',
      textAlign: 'center',
    },

    inputArea: {
      marginBottom: 5,
      height: 85,
      marginTop: 15,
    },

    findButton:{
      textAlign: 'center',
      backgroundColor: 'limegreen',
      padding: 8,
      borderRadius: 50,
      fontWeight: 'bold',
      width: '50%',
      alignSelf: 'center',
      marginTop: 30
    },

    textInput: {
      borderColor: 'black',
      borderWidth: 1,
      flex:1,
      textAlign: 'center',
      paddingLeft: 5,
      paddingRight: 5,
      height: 50,
      textAlignVertical: 'center'
    },

    inputLabel:{
      height: 50,
      fontSize: 25,
      textAlign: 'center',
      justifyContent: 'center',
      textAlignVertical: 'center',
      textDecorationLine: "underline",
    },
  });
