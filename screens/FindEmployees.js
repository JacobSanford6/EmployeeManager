import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { Component, useState } from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
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

export default function FindEmployees() {
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    return (
      <ScrollView style={styles.container2}>
        <Text style={styles.inputLabel}>Skills</Text>
        <SectionedMultiSelect readOnlyHeadings={true} selectText={"Select Skills"} IconRenderer={Icon} items={skills} uniqueKey="id" subKey="children" onSelectedItemsChange={(d)=>{setSelectedSkills(d)}} selectedItems={selectedSkills} ></SectionedMultiSelect>

        <Text style={styles.inputLabel}>Availability</Text>
        <SectionedMultiSelect readOnlyHeadings={true} selectText={"Select Availability"} IconRenderer={Icon} items={weekdays} uniqueKey="id" subKey="children" onSelectedItemsChange={(d)=>{setSelectedDays(d)}} selectedItems={selectedDays} ></SectionedMultiSelect>

        <Pressable>
          <Text style={styles.findButton}>Find Employees</Text>
        </Pressable>
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

    findButton:{
      textAlign: 'center',
      backgroundColor: 'limegreen',
      padding: 8,
      borderRadius: 50,
      height: 50,
      textAlignVertical: 'center',
      fontWeight: 'bold',
      width: '50%',
      alignSelf: 'center',
      marginTop: 30
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
