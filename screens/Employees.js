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

let weekdayIds = {
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6,
  "Sunday": 7,
}

let skillsIds = {
  "C#": 101,
  "Javascript": 102,
  "C#": 101,
  "Python":103,
  "Lua":104,
  "Java":105,
  "HTML":106,
  "CSS":107,
  "SQL":108,
  "Camera Work":201,
  "Editting":202,
  "SFX":203,
  "Video Scripting":204,
}

export default function Employees({navigation}) {
  const [editState, setEditState] = useState(false);
  const [editKey, setEditKey] = useState(-1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [phoneText, setPhoneText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [nameText, setNameText] = useState("");
  const [employeeArray, setEmployeeArray] = useState();
  

  const editEmployee = (ekey) =>{
    db.transaction((tx)=>{
      tx.executeSql("select * from employees where id = ?;", [ekey], (tx,res)=>{
        if (res.rows.length > 0){
          setNameText(res.rows._array[0]["name"]);
          setPhoneText(res.rows._array[0]["phone"]);
          setEmailText(res.rows._array[0]["email"]);


          let split1 = res.rows._array[0]["avail"].split("|");
          let availTbl = []
          for (let i=0; i<split1.length; i++){
            console.log(split1[i])
            availTbl.push( weekdayIds[split1[i]] );
          }
          setSelectedDays(availTbl);

          let split2 = res.rows._array[0]["skills"].split("|");
          let skillTbl = [];
          for (let i=0; i<split2.length; i++){
            skillTbl.push( skillsIds[split2[i]] );
          }
          setSelectedSkills(skillTbl);

        }
      })
    });
    setEditKey(ekey);
    setEditState(true);
  }

  const updateEmployeeArray = async () => {
    db.transaction((tx)=>{
      tx.executeSql("select * from employees", [], (tx, res)=>{
        setEmployeeArray( res.rows );
      });
    });
  }

  const getArrayStr = (arr) =>{
    let nstr = ""
    arr.map((part)=>{
      nstr+=part+"|";
    })
    nstr.substring(0,nstr.length-1)
    return nstr;
  }

  const saveEmployee = (ekey) => {
    if (ekey != -1){
      setEditState(false);
      db.transaction((tx)=>{
        
        console.log("removing og.. "+ editKey.toString())
        tx.executeSql("delete from employees where id=", [editKey]);
        tx.executeSql("insert into employees (name, phone, email, avail, skills) values (?, ?, ?, ?, ?)", [nameText, phoneText, emailText, getArrayStr(selectedDays), getArrayStr(selectedSkills)])
        
      });
      setEditKey(-1);
    }else{
      setEditKey(-1);
        setEditState(false);
      db.transaction((tx)=>{
        
        tx.executeSql("insert into employees (name, phone, email, avail, skills) values (?, ?, ?, ?, ?)", [nameText, phoneText, emailText, getArrayStr(selectedDays), getArrayStr(selectedSkills)])
      });
    }
  }

  const addEmployee = () => {
    setNameText("");
    setEmailText("");
    setPhoneText("");
    setSelectedSkills([]);
    setSelectedDays([]);
    setEditKey(-1)
    setEditState(true);
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

  const updateEmployee = (ekey) => {
    
      if (ekey != "-1"){
        editEmployee(ekey)
      }else{
        addEmployee();
      }
    
  }

  function EmployeeButton(props) {
    if (props.ename && props.ekey){
            

      return(
        <View id={props.ekey} style={styles.ebox}>
          <TouchableOpacity style={{flex:8}} onPress={() => {editEmployee(props.ekey)}}>
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
      tx.executeSql("create table if not exists employees (id integer primary key not null, name text, phone text, email text, avail text, skills text);")
    });
    updateEmployeeArray();
  }

  useEffect(()=> {
    this.onLoad();
  },[]);
  
  if (!editState){
    return (
      
      <SafeAreaView style={styles.container}>
        
        
        <TouchableOpacity>
          <Ionicons name="add-circle" size={statHeight+50} color={'green'} style={styles.addButton} onPress={()=>{updateEmployee(-1)}}></Ionicons>
        </TouchableOpacity>
        <ScrollView>
        <EmployeeButton ename="jake" ekey="1"></EmployeeButton>
        <EmployeeButton ename="alex" ekey="2"></EmployeeButton>

        {employeeArray && employeeArray["_array"]?
        employeeArray["_array"].map(a=>{
          const name = a["name"];
          const id = a["id"]
          return (
          <EmployeeButton key={a["id"]} ename={a["name"]} ekey={a["id"].toString()} ></EmployeeButton>
          )
        })
        
          
        :null
        }

        <TouchableOpacity onPress={()=>navigation.navigate("Search")}>
          <Text style={styles.findButton}>Find Employees</Text>
        </TouchableOpacity>

        </ScrollView>  
      </SafeAreaView>
    );
  }else{
    return(
      
      <ScrollView style={styles.container2}>
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput style={styles.textInput} onChangeText={(nt)=>setNameText(nt)}>{nameText}</TextInput>
        </View>

        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput style={styles.textInput} onChangeText={(nt)=>setPhoneText(nt)}>{phoneText}</TextInput>
        </View>

        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.textInput} onChangeText={(nt)=>setEmailText(nt)}>{emailText}</TextInput>
        </View>

        <Text style={styles.inputLabel}>Skills</Text>
        <SectionedMultiSelect readOnlyHeadings={true} selectText={"Select Skills"} IconRenderer={Icon} items={skills} uniqueKey="id" subKey="children" onSelectedItemsChange={(d)=>{setSelectedSkills(d); console.log(selectedSkills)} } selectedItems={selectedSkills} ></SectionedMultiSelect>
        
        <Text style={styles.inputLabel}>Availability</Text>
        <SectionedMultiSelect readOnlyHeadings={true} selectText={"Select Availability"} IconRenderer={Icon} items={weekdays} uniqueKey="id" subKey="children" onSelectedItemsChange={(d)=>{setSelectedDays(d)}} selectedItems={selectedDays} ></SectionedMultiSelect>

        <TouchableOpacity onPress={() =>{saveEmployee(editKey)}}>
          <Ionicons name='checkmark-circle' color={'green'} size={50} style={{alignSelf:'center'}}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>setEditState(false)}>
          <Ionicons name='close-circle' color={'red'} size={50} style={{alignSelf:'center'}}></Ionicons>
        </TouchableOpacity>
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
