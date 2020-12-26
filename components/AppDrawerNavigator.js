import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Icon} from 'react-native-elements';
import Drawer from './drawer';
import AllChat from '../StudentScreens/Chat';
import HomeWorks from '../StudentScreens/AllHomeWork';
import UploadHomeWork from '../TeachersScreen/UploadHomeWork';
import CheckHomeWork from '../TeachersScreen/CheckHomeWork';
export const AppDrawerNavigator = createDrawerNavigator({
 AllHOMEWORKS:{screen:HomeWorks,
navigationOptions:{
  drawerIcon:<Icon name="book" type="font-awesome" />
}
},
Chats:{screen:AllChat,
  navigationOptions:{
    drawerIcon:<Icon name="send" type="font-awesome" />
  }
  },
},
        {
          contentComponent:Drawer
        },
        {
          initialRouteName : 'AllHOMEWORKS'
        })



