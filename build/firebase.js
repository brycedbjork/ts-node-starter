"use strict";

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_firebaseAdmin["default"].initializeApp({
  credential: _firebaseAdmin["default"].credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_KEY.replace(/\\n/g, "\n")
  }),
  databaseURL: "https://hireastudent-tech.firebaseio.com"
});

var db = _firebaseAdmin["default"].database();

var firestore = _firebaseAdmin["default"].firestore();

var fcm = _firebaseAdmin["default"].messaging();

var auth = _firebaseAdmin["default"].auth();

module.exports = {
  db: db,
  firestore: firestore,
  fcm: fcm,
  auth: auth
};
//# sourceMappingURL=firebase.js.map