"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.updateChat = void 0;

var _firebase = require("../../firebase");

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _getChat = require("./getChat");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var updateChat =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(chatId, data) {
    var chatDoc, updatedChat;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _firebase.firestore.collection("chats").doc(chatId).get();

          case 2:
            chatDoc = _context.sent;

            if (chatDoc.exists) {
              _context.next = 5;
              break;
            }

            throw new Error("Chat does not exist");

          case 5:
            _context.next = 7;
            return _firebase.firestore.collection("chats").doc(chatId).update(data);

          case 7:
            _context.next = 9;
            return (0, _getChat.getChat)(chatId);

          case 9:
            updatedChat = _context.sent;
            return _context.abrupt("return", updatedChat);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateChat(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateChat = updateChat;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, chatId, data, job;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, chatId = _req$body.chatId, data = _req$body.data;
            _context2.next = 4;
            return updateChat(chatId, data);

          case 4:
            job = _context2.sent;
            return _context2.abrupt("return", res.status(200).json(job));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            res.status(500).send("Something broke!");
            console.log("Error: " + _context2.t0);
            Sentry.captureException(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=updateChat.js.map