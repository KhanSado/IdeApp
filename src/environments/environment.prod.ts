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
    apiKey: "AIzaSyAsAfCauTFF4tUgQg15qKDeOIFjY6RNg4s",
    authDomain: "aletheya-40661.firebaseapp.com",
    projectId: "aletheya-40661",
    storageBucket: "aletheya-40661.appspot.com",
    messagingSenderId: "149052266200",
    appId: "1:149052266200:web:855c23fae8009427c3a9ad",
    measurementId: "G-VX6SW10Z5M"
  }
};
