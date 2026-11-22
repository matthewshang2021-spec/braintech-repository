
import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "./firebase";

const VAPID_KEY = "BFnEY8O5dL8POJcwfca5zsFyx6qTy9sZ1N-MRwkmvx7ZYM4UjfFX6oB2X9W8_k9IaABdNbnaQ_ihUTqUznYMnkM";

export async function enablePushNotifications() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service workers are not supported.");
  }

  if (!("Notification" in window)) {
    throw new Error("Notifications are not supported.");
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission denied.");
  }

  const messaging = await getFirebaseMessaging();

  if (!messaging) {
    throw new Error("Firebase Messaging is not supported.");
  }

 
const registration = await navigator.serviceWorker.register(
  `${import.meta.env.BASE_URL}firebase-messaging-sw.js`
);

// Wait until the service worker is active.
if (!registration.active) {
  const worker = registration.installing || registration.waiting;

  if (worker) {
    await new Promise<void>((resolve, reject) => {
      if (worker.state === "activated") {
        resolve();
        return;
      }

      const timeout = setTimeout(
        () => reject(new Error("Service worker activation timed out.")),
        15000
      );

      worker.addEventListener("statechange", () => {
        if (worker.state === "activated") {
          clearTimeout(timeout);
          resolve();
        } else if (worker.state === "redundant") {
          clearTimeout(timeout);
          reject(new Error("Service worker installation failed."));
        }
      });
    });
  }
}

if (!registration.active) {
  throw new Error("Service worker is not active.");
}

const token = await getToken(messaging, {
  vapidKey: VAPID_KEY,
  serviceWorkerRegistration: registration
});


  if (!token) {
    throw new Error("Could not generate an FCM token.");
  }

  onMessage(messaging, (payload) => {
    console.log("Foreground notification:", payload);

    // Foreground notifications can be displayed in
    // the app's notification panel.
  });

  return token;
}
