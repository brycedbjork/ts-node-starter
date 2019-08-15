"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.messaging = exports.firestore = exports.database = void 0;

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_firebaseAdmin["default"].initializeApp({
  credential: _firebaseAdmin["default"].credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_KEY ? process.env.FIREBASE_KEY.replace(/\\n/g, "\n") : ""
  }),
  databaseURL: "https://hireastudent-tech.firebaseio.com"
});

var database = _firebaseAdmin["default"].database();

exports.database = database;

var firestore = _firebaseAdmin["default"].firestore();

exports.firestore = firestore;

var messaging = _firebaseAdmin["default"].messaging();

exports.messaging = messaging;

var auth = _firebaseAdmin["default"].auth();

exports.auth = auth;
//# sourceMappingURL=firebase.js.map