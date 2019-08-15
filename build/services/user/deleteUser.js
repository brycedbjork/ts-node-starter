"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.deleteUser = void 0;

var _firebase = require("../../firebase");

var _geofirestore = require("geofirestore");

var Sentry = _interopRequireWildcard(require("@sentry/node"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var geoFirestore = new _geofirestore.GeoFirestore(_firebase.firestore);
var geoUserLocations = geoFirestore.collection("userLocations");

var deleteUser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(uid) {
    var userDoc, userEntity, chatQuery, chatDeletes, jobsQuery, _chatDeletes;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _firebase.firestore.collection("users").doc(uid).get();

          case 2:
            userDoc = _context.sent;

            if (userDoc.exists) {
              _context.next = 5;
              break;
            }

            throw new Error("User does not exist");

          case 5:
            userEntity = userDoc.data(); // delete chats

            _context.next = 8;
            return _firebase.firestore.collection("chats").where("hirer.id", "==", uid).get();

          case 8:
            chatQuery = _context.sent;
            chatDeletes = [];
            chatQuery.docs.forEach(function (doc) {
              chatDeletes.push(_firebase.firestore.collection("chats").doc(doc.id)["delete"]());
            });
            _context.next = 13;
            return Promise.all(chatDeletes);

          case 13:
            if (!(userEntity.type == "hirer")) {
              _context.next = 21;
              break;
            }

            _context.next = 16;
            return _firebase.firestore.collection("jobs").where("hirer.id", "==", uid).get();

          case 16:
            jobsQuery = _context.sent;
            _chatDeletes = [];
            chatQuery.docs.forEach(function (doc) {
              _chatDeletes.push(_firebase.firestore.collection("chats").doc(doc.id)["delete"]());
            });
            _context.next = 21;
            return Promise.all(_chatDeletes);

          case 21:
            if (!userEntity.locationKey) {
              _context.next = 24;
              break;
            }

            _context.next = 24;
            return geoUserLocations.doc(userEntity.locationKey)["delete"]();

          case 24:
            _context.next = 26;
            return _firebase.firestore.collection("users").doc(uid)["delete"]();

          case 26:
            return _context.abrupt("return");

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function deleteUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var uid;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            uid = req.body.uid;
            _context2.next = 4;
            return deleteUser(uid);

          case 4:
            return _context2.abrupt("return", res.status(200).send());

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(_context2.t0.status).send("Something broke!");
            console.log("Error: " + _context2.t0);
            Sentry.captureException(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=deleteUser.js.map