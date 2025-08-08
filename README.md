## Augmented Reality Data Visualization

This is a mobile app that lets you visualize geospatial data in Augmented Reality off your phone camera. Load a dataset with latitudes/longitudes, and view your data overlayed on the real world. This works by accessing your phone's GPS, gyroscope, and compass, and using some simple physics based your viewing angle and distance from your data will properly render data points as shapes. You can color code shapes. This was a Lyft 2018 company hackathon submission (just lightly edited more recently to have a clear readme!). 

The submission video shows a few examples of how on the ground ops personnel can use the tool to debug various pickup and drop off issues. Examples include requested vs. actual pick up locations outside a stadium and and near a bike lane.

<img width="1280" height="720" alt="AR data viz thumbnail" src="https://github.com/user-attachments/assets/e6560384-1a73-4150-a59f-5925e0e06d4e" />
https://drive.google.com/file/d/1TbDbA6rEPPsK1TDGIEuwa_vnT9qJppN0/view?usp=sharing 


This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Available Scripts
`npm start` Runs your app in development mode. Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal. Sometimes you may need to reset or clear the React Native packager's cache npm start -- --reset-cache.
`npm test` Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

`npm run ios`. Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

`npm run android`. Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).

`npm run eject`. This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project. **Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.
