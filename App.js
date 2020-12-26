
import React from 'react';
import WelcomeScreen from './Screens/Welcome';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { StudentNavigator } from './components/StudentNavigator';
import { TeacherNavigator } from './components/TeacherNavigator';
import DoHomeWork from './StudentScreens/DoHomeWork';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import SeeAnswers from './TeachersScreen/seeAnswers';

export default function App() {
  return (
    <AppContainer/>
);
}
const Navigator = createSwitchNavigator({ 
   Welcome:WelcomeScreen,
  Drawer:AppDrawerNavigator,
  homework:DoHomeWork,
  seeanswer:SeeAnswers,
  tab2:{screen:TeacherNavigator},
  tab:{screen:StudentNavigator}
})
const AppContainer = createAppContainer(Navigator)
