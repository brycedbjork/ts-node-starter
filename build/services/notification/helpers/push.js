"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _firebase = require("../../../firebase");

var _getUser = require("../../user/getUser");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options) {
    var uid, body, title, data, getUsers, users, pushTokens, notification, payload;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            uid = options.uid, body = options.body, title = options.title, data = options.data; // get all push tokens

            getUsers = [];

            if (typeof uid === "string") {
              // single user
              getUsers.push((0, _getUser.getUser)(uid, null));
            } else {
              // multiple users
              uid.forEach(function (singleId) {
                getUsers.push((0, _getUser.getUser)(singleId, null));
              });
            }

            _context.next = 5;
            return Promise.all(getUsers);

          case 5:
            users = _context.sent;
            pushTokens = [];
            users.forEach(function (userData) {
              if (userData.pushToken) {
                pushTokens.push(userData.pushToken);
              }
            }); // construct payload

            notification = {
              body: body,
              badge: "1",
              data: data
            };
            if (title) notification.title = title;
            payload = {
              notification: notification
            }; // send push

            if (!(pushTokens.length > 0)) {
              _context.next = 14;
              break;
            }

            _context.next = 14;
            return _firebase.messaging.sendToDevice(pushTokens, payload);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=push.js.map