importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAujJQC1DC7_weXGyq3O0kXqOhTV0F06sA",
    authDomain: "motivatata.firebaseapp.com",
    projectId: "motivatata",
    storageBucket: "motivatata.firebasestorage.app",
    messagingSenderId: "628570963688",
    appId: "1:628570963688:web:7676a2024fd30a0545d35d"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// استقبال الإشعارات في الخلفية حتى لو التطبيق مقفول
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Received background message ', payload);
    
    const notificationTitle = payload.notification.title || "Motivatata ✨";
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'icon.png',
        tag: 'motivatata-push'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
