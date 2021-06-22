import React from 'react';

// react-native-webview
import {WebView} from 'react-native-webview';

const DashboardScreen = ({navigation, route}) => {
  /*
    Component name: DashboardScreen
    Description: This component displays the dashboard using webview inside the app
    Props: navigation, route
    Export to: DrawerUserNavigation
    Developed by: Kashish
  */
  return (
    <>
      <WebView
        scalesPageToFit={true}
        source={{
          uri: 'https://<Region>.quicksight.aws.amazon.com/sn/dashboards/<unique id>',
        }}
        originWhitelist={['*']}
      />
    </>
  );
};

export default DashboardScreen;
