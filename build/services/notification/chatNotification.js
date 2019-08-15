"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getUser = require("../user/getUser");

var _push = _interopRequireDefault(require("./helpers/push"));

var _text = _interopRequireDefault(require("./helpers/text"));

var _email = _interopRequireDefault(require("./helpers/email"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
Sends notification to other chat participant(s) after new message
*/
var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(from, fromData, to, message, chatId) {
    var userPromises, usersData, toBePushed, toBeTexted, numbers, toBeEmailed, emails;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userPromises = to.map(function (id) {
              return (0, _getUser.getUser)(id, null);
            });
            _context.next = 3;
            return Promise.all(userPromises);

          case 3:
            usersData = _context.sent;
            toBePushed = [];
            toBeTexted = [];
            numbers = [];
            toBeEmailed = [];
            emails = [];
            usersData.forEach(function (user) {
              if (user.notifications && user.notifications.chat) {
                if (user.notifications.chat.push) {
                  toBePushed.push(user.id);
                }

                if (user.notifications.chat.text) {
                  toBeTexted.push(user.id);
                  numbers.push(user.phoneNumber);
                }

                if (user.notifications.chat.email) {
                  toBeEmailed.push(user.id);
                  emails.push(user.email);
                }
              }
            });
            _context.next = 12;
            return (0, _push["default"])({
              uid: toBePushed,
              body: message,
              title: fromData.firstName,
              data: {
                chatId: chatId
              }
            });

          case 12:
            _context.next = 14;
            return (0, _text["default"])({
              uid: toBeTexted,
              message: "".concat(fromData.firstName, ": ").concat(message),
              userPhoneNumber: numbers
            });

          case 14:
            _context.next = 16;
            return (0, _email["default"])({
              uid: toBeEmailed,
              userEmail: emails,
              type: "newMessage",
              chatId: chatId,
              fromData: fromData,
              message: message
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=chatNotification.js.map