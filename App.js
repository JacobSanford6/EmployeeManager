import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Employees from './screens/Employees';
import FindEmployees from './screens/FindEmployees';
import EmployeeInfo from './screens/EmployeeInfo';
import EmployeeContact from './screens/EmployeeContact';
import Ionicons from '@expo/vector-icons/Ionicons'


export { Employees }

const Tab = createBottomTabNavigator();

const shouldShow = (rn) =>{
  console.warn(rn);
  if (rn == "Edit"){
    return false;
  }else{
    return true;
  }
}

export default function App({navigation}) {
  return (
    <NavigationContainer>
      <Tab.Navigator
      
      
      
      screenOptions={({route}) =>({
        tabBarShowLabel:false,

        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name

          if (rn == "Employees"){
            iconName = focused ? "people" : "people-outline";
          }else if (rn == "Search"){
            iconName = focused ? "search" : "search-outline";
          }else if (rn == "Contact"){
            iconName = focused ? "call" : "call-outline";
          }

          return <Ionicons name={iconName} size={size}></Ionicons>
        },

        tabBarStyle:{padding:10, height:70}
        
        
        

      })}


      tabBarOptions={{
        labelStyle: { paddingBottom:10, fontSize: 15},
        
      }}
      

      >
        <Tab.Screen name="Employees" component={Employees} ></Tab.Screen>
        <Tab.Screen name="Search" component={FindEmployees}></Tab.Screen>
        <Tab.Screen name="Contact" component={EmployeeContact}></Tab.Screen>
        
      </Tab.Navigator>
    </NavigationContainer>
    

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
