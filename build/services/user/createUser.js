"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = createUser;
exports["default"] = void 0;

var _firebase = require("../../firebase");

var _moment = _interopRequireDefault(require("moment"));

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _slack = _interopRequireDefault(require("../../utils/slack"));

var _formatPhone = require("../../utils/formatPhone");

var _matchReferral = _interopRequireDefault(require("../refer/matchReferral"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createUser(_x, _x2, _x3) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(uid, data, type) {
    var userDoc, displayLocation, phoneNumber, newUser, initNotifications, _initNotifications;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _firebase.firestore.collection("users").doc(uid).get();

          case 2:
            userDoc = _context2.sent;

            if (!userDoc.exists) {
              _context2.next = 5;
              break;
            }

            throw new Error("User already exists");

          case 5:
            displayLocation = "".concat(data.city).concat(data.state ? ", ".concat(data.state) : "").concat(!data.state && data.country ? ", ".concat(data.country) : "");
            phoneNumber = (0, _formatPhone.purePhone)(data.phoneNumber); // construct and set user data

            if (data.type == "student") {
              initNotifications = {
                jobs: {
                  push: true,
                  text: true,
                  email: true
                },
                chat: {
                  push: true,
                  text: true,
                  email: false
                }
              };
              newUser = _objectSpread({}, data, {
                displayLocation: displayLocation,
                joinedTime: (0, _moment["default"])().unix(),
                joinedDate: (0, _moment["default"])().format(),
                jobs: {},
                notifications: initNotifications,
                locationKey: null,
                phoneNumber: phoneNumber
              });
            } else {
              _initNotifications = {
                jobs: {
                  push: true,
                  text: true,
                  email: true
                },
                chat: {
                  push: true,
                  text: true,
                  email: false
                }
              };
              newUser = _objectSpread({}, data, {
                displayLocation: displayLocation,
                joinedTime: (0, _moment["default"])().unix(),
                joinedDate: (0, _moment["default"])().format(),
                customerId: null,
                locationKey: null,
                notifications: _initNotifications
              });
            }

            _context2.next = 10;
            return _firebase.firestore.collection("users").doc(uid).set(newUser, {
              merge: true
            });

          case 10:
            // log signup
            (0, _slack["default"])("*Signup* ".concat(newUser.type, " in ").concat(newUser.city, " in ").concat(newUser.displayLocation, " _").concat(newUser.firstName, " ").concat(newUser.lastName, " ").concat(newUser.email, " ").concat(phoneNumber, "_")); // capture referral

            _context2.next = 13;
            return (0, _matchReferral["default"])(uid, newUser);

          case 13:
            return _context2.abrupt("return", newUser);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createUser.apply(this, arguments);
}

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, _uid, _data, newUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, _uid = _req$body.uid, _data = _req$body.data;

            if (!(_data.type == "student")) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return createUser(_uid, _data, "student");

          case 5:
            _context.t0 = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return createUser(_uid, _data, "hirer");

          case 10:
            _context.t0 = _context.sent;

          case 11:
            newUser = _context.t0;
            // successful signup
            res.status(200).json({
              data: newUser
            }); // success

            _context.next = 20;
            break;

          case 15:
            _context.prev = 15;
            _context.t1 = _context["catch"](0);
            res.status(500).send("Something broke!");
            console.log("Error: " + _context.t1);
            Sentry.captureException(_context.t1);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function (_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=createUser.js.map