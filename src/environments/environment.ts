// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import packageInfo from '../../package.json';

// export const environment = {
  // appVersion: packageInfo.version,
  // production: false,
  // apiUrl: 'http://localhost:4200'
// };

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
