import React from 'react';

// react-native components
import {View, Text, StyleSheet} from 'react-native';

const SettingsScreen = ({navigation, route}) => {
  /*
    Component name: SettingsScreen
    Description: This component displays the basic information on how to use this app.
                  We need to add user friendly settings on this page.
    Props: navigation, route
    Exports to: DrawerUserNavigation
    Developed by: Kashish
  */

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 36, marginBottom: 20}}>
        Settings
      </Text>
      <Text style={{fontSize: 24}}>How to use the app?</Text>

      <Text style={styles.textArea}>There are 4 tabs namely:</Text>
      <Text style={styles.paddingLeft}>{'\u2022'} Dashboard</Text>
      <Text style={styles.paddingLeft}>{'\u2022'} Calendar</Text>
      <Text style={styles.paddingLeft}>{'\u2022'} Alerts</Text>
      <Text style={styles.paddingLeft}>{'\u2022'} Settings</Text>
      <Text style={styles.textArea}>
        In the Dashboard tab, you can find the Quicksight dashboard depicting
        the analytics of alerts.
      </Text>
      <Text style={styles.textArea}>
        In the Calendar tab, you can find all the schedules generated.
      </Text>
      <Text style={styles.textArea}>
        In the Alerts tab, you can find all the alerts generated.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  paddingLeft: {
    paddingLeft: 20,
    fontSize: 18,
  },
  textArea: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default SettingsScreen;
