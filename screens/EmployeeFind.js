import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { Component, useState, useEffect } from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as SQLite from 'expo-sqlite';

let weekdays = [
    {name:"Weekdays", id:0, children:[
      {name:"Monday", id:1},
      {name:"Tuesday", id:2},
      {name:"Wednesday", id:3},
      {name:"Thursday", id:4},
      {name:"Friday", id:5},
      {name:"Saturday", id:6},
      {name:"Sunday", id:7},
    ]}
    
]
let skills = [
  {name:"Software", id:1, children:[
    {name:"C#", id:101},
    {name:"Javascript", id:102},
    {name:"Python", id:103},
    {name:"Lua", id:104},
    {name:"Java", id:105},
    {name:"HTML", id:106},
    {name:"CSS", id:107},
    {name:"SQL", id:108},
  ]},

  {name:"Video Production", id:2, children:[
    {name:"Camera Work", id:201},
    {name:"Editting", id:202},
    {name:"SFX", id:203},
    {name:"Video Scripting", id:204},
  ]},
]

function openDatabase(){
  return SQLite.openDatabase("employeeData.db")
}
const db = openDatabase();

export default function EmployeeFind({navigation}) {
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [employeeArray, setEmployeeArray] = useState();

    const updateEmployeeArray = async () => {
      db.transaction((tx)=>{
        tx.executeSql("select * from employees", [], (tx, res)=>{
          setEmployeeArray( res.rows );
        });
      });
    }

    const getArrayStr = (arr) =>{
      arr = arr.sort();
      let nstr = ""
      arr.map((part)=>{
        nstr+=part+"|";
      })
      nstr.substring(0,nstr.length-1)
      return nstr;
    }

    const contactEmployee = (akey) =>{
      navigation.navigate("Contact", {
        ekey: akey
      })
    }

    const EmployeeButton = (props)=> {
      if (props.ename && props.ekey){
        return(
          <View id={props.ekey} style={styles.ebox}>
            <TouchableOpacity style={{flex:8}} onPress={() => {contactEmployee(props.ekey)}}>
              <Text style={{fontSize:25, textAlign:'center'}}>{props.ename}</Text>
            </TouchableOpacity>
          </View>
        )
      }
      return(
        <Text>Please supply props: ename and ekey</Text>
      )
    }
  
    useEffect(()=> {
      updateEmployeeArray();
    },[]);

    return (
      <ScrollView style={styles.container2}>
        <Text style={styles.inputLabel}>Skills</Text>
        <SectionedMultiSelect readOnlyHeadings={true} selectText={"Select Skills"} IconRenderer={Icon} items={skills} uniqueKey="id" subKey="children" onSelectedItemsChange={(d)=>{setSelectedSkills(d)}} selectedItems={selectedSkills} ></SectionedMultiSelect>

        <Text style={styles.inputLabel}>Availability</Text>
        <SectionedMultiSelect readOnlyHeadings={true} selectText={"Select Availability"} IconRenderer={Icon} items={weekdays} uniqueKey="id" subKey="children" onSelectedItemsChange={(d)=>{setSelectedDays(d)}} selectedItems={selectedDays} ></SectionedMultiSelect>

      {employeeArray && employeeArray["_array"] && employeeArray["_array"].length>0?
        employeeArray["_array"].map(a=>{
          if ( a["skills"] == getArrayStr(selectedSkills).substring(0, a["skills"].length) && getArrayStr(selectedDays).substring(0, a["avail"].length) == a["avail"])  {
            return (
              <EmployeeButton key={a["id"]} ename={a["name"]} ekey={a["id"].toString()} ></EmployeeButton>
              )
          }else if (selectedDays.length==0 && selectedSkills.length==0){
            return (
              <EmployeeButton key={a["id"]} ename={a["name"]} ekey={a["id"].toString()} ></EmployeeButton>
              )
          }
        })
        :null
      }
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    container2: {
      flex: 1,
      paddingLeft: '7.5%',
      paddingRight: '7.5%'
    },

    ebox:{
      backgroundColor: 'white',
      width: '90%',
      alignSelf: 'center',
      flexDirection: 'row',
      padding: 10,
      borderRadius: 100,
      marginTop: 15,
    },

    findButton:{
      textAlign: 'center',
      backgroundColor: 'limegreen',
      padding: 8,
      borderRadius: 50,
      textAlignVertical: 'center',
      fontWeight: 'bold',
      width: '50%',
      alignSelf: 'center',
      marginTop: 30,
      marginBottom: 30
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
