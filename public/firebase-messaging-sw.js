importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDWkupqoh_LpZAGZsYYJalDYmnrkcL8L80",
  authDomain: "hiralal-app.firebaseapp.com",
  projectId: "hiralal-app",
  storageBucket: "hiralal-app.appspot.com",
  messagingSenderId: "1086744796561",
  appId: "1:1086744796561:web:8b4d6653010a741b8c8e30"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background message:", payload);

  const title = payload.notification?.title || "Hiralal Update";
  const options = {
    body: payload.notification?.body || "New update available"
    
  };

  self.registration.showNotification(title, options);
});