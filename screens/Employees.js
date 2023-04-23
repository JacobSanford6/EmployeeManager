import { TextInput, StyleSheet, Text, View, Pressable, StatusBar, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { Component, useState } from 'react';
import Constants from 'expo-constants';
import { StatusBarStyle } from 'expo-status-bar';
import { StatusBar as StatusBar2} from 'expo-status-bar';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView, createNavigationContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';


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
  let [editState, setEditState] = useState(false);
  let [editKey, setEditKey] = useState("1");
  let [selectedDays, setSelectedDays] = useState([]);
  let [selectedSkills, setSelectedSkills] = useState([]);

  const editEmployee = (ekey) =>{
    setEditKey(ekey);
    setEditState(true);
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
  
  if (!editState){
    return (
      
      <SafeAreaView style={styles.container}>
        <StatusBar2 ></StatusBar2>
        
        <Pressable>
          <Ionicons name="add-circle" size={statHeight+80} color={'green'} style={styles.addButton}></Ionicons>
        </Pressable>
        <ScrollView>
        <EmployeeButton ename="jake" ekey="1"></EmployeeButton>
        <EmployeeButton ename="alex" ekey="2"></EmployeeButton>
        </ScrollView>  
      </SafeAreaView>
    );
  }else{
    return(
      
      <ScrollView style={styles.container2}>
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>

        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>

        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>

        <Text style={styles.inputLabel}>Skills</Text>
        <SectionedMultiSelect readOnlyHeadings={true} selectText={"Select Skills"} IconRenderer={Icon} items={skills} uniqueKey="id" subKey="children" onSelectedItemsChange={(d)=>{setSelectedSkills(d)}} selectedItems={selectedSkills} ></SectionedMultiSelect>

        <Text style={styles.inputLabel}>Availability</Text>
        <SectionedMultiSelect readOnlyHeadings={true} selectText={"Select Availability"} IconRenderer={Icon} items={weekdays} uniqueKey="id" subKey="children" onSelectedItemsChange={(d)=>{setSelectedDays(d)}} selectedItems={selectedDays} ></SectionedMultiSelect>

        <Pressable onPress={() =>setEditState(false)}>
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
