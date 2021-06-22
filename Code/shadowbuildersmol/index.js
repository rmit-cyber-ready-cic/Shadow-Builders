/**
 * @format
 */

/*
    File name: App
    Description: This is the entry file of the app.
    Developed by: Kashish
  */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// necessary amplify imports
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

AppRegistry.registerComponent(appName, () => App);
