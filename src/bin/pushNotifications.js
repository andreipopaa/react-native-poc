import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';

const configure = () => {
 PushNotification.configure({

   onRegister: function(token) {
     //process token
     console.log(token);
   },

   onNotification: function(notification) {
     // process the notification
     // required on iOS only
     console.log(PushNotificationIOS.FetchResult.NoData);
     notification.finish(PushNotificationIOS.FetchResult.NoData);
   },

   permissions: {
     alert: true,
     badge: true,
     sound: true
   },

   popInitialNotification: true,
   requestPermissions: true,

 });
};

const localNotification = () => {
  console.log('Create notification');
    PushNotification.localNotification({
      /* iOS and Android properties */
      title: "Download Complete", // (optional)
      message: "The episode you downloaded will start playing in a second.", // (required)
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
      userInteraction: true,
    });
};
   
export {
    configure,
    localNotification,
};