importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDWkupqoh_LpZAGZsYYJalDYmnrkcL8L80",
  authDomain: "hiralal-app.firebaseapp.com",
  projectId: "hiralal-app",
  storageBucket: "hiralal-app.firebasestorage.app",
  messagingSenderId: "1086744796561",
  appId: "1:1086744796561:web:8b4d6653010a741b8c8e30"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[Service Worker] Background message received: ', payload);
  const notificationTitle = payload.notification.title || "Hiralal Links Update!";
  const notificationOptions = {
    body: payload.notification.body || "A new link has been added.",
    icon: '/favicon.ico'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});