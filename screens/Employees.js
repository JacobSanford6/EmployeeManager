import { TextInput, StyleSheet, Text, View, Pressable, StatusBar, ScrollView, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native';
import { Component, useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { StatusBarStyle } from 'expo-status-bar';
import { StatusBar as StatusBar2} from 'expo-status-bar';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView, createNavigationContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as SQLite from 'expo-sqlite';

function openDatabase(){
  return SQLite.openDatabase("employeeData.db")
}
const db = openDatabase();

const statHeight = StatusBar.currentHeight;
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

export default function Employees({navigation}) {
  const [editState, setEditState] = useState(false);
  const [editKey, setEditKey] = useState("1");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [phoneText, setPhoneText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [nameText, setNameText] = useState("");
  const [employeeArray, setEmployeeArray] = useState();

  const editEmployee = (ekey) =>{
    setEditKey(ekey);
    setEditState(true);
  }

  const updateEmployeeArray = async () => {
    db.transaction((tx)=>{
      tx.executeSql("select * from employees", [], (tx, res)=>{
        console.error(res)
        setEmployeeArray( res.rows );
      });
    });
  }

  const getEmployeeSkills = (id) => {
    console.log("finding")

    db.transaction((tx) =>{
      tx.executeSql("insert into skills (id, skill) values (1, 'testskill')");
      tx.executeSql("select * from skills where id = ?;", [1], (tx, res)=>{
        console.log(res.rows)
      })
    });
  }
  
  const verifyInputs = () => {
    let phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let err = false
    if (!phoneReg.test(phoneText)){
      err = true;
      Alert.alert("Error", "Please type a valid phone number.");
    }
    if(!emailReg.test(emailText)){
      err = true;
      Alert.alert("Error", "Please type a valid email.");
    }

    if(!err){
      setEditState(false);
    }
  }

  const updateEmployee = () => {
    verifyInputs();
  }

  function EmployeeButton(props) {
    if (props.ename && props.ekey){
      return(
        <View id={props.ekey} style={styles.ebox}>
          <TouchableOpacity style={{flex:8}} onPress={() => editEmployee(props.ekey)}>
            <Text style={{fontSize:25, textAlign:'center'}}>{props.ename}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{flex:1}} >
            <Ionicons name='close-circle-outline' size={35} color={'red'} style={{textAlign:'right'}}></Ionicons>
          </TouchableOpacity>
        </View>
      )
    }
    return(
      <Text>Please supply props: ename and ekey</Text>
    )
  }

  onLoad = async () =>{
    updateEmployeeArray();

    db.transaction((tx) =>{
      tx.executeSql("drop table employees");
      tx.executeSql("drop table skills");
      tx.executeSql("create table if not exists employees (id integer primary key not null, name text, phone text, email text, avail text);")
      tx.executeSql("create table if not exists skills (id integer not null, skill text);")
    });
    updateEmployeeArray();
  }

  useEffect(()=> {
    this.onLoad();
  },[]);
  
  if (!editState){
    return (
      
      <SafeAreaView style={styles.container}>
        
        
        <Pressable>
          <Ionicons name="add-circle" size={statHeight+50} color={'green'} style={styles.addButton} onPress={()=>{getEmployeeSkills(1)}}></Ionicons>
        </Pressable>
        <ScrollView>
        <EmployeeButton ename="jake" ekey="1"></EmployeeButton>
        <EmployeeButton ename="alex" ekey="2"></EmployeeButton>

        {employeeArray && employeeArray["_array"]?
          employeeArray["_array"].map(a =>{
            <EmployeeButton ename={a["name"]} ekey={a["id"]}> </EmployeeButton>
          })
        :null
        }

        <Pressable onPress={()=>navigation.navigate("Search")}>
          <Text style={styles.findButton}>Find Employees</Text>
        </Pressable>

        </ScrollView>  
      </SafeAreaView>
    );
  }else{
    return(
      
      <ScrollView style={styles.container2}>
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput style={styles.textInput} onChangeText={(nt)=>setNameText(nt)}></TextInput>
        </View>

        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput style={styles.textInput} onChangeText={(nt)=>setPhoneText(nt)}></TextInput>
        </View>

        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.textInput} onChangeText={(nt)=>setEmailText(nt)}></TextInput>
        </View>

        <Text style={styles.inputLabel}>Skills</Text>
        <SectionedMultiSelect readOnlyHeadings={true} selectText={"Select Skills"} IconRenderer={Icon} items={skills} uniqueKey="id" subKey="children" onSelectedItemsChange={(d)=>{setSelectedSkills(d)}} selectedItems={selectedSkills} ></SectionedMultiSelect>

        <Text style={styles.inputLabel}>Availability</Text>
        <SectionedMultiSelect readOnlyHeadings={true} selectText={"Select Availability"} IconRenderer={Icon} items={weekdays} uniqueKey="id" subKey="children" onSelectedItemsChange={(d)=>{setSelectedDays(d)}} selectedItems={selectedDays} ></SectionedMultiSelect>

        <Pressable onPress={() =>{updateEmployee()}}>
          <Ionicons name='checkmark-circle' color={'green'} size={50} style={{alignSelf:'center'}}></Ionicons>
        </Pressable>
        <Pressable onPress={() =>setEditState(false)}>
          <Ionicons name='close-circle' color={'red'} size={50} style={{alignSelf:'center'}}></Ionicons>
        </Pressable>
      </ScrollView>
    );
  }
    
  
  }

  

  const styles = StyleSheet.create({
    addButton:{
      textAlign: 'center',
    },

    container: {
      flex: 1,
    },
    container2: {
      flex: 1,
      
      paddingLeft: '7.5%',
      paddingRight: '7.5%'
    },

    findButton:{
      textAlign: 'center',
      backgroundColor: 'limegreen',
      padding: 8,
      borderRadius: 50,
      fontWeight: 'bold',
      width: '50%',
      textAlignVertical: 'center',
      alignSelf: 'center',
      marginTop: 30
    },

    ebox:{
      backgroundColor: 'white',
      width: '90%',
      alignSelf: 'center',
      flexDirection: 'row',
      padding: 10,
      borderRadius: 100,
      marginBottom: 15,
    },

    inputLabel:{
      height: 50,
      fontSize: 15,
      textAlign: 'center',
      justifyContent: 'center',
      textAlignVertical: 'center',
      textDecorationLine: "underline",
    },

    statusBar:{
      height: statHeight,
      backgroundColor: 'red',
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

    inputArea: {
      marginBottom: 5,
      height: 85,
    },

    header:{
      textAlign: 'center',
      backgroundColor: 'red',
      fontSize: 28,
    }
  });
