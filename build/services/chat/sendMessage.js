"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _firebase = require("../../firebase");

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _getUser = require("../user/getUser");

var _updateChat = require("../chat/updateChat");

var _getChat = require("../chat/getChat");

var _moment = _interopRequireDefault(require("moment"));

var _chatNotification = _interopRequireDefault(require("../notification/chatNotification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sendMessage =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(uid, chatId, text) {
    var userData, chatData, message, sendToUsers;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getUser.getUser)(uid, null);

          case 2:
            userData = _context.sent;
            _context.next = 5;
            return (0, _getChat.getChat)(chatId);

          case 5:
            chatData = _context.sent;

            if (!(chatData.hirer.id != uid && chatData.users[uid].active != true)) {
              _context.next = 8;
              break;
            }

            throw new Error("user does not have access to this chat");

          case 8:
            // construct message
            message = {
              type: "text",
              from: {
                id: uid,
                firstName: userData.firstName,
                image: userData.image
              },
              text: text,
              time: (0, _moment["default"])().unix(),
              date: (0, _moment["default"])().format()
            }; // add message to messages subcollection of chat

            _context.next = 11;
            return _firebase.firestore.collection("chats").doc(chatId).collection("messages").add(message);

          case 11:
            _context.next = 13;
            return (0, _updateChat.updateChat)(chatId, {
              lastMessage: message,
              readBy: _defineProperty({}, uid, true)
            });

          case 13:
            // notify
            sendToUsers = Object.keys(chatData.users);
            _context.next = 16;
            return (0, _chatNotification["default"])(uid, userData, sendToUsers, text, chatId);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendMessage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, uid, chatId, text;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, uid = _req$body.uid, chatId = _req$body.chatId, text = _req$body.text;
            _context2.next = 4;
            return sendMessage(uid, chatId, text);

          case 4:
            return _context2.abrupt("return", res.status(200).send());

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).send("Something broke!");
            console.log("Error: " + _context2.t0);
            Sentry.captureException(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=sendMessage.js.map