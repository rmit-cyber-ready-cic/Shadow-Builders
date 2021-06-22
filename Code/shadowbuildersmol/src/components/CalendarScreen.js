import React, {useState, useEffect} from 'react';

// react-native components
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {API} from 'aws-amplify';
import {Calendar, CalendarList, Agenda, Arrow} from 'react-native-calendars';

function getData() {
  const apiName = 'sbrestapi';
  const path = '/schedules';
  const myInit = {
    // OPTIONAL
    headers: {}, // OPTIONAL
  };

  return API.get(apiName, path, myInit).catch(err => {
    console.log(
      'There has been a problem with your fetch operation: ' + err.message,
    );
    throw err;
  });
}

const initialState = [];
const CalendarScreen = ({navigation, route}) => {
  /*
    Component name: CalendarScreen
    Description: This component displays the schedules in calendar after fetching from dynamodb 
    Props: navigation, route
    Exports to: DrawerUserNavigation
    Developed by: Kashish
  */
  const [schedules, setSchedules] = useState(initialState);
  const [currentSchedule, setCurrentSchedule] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  async function fetchSchedules() {
    try {
      setLoader(true);
      await getData()
        .then(res => {
          console.log(res);
          data = res.data;
          data.map(d => {
            console.log(d.date);
          });
          setSchedules(res.data);
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
    fetchSchedules();
  }, []);

  const dates = {};

  schedules.map(
    schedule =>
      (dates[schedule.date] = {
        selected: true,
        marked: true,
        selectedColor: 'red',
      }),
  );

  const onClickDay = day => {
    schedules.map(schedule => {
      if (schedule.date === day.dateString) {
        console.log('Hola shola');
        setCurrentSchedule(schedule);
        setModalVisible(true);
      }
    });
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Priority: {currentSchedule.priority}
            </Text>
            <Text style={styles.modalText}>
              Asset Name: {currentSchedule.description}
            </Text>
            <Text style={styles.modalText}>
              Location:{' '}
              {console.log('printing something', currentSchedule.location)}
              <Text
                style={{color: 'blue'}}
                onPress={() => Linking.openURL(currentSchedule.link)}>
                {currentSchedule.location}
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
      <View>
        <ActivityIndicator size="large" color="#0000ff" animating={loader} />
        <Text style={{fontSize: 36, fontWeight: 'bold'}}>Schedules</Text>
        <CalendarList
          // Enable horizontal scrolling, default = false
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={false}
          // Set custom calendarWidth.
          calendarWidth={320}
          // marked dates absed on data from database
          markedDates={dates}
          onDayPress={day => {
            console.log('selected day', day);
            onClickDay(day);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    elevation: 3,
    zIndex: 1,
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

export default CalendarScreen;
