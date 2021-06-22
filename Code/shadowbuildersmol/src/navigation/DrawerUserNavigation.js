import React, {useState, useEffect} from 'react';

// react-native components
import {Image} from 'react-native';

// react-navigation components
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

// local components
import DashboardScreen from '../components/DashboardScreen';
import CalendarScreen from './../components/CalendarScreen';
import AlertScreen from './../components/AlertScreen';
import SettingsScreen from './../components/SettingsScreen';

// amplify authentication
import {Auth} from 'aws-amplify';

import image from './../splashscreen.jpg';

const Drawer = createDrawerNavigator();

// custom drawer function to include the email and image in sidebar
function CustomDrawerContent(props) {
  const [email, setEmail] = useState('');
  const fetchUserDetails = async () => {
    let user = await Auth.currentAuthenticatedUser();
    const {attributes} = user;
    setEmail(attributes.email);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItem
        label="hello"
        drawerIcon={({focused, color, size}) => (
          <Image
            source={image}
            style={{height: 30, width: 30}}
            resizeMode="contain"
          />
        )}
      /> */}

      <Image
        source={image}
        style={{height: 300, width: 300}}
        resizeMode="contain"
      />
      <DrawerItem label={email} />

      <DrawerItemList {...props} />

      <DrawerItem
        label="Logout"
        onPress={async function signOut() {
          try {
            await Auth.signOut({global: true});
          } catch (error) {
            console.log('error signing out: ', error);
          }
        }}></DrawerItem>
    </DrawerContentScrollView>
  );
}

function DrawerUserNavigation(props) {
  /*
    Component name: DrawerUserNavigation
    Description: This component displays the sidebar
    Props: None
    Export to: App
    Developed by: Kashish
  */

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="Alerts" component={AlertScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerUserNavigation;
