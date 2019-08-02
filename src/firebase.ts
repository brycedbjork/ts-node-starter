import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_KEY
  }),
  databaseURL: "https://hireastudent-tech.firebaseio.com"
});

const db = admin.database();
const firestore = admin.firestore();
const fcm = admin.messaging();
const auth = admin.auth();

module.exports = {
  db,
  firestore,
  fcm,
  auth
};
