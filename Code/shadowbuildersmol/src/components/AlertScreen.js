import React, {useState, useEffect} from 'react';

// react-native components
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

// amplify api to interact with backend
import {API} from 'aws-amplify';

// custom component
import CustomTextButton from './CustomTextButton';

// function to fetch alerts from endpoint /alerts
function getData() {
  const apiName = 'sbrestapi';
  const path = '/alerts';
  const myInit = {
    // OPTIONAL
    headers: {}, // OPTIONAL
  };

  return API.get(apiName, path, myInit).catch(err => {
    console.log('There has been a problem with your fetch operation: ' + err);
    throw err;
  });
}

const initialState = [];

const AlertScreen = ({navigation, route}) => {
  /*
    Component name: AlertScreen
    Description: This component displays the alerts after fetching from dynamodb
    Props: navigation, route
    Exports to: DrawerUserNavigation
    Developed by: Kashish
  */
  const [myAlerts, setMyAlerts] = useState(initialState);
  const [loader, setLoader] = useState(false);

  async function fetchMyAlerts() {
    try {
      setLoader(true);
      await getData()
        .then(res => {
          console.log(res);

          setMyAlerts(res.data);
          setLoader(false);
        })
        .catch(err => {
          console.log('Api call error');
          alert(err.message);
        });

      console.log('Working fine');
    } catch (err) {
      console.log('Some error', err);
    }
  }

  useEffect(() => {
    fetchMyAlerts();
  }, []);

  return (
    <View style={styles.container}>
      {/* loading bar */}
      <ActivityIndicator size="large" color="#0000ff" animating={loader} />
      <ScrollView style={styles.custom}>
        <Text style={{fontSize: 36, fontWeight: 'bold'}}>Alerts</Text>
        {myAlerts.map(alert => (
          <CustomTextButton key={alert.message} alert={alert} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  custom: {
    flex: 1,
  },
});

export default AlertScreen;
