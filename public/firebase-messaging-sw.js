importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging.js");


const firebaseConfig = {
    apiKey: "AIzaSyBTBgY9E7sJS-6UYgCqJtn4OrZv4oR6x2c",
    authDomain: "habittracker-fef2c.firebaseapp.com",
    projectId: "habittracker-fef2c",
    storageBucket: "habittracker-fef2c.appspot.com",
    messagingSenderId: "199373381333",
    appId: "1:199373381333:web:6f6453fae2aa6a6d324c5c"
  };

  
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(function (payload) {
    if (Notification.permission === 'granted') {
        if (navigator.serviceWorker)
            navigator.serviceWorker.getRegistration().then(async function (reg) {
                if (reg)
                    await reg.showNotification(payload.notification.title, {
                        body: payload.notification.body,
                    });
            });
    }
})