importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMJio1smA9BrsQW2Va93Blf2S6ahh7480",
    authDomain: "quiz-app-pwa-4c5d4.firebaseapp.com",
    projectId: "quiz-app-pwa-4c5d4",
    storageBucket: "quiz-app-pwa-4c5d4.appspot.com",
    messagingSenderId: "460511407295",
    appId: "1:460511407295:web:fe85364eaf9158a96d6a0a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.messaging();
  