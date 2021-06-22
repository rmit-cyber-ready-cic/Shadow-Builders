import React, {useState} from 'react';

// react-native components
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Button,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {API} from 'aws-amplify';

Icon.loadFont();

function postData(currentAlert) {
  const apiName = 'sbrestapi';
  const path = '/alerts';
  const myInit = {
    // OPTIONAL
    body: {
      userId: 'efgh',
      message: '122',
      payload: {
        alertIn: 'Display Room 2',
        assetName: 'ac_vent_2',
        link: 'https://<region>.sumerian.aws/<Unique id>.scene',
        threshold: 13,
      },
    }, // replaced the values
    headers: {}, // OPTIONAL
  };

  return API.post(apiName, path, myInit).catch(err => {
    console.log(
      'There has been a problem with your post operation: ' + err.message,
    );
    throw err;
  });
}

const CustomTextButton = ({alert}) => {
  /*
    Component name: CustomTextButton
    Description: This component displays the alert bar and the model when clicked on it 
    Props: alert
    Exports to: AlertScreen
    Developed by: Kashish
  */
  const [modalVisible, setModalVisible] = useState(false);

  async function postMyAlerts(currentAlert) {
    try {
      // setLoader(true);
      await postData(currentAlert)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(err => {
          console.log('Api call error', err);
        });
    } catch (err) {
      console.log('Some error', err);
    }
  }

  const sendAlertInfo = currentAlert => {
    console.log(currentAlert);
    // postData();
    // postMyAlerts(currentAlert);
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Model has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Priority: {alert.payload.Priority}
            </Text>
            <Text style={styles.modalText}>
              Asset name: {alert.payload['Asset Name']}
            </Text>
            <Text style={styles.modalText}>
              Temperature: {alert.payload.Temperature}
            </Text>
            <Text style={styles.modalText}>
              Location:{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => {
                  sendAlertInfo(alert);
                  Linking.openURL(alert.payload.link);
                }}>
                {alert.payload.Location}
              </Text>
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.spacing}>
        <Icon.Button
          name="calendar"
          backgroundColor={
            alert.payload.Priority === 'High'
              ? 'red'
              : alert.payload.Priority === 'Medium'
              ? 'orange'
              : 'yellow'
          }
          onPress={() => setModalVisible(true)}>
          <Text style={{fontFamily: 'Arial', fontSize: 15}}>
            Alert {alert.payload.Location}: {alert.payload.Priority}
          </Text>
        </Icon.Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CustomTextButton;
