Lyft 2018 company hackathon submission - recently just created this readme for external viewers.

## Augmented Reality Data Visualization

This is a mobile app that lets you visualize geospatial data in Augmented Reality off your phone camera. Load a dataset with latitudes/longitudes, and view your data overlayed on the real world. This works by accessing your phone's GPS, gyroscope, and compass, and using some simple physics based your viewing angle and distance from your data will properly render data points as shapes. You can color code shapes.

The submission video shows a few examples of how on the ground ops personnel can use the tool to debug various pickup and drop off issues. Examples include viewing driver utilization status in a congested area near a stadium, and requested vs. actual pick up locations near a bike lane.
<img width="410" height="720" alt="AR data viz - thumb 2" src="https://github.com/user-attachments/assets/0d53f89c-a88c-4b07-837a-3b40aced74f4" />
<img width="410" height="715" alt="AR data viz thumbnail" src="https://github.com/user-attachments/assets/6afe231c-a8cc-4346-a390-30d3039ab86f" />

https://drive.google.com/file/d/1TbDbA6rEPPsK1TDGIEuwa_vnT9qJppN0/view?usp=sharing 


This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Available Scripts
`npm start` Runs your app in development mode. Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal. Sometimes you may need to reset or clear the React Native packager's cache npm start -- --reset-cache.
`npm test` Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

`npm run ios`. Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

`npm run android`. Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).

`npm run eject`. This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project. **Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.
