// Vendor Imports
import React from 'react';
import { Provider } from 'react-redux';
import { createSwitchNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

// Custom Imports
import store from './state/store';
import VideoPage from './components/pages/VideoPage';
import AudioPage from './components/pages/AudioPage';
import LoginPage from './components/pages/LoginPage';
import SettingsPage from './components/pages/SettingsPage';
import NavigationService from './bin/navigationService';
import checkSession from './bin/checkSession';
import { configure } from './bin/pushNotifications';

configure();

const AppStack = createBottomTabNavigator({
  Audio: AudioPage,
  Video: VideoPage,
  Settings: SettingsPage,
});

const mainNav = createSwitchNavigator(
  {
    App: AppStack,
    Auth: LoginPage,
  },
  {
    initialRouteName: 'Auth',
  },
);

console.log(mainNav);

const AppCore = checkSession(createAppContainer(mainNav));

const App = () => (
  <Provider store={ store }>
    <AppCore innerRef={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} />
  </Provider>
);

export default App;
