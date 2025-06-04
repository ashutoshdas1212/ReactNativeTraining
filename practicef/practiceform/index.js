/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppValidator from './AppValidator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppValidator);
