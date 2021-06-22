/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// import 'react-native-gesture-handler';
import React from 'react';

// react-native components
import {StyleSheet, SafeAreaView} from 'react-native';

// react-navigation component
import {NavigationContainer} from '@react-navigation/native';

// sidebar component
import DrawerUserNavigation from './src/navigation/DrawerUserNavigation';

// amplify authentication
import {withAuthenticator} from 'aws-amplify-react-native';

const App = () => {
  /*
    Component name: App
    Description: This component displays the whole app containing the NavigationContainer (Sidebar).
    Props: None
    Export to: index.js using amplify authentication 
    Developed by: Kashish
  */

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <DrawerUserNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App);
