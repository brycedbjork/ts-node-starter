import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_KEY
      ? process.env.FIREBASE_KEY.replace(/\\n/g, "\n")
      : ""
  }),
  databaseURL: "https://hireastudent-tech.firebaseio.com"
});

export const database = admin.database();
export const firestore = admin.firestore();
export const messaging = admin.messaging();
export const auth = admin.auth();
