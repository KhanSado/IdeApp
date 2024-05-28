import packageInfo from '../../package.json';

// export const environment = {
  // appVersion: packageInfo.version,
  // production: true,
  // apiUrl: 'http://localhost:4200'
// };
export const environment = {
  production: true,
  appVersion: packageInfo.version,
  apiUrl: 'http://localhost:4200',
  firebase: {
    apiKey: "AIzaSyD2gBKhQcRTDeUE6ajzSko9S3uhyRVqfVE",
    authDomain: "ide-app-ippn.firebaseapp.com",
    projectId: "ide-app-ippn",
    storageBucket: "ide-app-ippn.appspot.com",
    messagingSenderId: "288479226452",
    appId: "1:288479226452:web:451a46bbe135e874631bc1",
    measurementId: "G-8F8BGWGBJ2"
  }
};
