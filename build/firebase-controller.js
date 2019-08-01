"use strict";

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebaseAdmin.default.initializeApp({
  credential: _firebaseAdmin.default.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_KEY.replace(/\\n/g, "\n")
  }),
  databaseURL: "https://hireastudent-tech.firebaseio.com"
});

const db = _firebaseAdmin.default.database();

const firestore = _firebaseAdmin.default.firestore();

const fcm = _firebaseAdmin.default.messaging();

const auth = _firebaseAdmin.default.auth();

module.exports = {
  db,
  firestore,
  fcm,
  auth
};
//# sourceMappingURL=firebase-controller.js.map