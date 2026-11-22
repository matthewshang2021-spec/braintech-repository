
importScripts(
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBH0QDpKfYrUh0HgbxI47ljx9RjHyzg41I",
  authDomain: "braintech-28de1.firebaseapp.com",
  projectId: "braintech-28de1",
  storageBucket: "braintech-28de1.firebasestorage.app",
  messagingSenderId: "948478400084",
  appId: "1:948478400084:web:a7274f7c4c38264a87bfc1"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Firebase message:", payload);
});

