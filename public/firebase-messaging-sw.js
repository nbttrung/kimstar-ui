importScripts('https://www.gstatic.com/firebasejs/9.9.3/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-compat.js')

const firebaseConfig = {
    apiKey: "AIzaSyCPL0093rwFyA53AO8Mma4mRSG57mXck2M",
    authDomain: "dogoo-b6a1d.firebaseapp.com",
    projectId: "dogoo-b6a1d",
    storageBucket: "dogoo-b6a1d.appspot.com",
    messagingSenderId: "843359165168",
    appId: "1:843359165168:web:2cceef0681dcfe524b4035",
    measurementId: "G-JDWWL4W5YR"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();