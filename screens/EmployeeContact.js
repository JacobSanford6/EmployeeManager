import { StyleSheet, Text, View, ScrollView, Pressable, Linking} from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as SQLite from 'expo-sqlite';

function openDatabase(){
  return SQLite.openDatabase("employeeData.db")
}
const db = openDatabase();

export default function EmployeeContact({route}) {
  let [ename, setename] = useState("None");
  let [ephone, setephone] = useState("None");
  let [eemail, seteemail] = useState("None");

  const getStats = () => {
    db.transaction((tx)=>{
      tx.executeSql("select * from employees where id=?", [route.params["ekey"]], (tx, res)=>{
        let row = res.rows["_array"][0]

        setename(row["name"])
        setephone(row["phone"])
        seteemail(row["email"])
      });
    });
  }

  useEffect(()=>{
    if (route.params){
      getStats();
    }
  })

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>{ename}</Text>
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Phone</Text>
          <Text style={styles.textInput}>{ephone}</Text>
        </View>
        <Pressable onPress={()=>{
          Linking.openURL(`tel:${ephone}`)
        }}>
          <Icon name='phone' style={styles.findButton} size={25}></Icon>
        </Pressable>

        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Email</Text>
          <Text style={styles.textInput}>{eemail}</Text>
        </View>
        <Pressable onPress={()=>{
          Linking.openURL(`mailto:${eemail}`)
        }}>
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
      marginBottom: 30
    },

    findButton:{
      textAlign: 'center',
      backgroundColor: 'limegreen',
      padding: 8,
      borderRadius: 50,
      fontWeight: 'bold',
      width: '50%',
      alignSelf: 'center',
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
