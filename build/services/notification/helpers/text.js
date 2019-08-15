"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.text = void 0;

var _twilio = _interopRequireDefault(require("twilio"));

var _getUser = require("../../user/getUser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var client = (0, _twilio["default"])(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var twilioNumber = process.env.TWILIO_NUMBER; // your twilio phone number

/*
Sends text message(s)
*/

var text =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(phoneNumber, message) {
    var textMessage;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            textMessage = {
              body: message,
              to: phoneNumber,
              from: twilioNumber
            };
            _context.next = 3;
            return client.messages.create(textMessage);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function text(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.text = text;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(options) {
    var uid, message, userPhoneNumber, numbers, userData, userPromises, usersData, textPromises;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            uid = options.uid, message = options.message, userPhoneNumber = options.userPhoneNumber;
            numbers = [];

            if (userPhoneNumber) {
              _context2.next = 17;
              break;
            }

            if (!(typeof uid === "string")) {
              _context2.next = 10;
              break;
            }

            _context2.next = 6;
            return (0, _getUser.getUser)(uid, null);

          case 6:
            userData = _context2.sent;
            numbers.push(userData.phoneNumber);
            _context2.next = 15;
            break;

          case 10:
            // multiple users
            userPromises = uid.map(function (singleId) {
              return (0, _getUser.getUser)(singleId, null);
            });
            _context2.next = 13;
            return Promise.all(userPromises);

          case 13:
            usersData = _context2.sent;
            numbers = usersData.map(function (userData) {
              return userData.phoneNumber;
            });

          case 15:
            _context2.next = 18;
            break;

          case 17:
            if (typeof userPhoneNumber === "string") {
              // single user
              numbers.push(userPhoneNumber);
            } else {
              numbers = userPhoneNumber;
            }

          case 18:
            textPromises = numbers.map(function (number) {
              return text(number, message);
            });
            _context2.next = 21;
            return Promise.all(textPromises);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=text.js.map