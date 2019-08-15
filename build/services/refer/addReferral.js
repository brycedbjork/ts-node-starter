"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.addReferral = void 0;

var _firebase = require("../../firebase");

var _moment = _interopRequireDefault(require("moment"));

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _getUser = require("../user/getUser");

var _referralNotification = _interopRequireDefault(require("../notification/referralNotification"));

var _formatPhone = require("../../utils/formatPhone");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addReferral =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(type, phoneNumber, uid, name, email) {
    var check, userData, newReferral;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _firebase.firestore.collection("users").where("phoneNumber", "==", (0, _formatPhone.purePhone)(phoneNumber)).get();

          case 2:
            check = _context.sent;

            if (!(!check.empty && type == "direct")) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            if (!uid) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return (0, _getUser.getUser)(uid, null);

          case 8:
            userData = _context.sent;

          case 9:
            _context.t0 = type;
            _context.next = _context.t0 === "web" ? 12 : _context.t0 === "direct" ? 18 : 26;
            break;

          case 12:
            if (uid) {
              newReferral.user = {
                id: uid,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image
              };
            }

            newReferral.phoneNumber = (0, _formatPhone.purePhone)(phoneNumber);
            newReferral.time = (0, _moment["default"])().unix();
            newReferral.date = (0, _moment["default"])().format();
            newReferral = newReferral;
            return _context.abrupt("break", 26);

          case 18:
            if (uid) {
              newReferral.user = {
                id: uid,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image
              };
            }

            if (newReferral.phoneNumber) newReferral.phoneNumber = (0, _formatPhone.purePhone)(phoneNumber);
            if (newReferral.email) newReferral.email = email;
            if (newReferral.name) newReferral.name = name;
            newReferral.time = (0, _moment["default"])().unix();
            newReferral.date = (0, _moment["default"])().format();
            newReferral = newReferral;
            return _context.abrupt("break", 26);

          case 26:
            _context.next = 28;
            return _firebase.firestore.collection("referrals").add(newReferral);

          case 28:
            _context.next = 30;
            return (0, _referralNotification["default"])(newReferral);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addReferral(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.addReferral = addReferral;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, uid, type, name, phoneNumber, email;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, uid = _req$body.uid, type = _req$body.type, name = _req$body.name, phoneNumber = _req$body.phoneNumber, email = _req$body.email;
            _context2.next = 4;
            return addReferral(type, phoneNumber, uid, name, email);

          case 4:
            // successful post
            res.status(200).send();
            _context2.next = 12;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).send(_context2.t0);
            console.log("Error: " + _context2.t0);
            Sentry.captureException(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=addReferral.js.map